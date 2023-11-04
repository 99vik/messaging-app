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

async function changeUsername(access_token, username) {
  const profile = { username };
  const response = await fetch(`${API_URL}/change_username`, {
    method: 'POST',
    body: JSON.stringify({
      profile,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response;
}

async function changeDescription(access_token, description) {
  const profile = { description };
  const response = await fetch(`${API_URL}/change_description`, {
    method: 'POST',
    body: JSON.stringify({
      profile,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response;
}

async function changeProfileImage(access_token, image) {
  const data = new FormData();
  data.append('profile[image]', image);
  const response = await fetch(`${API_URL}/change_profile_image`, {
    method: 'POST',
    body: data,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response;
}

async function searchForProfiles(access_token, query) {
  const response = await fetch(`${API_URL}/search_profiles/${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response;
}

export {
  getCurrentUser,
  changeUsername,
  changeDescription,
  searchForProfiles,
  changeProfileImage,
};
