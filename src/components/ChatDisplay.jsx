import { useContext, useEffect, useState } from 'react';
import { AuthorizationDataContext } from '../scripts/AuthorizationDataContext';
import { GetChatMessages } from '../scripts/MessageApiCalls';

function ChatDisplay({ chatID }) {
  const [messages, setMessages] = useState(null);
  const [loader, setLoader] = useState(true);
  const { authorizationData } = useContext(AuthorizationDataContext);

  useEffect(() => {
    async function getMessages() {
      const response = await GetChatMessages(chatID, authorizationData.token);
      setLoader(false);
      console.log(response);
      console.log(await response.json());
    }
    getMessages();
  }, [chatID]);

  if (loader) {
    return <h1>loading..</h1>;
  }

  return (
    <div>
      <h1>chat display</h1>
      <p>{chatID}</p>
    </div>
  );
}

export default ChatDisplay;
