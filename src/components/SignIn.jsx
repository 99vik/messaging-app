import { useContext, useEffect, useRef } from 'react';
import { AuthorizationDataContext } from '../scripts/AuthorizationDataContext';
import { Link, useNavigate } from 'react-router-dom';
import { signInToken } from '../scripts/AuthorizationApiRequests';

function SignIn() {
  const navigate = useNavigate();
  const { authorization } = useContext(AuthorizationDataContext);

  useEffect(() => {
    if (localStorage.getItem('refresh_token')) {
      navigate('/');
    }
  }, []);

  const emailRef = useRef(0);
  const passwordRef = useRef(0);

  async function handleSubmit(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const response = await signInToken(email, password);

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
    <div className="h-full w-full flex max-[780px]:flex-col max-sm:justify-start justify-around items-center">
      <p className="text-sky-500 text-6xl font-extrabold max-[920px]:text-5xl max-sm:my-20">
        MessageApp
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-[350px] max-sm:gap-8 max-sm:px-4 max-sm:bg-white  max-sm:border-none max-sm:w-full max-sm:gap max-[920px]:w-[320px] max-[920px]:p-4 p-8 border-neutral-200 rounded-lg bg-neutral-50 border"
      >
        <p className="text-sky-500 text-lg max-sm:text-3xl font-semibold text-center">
          Sign in
        </p>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm text-neutral-500">
            Email
          </label>
          <input
            ref={emailRef}
            type="text"
            name="email"
            id="email"
            className="border-2 outline-none px-2 py-1 rounded-lg focus:border-sky-500 transition"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm text-neutral-500">
            Password
          </label>
          <input
            ref={passwordRef}
            type="password"
            name="password"
            id="password"
            className="border-2 outline-none px-2 py-1 rounded-lg focus:border-sky-500 transition"
          />
        </div>
        <button
          type="submit"
          className="bg-sky-500 p-2 rounded-lg text-white font-semibold mt-4 hover:bg-sky-800 transition"
        >
          Log in
        </button>
        <Link to="/sign-up">
          <p className="text-sm text-sky-500 font-semibold text-center -mb-3 -mt-1 hover:text-sky-700 transition">
            Don't have an account? Sign up.
          </p>
        </Link>
      </form>
    </div>
  );
}

export default SignIn;
