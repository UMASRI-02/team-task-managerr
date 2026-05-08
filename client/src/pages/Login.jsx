import { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.role);

      alert("Login Successful");

      window.location.reload();
    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <div className="login-page">

      {/* LEFT SIDE */}
      <div className="left-side">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="login"
        />

        <h1>Team Task Manager</h1>

        <p>
          Manage projects, tasks and team workflow easily.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="right-side">

        <div className="login-box">

          <h2>Log In</h2>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={login}>
            Login
          </button>

          

        </div>

      </div>

    </div>
  );
}

export default Login;