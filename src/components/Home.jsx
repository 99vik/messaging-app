import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { AuthorizationDataContext } from '../scripts/AuthorizationDataContext';
import { useNavigate } from 'react-router-dom';
import { refreshToken, revokeToken } from '../scripts/AuthorizationApiRequests';
import { fetchUserChats } from '../scripts/ChatApiCalls';
import Sidebar from './Sidebar';
import Main from './Main';

function Home() {
  const [chats, setChats] = useState(null);
  const [loader, setLoader] = useState(true);
  const [mainDisplay, setMainDisplay] = useState([]);

  const { authorizationData, authorization } = useContext(
    AuthorizationDataContext
  );
  const [authorizationLoader, setAuthorizationLoader] = useState(true);

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
        const data = await fetchUserChats(authorizationData.token);
        setChats(data);
        setLoader(false);
      }
    }
    getData();
  }, [authorizationLoader]);

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

  return (
    <>
      <div className="flex h-full rounded-lg overflow-hidden dark:bg-slate-900 dark:text-white ">
        <Sidebar
          logOut={logOut}
          chats={chats}
          setMainDisplay={setMainDisplay}
        />
        <Main setMainDisplay={setMainDisplay} mainDisplay={mainDisplay} />
      </div>
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
