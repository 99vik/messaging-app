import { API_URL } from './apiLinks';

async function fetchUserChats(access_token) {
  const response = await fetch(`${API_URL}/chats`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });
  return await response.json();
}

async function fetchAllPublicChats(access_token) {
  const response = await fetch(`${API_URL}/public_chats`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });
  return await response.json();
}

export { fetchUserChats, fetchAllPublicChats };
