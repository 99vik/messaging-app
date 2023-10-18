function Sidebar({ logOut, data }) {
  return (
    <div className="bg-green-400 w-[30%]">
      <TopMenu />
      <button onClick={logOut}>Log Out</button>
      {data.map((chat, index) => {
        return (
          <div key={index}>
            <h1>{chat.name}</h1>
            <h1>{chat.type}</h1>
          </div>
        );
      })}
    </div>
  );
}

function TopMenu() {
  return (
    <div className="flex">
      <p>Image</p>
      <p>Public chats</p>
      <p>Friends</p>
      <p>Settings</p>
    </div>
  );
}

export default Sidebar;
