import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./component/navbar.jsx";
import Home from "./pages/Home.jsx";
import Saving from "./pages/Saving.jsx";
import About from "./pages/About.jsx";
import Login from "./component/auth/login.jsx";
import Register from "./component/auth/Register.jsx";

function App() {
  return (
    <div className="app">
      <header>
        <Navbar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saving" element={<Saving />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
