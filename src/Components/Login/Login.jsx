import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:4000/checkLogged")
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          console.log(res.data.user);
          
          navigate("/home");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogin = async (e) => {
    await axios
      .post("http://localhost:4000/login", { email, password })
      .then((response) => {
        if (response.data.success) {
          console.log(response.data);
          navigate("/home");
        } else {
          console.log(response.data);
          navigate("/login");
          setError(response.data.error);
          setTimeout(() => {
            setError("");
          }, 2000);
        }
      });
  };

  return (
    <div className="container">
      <h2>USER LOGIN</h2>
      {error && <p className="text-danger">{error}</p>}
      <form>
        <div className="form-group">
          <label>Email</label>
          <br />
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <br />
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <a type="button" className="btn btn-primary mb-2" onClick={handleLogin}>
          Login
        </a>
        <a
          type="button"
          className="btn btn-warning"
          onClick={() => navigate("/adminLogin")}
        >
          Login as Admin
        </a>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
