import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null)
  return (
    <Routes>
      <Route path="/register" element={<Register setUser={setUser} user={user} />} />
      <Route path="/login" element={<Login setUser={setUser} user={user} />} />
      <Route path="/" element={<Home setUser={setUser} user={user} />}  />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
