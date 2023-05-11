import { useState } from "react";
import axios from "axios";

import showAlert from "../../assets/alerts";

const SignupPage = (props) => {
  const { setIsLoggedIn, setUser } = props;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onPasswordConfirmChange = (event) => {
    setPasswordConfirm(event.target.value);
  };

  const onSubmit = async () => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:8000/api/v1/users/signup",
        data: {
          name,
          email,
          password,
          passwordConfirm,
        },
      });

      if (res.data.status === "success") {
        setIsLoggedIn(true);
        setUser(res.data.data);
        showAlert("success", "Signup successfully!");
      }
    } catch (err) {
      showAlert("error", err.response.data.message);
    }
  };

  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Sign up</h2>
        <div className="form form__signup">
          <div className="form__group">
            <label htmlFor="name" className="form__label">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="form__input"
              placeholder="Your name..."
              required
              onChange={onNameChange}
            />
          </div>
          <div className="form__group">
            <label htmlFor="email" className="form__label">
              Email address
            </label>
            <input
              id="email"
              type="email"
              className="form__input"
              placeholder="you@example.com"
              required
              onChange={onEmailChange}
            />
          </div>
          <div className="form__group ma-bt-md">
            <label htmlFor="password" className="form__label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form__input"
              placeholder="••••••••"
              required
              minLength="8"
              onChange={onPasswordChange}
            />
          </div>
          <div className="form__group ma-bt-md">
            <label htmlFor="passwordConfirm" className="form__label">
              Password Confirm
            </label>
            <input
              id="passwordConfirm"
              type="password"
              className="form__input"
              placeholder="••••••••"
              required
              minLength="8"
              onChange={onPasswordConfirmChange}
            />
          </div>
          <div className="form__group">
            <input
              onClick={onSubmit}
              className="btn btn--green"
              type="submit"
              value="Sign up"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignupPage;
