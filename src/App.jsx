import { BrowserRouter as Router } from 'react-router-dom';
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
    <div className="bg-neutral-200 w-screen h-screen p-7 max-[920px]:p-5 max-sm:p-0">
      <div className="bg-white w-full h-full rounded-lg shadow-[0_0_10px_5px_rgba(0,160,255,0.2)]">
        <AuthorizationDataContext.Provider
          value={{ authorizationData, authorization }}
        >
          <Router>
            <ApplicationRoutes />
          </Router>
        </AuthorizationDataContext.Provider>
      </div>
    </div>
  );
}
