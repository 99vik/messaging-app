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

async function getChatParticipants(access_token, id) {
  const response = await fetch(`${API_URL}/chat_participants/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });
  return await response.json();
}

async function getDirectChat(access_token, id) {
  const response = await fetch(`${API_URL}/find_direct_chat/${id}`, {
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

async function joinPublicChat(access_token, id) {
  const response = await fetch(`${API_URL}/join_public_chat`, {
    method: 'POST',
    body: JSON.stringify({
      id,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response;
}

async function leaveChat(access_token, id) {
  const response = await fetch(`${API_URL}/leave_chat`, {
    method: 'POST',
    body: JSON.stringify({
      id,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response;
}

async function getAddableUsersToChat(access_token, id) {
  const response = await fetch(`${API_URL}/get_addable_users_to_chat/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });
  return await response.json();
}

async function addUserToChat(access_token, chat_id, user_id) {
  const chat = { chat_id, user_id };

  const response = await fetch(`${API_URL}/add_user_to_chat`, {
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

export {
  fetchUserChats,
  fetchAllPublicChats,
  createChat,
  joinPublicChat,
  getDirectChat,
  getChatParticipants,
  leaveChat,
  getAddableUsersToChat,
  addUserToChat,
};
