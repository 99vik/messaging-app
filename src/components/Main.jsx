import FriendsDisplay from './FriendsDisplay';
import ChatDisplay from './ChatDisplay';
import GroupsDisplay from './GroupsDisplay';
import { AuthorizationDataContext } from '../scripts/AuthorizationDataContext';
import { useContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../scripts/ProfileApiCalls';

function Main({ setMainDisplay, mainDisplay }) {
  function Home() {
    const { authorizationData } = useContext(AuthorizationDataContext);
    const [username, setUsername] = useState(null);

    useEffect(() => {
      async function getData() {
        const response = await getCurrentUser(authorizationData.token);
        setUsername(response.username);
      }
      getData();
    }, []);

    return (
      <div className="h-full w-full flex flex-col justify-center dark:home-background-animated-dark home-background-animated">
        {username && (
          <>
            <p className="ml-[35%] font-bold mb-2 text-3xl appear">Welcome,</p>
            <p className="ml-[35%] font-bold text-6xl appear">{username}</p>
          </>
        )}
      </div>
    );
  }
  function switchResult() {
    switch (mainDisplay[0]) {
      case 'friends':
        return <FriendsDisplay setMainDisplay={setMainDisplay} />;
      case 'chat':
        return (
          <ChatDisplay chat={mainDisplay[1]} setMainDisplay={setMainDisplay} />
        );
      case 'groups':
        return <GroupsDisplay setMainDisplay={setMainDisplay} />;
      default:
        return <Home />;
    }
  }

  const display = switchResult();
  return (
    <div className="bg-slate-50 relative dark:bg-slate-800 flex-1 rounded-tr-lg rounded-br-lg">
      {display}
    </div>
  );
}

export default Main;
