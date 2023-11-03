import { useContext, useEffect, useRef, useState } from 'react';
import CloseIcon from '../assets/icons/CloseIcon.svg';
import { searchForProfiles } from '../scripts/ProfileApiCalls';
import { AuthorizationDataContext } from '../scripts/AuthorizationDataContext';
import UserProfile from './UserProfile';
import {
  getCurrentUserFriends,
  getFriendRequests,
} from '../scripts/FriendshipsApiCalls';

function FriendsDisplay({ setMainDisplay }) {
  const [friends, setFriends] = useState(null);
  const [friendsLoader, setFriendsLoader] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [friendRequests, setFriendRequests] = useState(false);
  const [findFriends, setFindFriends] = useState(false);
  const { authorizationData } = useContext(AuthorizationDataContext);

  useEffect(() => {
    async function getFriends() {
      const response = await getCurrentUserFriends(authorizationData.token);
      if (response.ok) {
        const data = await response.json();
        setFriends(data);
      } else {
        console.log('error loading friends');
      }
      setFriendsLoader(false);
    }

    getFriends();
  }, []);

  if (friendRequests) {
    return (
      <FriendRequests
        setMainDisplay={setMainDisplay}
        close={() => setFriendRequests(false)}
      />
    );
  }

  if (findFriends) {
    return (
      <FindFriends
        setMainDisplay={setMainDisplay}
        close={() => setFindFriends(false)}
      />
    );
  }

  function Friends({ friends }) {
    function Friend({ friend }) {
      return (
        <div className="bg-slate-200 dark:bg-slate-700 dark:border-slate-600 border border-slate-300 rounded-lg py-2 px-4 flex gap-4 justify-around items-center max-[1180px]:w-[260px] max-[1000px]:w-full w-[220px]">
          <div>
            {friend.image ? (
              <div className="relative flex align-middle justify-center">
                <div className="bg-slate-400 dark:bg-slate-900 animate-pulse -z-0 w-[50px] h-[50px] rounded-full absolute"></div>
                <img
                  src={friend.image}
                  alt="profile picture"
                  className="w-[50px] h-[50px] rounded-full z-0"
                />
              </div>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-[60px] fill-sky-500"
              >
                <path d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
              </svg>
            )}
          </div>
          <div>
            <p className="font-semibold text-md mb-2 text-center">
              {friend.username}
            </p>
            <button
              onClick={() => setUserProfile(friend)}
              className="bg-sky-500 rounded-lg whitespace-nowrap text-white py-1 px-2 hover:bg-sky-700 transition"
            >
              View profile
            </button>
          </div>
        </div>
      );
    }

    const displayedFriends = friends.map((friend) => (
      <Friend key={friend.id} friend={friend} />
    ));
    return (
      <div className="p-4 grid grid-cols-4 gap-4 max-[1420px]:grid-cols-3 max-[1180px]:grid-cols-2 max-[1000px]:grid-cols-1 overflow-y-scroll justify-items-center">
        {displayedFriends}
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex flex-col">
      {userProfile && (
        <UserProfile
          setMainDisplay={setMainDisplay}
          profile={userProfile}
          close={() => setUserProfile(null)}
        />
      )}
      <div className="flex justify-between items-center px-5 pt-4 pb-2">
        <p className="text-3xl text-neutral-500 dark:text-neutral-300">
          Friends
        </p>
        <div className="flex gap-2">
          <button
            className="flex justify-center items-center gap-3 font-semibold hover:bg-sky-700 transition bg-sky-500 text-white py-2 px-4 rounded-xl"
            onClick={() => setFriendRequests(true)}
          >
            Friend requests
          </button>
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
      </div>
      <div className="px-5">
        <div className="h-[1px] w-full bg-slate-300 dark:bg-slate-600"></div>
      </div>
      {friendsLoader ? <Loader /> : <Friends friends={friends} />}
    </div>
  );
}

function FriendRequests({ setMainDisplay, close }) {
  const [loader, setLoader] = useState(true);
  const [friendRequests, setFriendRequests] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const { authorizationData } = useContext(AuthorizationDataContext);

  useEffect(() => {
    async function getFriendRequestsData() {
      const response = await getFriendRequests(authorizationData.token);
      if (response.ok) {
        const data = await response.json();
        setFriendRequests(data);
      } else {
        console.log('error loading friend requests');
      }
      setLoader(false);
    }
    getFriendRequestsData();
  }, []);

  function Requests() {
    const displayedRequests = friendRequests.map((request) => {
      return <Request key={request.id} request={request} />;
    });
    return displayedRequests;
  }

  function Request({ request }) {
    return (
      <div className="flex items-center justify-between px-4 dark:bg-slate-700 transition bg-slate-200 border-slate-300 border dark:border-slate-600 my-2 mx-5 p-1 rounded">
        <div className="flex gap-4">
          {request.user.image ? (
            <div className="relative flex align-middle justify-center items-center w-[48px] h-[48px]">
              <div className="bg-slate-300 dark:bg-slate-900 animate-pulse -z-0 w-[40px] h-[40px] rounded-full absolute"></div>
              <img
                onClick={() => setUserProfile(request.user)}
                src={request.user.image}
                alt="profile picture"
                className="w-[40px] h-[40px] rounded-full z-0 cursor-pointer"
              />
            </div>
          ) : (
            <svg
              onClick={() => setUserProfile(request.user)}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-12 fill-sky-500 cursor-pointer"
            >
              <path d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
            </svg>
          )}
          <div className="flex justify-center items-center">
            <p
              onClick={() => setUserProfile(request.user)}
              className="font-semibold cursor-pointer"
            >
              {request.user.username}
            </p>
          </div>
        </div>
        <button className="bg-sky-500 hover:bg-sky-600 transition font-semibold h-fit px-8 py-1 rounded-lg text-white">
          Accept
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex flex-col">
      {userProfile && (
        <UserProfile
          setMainDisplay={setMainDisplay}
          profile={userProfile}
          close={() => setUserProfile(null)}
        />
      )}
      <div className="flex justify-between items-center px-5 pt-4 pb-2">
        <p className="text-3xl text-neutral-500 dark:text-neutral-300">
          Friend requests
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
      {loader ? (
        <Loader />
      ) : friendRequests.length === 0 ? (
        <p className="text-center text-lg mt-8 appear-fast">
          No incoming friend requests.
        </p>
      ) : (
        <Requests />
      )}
    </div>
  );
}

function FindFriends({ setMainDisplay, close }) {
  const [userProfile, setUserProfile] = useState(null);
  const [profiles, setProfiles] = useState(null);
  const [loader, setLoader] = useState(false);
  const { authorizationData } = useContext(AuthorizationDataContext);
  const searchDebounceRef = useRef(null);

  async function handleSearch(searchValue) {
    if (searchValue.length < 2) {
      return;
    }
    setLoader(true);
    const response = await searchForProfiles(
      authorizationData.token,
      searchValue
    );

    if (response.ok) {
      setProfiles(await response.json());
    } else {
      console.log('error');
      console.log(response);
    }
    setLoader(false);
  }

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;

    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }

    searchDebounceRef.current = setTimeout(() => {
      handleSearch(searchValue);
    }, 500);
  };

  function ProfileList() {
    if (!profiles) {
      return;
    } else if (profiles.length === 0) {
      return (
        <p className="text-center mt-6 text-lg appear-fast">No users found.</p>
      );
    }
    const profilesDisplay = profiles.map((profile) => (
      <Profile key={profile.id} profile={profile} />
    ));
    return (
      <div className="p-4 grid grid-cols-4 gap-4 max-[1420px]:grid-cols-3 max-[1180px]:grid-cols-2 max-[1000px]:grid-cols-1 overflow-y-scroll justify-items-center">
        {profilesDisplay}
      </div>
    );
  }

  function Profile({ profile }) {
    return (
      <div className="bg-slate-200 dark:bg-slate-700 dark:border-slate-600 border border-slate-300 rounded-lg py-2 px-4 flex gap-4 justify-around items-center max-[1180px]:w-[260px] max-[1000px]:w-full w-[220px]">
        <div>
          {profile.image ? (
            <div className="relative flex align-middle justify-center">
              <div className="bg-slate-400 dark:bg-slate-900 animate-pulse -z-0 w-[50px] h-[50px] rounded-full absolute"></div>
              <img
                src={profile.image}
                alt="profile picture"
                className="w-[50px] h-[50px] rounded-full z-0"
              />
            </div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-[60px] fill-sky-500"
            >
              <path d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
            </svg>
          )}
        </div>
        <div>
          <p className="font-semibold text-md mb-2 text-center">
            {profile.username}
          </p>
          <button
            onClick={() => setUserProfile(profile)}
            className="bg-sky-500 rounded-lg whitespace-nowrap text-white py-1 px-2 hover:bg-sky-700 transition"
          >
            View profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex flex-col">
      {userProfile && (
        <UserProfile
          setMainDisplay={setMainDisplay}
          profile={userProfile}
          close={() => setUserProfile(null)}
        />
      )}
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
      <div className="flex py-2 px-10">
        <input
          ref={searchDebounceRef}
          type="text"
          placeholder="Search for people..."
          onChange={handleSearchChange}
          className="flex-1 rounded-full outline-none py-1 px-3 dark:bg-slate-300 dark:text-black bg-slate-200 border border-slate-300 dark:border-slate-950 transition focus:border-sky-300 dark:focus:border-sky-300"
        />
      </div>
      {loader ? <Loader /> : <ProfileList />}
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

export default FriendsDisplay;
