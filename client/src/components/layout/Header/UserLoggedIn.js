import { useAuthUser, useSignOut } from "react-auth-kit";

const UserLoggedIn = () => {
  const signOut = useSignOut();

  const auth = useAuthUser();
  const user = auth();
  console.log(user);

  return (
    <nav className="nav nav--user">
      <button className="nav__el nav__el--logout" onClick={() => signOut()}>
        Sign Out
      </button>
      <a className="nav__el" href="/me">
        <img
          className="nav__user-img"
          src={`/img/users/${user.photo}`}
          alt={`${user.name}`}
        />
        <span>{user.name.split(" ")[0]}</span>
      </a>
    </nav>
  );
};

export default UserLoggedIn;
