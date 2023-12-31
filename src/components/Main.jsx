import FriendsDisplay from './FriendsDisplay';
import ChatDisplay from './ChatDisplay';
import GroupsDisplay from './GroupsDisplay';
import { AuthorizationDataContext } from '../scripts/AuthorizationDataContext';
import { useContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../scripts/ProfileApiCalls';

function Main({ setMainDisplay, mainDisplay, refreshChats }) {
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
      <div className="h-full w-full max-[850px]:z-0 flex flex-col justify-center dark:home-background-animated-dark home-background-animated">
        {username && (
          <>
            <p className="ml-[50%] -translate-x-[40%] font-bold mb-2 text-3xl appear">
              Welcome,
            </p>
            <p className="ml-[50%] -translate-x-[40%] font-bold text-6xl appear">
              {username}
            </p>
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
          <ChatDisplay
            refreshChats={refreshChats}
            chat={mainDisplay[1]}
            setMainDisplay={setMainDisplay}
          />
        );
      case 'groups':
        return <GroupsDisplay setMainDisplay={setMainDisplay} />;
      default:
        return <Home />;
    }
  }

  const display = switchResult();
  return (
    <div className="bg-slate-50 max-[850px]:-mr-[12px] max-[850px]:overflow-y-hidden relative dark:bg-slate-800 flex-1 flex flex-col rounded-tr-lg rounded-br-lg">
      {display}
    </div>
  );
}

export default Main;
