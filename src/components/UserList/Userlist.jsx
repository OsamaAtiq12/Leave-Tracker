import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

import Table from "react-bootstrap/Table";
import { Button, Modal } from "react-bootstrap";
import "./table.css";
function Userlist() {
  const [EditingUser, setEditingUser] = React.useState(null);
  const [show, setShow] = React.useState(false);
  const [show2, setShow2] = React.useState(false);
  const handleClose = () => setShow(false);

  const [date, setdate] = React.useState("");

  const handleClose2 = () => setShow2(false);

  const handleShow = () => setShow(true);
  const [user, setuser] = React.useState([
    {
      id: "1",
      Name: "Fahad Shahid",
      email: "Fahadshahid@live.com",
      probation: "11/01/2018",
      type: "HR",
    },

    {
      id: "2",
      Name: "Ali",
      email: "Ali@live.com",
      probation: "11/01/2018",
      type: "Manager",
    },

    {
      id: "3",
      Name: "Osama",
      email: "Osama@live.com",
      probation: "11/01/2018",
      type: "Employee",
    },
  ]);
  const handleDelete = (index, e) => {
    setuser(user.filter((v, i) => i !== index));
    handleClose(true);
  };

  const onedituser = (record) => {
    console.log(record);

    const [day, month, year] = record.probation.split("/");
    const date = `${year}-${month}-${day}`;

    setdate(date);

    setShow2(true);
    setEditingUser({ ...record });
  };

  const resetEditing = () => {
    setShow2(false);
    setEditingUser(null);
  };

  const datashow = user.map((value, index) => {
    return (
      <>
        <tbody>
          <tr>
            <td>{value.id}</td>
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
                            value={EditingUser?.Name}
                            type="text"
                            className="form-control input1"
                            placeholder="Enter Name"
                            required
                            onChange={(e) => {
                              setEditingUser((pre) => {
                                return { ...pre, Name: e.target.value };
                              });
                            }}
                          />
                        </div>

                        <div className="mb-3">
                          <label>Email address</label>
                          <input
                            value={EditingUser?.email}
                            type="email"
                            className="form-control input1"
                            placeholder="Enter email"
                            required
                            onChange={(e) => {
                              setEditingUser((pre) => {
                                return { ...pre, email: e.target.value };
                              });
                            }}
                          />
                        </div>

                        <div className="mb-3 input-div">
                          <label>Probation Period</label>
                          <input
                            value={date}
                            type="date"
                            className="form-control input1"
                            required
                            onChange={(e) => {
                              setEditingUser((pre) => {
                                setdate(e.target.value);
                                return {
                                  ...pre,
                                  probation: e.target.value,
                                };
                              });
                            }}
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
                            checked={EditingUser?.type === "Manager"}
                            onChange={(e) => {
                              setEditingUser((pre) => {
                                return { ...pre, type: e.target.value };
                              });
                            }}
                            //   onChange={handlecheck1}
                          />
                          <label> Hr </label>
                          <input
                            className="check"
                            name="pos"
                            type="radio"
                            value="HR"
                            checked={EditingUser?.type === "HR"}
                            onChange={(e) => {
                              setEditingUser((pre) => {
                                return { ...pre, type: e.target.value };
                              });
                            }}

                            //   onChange={handlecheck2}
                          />
                          <label>Employee </label>
                          <input
                            className="check"
                            name="pos"
                            type="radio"
                            value="Employee"
                            checked={EditingUser?.type === "Employee"}
                            onChange={(e) => {
                              setEditingUser((pre) => {
                                return { ...pre, type: e.target.value };
                              });
                            }}

                            //   onChange={handlecheck3}
                          />
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
                    <Button
                      variant="primary"
                      onClick={() => {
                        setuser((pre) => {
                          return pre.map((user) => {
                            if (user.id === EditingUser?.id) {
                              return EditingUser;
                            } else {
                              return user;
                            }
                          });
                        });
                        resetEditing();
                      }}
                    >
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
                      onClick={(e) => handleDelete(index, e)}
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
