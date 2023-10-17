import { BrowserRouter as Router } from 'react-router-dom';
import ApplicationRoutes from './components/ApplicationRoutes';
import { useState } from 'react';
import { AuthorizationDataContext } from './scripts/AuthorizationDataContext';

export default function App() {
  const [authorizationData, setAuthorizationData] = useState(null);

  return (
    <div>
      <AuthorizationDataContext.Provider
        value={{ authorizationData, setAuthorizationData }}
      >
        <Router>
          <ApplicationRoutes />
        </Router>
      </AuthorizationDataContext.Provider>
    </div>
  );
}
