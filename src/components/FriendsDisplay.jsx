import { useState } from 'react';
import CloseIcon from '../assets/icons/CloseIcon.svg';

function FriendsDisplay() {
  const [findFriends, setFindFriends] = useState(false);

  if (findFriends) {
    return <FindFriends close={() => setFindFriends(false)} />;
  }

  return (
    <div className="h-full w-full">
      <div className="flex justify-between items-center px-5 pt-4 pb-2">
        <p className="text-3xl text-neutral-500 dark:text-neutral-300">
          Friends
        </p>
        <button
          className="flex justify-center items-center gap-3 font-semibold hover:bg-sky-700 transition bg-sky-500 text-white py-2 px-4 rounded-xl"
          onClick={() => setFindFriends(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 fill-white"
          >
            <path d="M19 17V19H7V17S7 13 13 13 19 17 19 17M16 8A3 3 0 1 0 13 11A3 3 0 0 0 16 8M19.2 13.06A5.6 5.6 0 0 1 21 17V19H24V17S24 13.55 19.2 13.06M18 5A2.91 2.91 0 0 0 17.11 5.14A5 5 0 0 1 17.11 10.86A2.91 2.91 0 0 0 18 11A3 3 0 0 0 18 5M8 10H5V7H3V10H0V12H3V15H5V12H8Z" />
          </svg>
          Find friends
        </button>
      </div>
      <div className="px-5">
        <div className="h-[1px] w-full bg-slate-300 dark:bg-slate-600"></div>
      </div>
    </div>
  );
}

function FindFriends({ close }) {
  return (
    <div className="relative w-full h-full">
      <div className="flex justify-between items-center px-5 pt-4 pb-2">
        <p className="text-3xl text-neutral-500 dark:text-neutral-300">
          Find new friends
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
    </div>
  );
}

export default FriendsDisplay;
