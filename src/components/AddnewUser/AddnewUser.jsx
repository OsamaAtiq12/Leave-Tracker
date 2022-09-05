import React, { useRef } from "react";
import DatePicker from "react-date-picker";
// import "./Login.css";
import "./User.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
function AddnewUser() {
  const [name, setname] = React.useState("");
  const [email, setemail] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [conpass, setConfirmpass] = React.useState("");
  const [date, setDate] = React.useState("");
  const [check, setcheck] = React.useState("");
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
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
  const handleDate = (date) => {
    setDate(date);
  };
  const handlecheck = (e) => {
    setcheck(e.target.value);
  };

  function validate() {
    if (
      conpass === password &&
      name !== "" &&
      email !== "" &&
      conpass !== "" &&
      password !== "" &&
      date !== ""
    ) {
      if (check !== "") {
        return true;
      }
    }
  }

  const Handelreset = (e) => {
    e.preventDefault();
    e.target.reset();
    setDate();
  };

  const Handeldata = (e) => {
    e.preventDefault();

    const start_date = new Date(date).toISOString();
    console.log(start_date);
    const data = {
      Name: name,
      Email: email,
      Password: password,
      ConfirmPassword: conpass,
      Role: "Employee",
      SecondRole: check,
      probationEndDate: date,
    };
    console.log(data);

    try {
      axios
        .post("https://pkdservers.com/LeaveTracker/api/Account/Register", data)
        .then((res) => {
          console.log(res.data);
        })
        .then(() => {});
    } catch (err) {
      console.log(err);
    }
    setShow(true);

    setTimeout(() => setShow(false), 2000);
    e.target.reset();
  };

  return (
    <>
      <form onSubmit={Handelreset}>
        <div className="login-style">
          <h3>Add new User</h3>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control input"
              placeholder="Enter Name"
              onChange={handlename}
            />
          </div>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control input"
              placeholder="Enter email"
              onChange={handleEmail}
            />
          </div>
          <div className="mb-3 input-div">
            <label>Password</label>
            <input
              type="password"
              className="form-control input"
              onChange={handlesetpass}
            />
          </div>

          <div className="mb-3 input-div">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control input"
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
            <DatePicker
              className="form-control input r"
              placeholder="Enter End Date"
              value={date}
              onChange={(date) => handleDate(date)}
            />
          </div>

          <div className="mb-3 input-div" onChange={handlecheck}>
            <label className="type-style">Choose Type </label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input className="check" type="radio" value="Manager" name="pos" />
            <label> Manager </label>
            <input className="check" name="pos" type="radio" value="Hr" />
            <label> Hr </label>
            <input className="check" name="pos" type="radio" value="Employee" />
            <label>Employee </label>
          </div>

          <div className="mb-3 input-div">
            <div className="custom-control custom-checkbox"></div>
          </div>
          <div className="d-grid">
            <div className="btn-area">
              {" "}
              <button
                type="submit"
                className="btn btn-primary  btn"
                disabled={!validate()}
                onClick={Handeldata}
              >
                Add User
              </button>
              <button type="submit" className="btn btn-danger  btn  ">
                Reset
              </button>{" "}
            </div>
          </div>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>User Add</Modal.Title>
            </Modal.Header>
            <Modal.Body>User Successfully added</Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
        </div>
      </form>
    </>
  );
}

export default AddnewUser;
