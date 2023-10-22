import FriendsDisplay from './FriendsDisplay';
import ChatDisplay from './ChatDisplay';
import GroupsDisplay from './GroupsDisplay';

function Main({ mainDisplay }) {
  function switchResult() {
    switch (mainDisplay[0]) {
      case 'friends':
        return <FriendsDisplay />;
      case 'chat':
        return <ChatDisplay chat={mainDisplay[1]} />;
      case 'groups':
        return <GroupsDisplay />;
      default:
        return <h1>Home</h1>;
    }
  }

  const display = switchResult();
  return (
    <div className="bg-neutral-50 dark:bg-slate-800 flex-1 rounded-tr-lg rounded-br-lg">
      {display}
    </div>
  );
}

export default Main;
