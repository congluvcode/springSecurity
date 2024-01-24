import { useState } from "react";
import {
  loginAPICall,
  saveLoggedInUser,
  storeToken,
} from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLoginForm(e) {
    e.preventDefault();
    const login = { username, password };
    console.log(login);
    loginAPICall(username, password)
      .then((response) => {
        console.log(response.data);
        const token = "Bearer " + response.data.accessToken;
        const role = response.data.role;

        storeToken(token);
        saveLoggedInUser(username, role);
        navigate("/todos");

        window.location.reload(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <div className="container">
      <br />
      <br />
      <div className="row d-flex justify-content-center ">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">User Registration Form</h2>
            </div>
            <div className="card-body">
              <form action="">
                <div className="row mb-3">
                  <label className="col-md-3 control-label">
                    UsernameOrEmail
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter username"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-md-3 control-label">Password</label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      name="password"
                      placeholder="Enter password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group mb-3">
                  <button
                    className="btn btn-primary"
                    onClick={(e) => handleLoginForm(e)}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
