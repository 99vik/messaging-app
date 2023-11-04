import { API_URL } from './apiLinks';

async function GetChatMessages(chatID, access_token) {
  const response = await fetch(`${API_URL}/get_all_chat_messages/${chatID}`, {
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response;
}

async function SendMessage(access_token, body, chatID) {
  const message = { body, chatID };
  const response = await fetch(`${API_URL}/send_message`, {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify({
      message,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response;
}

export { GetChatMessages, SendMessage };
