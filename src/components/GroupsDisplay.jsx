import { useContext, useEffect, useRef, useState } from 'react';
import { AuthorizationDataContext } from '../scripts/AuthorizationDataContext';
import {
  createChat,
  fetchAllPublicChats,
  joinPublicChat,
} from '../scripts/ChatApiCalls';
import CloseIcon from '../assets/icons/CloseIcon.svg';

function GroupsDisplay({ setMainDisplay }) {
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
        setMainDisplay={setMainDisplay}
        close={() => setCreateForm(false)}
      />
    );
  }

  return (
    <div className="h-full w-full flex flex-col">
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
        <Loader />
      ) : (
        <PublicChats
          publicChats={publicChats}
          setMainDisplay={setMainDisplay}
          token={authorizationData.token}
        />
      )}
    </div>
  );
}

function PublicChats({ publicChats, setMainDisplay, token }) {
  async function joinChat(id, resetLoader) {
    const response = await joinPublicChat(token, id);
    if (response.ok) {
      const chat = await response.json();
      console.log('added to chat');
      setMainDisplay(['chat', chat]);
    } else {
      console.log('error adding to chat');
    }
    resetLoader();
  }

  const chatsElement = publicChats.map((chat) => {
    const [loader, setLoader] = useState(false);

    function resetLoader() {
      setLoader(false);
    }

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
          disabled={loader}
          onClick={() => {
            setLoader(true);
            joinChat(chat.id, resetLoader);
          }}
          className="bg-sky-500 hover:bg-sky-600 transition font-semibold h-fit px-8 py-1 rounded-lg text-white"
        >
          {loader ? (
            <svg
              aria-hidden="true"
              className="w-[30px] h-6 -py-2 text-gray-300 animate-spin fill-white"
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
          ) : (
            'Join'
          )}
        </button>
      </div>
    );
  });

  return <div className="overflow-y-scroll">{chatsElement}</div>;
}

function CreateChatForm({ close, setMainDisplay, token }) {
  const [loader, setLoader] = useState(false);
  const nameRef = useRef(0);
  const typeRef = useRef(0);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoader(true);
    const name = nameRef.current.value;
    const type = typeRef.current.value;

    const response = await createChat(token, name, type);
    if (response.ok) {
      const chat = await response.json();
      setMainDisplay(['chat', chat]);
    } else {
      console.log('error');
      console.log(await response.json());
    }
    setLoader(false);
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
            disabled={loader}
            type="submit"
            className="bg-sky-500 hover:bg-sky-600 transition flex justify-center text-white rounded-lg py-1 mt-4"
          >
            {loader ? (
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-center text-gray-300 animate-spin fill-white"
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
            ) : (
              'Create'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

function Loader() {
  return (
    <div className="flex flex-1 justify-center items-center gap-2">
      <div className="h-6 w-6 bg-sky-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-6 w-6 bg-sky-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-6 w-6 bg-sky-500 rounded-full animate-bounce"></div>
    </div>
  );
}

export default GroupsDisplay;
