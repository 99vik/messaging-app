import { BrowserRouter as Router } from 'react-router-dom';
import ApplicationRoutes from './components/ApplicationRoutes';

export default function App() {
  return (
    <div>
      <Router>
        <ApplicationRoutes />
      </Router>
    </div>
  );
}
