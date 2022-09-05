import React, { useEffect, useRef } from "react";
import { ReactDialogBox } from "react-js-dialog-box";
import "react-js-dialog-box/dist/index.css";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Modal } from "bootstrap";
import Button from "mui-button";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
function Login() {
  const url = "https://pkdservers.com/LeaveTracker/api/AuthUser/Login";
  const navigate = useNavigate();

  const email = useRef();
  const password = useRef();

  const [email1, setemail] = React.useState();
  const [pass, setpass] = React.useState();
  const [msg, setErrromessage] = React.useState();

  const handleemail = (e) => {
    setemail(e.target.value);
  };

  const handlepass = (e) => {
    setpass(e.target.value);
  };

  // React.useEffect(() => {
  //   var getrole = localStorage.getItem("role");
  //   var final_role = [];
  //   if (getrole) {
  //     final_role = getrole.split(",");
  //   }
  //   if (final_role.includes("Manager") && final_role.includes("Employee")) {
  //     setLogg(true);
  //   }
  // }, []);

  useEffect(() => {
    localStorage.clear();
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios
        .post(url, {
          username: email1,
          Password: pass,
        })
        .then((response) => {
          localStorage.setItem("role", response.data.role);
          const token_data = JSON.parse(response.data.user);

          localStorage.setItem("token", token_data.access_token);

          localStorage.setItem("username", token_data.userName);

          localStorage.setItem("ID", response.data.id);

          var getrole = localStorage.getItem("role");
          var final_role = [];
          if (getrole) {
            final_role = getrole.split(",");
          }
          if (final_role.includes("Manager")) {
            navigate("/");
            window.location.reload();
          }

          if (final_role.includes("Employee")) {
            navigate("/");
            window.location.reload();
          }

          if (final_role.includes("HR")) {
            navigate("/hrHome");
            window.location.reload();
          }
        });

      const roles = response?.data?.roles;
    } catch (err) {
      if (!err?.response) {
        console.log("no response");
      } else if (err.response?.status === 500) {
        setErrromessage("Invalid Credentials Please Try Again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="login-style">
        <style>
          {
            "body {background-image: linear-gradient(to right, skyblue , white); }"
          }
        </style>
        <h3>Sign In To Leave Tracker System</h3>
        <br />
        <div className="mb-3">
          <label className="log-head">Email address</label>
          <input
            type="email"
            className="form-control input"
            placeholder="Enter email"
            required
            ref={email}
            onChange={handleemail}
          />
        </div>
        <div className="mb-3 input-div">
          <label className="log-head">Password</label>
          <input
            type="password"
            className="form-control input"
            placeholder="Enter password"
            required
            ref={password}
            onChange={handlepass}
          />
        </div>

        <label className="error-msg">{msg}</label>
        <div className="mb-3 input-div">
          <div className="custom-control custom-checkbox"></div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary  btn">
            Login
          </button>
        </div>
      </div>
    </form>
  );
}

export default Login;
