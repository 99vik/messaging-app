import { useContext, useEffect, useState } from 'react';
import { AuthorizationDataContext } from '../scripts/AuthorizationDataContext';
import { useNavigate } from 'react-router-dom';
import { refreshToken, revokeToken } from '../scripts/AuthorizationApiRequests';

function Home() {
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
          const data = await response.json();
          authorization(data);
        }
      } else {
        navigate('sign-in');
      }
      setAuthorizationLoader(false);
    }
    checkAuthorization();
  }, []);

  function logOut() {
    revokeToken(authorizationData.token);
    authorization();
    navigate('sign-in');
  }

  if (authorizationLoader) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <button onClick={logOut}>Log Out</button>
      <h1> Home</h1>
    </>
  );
}

export default Home;
