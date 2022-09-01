import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

import Table from "react-bootstrap/Table";
import { Button, Modal } from "react-bootstrap";
import "./table.css";
import axios from "axios";
function Userlist() {
  const [EditingUser, setEditingUser] = React.useState(null);
  const [show, setShow] = React.useState(false);
  const [show2, setShow2] = React.useState(false);
  const handleClose = () => setShow(false);
  const [Role, setRole] = React.useState();
  const [date, setdate] = React.useState("");
  const [list2, setnamelist] = React.useState([{}]);
  const handleClose2 = () => setShow2(false);
  const url = "https://pkdservers.com/LeaveTracker/api/AuthUser/GetAllUsers ";
  const handleShow = () => setShow(true);
  const [id, setid] = React.useState();

  const [name, setname] = React.useState("");
  const [email, setemail] = React.useState("");
  const [role, setnewRole] = React.useState("");

  const [token, setToken] = React.useState();

  React.useEffect(() => {
    const Token = localStorage.getItem("token");
    setToken(Token);
  }, []);
  const getdata = async () => {
    try {
      const response = await axios.get(url);
      console.log(JSON.stringify(response.data));
      setnamelist(response.data);
      console.log(list2);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getdata();
  }, []);

  const handleDelete = async (Id, e) => {
    const Token = localStorage.getItem("token");
    console.log(Token);
    try {
      const response1 = await axios.get(
        "https://pkdservers.com/LeaveTracker/api/AuthUser/DeleteUser?Id=" + Id,
        {
          headers: {
            Authorization: "Bearer" + " " + Token,
          },
        }
      );
      console.log(response1);
    } catch (error) {
      console.log(error);
    }

    const getdata = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: "Bearer" + " " + Token,
          },
        });
        console.log(JSON.stringify(response.data));
        setnamelist(response.data);
        console.log(list2);
      } catch (error) {
        console.log(error);
      }
    };
    getdata();

    handleClose(true);
  };

  const HandleEdit = async () => {
    const Token = localStorage.getItem("token");
    console.log(Token);

    const url = "https://pkdservers.com/LeaveTracker/api/AuthUser/UpdateUser";

    const api_date = new Date(date).toISOString();
    console.log(api_date);
    console.log(Role);
    const data = {
      Id: id,
      Name: name,
      Email: email,
      Role: Role,
      Probation: api_date,
    };

    try {
      axios
        .post(url, data, {
          headers: {
            Authorization: "Bearer" + " " + token,
          },
        })
        .then((res) => {
          getdata();
        });
    } catch (error) {
      console.log(error);
    }

    setShow2(false);
  };

  const onedituser = (record) => {
    console.log(record.Roles);

    setid(record.Id);

    if (record.Roles.includes("Manager") && record.Roles.includes("Employee")) {
      setRole("Manager");
    }

    if (record.Roles.includes("HR") && record.Roles.includes("Employee")) {
      setRole("HR");
    }

    if (
      record.Roles.includes("Employee") &&
      !record.Roles.includes("HR") &&
      !record.Roles.includes("Manager")
    ) {
      console.log("in employee");
      setRole("");
    }
    const today = new Date(record.probation);
    const my_date = today.toISOString().split("T")[0];
    const my_finaldate = my_date.split("-").reverse().join("/");
    const [day, month, year] = my_finaldate.split("/");
    const date = `${year}-${month}-${day}`;
    setname(record.Name);
    setdate(date);
    setemail(record.Email);

    setShow2(true);
    setEditingUser({ ...record });
    console.log(EditingUser);
  };

  const resetEditing = () => {
    setShow2(false);
    setEditingUser(null);
  };

  const handlename = (e) => {
    setname(e.currentTarget.value);
  };
  const handleemail = (e) => {
    setemail(e.currentTarget.value);
  };
  const handledate = (e) => {
    setdate(e.currentTarget.value);
  };

  const handleRole = (e) => {
    setRole(e.currentTarget.value);
    console.log("hello");
  };

  React.useEffect(() => {
    console.log(Role);
  });
  const datashow = list2.map((value, index) => {
    return (
      <>
        <tbody>
          <tr>
            <td>{index}</td>
            <td>{value.Name}</td>

            <td>
              <>
                <a href="#" className="edit" title="Edit" data-toggle="tooltip">
                  <i
                    className="material-icons"
                    onClick={() => {
                      onedituser(value);
                    }}
                  >
                    &#xE254;
                  </i>
                </a>
                <Modal
                  ClassName="custom-dialog"
                  show={show2}
                  onHide={handleClose2}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Editing Data </Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <form>
                      <div className="login-style">
                        <div className="mb-3">
                          <label>Name</label>
                          <input
                            value={name}
                            type="text"
                            className="form-control input1"
                            placeholder="Enter Name"
                            required
                            onChange={handlename}
                          />
                        </div>

                        <div className="mb-3">
                          <label>Email address</label>
                          <input
                            value={email}
                            type="email"
                            className="form-control input1"
                            placeholder="Enter email"
                            required
                            onChange={handleemail}
                          />
                        </div>

                        <div className="mb-3 input-div">
                          <label>Probation Period</label>
                          <input
                            value={date}
                            type="date"
                            className="form-control input1"
                            required
                            onChange={handledate}
                          />
                        </div>

                        <div className="mb-3 input-div">
                          <label className="type-style">Choose Type </label>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <input
                            className="check"
                            type="radio"
                            value="Manager"
                            name="pos"
                            checked={Role === "Manager"}
                            onChange={handleRole}
                            //   onChange={handlecheck1}
                          />
                          <label> Manager </label>
                          <input
                            className="check"
                            name="pos"
                            type="radio"
                            value="HR"
                            checked={Role === "HR"}
                            onChange={handleRole}

                            //   onChange={handlecheck2}
                          />
                          <label> Hr </label>
                          <input
                            className="check"
                            name="pos"
                            type="radio"
                            value=""
                            checked={Role === ""}
                            onChange={handleRole}

                            //   onChange={handlecheck3}
                          />
                          <label>Employee </label>
                        </div>

                        <div className="mb-3 input-div">
                          <div className="custom-control custom-checkbox"></div>
                        </div>
                        <div className="d-grid"></div>
                      </div>
                    </form>
                  </Modal.Body>

                  <Modal.Footer>
                    <Button variant="secondary" onClick={resetEditing}>
                      Cancel
                    </Button>
                    <Button variant="primary" onClick={HandleEdit}>
                      Save
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
              <>
                <a
                  href="#"
                  className="delete"
                  title="Delete"
                  data-toggle="tooltip"
                  style={{ color: "red" }}
                >
                  <i className="material-icons" onClick={handleShow}>
                    &#xE872;
                  </i>
                </a>

                <Modal
                  ClassName="custom-dialog"
                  show={show}
                  onHide={handleClose}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Are you Sure you want to delete the record
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button
                      variant="primary"
                      onClick={(e) => handleDelete(value.Id, e)}
                    >
                      Delete
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            </td>
          </tr>
        </tbody>
      </>
    );
  });

  return (
    <div className="container ">
      <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
        <div className="row ">
          <div className="col-sm-3 mt-5 mb-4 text-gred"></div>
          <div
            className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred"
            style={{ color: "green" }}
          >
            <h2>
              <b className="head-color">User List</b>
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="table-responsive ">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>

                  <th>Action</th>
                </tr>
              </thead>
              {datashow}
            </Table>
          </div>
        </div>

        {/* <!--- Model Box ---> */}
      </div>
    </div>
  );
}

export default Userlist;
