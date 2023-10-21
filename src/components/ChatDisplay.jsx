import { useContext } from 'react';
import { AuthorizationDataContext } from '../scripts/AuthorizationDataContext';

function ChatDisplay({ chatID }) {
  const { authorizationData } = useContext(AuthorizationDataContext);
  return (
    <div>
      <h1>chat display</h1>
      <p>{chatID}</p>
    </div>
  );
}

export default ChatDisplay;
