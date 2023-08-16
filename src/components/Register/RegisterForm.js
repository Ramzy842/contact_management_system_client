import React, { useState } from "react";
import { register } from "../../services/users";
import { Link, useNavigate } from "react-router-dom";
import FormButton from "../Shared/FormButton";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      await register({ username, password, phone });
      setUsername("");
      setPhone("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };
  const handleChange = (e, setter) => {
    setter(e.target.value);
  };
  return (
    <form className="container" onSubmit={registerHandler}>
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
              type="tel"
              name="phone"
              id="phone"
              value={phone}
              onChange={(e) => handleChange(e, setPhone)}
              placeholder="Phone"
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
          <FormButton text="Register" />
          <p>
            Already have an account?{" "}
            <Link className="link" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
