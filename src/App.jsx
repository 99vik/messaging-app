import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import ApplicationRoutes from './components/ApplicationRoutes';
import { useState } from 'react';
import { AuthorizationDataContext } from './scripts/AuthorizationDataContext';
import HandleAuthorizationData from './scripts/HandleAuthorizationData';

export default function App() {
  const [authorizationData, setAuthorizationData] = useState(null);

  function authorization(data) {
    setAuthorizationData(HandleAuthorizationData(data));
  }

  return (
    <div>
      <AuthorizationDataContext.Provider
        value={{ authorizationData, authorization }}
      >
        <Router>
          <ApplicationRoutes />
        </Router>
      </AuthorizationDataContext.Provider>
    </div>
  );
}
