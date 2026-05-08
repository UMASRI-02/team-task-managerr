import { useState } from "react";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("member");

  const signup = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        {
          name,
          email,
          password,
          role,
        }
      );

      alert("Signup Successful");
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <div>
      <h2>Signup</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <select onChange={(e) => setRole(e.target.value)}>
        <option value="member">Member</option>
        <option value="admin">Admin</option>
      </select>

      <button onClick={signup}>Signup</button>
    </div>
  );
}

export default Signup;