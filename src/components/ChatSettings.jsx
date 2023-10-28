import { useContext, useRef, useState } from 'react';
import { AuthorizationDataContext } from '../scripts/AuthorizationDataContext';

import CloseIcon from '../assets/icons/CloseIcon.svg';

function ChatSettings({ chat, close }) {
  const [nameLoader, setNameLoader] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const { authorizationData } = useContext(AuthorizationDataContext);

  const nameRef = useRef(0);
  const nameLabelRef = useRef(0);
  const nameSubmitRef = useRef(0);
  const imageRef = useRef(0);

  async function handleNameUpdate() {
    setNameLoader(true);
    const response = await changeChatName(
      authorizationData.token,
      nameRef.current.value
    );

    if (response.ok) {
      console.log(await response.json());
      refreshUser();
    } else {
      console.log(await response.json());
    }
    setNameLoader(false);
  }

  function showImg(e) {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(file);
    }
  }

  async function uploadImage() {
    const response = await changeChatImage(
      authorizationData.token,
      imagePreview
    );
    if (response.ok) {
      console.log('attached');
    } else {
      console.log('error');
    }
    console.log(await response.json());
  }

  return (
    <div className="relative w-full h-full">
      <div className="flex justify-between items-center px-5 pt-4 pb-2">
        <p className="text-3xl text-neutral-500 dark:text-neutral-300">
          {chat.name} - Settings
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
        <div className="flex flex-col gap-5 pt-5 items-center appear-fast">
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
                  onClick={uploadImage}
                  className="bg-sky-500 left-[50%] -translate-x-[50%] whitespace-nowrap w-fit absolute -bottom-[20px] text-sm hover:bg-sky-700 transition py-1 px-2 rounded-lg text-white"
                >
                  Save image
                </button>
              </>
            ) : (
              <>
                {chat.image ? (
                  <>
                    <div className="bg-neutral-200 -z-10 animate-pulse transition rounded-full top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] h-[167px] w-[167px] absolute"></div>
                    <img
                      src={chat.image}
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
                    <path d="M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M15.6,8.34C16.67,8.34 17.53,9.2 17.53,10.27C17.53,11.34 16.67,12.2 15.6,12.2A1.93,1.93 0 0,1 13.67,10.27C13.66,9.2 14.53,8.34 15.6,8.34M9.6,6.76C10.9,6.76 11.96,7.82 11.96,9.12C11.96,10.42 10.9,11.5 9.6,11.5C8.3,11.5 7.24,10.42 7.24,9.12C7.24,7.81 8.29,6.76 9.6,6.76M9.6,15.89V19.64C7.2,18.89 5.3,17.04 4.46,14.68C5.5,13.56 8.13,13 9.6,13C10.13,13 10.8,13.07 11.5,13.21C9.86,14.08 9.6,15.23 9.6,15.89M12,20C11.72,20 11.46,20 11.2,19.96V15.89C11.2,14.47 14.14,13.76 15.6,13.76C16.67,13.76 18.5,14.15 19.44,14.91C18.27,17.88 15.38,20 12,20Z" />
                  </svg>
                )}
              </>
            )}
          </div>
          <div className="w-full px-10">
            <p className="text-sm text-neutral-500 dark:text-neutral-300">
              Chat name
            </p>
            <div className="flex items-center w-full hover:opacity-80">
              <input
                onFocus={() => {
                  nameLabelRef.current.hidden = true;
                  nameSubmitRef.current.hidden = false;
                }}
                onBlur={() => {
                  setTimeout(() => {
                    nameLabelRef.current.hidden = false;
                    nameSubmitRef.current.hidden = true;
                  }, 200);
                }}
                ref={nameRef}
                type="text"
                name="name"
                id="name"
                className="flex-1 font-semibold dark:text-black bg-slate-300 rounded-tl-md rounded-bl-md p-1 outline-none"
                defaultValue={chat.username}
              />

              <label
                htmlFor="name"
                ref={nameLabelRef}
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
                disabled={nameLoader}
                onClick={handleNameUpdate}
                hidden={true}
                ref={nameSubmitRef}
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
              <div hidden={!nameLoader} className="absolute right-2">
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
    </div>
  );
}

export default ChatSettings;
