import React, { useState,useEffect } from "react";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = "Register";
  },[]);


  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/register", {
        email,
        password,
      });

      console.log(response.data);
      // Lakukan penanganan setelah registrasi berhasil
      alert("Kamu berhasil regis, kembali ke menu login");
    } catch (error) {
      console.error("Registration error:", error.response.data.message);
      alert("Registration error: " + error.response.data.message);
      // Lakukan penanganan jika registrasi gagal
    }
  };

  return (
    <section className="container-regis">
      <div className="content-regis">
        <div className="title-regis">
          <p>Register</p>
        </div>
        <form onSubmit={handleRegister}>
          <div className="list">
            <div className="regis name">
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
            <div className="regis amount">
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
          <button className="regis-button" type="submit">
            Register
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
