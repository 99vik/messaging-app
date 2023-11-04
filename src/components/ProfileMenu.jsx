import { useContext, useEffect, useRef, useState } from 'react';
import { AuthorizationDataContext } from '../scripts/AuthorizationDataContext';
import { NotificationContext } from '../scripts/NotificationContext';
import {
  changeDescription,
  changeProfileImage,
  changeUsername,
  getCurrentUser,
} from '../scripts/ProfileApiCalls';

function ProfileMenu({ refreshUser, data, toggleProfileMenu }) {
  const [usernameLoader, setUsernameLoader] = useState(false);
  const [descriptionLoader, setDescriptionLoader] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageSubmitBtn, setImageSubmitBtn] = useState(false);
  const { authorizationData } = useContext(AuthorizationDataContext);
  const { showNotification } = useContext(NotificationContext);

  const usernameRef = useRef(0);
  const usernameLabelRef = useRef(0);
  const usernameSubmitRef = useRef(0);
  const descriptionRef = useRef(0);
  const descriptionLabelRef = useRef(0);
  const descriptionSubmitRef = useRef(0);
  const imageSubmitRef = useRef(0);
  const imageRef = useRef(0);

  async function handleUsernameUpdate() {
    setUsernameLoader(true);
    const response = await changeUsername(
      authorizationData.token,
      usernameRef.current.value
    );

    if (response.ok) {
      showNotification('success', 'Username changed.');
      refreshUser();
    } else {
      const message = await response.json();
      showNotification('fail', 'Error changing username.', message.username);
    }
    setUsernameLoader(false);
  }

  async function handleDescriptionUpdate() {
    setDescriptionLoader(true);
    const response = await changeDescription(
      authorizationData.token,
      descriptionRef.current.value
    );

    if (response.ok) {
      showNotification('success', 'Description changed.');
      refreshUser();
    } else {
      const data = await response.json();
      showNotification('fail', 'Error changing description.', data.description);
    }
    setDescriptionLoader(false);
  }

  function showImg(e) {
    const file = e.target.files[0];
    if (file) {
      setImageSubmitBtn(true);
      setImagePreview(file);
    }
  }

  async function uploadImage() {
    const response = await changeProfileImage(
      authorizationData.token,
      imagePreview
    );
    if (response.ok) {
      showNotification('success', 'Profile image changed.');
      setImageSubmitBtn(false);
      refreshUser();
    } else {
      showNotification('fail', 'Error changing profile image.');
    }
  }

  return (
    <>
      <div
        onClick={toggleProfileMenu}
        className="h-screen w-screen absolute dark:bg-gray-900/30 bg-gray-400/30 appear-fast z-10"
      ></div>
      <div className="absolute z-20 h-screen bg-slate-100 dark:bg-slate-900 border-r flex flex-col border-slate-200 dark:border-slate-700 w-full profile-menu transition-all">
        <button onClick={toggleProfileMenu} className="absolute top-1 right-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="fill-sky-500 w-12"
          >
            <title>close</title>
            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
          </svg>
        </button>
        <h1 className="text-center mt-4 text-neutral-600 dark:text-neutral-300 text-3xl">
          Profile
        </h1>
        <div className="h-[1px] mt-1 mx-4 bg-neutral-300 dark:bg-slate-700"></div>
        <div className="flex flex-col flex-1 bg-slate-100 dark:bg-slate-900 gap-5 pt-5 items-center appear-fast">
          <div className="relative">
            <label htmlFor="image">
              <div className="bg-neutral-500/0 hover:bg-neutral-500/30 text-black/0 hover:text-black/100 flex rounded-full top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] h-[167px] w-[167px] z-50 absolute transition cursor-pointer items-center justify-center">
                <p className="text-md text-center font-semibold">
                  Change profile <br /> picture
                </p>
              </div>
            </label>
            <input
              onChange={showImg}
              type="file"
              id="image"
              name="image"
              accept="image/*"
              hidden
            ></input>
            {imagePreview ? (
              <>
                <img
                  src={URL.createObjectURL(imagePreview)}
                  className="w-[167px] h-[167px] rounded-full my-[16.5px]"
                  alt="image"
                  ref={imageRef}
                />
                <button
                  ref={imageSubmitRef}
                  hidden={!imageSubmitBtn}
                  onClick={uploadImage}
                  className="bg-sky-500 left-[50%] -translate-x-[50%] whitespace-nowrap w-fit absolute -bottom-[20px] text-sm hover:bg-sky-700 transition py-1 px-2 rounded-lg text-white"
                >
                  Save image
                </button>
              </>
            ) : (
              <>
                {data.image ? (
                  <>
                    <div className="bg-neutral-200 -z-10 animate-pulse transition rounded-full top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] h-[167px] w-[167px] absolute"></div>
                    <img
                      src={data.image}
                      className="w-[167px] h-[167px] rounded-full my-[16.5px]"
                      alt="profile picture"
                    />
                  </>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-[200px] fill-sky-500"
                  >
                    <path d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
                  </svg>
                )}
              </>
            )}
          </div>
          <div className="w-full px-10 max-[600px]:px-5">
            <p className="text-sm text-neutral-500 dark:text-neutral-300">
              Your e-mail
            </p>
            <p className="font-semibold">{data.email}</p>
          </div>
          <div className="w-full px-10 max-[600px]:px-5">
            <p className="text-sm text-neutral-500 dark:text-neutral-300">
              Your username
            </p>
            <div className="flex items-center w-full hover:opacity-80">
              <input
                onFocus={() => {
                  usernameLabelRef.current.hidden = true;
                  usernameSubmitRef.current.hidden = false;
                }}
                onBlur={() => {
                  setTimeout(() => {
                    usernameLabelRef.current.hidden = false;
                    usernameSubmitRef.current.hidden = true;
                  }, 200);
                }}
                ref={usernameRef}
                type="text"
                name="username"
                id="username"
                className="flex-1 font-semibold dark:text-black bg-slate-300 rounded-tl-md rounded-bl-md p-1 outline-none"
                defaultValue={data.username}
              />

              <label
                htmlFor="username"
                ref={usernameLabelRef}
                className="bg-slate-300 rounded-tr-md rounded-br-md p-1 font-semibold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6"
                >
                  <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                </svg>
              </label>
              <button
                disabled={usernameLoader}
                onClick={handleUsernameUpdate}
                hidden={true}
                ref={usernameSubmitRef}
                className="bg-slate-300 rounded-tr-md rounded-br-md p-1 font-semibold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6"
                >
                  <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
                </svg>
              </button>
              <div hidden={!usernameLoader} className="absolute right-2">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-400 animate-spin fill-sky-500"
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
            </div>
          </div>
          <div className="w-full px-10 max-[600px]:px-5">
            <p className="text-sm text-neutral-500 dark:text-neutral-300">
              Description
            </p>
            <div className="flex items-center w-full hover:opacity-80">
              <input
                onFocus={() => {
                  descriptionLabelRef.current.hidden = true;
                  descriptionSubmitRef.current.hidden = false;
                }}
                onBlur={() => {
                  setTimeout(() => {
                    descriptionLabelRef.current.hidden = false;
                    descriptionSubmitRef.current.hidden = true;
                  }, 200);
                }}
                ref={descriptionRef}
                type="text"
                name="description"
                id="description"
                className="flex-1 font-semibold dark:text-black bg-slate-300 rounded-tl-md rounded-bl-md p-1 outline-none"
                defaultValue={data.description}
              />

              <label
                htmlFor="description"
                ref={descriptionLabelRef}
                className="bg-slate-300 rounded-tr-md rounded-br-md p-1 font-semibold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6"
                >
                  <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                </svg>
              </label>
              <button
                disabled={descriptionLoader}
                onClick={handleDescriptionUpdate}
                hidden={true}
                ref={descriptionSubmitRef}
                className="bg-slate-300 rounded-tr-md rounded-br-md p-1 font-semibold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6"
                >
                  <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
                </svg>
              </button>
              <div hidden={!descriptionLoader} className="absolute right-2">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-400 animate-spin fill-sky-500"
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileMenu;
