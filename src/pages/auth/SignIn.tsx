import "./SignIn.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "@/constant/appConstant";
import { saveAuth } from "@/auth/authStorage";
import { useAuth } from "@/auth/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const [form, setForm] = useState({
    user_value: "",
    user_password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`${BASE_URL}users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const result = await res.json();

    if (!res.ok) throw new Error(result.message);

    const { token, user } = result.data;
    const { user_password, ...safeUser } = user;

    saveAuth(token, safeUser);
    setIsAuthenticated(true);

    setTimeout(() => {
      localStorage.clear();
      window.location.href = "/";
    }, 5 * 60 * 1000);

    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Sign In</h1>
        <p className="login-subtitle">Welcome back. Please login.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            className="login-input"
            name="user_value"
            placeholder="Email or Phone"
            onChange={(e) => setForm({ ...form, user_value: e.target.value })}
          />

          <input
            className="login-input"
            type="password"
            name="user_password"
            placeholder="Password"
            onChange={(e) =>
              setForm({ ...form, user_password: e.target.value })
            }
          />

          <button className="login-button" type="submit">
            Login
          </button>
        </form>

        <div className="login-footer">
          © {new Date().getFullYear()} New Shivali Washing Company
        </div>
      </div>
    </div>
  );
};

export default Login;
