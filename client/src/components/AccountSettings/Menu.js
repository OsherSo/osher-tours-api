import NavItem from "./NavItem";
import { useAuthUser } from "react-auth-kit";

const Menu = () => {
  const auth = useAuthUser();
  const user = auth();

  return (
    <nav className="user-view__menu">
      <ul className="side-nav">
        <NavItem link="#" text="Settings" icon="settings" active={true} />
        <NavItem link="#" text="My bookings" icon="briefcase" active={false} />
        <NavItem link="#" text="My reviews" icon="star" active={false} />
        <NavItem link="#" text="Billing" icon="credit-card" active={false} />

        {user.role === "admin" && (
          <div className="admin-nav">
            <h5 className="admin-nav__heading">Admin</h5>
            <ul className="side-nav">
              <NavItem link="#" text="Manage tours" icon="map" active={false} />
              <NavItem
                link="#"
                text="Manage users"
                icon="users"
                active={false}
              />
              <NavItem
                link="#"
                text="Manage reviews"
                icon="star"
                active={false}
              />
              <NavItem
                link="#"
                text="Manage bookings"
                icon="briefcase"
                active={false}
              />
            </ul>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Menu;
