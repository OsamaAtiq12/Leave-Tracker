import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
// import "./Login.css";
import "./User.css";
import "bootstrap/dist/css/bootstrap.min.css";
function AddnewUser() {
  const [name, setname] = React.useState("");
  const [email, setemail] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [conpass, setConfirmpass] = React.useState("");
  const [Date, setDate] = React.useState("");
  const [check1, setcheck1] = React.useState("");
  const [check2, setcheck2] = React.useState("");
  const [check3, setcheck3] = React.useState("");

  const handlename = (e) => {
    setname(e.target.value);
  };
  const handleEmail = (e) => {
    setemail(e.target.value);
  };
  const handlesetpass = (e) => {
    setpassword(e.target.value);
  };
  const handleconpass = (e) => {
    setConfirmpass(e.target.value);
  };
  const handleDate = (e) => {
    setDate(e.target.value);
  };
  const handlecheck1 = (e) => {
    setcheck1(e.target.value);
  };
  const handlecheck2 = (e) => {
    setcheck2(e.target.value);
  };
  const handlecheck3 = (e) => {
    setcheck3(e.target.value);
  };
  function validate() {
    if (
      conpass === password &&
      name !== "" &&
      email !== "" &&
      conpass !== "" &&
      password !== "" &&
      Date !== ""
    ) {
      if (check1 !== "" || check2 !== "" || check3 !== "") {
        return true;
      }
    }
  }

  return (
    <>
      <form>
        <div className="login-style">
          <h3>Add new User</h3>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control input"
              placeholder="Enter Name"
              required
              onChange={handlename}
            />
          </div>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control input"
              placeholder="Enter email"
              required
              onChange={handleEmail}
            />
          </div>
          <div className="mb-3 input-div">
            <label>Password</label>
            <input
              type="password"
              className="form-control input"
              required
              onChange={handlesetpass}
            />
          </div>

          <div className="mb-3 input-div">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control input"
              required
              onChange={handleconpass}
            />
          </div>

          {password !== conpass ? (
            <p className="validate">Password Does Not Match </p>
          ) : (
            " "
          )}

          <div className="mb-3 input-div">
            <label>Probation Period</label>
            <input
              value={Date}
              type="date"
              className="form-control input"
              required
              onChange={handleDate}
            />
          </div>

          <div className="mb-3 input-div">
            <label className="type-style">Choose Type </label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label> Manager </label>
            <input
              className="check"
              type="radio"
              value="Manager"
              name="pos"
              onChange={handlecheck1}
            />
            <label> Hr </label>
            <input
              className="check"
              name="pos"
              type="radio"
              value="Hr"
              onChange={handlecheck2}
            />
            <label>Employee </label>
            <input
              className="check"
              name="pos"
              type="radio"
              value="Employee"
              onChange={handlecheck3}
            />
          </div>

          <div className="mb-3 input-div">
            <div className="custom-control custom-checkbox"></div>
          </div>
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary  btn"
              disabled={!validate()}
            >
              Add User
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default AddnewUser;
