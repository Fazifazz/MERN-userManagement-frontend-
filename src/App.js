import "./App.css";
import Login from "./Components/Login/Login";
import { Route, Routes } from "react-router-dom";
import Register from "./Components/Register/Register";
import Home from "./Components/Home/Home";
import AdminLogin from "./Components/Login/AdminLogin";
import Dashboard from "./Components/Dashboard/Dashboard";
import CreateUser from "./Components/Dashboard/CreateUser";
import EditProfile from "./Components/Home/EditProfile";
import EditUser from "./Components/Dashboard/EditUser";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route  path="/login" element={<Login />} />
        <Route  path="/register" element={<Register />} />
        <Route  path="/home" element={<Home />} />
        <Route  path="/adminLogin" element={<AdminLogin />} />
        <Route  path="/dashboard" element={<Dashboard />} />
        <Route  path="/createUser" element={<CreateUser />} />
        <Route  path="/editUser" element={<EditUser />} />
        <Route  path="/editProfile" element={<EditProfile />} />
      </Routes>
    </div>
  );
}

export default App;
