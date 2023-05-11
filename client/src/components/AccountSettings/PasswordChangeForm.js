const PasswordChangeForm = () => {
  return (
    <div className="user-view__form-container">
      <h2 className="heading-secondary ma-bt-md">Password change</h2>
      <form className="form form-user-password">
        <div className="form__group">
          <label className="form__label" htmlFor="password-current">
            Current password
          </label>
          <input
            id="password-current"
            className="form__input"
            type="password"
            placeholder="••••••••"
            required
            minLength="8"
          />
        </div>
        <div className="form__group">
          <label className="form__label" htmlFor="password">
            New password
          </label>
          <input
            id="password"
            className="form__input"
            type="password"
            placeholder="••••••••"
            required
            minLength="8"
          />
        </div>
        <div className="form__group ma-bt-lg">
          <label className="form__label" htmlFor="password-confirm">
            Confirm password
          </label>
          <input
            id="password-confirm"
            className="form__input"
            type="password"
            placeholder="••••••••"
            required
            minLength="8"
          />
        </div>
        <div className="form__group right">
          <button className="btn btn--small btn--green">Save password</button>
        </div>
      </form>
    </div>
  );
};

export default PasswordChangeForm;
