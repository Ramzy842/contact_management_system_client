import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Header = ({
  user,
  showAdd,
  setShowAdd,
  setHeaderHeight,
}) => {
  const navigate = useNavigate();
  const headerRef = useRef();
  const handleClick = () => {
    setShowAdd(!showAdd);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedSystemUser");
    navigate("/login");
  };

  useEffect(() => {
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight;
      setHeaderHeight(height);
    }
  }, [setHeaderHeight]);

  return (
    <header ref={headerRef}>
      <h1 className="greeting">Welcome back {user.username}</h1>
      <button className="add_contact" onClick={handleClick}>
        {showAdd ? "Cancel" : "Add contact"}
      </button>
      <button className="logout" onClick={handleLogout}>
        Log out
      </button>
    </header>
  );
};

export default Header;
