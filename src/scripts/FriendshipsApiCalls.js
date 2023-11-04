import { API_URL } from './apiLinks';

async function getCurrentUserFriends(access_token) {
  const response = await fetch(`${API_URL}/get_current_user_friends`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response;
}

async function getFriendRequests(access_token) {
  const response = await fetch(`${API_URL}/get_friend_requests`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response;
}

async function checkFriendshipStatus(access_token, id) {
  const response = await fetch(`${API_URL}/check_friendship_status/${id}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });
  return await response.json();
}

async function sendFriendRequest(access_token, id) {
  const friendship = { id };
  const response = await fetch(`${API_URL}/send_friend_request`, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({
      friendship,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response;
}

async function cancelFriendRequest(access_token, id) {
  const friendship = { id };
  const response = await fetch(`${API_URL}/cancel_friend_request`, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({
      friendship,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response;
}

async function rejectFriendRequest(access_token, id) {
  const friendship = { id };
  const response = await fetch(`${API_URL}/reject_friend_request`, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({
      friendship,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response;
}

async function acceptFriendRequest(access_token, id) {
  const friendship = { id };
  const response = await fetch(`${API_URL}/accept_friend_request`, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({
      friendship,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response;
}

async function removeFriend(access_token, id) {
  const friendship = { id };
  const response = await fetch(`${API_URL}/remove_friend`, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({
      friendship,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response;
}

export {
  checkFriendshipStatus,
  sendFriendRequest,
  cancelFriendRequest,
  removeFriend,
  acceptFriendRequest,
  getCurrentUserFriends,
  getFriendRequests,
  rejectFriendRequest,
};
