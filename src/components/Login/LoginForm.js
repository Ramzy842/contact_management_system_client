import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import login from "../../services/login";
import { setToken } from "../../services/contacts";
import FormButton from "../Shared/FormButton";

const LoginForm = ({setUser}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const user = await login({ username, password });
      window.localStorage.setItem("loggedSystemUser", JSON.stringify(user));
      setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      navigate("/");
    } catch (error) {
      setErrorMessage(error.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };
  return (
    <form className="container" onSubmit={loginHandler}>
      <div>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <div className="input-fields">
          <div>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => handleChange(e, setUsername)}
              placeholder="Username"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => handleChange(e, setPassword)}
              placeholder="Password"
            />
          </div>
          <FormButton text="Login" />
          <p>
            Don't have an account?{" "}
            <Link className="link" to="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
