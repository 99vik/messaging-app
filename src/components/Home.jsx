import { useContext } from 'react';
import { AuthorizationDataContext } from '../scripts/AuthorizationDataContext';

function Home() {
  const { authorizationData, setAuthorizationData } = useContext(
    AuthorizationDataContext
  );

  return (
    <>
      {console.log(authorizationData)}
      <h1> Home</h1>
    </>
  );
}

export default Home;
