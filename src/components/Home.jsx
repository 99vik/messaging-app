import { useContext, useState } from 'react';
import { AuthorizationDataContext } from '../scripts/AuthorizationDataContext';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { authorizationData, authorization } = useContext(
    AuthorizationDataContext
  );

  const [counter, setCounter] = useState(0);
  const navigate = useNavigate();

  function logOut() {
    authorization();
    navigate('sign-in');
  }

  return (
    <>
      {console.log(localStorage.getItem('refresh_token'))}
      {console.log(authorizationData)}
      <button onClick={logOut}>Log Out</button>
      <h1> Home</h1>
      <p>{counter}</p>
      <button
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        +
      </button>
    </>
  );
}

export default Home;
