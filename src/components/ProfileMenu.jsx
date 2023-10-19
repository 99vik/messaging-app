function ProfileMenu({ toggleProfileMenu }) {
  return (
    <div className="absolute bg-slate-400 w-full h-full z-10 profile-menu transition-all">
      <button onClick={toggleProfileMenu} className="absolute top-2 right-2">
        Close
      </button>
      <h1>Profile menu</h1>
    </div>
  );
}

export default ProfileMenu;
