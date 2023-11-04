import { useContext, useEffect, useRef, useState } from 'react';
import { AuthorizationDataContext } from '../scripts/AuthorizationDataContext';
import { Link, useNavigate } from 'react-router-dom';
import { signInToken } from '../scripts/AuthorizationApiRequests';
import Notification from './Notification';

function SignIn() {
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();
  const [loginLoader, setLoginLoader] = useState(false);
  const { authorization } = useContext(AuthorizationDataContext);

  useEffect(() => {
    if (localStorage.getItem('refresh_token')) {
      navigate('/');
    }
  }, []);

  const emailRef = useRef(0);
  const passwordRef = useRef(0);

  function showNotification(type, message, messagesList = null) {
    setNotification({ type, message, messagesList });
  }

  function demoLogin(e) {
    e.preventDefault();

    const accounts = [
      {
        email: 'test.email1@mail.com',
        password: 'password',
      },
      {
        email: 'test.email2@mail.com',
        password: 'password',
      },
      {
        email: 'test.email3@mail.com',
        password: 'password',
      },
    ];
    const randomAccount = accounts[Math.floor(Math.random() * accounts.length)];
    emailRef.current.value = randomAccount.email;
    passwordRef.current.value = randomAccount.password;
    handleSubmit(e);
  }

  async function handleSubmit(e) {
    setLoginLoader(true);
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const response = await signInToken(email, password);

    const data = await response.json();
    if (response.ok) {
      authorization(data);
      navigate('/');
    } else {
      showNotification('fail', 'Error signing in', data.error_description);
    }
    setLoginLoader(false);
  }

  return (
    <>
      {notification && (
        <Notification
          notification={notification}
          close={() => setNotification(false)}
        />
      )}
      <div className="h-full w-full flex max-[780px]:flex-col max-sm:justify-start justify-around items-center dark:bg-slate-900">
        <p className="text-sky-500 text-6xl font-extrabold max-[920px]:text-5xl max-sm:my-20">
          MessageApp
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-[350px] max-sm:gap-8 max-sm:px-4 dark:bg-slate-800 dark:border-slate-700 max-sm:bg-white  max-sm:border-none max-sm:w-full max-sm:gap max-[920px]:w-[320px] max-[920px]:p-4 p-8 border-neutral-200 rounded-lg bg-neutral-50 border"
        >
          <p className="text-sky-500 text-lg max-sm:text-3xl font-semibold text-center">
            Sign in
          </p>
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm text-neutral-500 dark:text-neutral-300"
            >
              Email
            </label>
            <input
              ref={emailRef}
              type="text"
              name="email"
              id="email"
              className="border-2 outline-none px-2 py-1 rounded-lg dark:bg-slate-200 focus:border-sky-500 transition"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm text-neutral-500 dark:text-neutral-300"
            >
              Password
            </label>
            <input
              ref={passwordRef}
              type="password"
              name="password"
              id="password"
              className="border-2 outline-none px-2 py-1 rounded-lg focus:border-sky-500 transition dark:bg-slate-200"
            />
          </div>
          <button
            disabled={loginLoader}
            type="submit"
            className="bg-sky-500 grid grid-cols-3 p-2 rounded-lg text-white font-semibold mt-4 hover:bg-sky-800 transition"
          >
            <div></div>
            <p>Log in</p>
            {loginLoader && (
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-300 animate-spin fill-white"
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
            )}
          </button>
          <button
            onClick={demoLogin}
            disabled={loginLoader}
            className="bg-white grid grid-cols-4 border border-sky-500 p-2 rounded-lg text-sky-500 font-semibold dark:hover:bg-slate-900 dark:bg-slate-800 hover:bg-neutral-200 transition"
          >
            <div></div>
            <p className="whitespace-nowrap col-span-2">Try demo login</p>
            {loginLoader && (
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-300 animate-spin fill-sky-500"
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
            )}
          </button>
          <Link to="/sign-up">
            <p className="text-sm text-sky-500 font-semibold text-center -mb-3 -mt-1 hover:text-sky-700 transition">
              Don't have an account? Sign up.
            </p>
          </Link>
        </form>
      </div>
    </>
  );
}

export default SignIn;
