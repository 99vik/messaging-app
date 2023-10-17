export default function HandleAuthorizationData(data = null) {
  if (data) {
    localStorage.setItem('refresh_token', data.refresh_token);
    return {
      token: data.token,
      refresh_token: data.refresh_token,
      resource_owner: data.resource_owner,
    };
  } else {
    localStorage.removeItem('refresh_token');
    return {
      token: '',
      refresh_token: '',
      resource_owner: '',
    };
  }
}
