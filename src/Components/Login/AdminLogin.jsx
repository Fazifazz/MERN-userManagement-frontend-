import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleLogin = async (e) => {
    await axios
      .post("http://localhost:4000/adminLogin", { email, password })
      .then((response) => {
        if (response.data.success) {
          console.log(response.data);
          navigate("/dashboard");
        } else {
          console.log(response.data);
          navigate("/adminLogin");
          setError(response.data.error)
           setTimeout(() => {
          setError("");
        }, 2000);
        }
      });
  };

  useEffect(() => {
    axios.get("http://localhost:4000/adminLogin").then((res) => {
      if (res.data.success) {
        navigate("/adminLogin");
      } else {
        navigate("/dashboard");
      }
    });
  }, []);

  return (
    <div className="container">
      <h2>ADMIN LOGIN</h2>
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
      </form>
      <a className="btn btn-warning" onClick={() => navigate("/login")}>
        Back to User Login
      </a>
    </div>
  );
};

export default AdminLogin;
