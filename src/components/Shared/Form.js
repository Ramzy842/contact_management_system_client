import React, {  useState } from "react";
import login from "../../services/login";
import {register} from "../../services/users";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../../services/contacts";

const Form = ({ type, setUser }) => {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  const navigate = useNavigate();
  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const user = await register({username, password, phone})
      console.log(user);
      setUsername('')
      setPhone('')
      setPassword('')
      navigate("/login")
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000)
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const user = await login({username, password})
      
      window.localStorage.setItem('loggedSystemUser', JSON.stringify(user))
      setToken(user.token)
      setUser(user);
      setUsername('')
      setPassword('')
      navigate("/")
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000)
    }
  };

  return type === "register" ? (
    <form onSubmit={registerHandler}>
      {errorMessage && <div>{errorMessage}</div>}
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
          type="text"
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
      <button type="submit">Register</button>
      <p>Already have an account? <Link to="/login" >Login</Link></p>
    </form>
  ) : (
    <form onSubmit={loginHandler}>
      {errorMessage && <div>{errorMessage}</div>}
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
      <button type="submit">Log in</button>
      <p>Don't have an account? <Link to="/register" >Register</Link></p>
    </form>
  );
};

export default Form;
