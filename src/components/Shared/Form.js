import React from "react";
import "../../styles/forms.css";
import RegisterForm from "../Register/RegisterForm.js";
import LoginForm from "../Login/LoginForm";

const Form = ({ type, setUser }) => {
  return type === "register" ? (
    <RegisterForm />
  ) : (
    <LoginForm setUser={setUser} />
  );
};

export default Form;
