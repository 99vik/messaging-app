import { useContext, useEffect, useRef, useState } from 'react';
import { AuthorizationDataContext } from '../scripts/AuthorizationDataContext';
import { GetChatMessages, SendMessage } from '../scripts/MessageApiCalls';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import UserProfile from './UserProfile';
import { getChatParticipants, leaveChat } from '../scripts/ChatApiCalls';
import ParticipantList from './ParticipantList';
import AddParticipantPopup from './AddParticipantPopup';
import ChatSettings from './ChatSettings';
TimeAgo.addDefaultLocale(en);

function ChatDisplay({ chat, setMainDisplay }) {
  const [userProfile, setUserProfile] = useState(null);
  const [participantList, setParticipantList] = useState(false);
  const [chatParticipants, setChatParticipants] = useState(null);
  const [chatSettings, setChatSettings] = useState(false);
  const [addParticipantPopup, setAddParticipantPopup] = useState(false);
  const [messages, setMessages] = useState(null);
  const [chatOptions, setChatOptions] = useState(false);
  const [loader, setLoader] = useState(true);
  const { authorizationData } = useContext(AuthorizationDataContext);
  const optionsBtnRef = useRef(0);
  const messagesRef = useRef(0);

  useEffect(() => {
    const chatSocket = new WebSocket('ws://localhost:3000/cable');
    chatSocket.onopen = () => {
      chatSocket.send(
        JSON.stringify({
          command: 'subscribe',
          identifier: JSON.stringify({
            chat_id: chat.id,
            channel: 'ChatChannel',
          }),
        })
      );
    };
    chatSocket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (
        data.type === 'ping' ||
        data.type === 'welcome' ||
        data.type === 'confirm_subscription'
      )
        return;
      messagesRef.current = [...messagesRef.current, data.message];
      setMessages(messagesRef.current);
    };

    async function getMessages() {
      const response = await GetChatMessages(chat.id, authorizationData.token);
      if (response.ok) {
        const messagesData = await response.json();
        setMessages(messagesData);
        messagesRef.current = messagesData;
      } else {
        console.log('error');
      }
      setLoader(false);
    }

    async function getParticipants() {
      const response = await getChatParticipants(
        authorizationData.token,
        chat.id
      );
      setChatParticipants(response);
    }
    setLoader(true);
    getMessages();
    if (chat.type !== 'direct') {
      getParticipants();
    }
    return () => chatSocket.close();
  }, [chat]);

  async function refreshParticipants() {
    const response = await getChatParticipants(
      authorizationData.token,
      chat.id
    );
    setChatParticipants(response);
  }

  function toggleOptions() {
    setChatOptions(!chatOptions);
  }

  async function chatLeave() {
    const response = await leaveChat(authorizationData.token, chat.id);
    setMainDisplay([]);
  }

  function Options({ optionsBtnRef, close }) {
    const optionsDiv = useRef(0);

    useEffect(() => {
      function listenForClick(e) {
        if (
          e.target === optionsDiv.current ||
          Array.from(optionsDiv.current.children).includes(e.target) ||
          e.target === optionsBtnRef.current ||
          e.target.parentNode === optionsBtnRef.current
        ) {
          return;
        }
        close();
      }
      document.addEventListener('click', listenForClick);

      return () => document.removeEventListener('click', listenForClick);
    }, []);

    return (
      <div
        ref={optionsDiv}
        className="absolute flex flex-col items-end gap-2 w-[200px] z-50 appear-fast bg-white dark:bg-slate-700 px-3 py-1 pb-2 -left-[200px] top-[15px] rounded-lg border border-sky-400 dark:border-sky-900 dark:shadow-[0_0_6px_3px_rgba(0,160,255,0.1)] shadow-[0_0_6px_3px_rgba(0,160,255,0.2)]"
      >
        <p className="text-sm text-neutral-500 dark:text-neutral-300 font-semibold">
          Options
        </p>
        <button
          onClick={() => setParticipantList(true)}
          className="bg-sky-500 w-fit flex items-center justify-center gap-2 hover:bg-sky-700 transition py-1 px-2 rounded-lg text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="fill-white w-5"
          >
            <path d="M12,5A3.5,3.5 0 0,0 8.5,8.5A3.5,3.5 0 0,0 12,12A3.5,3.5 0 0,0 15.5,8.5A3.5,3.5 0 0,0 12,5M12,7A1.5,1.5 0 0,1 13.5,8.5A1.5,1.5 0 0,1 12,10A1.5,1.5 0 0,1 10.5,8.5A1.5,1.5 0 0,1 12,7M5.5,8A2.5,2.5 0 0,0 3,10.5C3,11.44 3.53,12.25 4.29,12.68C4.65,12.88 5.06,13 5.5,13C5.94,13 6.35,12.88 6.71,12.68C7.08,12.47 7.39,12.17 7.62,11.81C6.89,10.86 6.5,9.7 6.5,8.5C6.5,8.41 6.5,8.31 6.5,8.22C6.2,8.08 5.86,8 5.5,8M18.5,8C18.14,8 17.8,8.08 17.5,8.22C17.5,8.31 17.5,8.41 17.5,8.5C17.5,9.7 17.11,10.86 16.38,11.81C16.5,12 16.63,12.15 16.78,12.3C16.94,12.45 17.1,12.58 17.29,12.68C17.65,12.88 18.06,13 18.5,13C18.94,13 19.35,12.88 19.71,12.68C20.47,12.25 21,11.44 21,10.5A2.5,2.5 0 0,0 18.5,8M12,14C9.66,14 5,15.17 5,17.5V19H19V17.5C19,15.17 14.34,14 12,14M4.71,14.55C2.78,14.78 0,15.76 0,17.5V19H3V17.07C3,16.06 3.69,15.22 4.71,14.55M19.29,14.55C20.31,15.22 21,16.06 21,17.07V19H24V17.5C24,15.76 21.22,14.78 19.29,14.55M12,16C13.53,16 15.24,16.5 16.23,17H7.77C8.76,16.5 10.47,16 12,16Z" />
          </svg>
          Participants
        </button>
        {chat.admin_id !== authorizationData.resource_owner.id ? (
          <>
            <button
              onClick={chatLeave}
              className="bg-red-500 w-fit hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-900 transition py-1 px-2 rounded-lg text-white"
            >
              Leave chat
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setAddParticipantPopup(true)}
              className="bg-sky-500 w-fit flex items-center justify-center gap-2 hover:bg-sky-700 transition py-1 px-2 rounded-lg text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="fill-white w-5"
              >
                <path d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z" />
              </svg>
              Add participant
            </button>
            <button
              onClick={() => setChatSettings(true)}
              className="bg-neutral-600 w-fit flex items-center justify-center gap-2 hover:bg-neutral-700 dark:bg-red-700 dark:hover:bg-red-900 transition py-1 px-2 rounded-lg text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="fill-white w-5"
              >
                <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
              </svg>
              Edit chat
            </button>
          </>
        )}
      </div>
    );
  }

  function Message({ message }) {
    const timeAgo = new TimeAgo('en-US');
    const messageDate = new Date(message.created_at);
    const difference = timeAgo.format(messageDate);
    return (
      <div
        className={`flex ${
          authorizationData.resource_owner.id === message.user_id
            ? 'justify-end'
            : 'justify-start'
        }`}
      >
        {authorizationData.resource_owner.id !== message.user_id && (
          <div
            className="hover:opacity-70 transition cursor-pointer"
            onClick={() => setUserProfile(message.user)}
          >
            {message.user.image ? (
              <div className="flex items-center p-[4px] -ml-2 mr-1 justify-center relative">
                <div className="w-[40px] h-[40px] rounded-full absolute bg-slate-400 animate-pulse -z-0"></div>
                <img
                  src={message.user.image}
                  className="w-[40px] h-[40px] rounded-full z-10"
                  alt="profile picture"
                />
              </div>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-12 -ml-2 fill-sky-500 mr-1"
              >
                <path d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
              </svg>
            )}
          </div>
        )}
        <div
          className={`${
            authorizationData.resource_owner.id === message.user_id
              ? 'bg-sky-500'
              : 'bg-slate-500'
          } w-fit min-w-[200px] text-white p-2 rounded-lg`}
        >
          {authorizationData.resource_owner.id !== message.user_id && (
            <p
              className="font-semibold mb-1 text-sky-100 hover:opacity-70 transition cursor-pointer"
              onClick={() => setUserProfile(message.user)}
            >
              {message.user.username}
            </p>
          )}
          <p>{message.body}</p>
          <p className="text-sm text-end -mb-1 -mr-1 text-gray-200">
            {difference}
          </p>
        </div>
      </div>
    );
  }

  function Messages() {
    const displayedMessages = messages.map((message, index) => (
      <Message key={index} message={message} />
    ));
    return (
      <div className="relative flex-1 flex flex-col justify-end gap-3 py-2 px-4 bg-gradient-to-r from-slate-200 to-sky-200 dark:from-slate-950 dark:to-sky-950">
        {displayedMessages.length === 0 ? (
          <p className="self-center font-semibold text-lg absolute top-[50%]">
            No messages.
          </p>
        ) : (
          displayedMessages
        )}
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
        console.log('error sending message');
        console.log(response);
      }
      setLoader(false);
    }

    return (
      <div className="flex bg-slate-50 dark:bg-slate-800 py-3 px-4 gap-4 dark:border-t dark:border-slate-700">
        <input
          ref={messageRef}
          type="text"
          className="flex-1 rounded-full outline-none py-1 px-3 dark:bg-slate-300 dark:text-black bg-slate-200 border border-slate-300 dark:border-slate-950 transition focus:border-sky-300 dark:focus:border-sky-300"
        />
        <button
          disabled={loader}
          onClick={sendMessage}
          className="font-semibold w-[80px] hover:bg-sky-700 transition bg-sky-500 text-white py-1 px-4 rounded-lg"
        >
          {loader ? (
            <div className="h-full w-full flex items-center justify-center ">
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

  if (chatSettings) {
    return <ChatSettings chat={chat} close={() => setChatSettings(false)} />;
  }

  return (
    <div className="h-full w-full flex flex-col relative">
      {addParticipantPopup && (
        <>
          <AddParticipantPopup
            refreshParticipants={refreshParticipants}
            chat={chat}
            close={() => setAddParticipantPopup(false)}
          />
        </>
      )}
      {participantList && (
        <>
          <ParticipantList
            chatID={chat.id}
            setUserProfile={setUserProfile}
            participants={chatParticipants}
            refreshParticipants={refreshParticipants}
            close={() => setParticipantList(false)}
            admin={authorizationData.resource_owner.id === chat.admin_id}
          />
        </>
      )}
      {userProfile && (
        <UserProfile
          setMainDisplay={setMainDisplay}
          profile={userProfile}
          close={() => setUserProfile(null)}
        />
      )}
      <div className="flex justify-between items-center px-5 py-2">
        <div className="flex justify-center items-center gap-2">
          {chat.image ? (
            <div className="relative flex align-middle justify-center items-center w-[64px] h-[64px]">
              <div className="bg-slate-400 dark:bg-slate-900 animate-pulse -z-0 w-[53.5px] h-[53.5px] rounded-full absolute"></div>
              <img
                src={chat.image}
                alt="profile picture"
                className="w-[53.5px] h-[53.5px] rounded-full z-0"
              />
            </div>
          ) : chat.type === 'direct' ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="fill-sky-500 w-16"
            >
              <path d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="fill-sky-500 w-16"
            >
              <path d="M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M15.6,8.34C16.67,8.34 17.53,9.2 17.53,10.27C17.53,11.34 16.67,12.2 15.6,12.2A1.93,1.93 0 0,1 13.67,10.27C13.66,9.2 14.53,8.34 15.6,8.34M9.6,6.76C10.9,6.76 11.96,7.82 11.96,9.12C11.96,10.42 10.9,11.5 9.6,11.5C8.3,11.5 7.24,10.42 7.24,9.12C7.24,7.81 8.29,6.76 9.6,6.76M9.6,15.89V19.64C7.2,18.89 5.3,17.04 4.46,14.68C5.5,13.56 8.13,13 9.6,13C10.13,13 10.8,13.07 11.5,13.21C9.86,14.08 9.6,15.23 9.6,15.89M12,20C11.72,20 11.46,20 11.2,19.96V15.89C11.2,14.47 14.14,13.76 15.6,13.76C16.67,13.76 18.5,14.15 19.44,14.91C18.27,17.88 15.38,20 12,20Z" />
            </svg>
          )}
          <p className="text-3xl text-neutral-500 dark:text-neutral-300">
            {chat.name}
          </p>
        </div>
        <div className="relative">
          {chatOptions && (
            <Options
              optionsBtnRef={optionsBtnRef}
              close={() => setChatOptions(false)}
            />
          )}
          {chat.type !== 'direct' && (
            <button onClick={toggleOptions}>
              <svg
                ref={optionsBtnRef}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-9 fill-sky-500 hover:fill-sky-700 transition"
              >
                <title>Settings</title>
                <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
              </svg>
            </button>
          )}
        </div>
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
    <div className="flex flex-1 justify-center items-center gap-2 bg-gradient-to-r from-slate-200 to-sky-200 dark:from-slate-950 dark:to-sky-950">
      <div className="h-6 w-6 bg-sky-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-6 w-6 bg-sky-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-6 w-6 bg-sky-500 rounded-full animate-bounce"></div>
    </div>
  );
}

export default ChatDisplay;
