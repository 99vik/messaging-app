import { useContext, useEffect, useState } from 'react';
import { AuthorizationDataContext } from '../scripts/AuthorizationDataContext';
import {
  acceptFriendRequest,
  cancelFriendRequest,
  checkFriendshipStatus,
  removeFriend,
  sendFriendRequest,
} from '../scripts/FriendshipsApiCalls';
import { getDirectChat } from '../scripts/ChatApiCalls';

function ParticipantList({ close }) {
  const [friendshipStatus, setFriendshipStatus] = useState(null);
  const [friendshipLoader, setFrienshipLoader] = useState(true);
  const { authorizationData } = useContext(AuthorizationDataContext);

  return (
    <>
      <div
        onClick={close}
        className="h-screen w-screen -translate-x-[360px] absolute z-30 bg-gray-400/30 dark:bg-gray-900/30 appear-fast"
      ></div>
      <div className="absolute user-profile rounded-lg right-0 z-40 bg-slate-100 dark:bg-slate-900 border-r flex flex-col border-slate-200 dark:border-slate-700 w-[360px] h-full transition-all">
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
      </div>
    </>
  );
}

export default ParticipantList;
