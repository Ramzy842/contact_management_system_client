import React, { useEffect } from "react";
import Form from "../components/Shared/Form";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedSystemUser");
    if (loggedUser) navigate("/");
  }, [navigate]);
  return <Form type="register" />;
};

export default Register;
