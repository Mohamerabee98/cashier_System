import { useState } from "react";
import { loginUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await loginUser(form);

      const token = res?.data?.token;
      const user = res?.data?.user;

      if (!token || !user) {
        throw new Error("Invalid response from server");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // redirect based on role
      if (user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message || "Login failed. Check credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Cashier Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="login-input"
            onChange={handleChange}
            disabled={loading}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="login-input"
            onChange={handleChange}
            disabled={loading}
            required
          />

          <button className="login-btn" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        {error && <p className="login-error">{error}</p>}
      </div>
    </div>
  );
};

export default Login;