import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addUser,
  clearUsers,
  searchUser,
} from "../../slices/userSlice";
import { FaSignOutAlt } from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate("");
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [searchItem, setSearch] = useState("");
  axios.defaults.withCredentials = true;
  const users = useSelector((state) => state.users);

  useEffect(() => {
    axios
      .get("http://localhost:4000/checkAdminLogged")
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          navigate("/dashboard");
        } else {
          navigate("/adminlogin");
        }
      })
      .catch((err) => console.log(err));

    axios.get("http://localhost:4000/getUsers").then((res) => {
      if (res.data.success && res.data.users) {
        dispatch(clearUsers());
        dispatch(addUser(res.data.users));
      } else {
        setError("No users");
      }
    });
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    await axios.get("http://localhost:4000/adminLogout").then((res) => {
      if (res.data.success) {
        navigate("/adminLogin");
      } else {
        navigate("/dashboard");
      }
    });
  };
  const handleDelete = (id) => {
    axios
      .post("http://localhost:4000/deleteUser", { userId: id })
      .then((res) => {
        if (res.data.success) {
          dispatch(clearUsers());
          dispatch(addUser(res.data.users));
          navigate("/dashboard");
        } else {
          console.log("delete failed");
          navigate("/dashboard");
        }
      });
  };

  const handleSearch = () => {
    dispatch(searchUser(searchItem));
  };
  const handleClearSearch = () => {
    axios.get("http://localhost:4000/getUsers").then((res) => {
      if (res.data.success && res.data.users) {
        dispatch(clearUsers());
        dispatch(addUser(res.data.users));
      } else {
        setError("No users");
      }
    });
  };

  const EditUser = (id) => {
    const user = users.filter((user) => user._id === id);
    if (user) {
      navigate("/editUser", { state: { userDetails:user } });
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="text-dark">
            <h2>Admin Dashboard</h2>
          </a>
          {error && <p className="text-danger">{error}</p>}
          <div className="collapse navbar-collapse"></div>
          <a
            className="btn btn-outline-warning rounded-pill ms-2"
            onClick={() => navigate("/createUser")}
          >
            Add User
          </a>
          <form action="/admin/dashboard" method="GET">
            <div className="d-flex">
              <input
                type="search"
                name="q"
                value={searchItem}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search user"
                className="form-control rounded-pill"
              />
              <a
                type="button"
                className="btn btn-success rounded-pill"
                onClick={handleSearch}
              >
                search
              </a>
              <a
                type="submit"
                className="btn btn-outline-success rounded-pill"
                onClick={handleClearSearch}
              >
                clear
              </a>
              <a className="btn ms-2" onClick={handleLogout}>
                <FaSignOutAlt />
              </a>
            </div>
          </form>
        </div>
      </nav>

      <div className="mt-4">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Verified</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>{user.isVerified ? "yes" : "no"}</td>
                  <td>
                    <div>
                      <a
                        type="button"
                        className="btn btn-primary w-25 mr-5"
                        onClick={() => EditUser(user._id)}
                      >
                        Edit
                      </a>
                      <a
                        type="button"
                        className="btn btn-danger w-25"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
