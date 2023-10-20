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

async function createChat(access_token, name, type) {
  const chat = { name, type };
  const response = await fetch(`${API_URL}/create_chat`, {
    method: 'POST',
    body: JSON.stringify({
      chat,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response;
}

export { fetchUserChats, fetchAllPublicChats, createChat };
