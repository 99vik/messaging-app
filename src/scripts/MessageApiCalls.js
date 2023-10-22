import { API_URL } from './apiLinks';

async function GetChatMessages(chatID, access_token) {
  const response = await fetch(`${API_URL}/get_all_chat_messages/${chatID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response;
}

export { GetChatMessages };
