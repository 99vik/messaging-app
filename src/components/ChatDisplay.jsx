import { useContext, useEffect, useRef, useState } from 'react';
import { AuthorizationDataContext } from '../scripts/AuthorizationDataContext';
import { GetChatMessages, SendMessage } from '../scripts/MessageApiCalls';

function ChatDisplay({ chat }) {
  const [messages, setMessages] = useState(null);
  const [loader, setLoader] = useState(true);
  const { authorizationData } = useContext(AuthorizationDataContext);

  useEffect(() => {
    async function getMessages() {
      const response = await GetChatMessages(chat.id, authorizationData.token);
      if (response.ok) {
        setMessages(await response.json());
      } else {
        console.log('error');
      }
      setLoader(false);
    }
    setLoader(true);
    getMessages();
  }, [chat]);

  function Message({ message }) {
    return (
      <div
        className={`${
          authorizationData.resource_owner.id === message.user_id
            ? 'bg-sky-500 self-end'
            : 'bg-slate-500'
        } w-fit min-w-[200px] text-white p-2 rounded-lg`}
      >
        {authorizationData.resource_owner.id !== message.user_id && (
          <p className="">{message.username}</p>
        )}
        <p>{message.body}</p>
        <p>{message.created_at}</p>
      </div>
    );
  }

  function Messages() {
    const displayedMessages = messages.map((message, index) => (
      <Message key={index} message={message} />
    ));
    return (
      <div className="relative flex-1 flex flex-col justify-end gap-2 py-2 px-4 bg-gradient-to-r from-slate-100 to-sky-100">
        {displayedMessages}
      </div>
    );
  }

  function SendMessageInput() {
    const [loader, setLoader] = useState(false);
    const messageRef = useRef(0);

    async function sendMessage() {
      setLoader(true);
      const response = await SendMessage(
        authorizationData.token,
        messageRef.current.value,
        chat.id
      );
      if (!response.ok) {
        console.log(response);
      } else {
        messageRef.current.value = '';
      }
      setLoader(false);
    }

    return (
      <div className="flex bg-white py-3 px-4 gap-4">
        <input
          ref={messageRef}
          type="text"
          className="flex-1 rounded-full outline-none py-1 px-3 bg-slate-200 border border-slate-300"
        />
        <button
          disabled={loader}
          onClick={sendMessage}
          className="font-semibold w-[80px] hover:bg-sky-700 transition bg-sky-500 text-white py-1 px-4 rounded-lg"
        >
          {loader ? (
            <div className="h-full w-full flex items-center justify-center">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-300 animate-spin fill-white"
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
          ) : (
            'Send'
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex justify-between items-center px-5 pt-4 pb-2">
        <p className="text-3xl text-neutral-500 dark:text-neutral-300">
          {chat.name}
        </p>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-9 fill-sky-500 hover:fill-sky-700 transition"
          >
            <title>Settings</title>
            <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
          </svg>
        </button>
      </div>
      <div>
        <div className="h-[1px] w-full bg-slate-300 dark:bg-slate-600"></div>
      </div>
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="flex-1 flex flex-col-reverse overflow-y-scroll">
            <Messages />
          </div>
          <SendMessageInput />
        </>
      )}
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

export default ChatDisplay;
