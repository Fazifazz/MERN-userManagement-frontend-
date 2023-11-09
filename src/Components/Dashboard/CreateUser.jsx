import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser,clearUsers } from "../../slices/userSlice";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [verify,setVerify] = useState(false)
  const [error,setError] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch()

  axios.defaults.withCredentials = true; 
  useEffect(()=>{
    axios
      .get("http://localhost:4000/checkAdminLogged")
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          navigate("/createUser");
        } else {
          navigate("/adminlogin");
        }
      })
      .catch((err) => console.log(err));
  },[])

  const handleAddUser = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/createUser',{name,email,mobile,password,verify})
    .then(res=>{
      if(res.data.success){
        console.log('new user created')
        dispatch(clearUsers())
        dispatch(addUser(res.data.users))
        navigate('/dashboard')
      }else{
        navigate('/createUser')
        setError(res.data.error)
        setTimeout(() => {
          setError('')
        }, 2000);
        console.log(res.data.error)
      }
    })
  };



  return (
    <div className="container">
      {error&&<p className="text-danger">{error}</p>}
      <h2>Add New User</h2>
      <form >
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
            type="text"
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
        <div class="mb-3">
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="is_varified"
              id="verify"
              checked={verify}
              onChange={() => setVerify(true)}
            />
            <label class="form-check-label" for="verify">
              Verify
            </label>
          </div>
        </div>
        <div class="mb-3">
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="is_varified"
              id="verify"
              checked={!verify}
              onChange={() => setVerify(false)}
            />
            <label class="form-check-label" for="verify">
              Not Verify
            </label>
          </div>
        </div>
        <a type="button" className="btn btn-primary" onClick={handleAddUser}>
          Add User
        </a>
      </form>
      <a
        className="btn btn-warning mt-2"
        onClick={() => navigate("/dashboard")}
      >
        Back
      </a>
    </div>
  );
};

export default CreateUser;
