import { useContext, useEffect, useState } from 'react';
import { getAddableUsersToChat } from '../scripts/ChatApiCalls';
import { AuthorizationDataContext } from '../scripts/AuthorizationDataContext';

function AddParticipantPopup({ chat, close }) {
  const [loader, setLoader] = useState(true);
  const [users, setUsers] = useState(null);
  const { authorizationData } = useContext(AuthorizationDataContext);

  useEffect(() => {
    async function getUsers() {
      const response = await getAddableUsersToChat(
        authorizationData.token,
        chat.id
      );
      setLoader(false);
      setUsers(response);
    }
    getUsers();
  }, []);

  function Users() {
    const displayedUsers = users.map((user) => (
      <User key={user.id} user={user} />
    ));
    return displayedUsers;
  }

  function User({ user }) {
    return (
      <div className="bg-slate-200 dark:bg-slate-700 dark:border-slate-600 border border-slate-300 rounded-lg py-2 px-3 flex gap-4 justify-around items-center w-full">
        <div>
          {user.image ? (
            <div className="relative flex align-middle justify-center">
              <div className="bg-slate-400 dark:bg-slate-900 animate-pulse z-0 w-[50px] h-[50px] rounded-full absolute"></div>
              <img
                src={user.image}
                alt="profile picture"
                className="w-[50px] h-[50px] rounded-full z-0"
              />
            </div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-[60px] fill-sky-500"
            >
              <path d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
            </svg>
          )}
        </div>
        <div>
          <p className="font-semibold text-md mb-2 text-center">
            {user.username}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        onClick={close}
        className="h-screen w-screen -translate-x-[360px] absolute z-30 bg-gray-400/30 dark:bg-gray-900/30 appear-fast"
      ></div>
      <div className="absolute px-4 user-profile rounded-lg right-0 z-40 bg-slate-100 dark:bg-slate-900 border-l flex flex-col border-slate-200 dark:border-slate-700 w-[360px] h-full transition-all">
        <button onClick={close} className="absolute top-1 left-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="fill-sky-500 w-12"
          >
            <title>close</title>
            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
          </svg>
        </button>

        <h1 className="text-center mt-4 text-neutral-600 dark:text-neutral-300 text-3xl">
          Add participant
        </h1>
        <div className="h-[1px] mt-1 mx-4 bg-neutral-300 dark:bg-slate-700"></div>
        <div className="flex flex-col flex-1 gap-3 px-8 py-4">
          {loader ? (
            <div className="flex flex-1 justify-center items-center gap-2">
              <div className="h-6 w-6 bg-sky-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="h-6 w-6 bg-sky-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="h-6 w-6 bg-sky-500 rounded-full animate-bounce"></div>
            </div>
          ) : (
            <Users />
          )}
        </div>
      </div>
    </>
  );
}

export default AddParticipantPopup;
