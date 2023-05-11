import { useAuthUser } from "react-auth-kit";

import Menu from "./Menu";
import AccountSettingsForm from "./AccountSettingsForm";
import PasswordChangeForm from "./PasswordChangeForm";

const AccountSettings = () => {
  const auth = useAuthUser();
  const user = auth();

  return (
    <main className="main">
      <div className="user-view">
        <Menu user={user} />
        <div className="user-view__content">
          <AccountSettingsForm user={user} />
          <span className="line">&nbsp;</span>
          <PasswordChangeForm />
        </div>
      </div>
    </main>
  );
};

export default AccountSettings;
