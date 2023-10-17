import { createContext } from 'react';

export const AuthorizationDataContext = createContext({
  authorizationData: {
    token: '',
    refresh_token: '',
    resource_owner: '',
  },
  setAuthorizationData: () => {},
});
