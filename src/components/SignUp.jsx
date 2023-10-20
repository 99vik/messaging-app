import { useContext, useEffect, useRef } from 'react';
import { AuthorizationDataContext } from '../scripts/AuthorizationDataContext';
import { Link, useNavigate } from 'react-router-dom';
import { signUpToken } from '../scripts/AuthorizationApiRequests';

function SignUp() {
  const navigate = useNavigate();
  const { authorization } = useContext(AuthorizationDataContext);

  const emailRef = useRef(0);
  const passwordRef = useRef(0);
  const confirmPasswordRef = useRef(0);

  useEffect(() => {
    if (localStorage.getItem('refresh_token')) {
      navigate('/');
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      console.log('passwords dont match');
      return;
    }

    const response = await signUpToken(email, password);

    const data = await response.json();
    if (response.ok) {
      authorization(data);
      navigate('/');
    } else {
      console.log('error');
      console.log(data.error_description);
    }
  }

  return (
    <div className="h-full w-full flex max-[780px]:flex-col max-sm:justify-start justify-around items-center dark:bg-slate-900">
      <p className="text-sky-500 text-6xl font-extrabold max-[920px]:text-5xl max-sm:my-20">
        MessageApp
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-[350px] dark:bg-slate-800 dark:border-slate-700 max-sm:gap-8 max-sm:px-4 max-sm:bg-white  max-sm:border-none max-sm:w-full max-sm:gap max-[920px]:w-[320px] max-[920px]:p-4 p-8 border-neutral-200 rounded-lg bg-neutral-50 border"
      >
        <p className="text-sky-500 text-lg max-sm:text-3xl font-semibold text-center">
          Sign up
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
            className="border-2 outline-none px-2 py-1 rounded-lg focus:border-sky-500 transition dark:bg-slate-200"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="text-sm text-neutral-500 dark:text-neutral-300 "
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
        <div className="flex flex-col">
          <label
            htmlFor="confirm-password"
            className="text-sm text-neutral-500 dark:text-neutral-300 "
          >
            Confirm Password
          </label>
          <input
            ref={confirmPasswordRef}
            type="password"
            name="confirm-password"
            id="confirm-password"
            className="border-2 outline-none px-2 dark:bg-slate-200 py-1 rounded-lg focus:border-sky-500 transition"
          />
        </div>
        <button
          type="submit"
          className="bg-sky-500 p-2 rounded-lg text-white font-semibold mt-4 hover:bg-sky-800 transition"
        >
          Register
        </button>
        <Link to="/sign-in">
          <p className="text-sm text-sky-500 font-semibold text-center -mb-3 -mt-1 hover:text-sky-700 transition">
            Already have account? Sign in.
          </p>
        </Link>
      </form>
    </div>
  );
}

export default SignUp;
