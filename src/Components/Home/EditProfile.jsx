import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addUser, clearUsers } from "../../slices/userSlice";

function EditProfile() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [image, setImage] = useState(null); // Use null to represent no image
  const [error, setError] = useState("");
  const location = useLocation();
  const { user } = location.state;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    if (user) {
      setName(user.name);
      setMobile(user.mobile);
      setImage(user.image);
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file)); // Set the image to the URL of the selected file
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/updateProfile", { name, mobile, image })
      .then((res) => {
        if (res.data.success) {
          dispatch(clearUsers());
          dispatch(addUser(res.data.users));
          navigate("/home");
        } else {
          navigate("/editProfile");
          setError(res.data.error);
          setTimeout(() => {
            setError("");
          }, 2000);
        }
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center ">
      <div className="square-div">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Edit profile</h4>
            {error && <p className="text-danger">{error}</p>}
            <form className="forms-sample" encType="multipart/form-data">
              <div className="form-group">
                <label htmlFor="exampleInputName1">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="exampleInputName1"
                  placeholder="Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputName1">Mobile</label>
                <input
                  type="number"
                  className="form-control"
                  name="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  id="exampleInputName1"
                  placeholder="Phone"
                />
              </div>

              <div className="form-group">
                <label>Profile Image</label>
                <div className="input-group col-xs-12">
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    className="form-control file-upload-info"
                    placeholder="Upload Image"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              <div className="form-group" id="preview-group">
                <div className="card">
                  <div className="card-header">Preview Image</div>
                  <div className="card-body">
                    <div className="d-flex justify-content-center">
                      <img
                        src={image}
                        // alt="img"
                        className="preview"
                        style={{ maxWidth: "440px", objectFit: "cover" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <a
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary mr-2"
              >
                Update
              </a>
              <a
                type="button"
                onClick={() => window.history.back()}
                className="btn btn-warning mt-2"
              >
                Cancel
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
