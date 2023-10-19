import FriendsDisplay from './FriendsDisplay';
import ChatDisplay from './ChatDisplay';
import GroupsDisplay from './GroupsDisplay';

function Main({ mainDisplay }) {
  function switchResult() {
    switch (mainDisplay) {
      case 'friends':
        return <FriendsDisplay />;
      case 'chat':
        return <ChatDisplay />;
      case 'groups':
        return <GroupsDisplay />;
      default:
        return <h1>Home</h1>;
    }
  }

  const display = switchResult();
  return (
    <div className="bg-neutral-50 flex-1 rounded-tr-lg rounded-br-lg">
      {display}
    </div>
  );
}

export default Main;
