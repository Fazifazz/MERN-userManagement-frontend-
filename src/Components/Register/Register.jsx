import React, { useState, useEffect } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
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
          navigate("/register");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:4000/register", { name, email, mobile, password })
      .then((response) => {
        if (response.data.success) {
          console.log(response.data);
          navigate("/login");
        } else {
          navigate("/register");
          setError(response.data.error);
          setTimeout(() => {
            setError("");
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <h2>Register</h2>
      {error && <p className="text-danger">{error}</p>}
      <form>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Mobile:</label>
          <input
            type="number"
            className="form-control"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <a type="button" className="btn btn-primary" onClick={handleRegister}>
          Register
        </a>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
