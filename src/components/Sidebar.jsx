import { useState } from 'react';
import ProfileMenu from './ProfileMenu';

function Sidebar({ logOut, data, setMainDisplay }) {
  const [profileMenu, setProfileMenu] = useState(false);
  function toggleProfileMenu() {
    setProfileMenu(!profileMenu);
  }
  return (
    <div className="w-[360px] border-r-2 border-neutral-200 dark:border-slate-700 relative ">
      {profileMenu && <ProfileMenu toggleProfileMenu={toggleProfileMenu} />}
      <TopMenu
        setMainDisplay={setMainDisplay}
        toggleProfileMenu={toggleProfileMenu}
        logOut={logOut}
      />
      {data.map((chat, index) => {
        return (
          <div key={index} onClick={() => setMainDisplay('chat')}>
            <h1>{chat.name}</h1>
            <h1>{chat.type}</h1>
          </div>
        );
      })}
    </div>
  );
}

function TopMenu({ setMainDisplay, toggleProfileMenu, logOut }) {
  const [settingsPopup, setSettingsPopup] = useState(false);

  return (
    <div className="flex items-center justify-between border-b-2 border-neutral-200 dark:border-slate-700 px-3 py-2">
      <button onClick={toggleProfileMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-16 fill-sky-500 hover:scale-105 transition"
        >
          <title>Profile settings</title>
          <path d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
        </svg>
      </button>

      <div className="flex gap-4">
        <button onClick={() => setMainDisplay('friends')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-9 fill-sky-500 hover:fill-sky-700 transition"
          >
            <title>Friends</title>
            <path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" />
          </svg>
        </button>
        <button onClick={() => setMainDisplay('groups')}>
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
          {settingsPopup && <SettingsPopup logOut={logOut} />}
          <button onClick={() => setSettingsPopup(!settingsPopup)}>
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
      </div>
    </div>
  );
}

function SettingsPopup({ logOut }) {
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
    <div className="absolute w-[220px] bg-white px-3 py-1 pb-2 -bottom-[250%] left-[100%] rounded-lg border border-sky-400 shadow-[0_0_6px_3px_rgba(0,160,255,0.2)]">
      <p className="text-sm text-neutral-500 font-semibold mb-2">Settings</p>
      <div className="flex flex-col gap-2 items-start justify-center">
        <button
          className="bg-blue-950 hover:bg-black transition py-1 px-2 rounded-lg flex items-center gap-2 text-white"
          onClick={toggleDarkMode}
        >
          Toggle dark mode
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 fill-white"
          >
            <path d="M7.5,2C5.71,3.15 4.5,5.18 4.5,7.5C4.5,9.82 5.71,11.85 7.53,13C4.46,13 2,10.54 2,7.5A5.5,5.5 0 0,1 7.5,2M19.07,3.5L20.5,4.93L4.93,20.5L3.5,19.07L19.07,3.5M12.89,5.93L11.41,5L9.97,6L10.39,4.3L9,3.24L10.75,3.12L11.33,1.47L12,3.1L13.73,3.13L12.38,4.26L12.89,5.93M9.59,9.54L8.43,8.81L7.31,9.59L7.65,8.27L6.56,7.44L7.92,7.35L8.37,6.06L8.88,7.33L10.24,7.36L9.19,8.23L9.59,9.54M19,13.5A5.5,5.5 0 0,1 13.5,19C12.28,19 11.15,18.6 10.24,17.93L17.93,10.24C18.6,11.15 19,12.28 19,13.5M14.6,20.08L17.37,18.93L17.13,22.28L14.6,20.08M18.93,17.38L20.08,14.61L22.28,17.15L18.93,17.38M20.08,12.42L18.94,9.64L22.28,9.88L20.08,12.42M9.63,18.93L12.4,20.08L9.87,22.27L9.63,18.93Z" />
          </svg>
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 transition py-1 px-2 rounded-lg text-white"
          onClick={logOut}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
