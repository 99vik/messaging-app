import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { AuthorizationDataContext } from '../scripts/AuthorizationDataContext';
import { useNavigate } from 'react-router-dom';
import { AUTHORIZATION_API_URL } from '../scripts/apiLinks';
import { refreshToken } from '../scripts/AuthorizationApiRequests';

function Home() {
  const { authorizationData, authorization } = useContext(
    AuthorizationDataContext
  );
  const [loader, setLoader] = useState(true);

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
        console.log('redirecting');
        navigate('sign-in');
      }
      setLoader(false);
    }
    checkAuthorization();
  }, []);

  function logOut() {
    authorization();
    navigate('sign-in');
  }

  if (loader) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      {console.log(authorizationData)}
      <button onClick={logOut}>Log Out</button>
      <h1> Home</h1>
    </>
  );
}

export default Home;
