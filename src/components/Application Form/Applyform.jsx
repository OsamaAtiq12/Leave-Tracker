import React from "react";
import DatePicker from "react-date-picker";
import "bootstrap/dist/css/bootstrap.min.css";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Modal, Button } from "react-bootstrap";
import "./Apply.css";
import axios from "axios";
function Applyform() {
  const url =
    "https://pkdservers.com/LeaveTracker/api/LeaveRequests/PostLeaveRequest";

  const url1 =
    "https://pkdservers.com/LeaveTracker/api/AuthUser/GetAllManagers";
  const [li, setli] = React.useState("");
  const [start, setstartState] = React.useState(null);
  const [half, sethalf] = React.useState(false);
  const [end, setendState] = React.useState("");
  const [check, setcheck] = React.useState(false);
  const prevlival = React.useRef();
  const [txtarea, settxtarea] = React.useState("");
  const [list2, setnamelist] = React.useState([{}]);
  const [team_lead_id, setid] = React.useState();
  const [token, setToken] = React.useState();
  const [show, setShow] = React.useState(false);

  const start_dt = React.useRef(null);
  const end_dt = React.useRef(null);

  const handleClose = () => setShow(false);

  React.useEffect(() => {
    const Token = localStorage.getItem("token");
    setToken(Token);
  }, []);

  React.useEffect(() => {
    const getdata = async () => {
      try {
        const response = await axios.get(url1);
        console.log(JSON.stringify(response.data));
        setnamelist(response.data);
        console.log(list2);
      } catch (error) {
        console.log(error);
      }
    };
    getdata();
  }, []);

  const handledata = async (e) => {
    e.preventDefault();
    const userid = localStorage.getItem("ID");
    const start_date = new Date(start).toISOString();
    const end_date = new Date(end).toISOString();

    const data = {
      User_id: userid,
      StartDate: start_date,
      EndDate: end_date,
      HalfDay: check,
      Team_lead_id: team_lead_id.Id,
      Reason: txtarea,
    };
    console.log(data);

    try {
      axios
        .post(
          "https://pkdservers.com/LeaveTracker/api/LeaveRequests/PostLeaveRequest",
          data,
          {
            headers: {
              Authorization: "Bearer" + " " + token,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
        });
    } catch (err) {
      console.log(err);
    }
    setShow(true);
    e.target.reset();
    setTimeout(() => setShow(false), 2000);
  };
  const handleChangearea = (event) => {
    settxtarea(event.target.value);
  };

  function handleChange(date) {
    setstartState(date);
    console.log(start);
  }

  function handleChangeend(date) {
    setendState(date);
    console.log(end);
  }
  function handleChangelist(e) {
    setli(e.currentTarget.value);
  }

  React.useEffect(() => {
    const id = list2.find((x) => x.Name === li);
    setid(id);
  });
  function handleChangecheck(e) {
    setcheck(e.target.checked);
  }
  const validate = () => {
    if (start <= end) {
      if (
        start !== "" &&
        end !== "" &&
        prevlival !== "" &&
        txtarea !== "" &&
        check === true
      )
        return true;

      if (
        start !== "" &&
        end !== "" &&
        prevlival !== "" &&
        txtarea !== undefined &&
        check === true
      )
        return true;

      if (
        start !== "" &&
        end !== "" &&
        prevlival !== "" &&
        txtarea !== undefined &&
        check === false
      )
        return true;
    }
  };

  const nameslist = list2.map((value, index) => {
    return (
      <>
        <option>{value.Name}</option>
      </>
    );
  });

  React.useEffect(() => {
    if (new Date(start).getTime() === new Date(end).getTime()) {
      sethalf(true);
    }
    if (new Date(start).getTime() !== new Date(end).getTime()) {
      sethalf(false);
    }
  }, [start, end]);
  return (
    <div>
      <div>
        <form onSubmit={handledata}>
          <div className="login-style">
            <h3>Leave Request Form</h3>
            <div className="mb-3">
              <label>Start Date </label>
              <DatePicker
                styles={{ border: "none" }}
                style={{ border: "none" }}
                className="form-control input "
                placeholder="Enter Start Date"
                required
                value={start}
                onChange={(date) => handleChange(date)}
                ref={start_dt}
              />
            </div>

            <div className="mb-3">
              <label>End Date </label>
              <DatePicker
                className="form-control input r"
                placeholder="Enter End Date"
                required
                value={end}
                onChange={(date) => handleChangeend(date)}
                ref={end_dt}
              />
            </div>
            {end < start ? (
              <label className="Error">
                {" "}
                End Date must be greater than start Date
              </label>
            ) : (
              ""
            )}

            {half === true ? (
              <div className="mb-3">
                <label>Half Day</label>
                <input
                  className="check"
                  type="checkbox"
                  checked={check}
                  onChange={(e) => handleChangecheck(e)}
                />
              </div>
            ) : (
              ""
            )}

            <div className="mb-3">
              <label>Select Manager</label>
              <select
                className="form-control input"
                value={li}
                onChange={(e) => handleChangelist(e)}
              >
                <option value="" disabled>
                  {" "}
                  Select Team Lead
                </option>
                {nameslist}
              </select>
            </div>

            <div className="mb-3">
              <label>Enter Your Reason</label>
              <TextareaAutosize
                value={txtarea}
                className="form-control input"
                aria-label="minimum height"
                minRows={3}
                placeholder="Enter Your Reason"
                onChange={handleChangearea}
              />
            </div>

            <div className="mb-3 input-div">
              <div className="custom-control custom-checkbox"></div>
            </div>
            <div className="d-grid">
              <button
                disabled={!validate()}
                type="submit"
                className="btn btn-primary  btn"
              >
                Send
              </button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Leave Application</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your Leave Request Has been Submitted</Modal.Body>
                <Modal.Footer></Modal.Footer>
              </Modal>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Applyform;
