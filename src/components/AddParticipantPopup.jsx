import { useContext, useEffect, useState } from 'react';
import { addUserToChat, getAddableUsersToChat } from '../scripts/ChatApiCalls';
import { AuthorizationDataContext } from '../scripts/AuthorizationDataContext';

function AddParticipantPopup({ refreshParticipants, chat, close }) {
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

    return () => refreshParticipants();
  }, []);

  function Users() {
    const displayedUsers = users.map((user) => (
      <User key={user.id} user={user} />
    ));
    if (displayedUsers.length === 0) {
      return (
        <p className="text-lg text-center text-neutral-600 mt-6">
          Cannot add any friends.
        </p>
      );
    }
    return displayedUsers;
  }

  function User({ user }) {
    const [loader, setLoader] = useState(false);
    const [added, setAdded] = useState(false);
    async function addToChat() {
      setLoader(true);
      const response = await addUserToChat(
        authorizationData.token,
        chat.id,
        user.id
      );
      if (response.ok) {
        console.log('user added');
        setAdded(true);
      } else {
        console.log('error adding user');
      }
      setLoader(false);
    }
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
          <button
            disabled={loader || added}
            onClick={addToChat}
            className={`${
              added ? 'bg-sky-600' : 'bg-sky-500 hover:bg-sky-700'
            } w-[140px] rounded-lg whitespace-nowrap text-white py-1 px-2 flex items-center justify-center gap-2 transition `}
          >
            {loader ? (
              <div className="h-full w-full flex items-center justify-center ">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-300 animate-spin fill-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            ) : added ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="fill-white w-5"
                >
                  <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                </svg>
                Added
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="fill-white w-5"
                >
                  <path d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z" />
                </svg>
                Add to chat
              </>
            )}
          </button>
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
