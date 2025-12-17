import "./auth.css";
import { useState } from "react";

const BASE_URL = "http://13.49.222.163:3000/users/users";

const Login = () => {
  const [credentials, setCredentials] = useState({
    user_email: "",
    user_password: "",
  });

  const handleChange = (e) => {
    ``;
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      console.log("Login Success:", data);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="user_email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        name="user_password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
