import { useEffect, useRef, useState } from 'react';
import ProfileMenu from './ProfileMenu';
import Chats from './Chats';

function Sidebar({ user, refreshUser, logOut, chats, setMainDisplay }) {
  const [profileMenu, setProfileMenu] = useState(false);

  function toggleProfileMenu() {
    setProfileMenu(!profileMenu);
  }

  const [mobileShowChats, setMobileShowChats] = useState(false);

  return (
    <div
      className={`w-[360px] ${
        !mobileShowChats ? 'max-[850px]:h-full' : ''
      } max-[850px]:w-full max-[850px]:z-10 border-r-2 z-10 flex flex-col border-neutral-200 dark:border-slate-700 relative`}
    >
      {profileMenu && (
        <ProfileMenu
          refreshUser={refreshUser}
          data={user}
          toggleProfileMenu={toggleProfileMenu}
        />
      )}
      <TopMenu
        profileImage={user.image}
        setMainDisplay={setMainDisplay}
        toggleProfileMenu={toggleProfileMenu}
        logOut={logOut}
        setMobileShowChats={setMobileShowChats}
      />
      <button
        onClick={() => setMobileShowChats(!mobileShowChats)}
        className="min-[850px]:hidden bg-sky-500 rounded-lg py-2 my-1 mx-4 text-white font-semibold"
      >
        Show chats
      </button>
      <Chats
        chats={chats}
        setMainDisplay={setMainDisplay}
        mobileShowChats={mobileShowChats}
        setMobileShowChats={setMobileShowChats}
      />
    </div>
  );
}

function TopMenu({
  profileImage,
  setMainDisplay,
  toggleProfileMenu,
  logOut,
  setMobileShowChats = { setMobileShowChats },
}) {
  const [settingsPopup, setSettingsPopup] = useState(false);
  const settingsBtnRef = useRef(0);

  return (
    <div className="flex items-center justify-between border-b-2 border-neutral-200 dark:border-slate-700 px-3 py-2">
      <button onClick={toggleProfileMenu}>
        {profileImage ? (
          <div className="relative">
            <div className="bg-neutral-200 -z-10 animate-pulse transition rounded-full top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] h-[53px] w-[53px] absolute"></div>
            <img
              src={profileImage}
              className="w-[54px] h-[54px] m-[5.5px] rounded-full over:scale-105 transition"
              alt="profile picture"
            />
          </div>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-16 fill-sky-500 hover:scale-105 transition"
          >
            <title>Profile settings</title>
            <path d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
          </svg>
        )}
      </button>

      <div className="flex gap-4">
        <button
          onClick={() => {
            if (screen.width <= 850) setMobileShowChats(true);
            setMainDisplay(['friends']);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-9 fill-sky-500 hover:fill-sky-700 transition"
          >
            <title>Friends</title>
            <path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" />
          </svg>
        </button>
        <button
          onClick={() => {
            if (screen.width <= 850) setMobileShowChats(true);
            setMainDisplay(['groups']);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-9 fill-sky-500 hover:fill-sky-700 transition"
          >
            <title>Manage groups</title>
            <path d="M17,12V3A1,1 0 0,0 16,2H3A1,1 0 0,0 2,3V17L6,13H16A1,1 0 0,0 17,12M21,6H19V15H6V17A1,1 0 0,0 7,18H18L22,22V7A1,1 0 0,0 21,6Z" />
          </svg>
        </button>
        <div className="relative flex justify-center items-center">
          {settingsPopup && (
            <SettingsPopup
              settingsBtnRef={settingsBtnRef}
              logOut={logOut}
              close={() => setSettingsPopup(false)}
            />
          )}
          <button onClick={() => setSettingsPopup(!settingsPopup)}>
            <svg
              ref={settingsBtnRef}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-9 fill-sky-500 hover:fill-sky-700 transition"
            >
              <title>Settings</title>
              <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingsPopup({ settingsBtnRef, logOut, close }) {
  const settingsDiv = useRef(0);

  useEffect(() => {
    function listenForClick(e) {
      if (
        e.target === settingsDiv.current ||
        Array.from(settingsDiv.current.children).includes(e.target) ||
        e.target === settingsBtnRef.current ||
        e.target.parentNode === settingsBtnRef.current
      ) {
        return;
      }
      close();
    }
    document.addEventListener('click', listenForClick);

    return () => document.removeEventListener('click', listenForClick);
  }, []);

  function toggleDarkMode() {
    const documentSelector = document.documentElement;
    if (!documentSelector.classList.contains('dark')) {
      localStorage.theme = 'dark';
    } else {
      localStorage.removeItem('theme');
    }
    documentSelector.classList.toggle('dark');
  }

  return (
    <div
      ref={settingsDiv}
      className="absolute w-[220px] appear-fast bg-white dark:bg-slate-700 px-3 py-1 pb-2 -bottom-[250%] left-[100%] max-[850px]:-left-[220px] rounded-lg border border-sky-400 dark:border-sky-900 dark:shadow-[0_0_6px_3px_rgba(0,160,255,0.1)] shadow-[0_0_6px_3px_rgba(0,160,255,0.2)]"
    >
      <p className="text-sm text-neutral-500 dark:text-neutral-300 font-semibold mb-2">
        Settings
      </p>
      <div className="flex flex-col gap-2 items-start justify-center">
        <button
          className="bg-slate-700 hover:bg-slate-800 dark:text-black dark:bg-slate-100 dark:hover:bg-slate-300 transition py-1 px-2 rounded-lg flex items-center gap-2 text-white"
          onClick={() => {
            toggleDarkMode();
            close();
          }}
        >
          {document.documentElement.classList.contains('dark') ? (
            <>
              Light mode
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 fill-black"
              >
                <path d="M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z" />
              </svg>
            </>
          ) : (
            <>
              Dark mode
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 fill-white"
              >
                <path d="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z" />
              </svg>
            </>
          )}
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-900 transition py-1 px-2 rounded-lg text-white"
          onClick={logOut}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
