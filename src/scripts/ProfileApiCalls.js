import { API_URL } from './apiLinks';

async function getCurrentUser(access_token) {
  const response = await fetch(`${API_URL}/current_user_profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });
  return await response.json();
}

export { getCurrentUser };
