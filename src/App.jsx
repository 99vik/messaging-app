import { BrowserRouter as Router } from 'react-router-dom';
import ApplicationRoutes from './components/ApplicationRoutes';
import { useLayoutEffect, useState } from 'react';
import { AuthorizationDataContext } from './scripts/AuthorizationDataContext';
import HandleAuthorizationData from './scripts/HandleAuthorizationData';

export default function App() {
  const [authorizationData, setAuthorizationData] = useState(null);

  function authorization(data) {
    setAuthorizationData(HandleAuthorizationData(data));
  }

  useLayoutEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      const documentSelector = document.documentElement;
      documentSelector.classList.add('dark');
    }
  });

  return (
    <div className="bg-neutral-200 dark:bg-slate-950 flex justify-center items-center w-screen h-screen p-7 max-[920px]:p-5 max-sm:p-0 transition-colors">
      <div className="bg-white dark:bg-slate-900 max-w-[1800px] w-full h-full rounded-lg shadow-[0_0_15px_5px_rgba(0,160,255,0.2)]">
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
