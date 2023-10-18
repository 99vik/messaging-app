import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { AuthorizationDataContext } from '../scripts/AuthorizationDataContext';
import { useNavigate } from 'react-router-dom';
import { refreshToken, revokeToken } from '../scripts/AuthorizationApiRequests';
import { fetchHomeData } from '../scripts/FetchData';

function Home() {
  const [chats, setChats] = useState(null);
  const [loader, setLoader] = useState(true);

  const { authorizationData, authorization } = useContext(
    AuthorizationDataContext
  );
  const [authorizationLoader, setAuthorizationLoader] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    console.log('use effect');
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
        const data = await fetchHomeData(authorizationData.token);
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

  if (authorizationLoader) {
    return (
      <>
        <h1> Loading</h1>
      </>
    );
  }

  return (
    <>
      <button onClick={logOut}>Log Out</button>
      <h1> Home</h1>
      {loader ? (
        <h1>Loading chats</h1>
      ) : (
        <>
          {chats.map((chat, index) => {
            return (
              <div key={index}>
                <h1>{chat.name}</h1>
                <h1>{chat.type}</h1>
              </div>
            );
          })}
        </>
      )}
    </>
  );
}

export default Home;
