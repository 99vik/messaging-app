import { useContext, useEffect, useState } from 'react';
import { AuthorizationDataContext } from '../scripts/AuthorizationDataContext';
import { fetchAllPublicChats } from '../scripts/FetchData';

function GroupsDisplay() {
  const [loader, setLoader] = useState(true);
  const [publicChats, setPublicChats] = useState(null);
  const { authorizationData } = useContext(AuthorizationDataContext);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchAllPublicChats(authorizationData.token);
      setPublicChats(data);
      setLoader(false);
    }
    fetchData();
  }, []);

  return (
    <div className="h-full w-full">
      <div className="flex justify-between items-center px-5 pt-4 pb-2">
        <p className="text-3xl text-neutral-500 dark:text-neutral-300">
          Find public chats
        </p>
        <button className="flex justify-center items-center gap-3 font-semibold hover:bg-sky-700 transition bg-sky-500 text-white py-2 px-4 rounded-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 fill-white"
          >
            <path d="M12 3C17.5 3 22 6.58 22 11C22 11.58 21.92 12.14 21.78 12.68C21.19 12.38 20.55 12.16 19.88 12.06C19.96 11.72 20 11.36 20 11C20 7.69 16.42 5 12 5C7.58 5 4 7.69 4 11C4 14.31 7.58 17 12 17L13.09 16.95L13 18L13.08 18.95L12 19C10.81 19 9.62 18.83 8.47 18.5C6.64 20 4.37 20.89 2 21C4.33 18.67 4.75 17.1 4.75 16.5C3.06 15.17 2.05 13.15 2 11C2 6.58 6.5 3 12 3M18 14H20V17H23V19H20V22H18V19H15V17H18V14Z" />
          </svg>
          Create new chat
        </button>
      </div>
      <div className="px-5">
        <div className="h-[1px] w-full bg-slate-300 dark:bg-slate-600"></div>
      </div>
      {loader ? <h1>Loading</h1> : <PublicChats publicChats={publicChats} />}
    </div>
  );
}

function PublicChats({ publicChats }) {
  const chatsElement = publicChats.map((chat) => {
    return (
      <div
        key={chat.id}
        className="flex items-center justify-between px-4 dark:bg-slate-700 transition bg-slate-200 border-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 cursor-pointer border dark:border-slate-600 my-2 mx-5 p-1 rounded"
      >
        <div>
          <p>{chat.name}</p>
          <p>{chat.type}</p>
        </div>
        <button className="bg-sky-500 hover:bg-sky-600 transition font-semibold h-fit px-8 py-1 rounded-lg text-white">
          Join
        </button>
      </div>
    );
  });

  return chatsElement;
}

export default GroupsDisplay;
