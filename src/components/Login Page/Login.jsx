import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
function Login() {
  const navigate = useNavigate();
  const navigate1 = useNavigate();
  const email = useRef();
  const password = useRef();
  const getemail = localStorage.getItem("emailData");
  const getpassword = localStorage.getItem("passwordData");
  const getemailhr = localStorage.getItem("emailDatahr");
  const getpasswordhr = localStorage.getItem("passwordDatahr");
  React.useEffect(() => {
    if (getemail && getpassword) {
      console.log(getemail && getpassword);
      navigate("/");
    }
  }, []);

  React.useEffect(() => {
    if (getemailhr && getpasswordhr) {
      navigate1("/hrHome");
    }
  }, []);
  const handleSubmit = () => {
    if (
      email.current.value === "osama.517@live.com" &&
      password.current.value === "12345"
    ) {
      localStorage.setItem("emailData", "osama.517@live.com");
      localStorage.setItem("passwordData", "12345");
    }

    if (
      email.current.value === "hr@live.com" &&
      password.current.value === "1234"
    ) {
      localStorage.setItem("emailDatahr", "hr@live.com");
      localStorage.setItem("passwordDatahr", "1234");
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
          />
        </div>
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
