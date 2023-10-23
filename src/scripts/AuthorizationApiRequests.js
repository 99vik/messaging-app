import { AUTHORIZATION_API_URL } from './apiLinks';

async function refreshToken(refresh_token) {
  const response = await fetch(`${AUTHORIZATION_API_URL}/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${refresh_token}`,
    },
  });
  return response;
}

async function revokeToken(access_token) {
  const response = await fetch(`${AUTHORIZATION_API_URL}/revoke`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response;
}

async function signUpToken(email, username, password) {
  const response = await fetch(`${AUTHORIZATION_API_URL}/sign_up`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      username,
      password,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  return response;
}

async function signInToken(email, password) {
  const response = await fetch(`${AUTHORIZATION_API_URL}/sign_in`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  return response;
}

export { refreshToken, revokeToken, signUpToken, signInToken };
