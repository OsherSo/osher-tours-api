import { Link } from "react-router-dom";

const UserNotLoggedIn = () => {
  return (
    <nav className="nav nav--user">
      {/* <Link to="/login" className="nav__el">
        Login
      </Link> */}
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
