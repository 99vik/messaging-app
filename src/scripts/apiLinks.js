const API_URL = import.meta.env.VITE_API_URL;
const AUTHORIZATION_API_URL = `${API_URL}/users/tokens`;
const WS_URL = import.meta.env.VITE_WS_URL;

export { API_URL, AUTHORIZATION_API_URL, WS_URL };
