import { useContext, useEffect, useRef } from 'react';
import { AuthorizationDataContext } from '../scripts/AuthorizationDataContext';
import { useNavigate } from 'react-router-dom';
import { AUTHORIZATION_API_URL } from '../scripts/apiLinks';

function SignIn() {
  const navigate = useNavigate();
  const { authorizationData, authorization } = useContext(
    AuthorizationDataContext
  );

  useEffect(() => {
    checkAuthorization();
  }, []);

  function checkAuthorization() {
    const refresh_token = localStorage.getItem('refresh_token');
    if (refresh_token) {
      console.log('setting tokens');
      navigate('/');
    }
  }

  const emailRef = useRef(0);
  const passwordRef = useRef(0);

  async function handleSubmit(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const response = await fetch(`${AUTHORIZATION_API_URL}/sign_in`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

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
      {console.log(localStorage.getItem('refresh_token'))}
      {console.log(authorizationData)}
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
