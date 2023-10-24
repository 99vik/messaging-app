function UserProfile({ close, profile }) {
  return (
    <>
      <div
        onClick={close}
        className="h-screen w-screen -translate-x-[50%] absolute z-30 bg-gray-400/30 dark:bg-gray-900/30 appear-fast"
      ></div>
      <div className="absolute user-profile right-0 z-40 bg-slate-100 dark:bg-slate-900 border-r flex flex-col border-slate-200 dark:border-slate-700 w-[360px] h-full transition-all">
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
        <h1 className="text-center mt-4 text-neutral-600 dark:text-neutral-300 text-3xl">
          {profile.username}
        </h1>
        <div className="h-[1px] mt-1 mx-4 bg-neutral-300 dark:bg-slate-700"></div>
        <div className="flex flex-col gap-5 pt-5 items-center appear-fast">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-[200px] fill-sky-500"
          >
            <path d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
          </svg>
          <div className="w-full px-10">
            <p className="text-sm text-neutral-500 dark:text-neutral-300">
              Description
            </p>
            <p className="font-semibold">
              {profile.description ? profile.description : '-'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
