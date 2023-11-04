import { useEffect } from 'react';

function Notification({ notification, close }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      close();
    }, 4000);
    return () => clearTimeout(timer);
  });

  return (
    <div
      className={`${
        notification.type === 'success'
          ? 'bg-green-400/80 text-green-950'
          : 'bg-red-400/80 text-red-950'
      } absolute appear-fast top-1 left-[50%] min-w-[300px] -translate-x-[50%] px-3 py-5 rounded-lg z-50`}
    >
      <div className="absolute top-1 right-1">
        <svg
          onClick={close}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={`${
            notification.type === 'success' ? 'fill-green-900' : 'fill-red-900'
          } w-8 cursor-pointer`}
        >
          <title>close</title>
          <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
        </svg>
      </div>
      <p className="text-center font-semibold ">{notification.message}</p>
      {notification.messagesList && (
        <div className="mt-1 flex justify-center">
          <ul>
            {notification.messagesList.map((message, index) => (
              <li key={index} className="list-disc list-inside">
                {message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Notification;
