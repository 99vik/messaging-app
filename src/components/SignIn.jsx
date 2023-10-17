import { useContext, useEffect, useRef } from 'react';
import { AuthorizationDataContext } from '../scripts/AuthorizationDataContext';
import { useNavigate } from 'react-router-dom';
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
    <div>
      <p>Sign in</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            ref={emailRef}
            type="text"
            name="email"
            id="email"
            className="border-2"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            ref={passwordRef}
            type="password"
            name="password"
            id="password"
            className="border-2"
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

export default SignIn;
