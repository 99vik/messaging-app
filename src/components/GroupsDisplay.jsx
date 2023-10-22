import { useContext, useEffect, useRef, useState } from 'react';
import { AuthorizationDataContext } from '../scripts/AuthorizationDataContext';
import {
  createChat,
  fetchAllPublicChats,
  joinPublicChat,
} from '../scripts/ChatApiCalls';
import CloseIcon from '../assets/icons/CloseIcon.svg';

function GroupsDisplay() {
  const [loader, setLoader] = useState(true);
  const [publicChats, setPublicChats] = useState(null);
  const [createForm, setCreateForm] = useState(false);
  const { authorizationData } = useContext(AuthorizationDataContext);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchAllPublicChats(authorizationData.token);
      setPublicChats(data);
      setLoader(false);
    }
    fetchData();
  }, []);

  if (createForm) {
    return (
      <CreateChatForm
        token={authorizationData.token}
        close={() => setCreateForm(false)}
      />
    );
  }

  return (
    <div className="h-full w-full">
      <div className="flex justify-between items-center px-5 pt-4 pb-2">
        <p className="text-3xl text-neutral-500 dark:text-neutral-300">
          Find public chats
        </p>
        <button
          onClick={() => setCreateForm(true)}
          className="flex justify-center items-center gap-3 font-semibold hover:bg-sky-700 transition bg-sky-500 text-white py-2 px-4 rounded-xl"
        >
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
      {loader ? (
        <h1>Loading</h1>
      ) : (
        <PublicChats
          publicChats={publicChats}
          token={authorizationData.token}
        />
      )}
    </div>
  );
}

function PublicChats({ publicChats, token }) {
  async function joinChat(id) {
    const response = await joinPublicChat(token, id);
    if (response.ok) {
      console.log('added to chat');
    } else {
      console.log('error adding to chat');
    }
  }

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
        <button
          onClick={() => joinChat(chat.id)}
          className="bg-sky-500 hover:bg-sky-600 transition font-semibold h-fit px-8 py-1 rounded-lg text-white"
        >
          Join
        </button>
      </div>
    );
  });

  return chatsElement;
}

function CreateChatForm({ close, token }) {
  const nameRef = useRef(0);
  const typeRef = useRef(0);

  async function handleSubmit(e) {
    e.preventDefault();
    const name = nameRef.current.value;
    const type = typeRef.current.value;

    const response = await createChat(token, name, type);
    if (response.ok) {
      console.log('chat created');
      console.log(await response.json());
    } else {
      console.log('error');
      console.log(await response.json());
    }
  }

  return (
    <div className="relative w-full h-full">
      <div className="flex justify-between items-center px-5 pt-4 pb-2">
        <p className="text-3xl text-neutral-500 dark:text-neutral-300">
          Create new chat
        </p>
      </div>
      <div className="px-5">
        <div className="h-[1px] w-full bg-slate-300 dark:bg-slate-600"></div>
      </div>
      <button
        onClick={close}
        className="absolute top-2 right-2 hover:scale-105 transition"
      >
        <img src={CloseIcon} alt="close" className="w-11" />
      </button>
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-[280px] mx-5 mt-10 flex flex-col gap-4"
        >
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sky-600 font-semibold">
              Name
            </label>
            <input
              ref={nameRef}
              type="text"
              name="name"
              id="name"
              className="outline-none border p-1 rounded border-slate-400 dark:bg-slate-200 dark:text-black focus:border-sky-400 transition"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sky-600 font-semibold">
              Type
            </label>
            <select
              ref={typeRef}
              name="type"
              id="type"
              className="outline-none border p-1 rounded border-slate-400 dark:text-black dark:bg-slate-200 focus:border-sky-400 transition "
            >
              <option
                className="text-sm text-neutral-500 bg-slate-100"
                value="null"
              >
                Select type
              </option>
              <option value="private" className="bg-slate-100">
                Private
              </option>
              <option value="public" className="bg-slate-100">
                Public
              </option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-sky-500 hover:bg-sky-600 transition text-white rounded-lg py-1 mt-4"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default GroupsDisplay;
