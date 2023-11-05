import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { AuthorizationDataContext } from '../scripts/AuthorizationDataContext';
import { NotificationContext } from '../scripts/NotificationContext';
import { useNavigate } from 'react-router-dom';
import { refreshToken, revokeToken } from '../scripts/AuthorizationApiRequests';
import { fetchUserChats } from '../scripts/ChatApiCalls';
import Sidebar from './Sidebar';
import Main from './Main';
import { getCurrentUser } from '../scripts/ProfileApiCalls';
import Notification from './Notification';
import { WS_URL } from '../scripts/apiLinks';

function Home() {
  const [notification, setNotification] = useState(false);
  const [chats, setChats] = useState(null);
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);
  const [mainDisplay, setMainDisplay] = useState([]);
  const [authorizationLoader, setAuthorizationLoader] = useState(true);

  const { authorizationData, authorization } = useContext(
    AuthorizationDataContext
  );

  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuthorization() {
      const refresh_token = localStorage.getItem('refresh_token');
      if (refresh_token) {
        if (!authorizationData) {
          const response = await refreshToken(refresh_token);
          if (response.ok) {
            const data = await response.json();
            authorization(data);
          } else {
            logOut();
            return;
          }
        }
      } else {
        navigate('sign-in');
      }
      setAuthorizationLoader(false);
    }
    checkAuthorization();
  }, []);

  useEffect(() => {
    async function getData() {
      if (authorizationData) {
        const chatsData = await fetchUserChats(authorizationData.token);
        const userData = await getCurrentUser(authorizationData.token);
        setChats(chatsData);
        setUser(userData);
        setLoader(false);
        connect();
      }
    }
    getData();
  }, [authorizationLoader]);

  function connect() {
    const chatSocket = new WebSocket(`${WS_URL}`);
    chatSocket.onopen = () => {
      chatSocket.send(
        JSON.stringify({
          command: 'subscribe',
          identifier: JSON.stringify({
            user_id: authorizationData.resource_owner.id,
            channel: 'UserChatsChannel',
          }),
        })
      );
    };
    chatSocket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (
        data.type === 'ping' ||
        data.type === 'welcome' ||
        data.type === 'confirm_subscription'
      ) {
        return;
      } else {
        console.log(data.message);
        refreshChats();
      }
    };
  }

  async function refreshChats() {
    const chatsData = await fetchUserChats(authorizationData.token);
    setChats(chatsData);
  }

  async function refreshUser() {
    const newUserData = await getCurrentUser(authorizationData.token);
    setUser(newUserData);
  }

  function logOut() {
    if (authorizationData) {
      revokeToken(authorizationData.token);
    }
    authorization();
    navigate('sign-in');
  }

  if (authorizationLoader || loader) {
    return (
      <>
        <Loader />
      </>
    );
  }

  function showNotification(type, message, messagesList = null) {
    setNotification({ type, message, messagesList });
  }

  return (
    <>
      {notification && (
        <Notification
          notification={notification}
          close={() => setNotification(false)}
        />
      )}
      <NotificationContext.Provider value={{ showNotification }}>
        <div className="flex max-[850px]:-z-20 h-full rounded-lg overflow-hidden dark:bg-slate-900 dark:text-white max-[850px]:flex-col">
          <Sidebar
            user={user}
            refreshUser={refreshUser}
            logOut={logOut}
            chats={chats}
            setMainDisplay={setMainDisplay}
          />
          <Main
            setMainDisplay={setMainDisplay}
            mainDisplay={mainDisplay}
            refreshChats={refreshChats}
          />
        </div>
      </NotificationContext.Provider>
    </>
  );
}

function Loader() {
  return (
    <div className="flex gap-2 h-full w-full items-center justify-center dark:bg-slate-900">
      <div className="w-6 h-6 rounded-full animate-[1s_pulse_infinite_ease-in-out] bg-sky-500"></div>
      <div className="w-6 h-6 rounded-full animate-[1s_pulse_0.2s_infinite_ease-in-out] bg-sky-500"></div>
      <div className="w-6 h-6 rounded-full animate-[1s_pulse_0.4s_infinite_ease-in-out] bg-sky-500"></div>
    </div>
  );
}

export default Home;
