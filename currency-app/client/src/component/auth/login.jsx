import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMessage, setIsMessage] = useState("");

  useEffect(() => {
    document.title = "Login";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return setIsMessage("Isi dong formnya");
    } else {
      try {
        const response = await axios.post("http://localhost:3001/api/login", {
          email,
          password,
        });

        // Simpan informasi pengguna setelah login
        console.log(response.data.user);
        login(response.data.user);

        // Lakukan penanganan setelah login berhasil
        alert("Login successful");
      } catch (error) {
        // Lakukan penanganan jika login gagal
        alert(error.response.data.message);
      }
    }
  };

  return (
    <section className="container-login">
      <div className="content-login">
        <div className="title-login">
          <p>Login</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="list">
            <div className="login name">
              <label htmlFor="email">Email</label>
              <br />
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
            <div className="login amount">
              <label htmlFor="password">Password</label>
              <br />
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
          </div>
          {isMessage && <p className="error-message" style={{ color: "red" }}>{isMessage}</p>}
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
