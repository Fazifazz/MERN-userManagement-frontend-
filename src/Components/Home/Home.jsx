import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addLoggedUser } from "../../slices/LoggedUser";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  axios.defaults.withCredentials = true;
  const user = useSelector((state)=> state.loggedUsers)

  useEffect(() => {
    console.log('hy, iam inside')
    axios
      .get("http://localhost:4000/userHome")
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          console.log(res.data.user);
          dispatch(addLoggedUser(res.data.user));
          navigate("/home");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const cardStyle = {
    borderRadius: '15px',
    backgroundColor: '#f9f9f9',
  };
  const imageStyle = {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    overflow: "hidden",
    margin: "0 auto",
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
  };

  const handleLogout = ()=>{
    axios.get('http://localhost:4000/userLogout')
    .then(response=>{
      if(response.data.success){
        navigate('/login')
        console.log('logout success')
      }else{
        navigate('/home')
        console.log('logout failed')
      }
    })
  }

  const handleEditProfile = ()=>{
    navigate('/editProfile',{state:{user}})
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand text-dark" href="/home">
            Welcome {user.name}
          </a>
          <a type="button" className="btn btn-danger" onClick={handleLogout}>Logout</a>
        </div>
      </nav>
      <div class="row d-flex justify-content-center align-items-center h-100 mt-5">
        <div class="col col-md-9 col-lg-7 col-xl-5">
          <div
            class="card"
            style={cardStyle}
          >
            <div class="card-body p-4 text-black">
              <div>
                <h2 class="mb-4">My Profile</h2>
                <div class="d-flex align-items-center justify-content-between mb-3">
                  <p class="small mb-0">
                    <i class="me-2"></i>
                  </p>
                  <p class="fw-bold mb-0">{user.isVerified?'verified':'Not verified'}</p>
                </div>
              </div>
              <div class="d-flex align-items-center mb-4">
              <div style={imageStyle}>
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    src={`http://localhost:4000/profile/${user.profile}`}
                    alt="Profile"
                  />
                </div>
                <div class="flex-grow-1 ms-3">
                  <div class="ml-5">
                    <p class="mb-0 me-2">
                      <b>Name: </b>
                      {user.name}
                    </p>
                    <p class="mb-0 me-2">
                      <b>Email: </b>
                     {user.email}
                    </p>
                    <p class="mb-0 me-2">
                      <b>Mobile Number: </b>
                      {user.mobile}
                    </p>
                  </div>
                </div>
              </div>
              {/* <hr /> */}
              <p class="my-4 pb-1"></p>
              <a
              onClick={handleEditProfile}
                class="btn btn-primary btn-rounded btn-block btn-sm mt-0"
              >
                <i class="me-2"></i>Edit Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
