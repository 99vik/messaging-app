function Chats({ chats, setMainDisplay }) {
  const userChat = chats.map((chat, index) => (
    <Chat key={index} chat={chat} setMainDisplay={setMainDisplay} />
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
      {userChat}
    </>
  );
}

function Chat({ chat, setMainDisplay }) {
  return (
    <div
      className="bg-slate-100 m-1 rounded-sm border dark:hover:bg-slate-700 dark:bg-slate-800 dark:border-slate-700 border-slate-200 p-1 hover:bg-slate-200 cursor-pointer transition"
      onClick={() => setMainDisplay('chat')}
    >
      <h1>{chat.name}</h1>
      <h1>{chat.type}</h1>
    </div>
  );
}

export default Chats;
