const UserNotLoggedIn = () => {
  return (
    <nav className="nav nav--user">
      <a className="nav__el" href="/login">
        Login
      </a>
      <a className="nav__el nav__el--cta" href="/register">
        Register
      </a>
    </nav>
  );
};

export default UserNotLoggedIn;
