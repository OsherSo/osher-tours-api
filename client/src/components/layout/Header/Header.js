import { useIsAuthenticated } from "react-auth-kit";

import UserLoggedIn from "./UserLoggedIn";
import UserNotLoggedIn from "./UserNotLoggedIn";

const Header = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <header className="header">
      <nav className="nav nav--tours">
        <a className="nav__el" href="/">
          All tours
        </a>
      </nav>
      <div className="header__logo">
        <img src="/img/logo-white.png" alt="Natours logo" />
      </div>
      {isAuthenticated() ? <UserLoggedIn /> : <UserNotLoggedIn />}
    </header>
  );
};

export default Header;
