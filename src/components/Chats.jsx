import { AuthorizationDataContext } from '../scripts/AuthorizationDataContext';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import { useContext } from 'react';
TimeAgo.addDefaultLocale(en);

function Chats({ chats, setMainDisplay }) {
  const { authorizationData } = useContext(AuthorizationDataContext);

  const userChats = chats.map((chat, index) => (
    <Chat
      key={index}
      userID={authorizationData.resource_owner.id}
      chat={chat}
      setMainDisplay={setMainDisplay}
    />
  ));
  return (
    <>
      <div className="flex justify-center">
        <label
          htmlFor="search"
          className="p-1 pl-3 flex justify-center items-center bg-slate-200 dark:bg-slate-600 rounded-tl-lg rounded-bl-lg mt-1 ml-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 fill-neutral-500 dark:fill-white"
          >
            <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
          </svg>
        </label>
        <input
          name="search"
          id="search"
          type="text"
          placeholder="Search.."
          className="bg-slate-200 outline-none dark:placeholder:text-white dark:text-white dark:bg-slate-600 placeholder:text-neutral-500 text-neutral-800 w-full p-1 pl-3 rounded-tr-lg rounded-br-lg mt-1 mr-3"
        />
      </div>
      <div className="overflow-y-scroll flex-1 chat-scrollbar">{userChats}</div>
    </>
  );
}

function Chat({ userID, chat, setMainDisplay }) {
  const timeAgo = new TimeAgo('en-US');
  return (
    <div
      className="bg-slate-100 m-1 rounded-sm border flex dark:hover:bg-slate-700 dark:bg-slate-800 dark:border-slate-700 border-slate-200 p-1 relative hover:bg-slate-200 cursor-pointer transition"
      onClick={() => setMainDisplay(['chat', chat])}
    >
      {chat.image ? (
        <div className="relative flex align-middle justify-center items-center w-[48px] h-[48px]">
          <div className="bg-slate-300 dark:bg-slate-900 animate-pulse -z-0 w-[40px] h-[40px] rounded-full absolute"></div>
          <img
            src={chat.image}
            alt="profile picture"
            className="w-[40px] h-[40px] rounded-full z-0"
          />
        </div>
      ) : chat.type === 'direct' ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="fill-sky-500 w-12"
        >
          <path d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="fill-sky-500 w-12"
        >
          <path d="M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M15.6,8.34C16.67,8.34 17.53,9.2 17.53,10.27C17.53,11.34 16.67,12.2 15.6,12.2A1.93,1.93 0 0,1 13.67,10.27C13.66,9.2 14.53,8.34 15.6,8.34M9.6,6.76C10.9,6.76 11.96,7.82 11.96,9.12C11.96,10.42 10.9,11.5 9.6,11.5C8.3,11.5 7.24,10.42 7.24,9.12C7.24,7.81 8.29,6.76 9.6,6.76M9.6,15.89V19.64C7.2,18.89 5.3,17.04 4.46,14.68C5.5,13.56 8.13,13 9.6,13C10.13,13 10.8,13.07 11.5,13.21C9.86,14.08 9.6,15.23 9.6,15.89M12,20C11.72,20 11.46,20 11.2,19.96V15.89C11.2,14.47 14.14,13.76 15.6,13.76C16.67,13.76 18.5,14.15 19.44,14.91C18.27,17.88 15.38,20 12,20Z" />
        </svg>
      )}
      {chat.last_message && (
        <p className="absolute top-0 right-0 text-xs text-neutral-600">
          {timeAgo.format(new Date(chat.last_message.created_at))}
        </p>
      )}

      <div>
        <h1 className="font-semibold">{chat.name}</h1>
        <div className="flex text-neutral-600">
          {chat.last_message && chat.type !== 'direct' && (
            <p className="font-semibold mr-2">
              {userID === chat.last_message.user_id
                ? 'You'
                : chat.last_message.author}
              :
            </p>
          )}
          <p>
            {chat.last_message ? chat.last_message.body : 'No messages yet.'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Chats;
