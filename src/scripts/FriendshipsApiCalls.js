import { API_URL } from './apiLinks';

async function checkFriendshipStatus(access_token, id) {
  const response = await fetch(`${API_URL}/check_friendship_status/${id}`, {
    method: 'GET',
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

export { checkFriendshipStatus, sendFriendRequest };
