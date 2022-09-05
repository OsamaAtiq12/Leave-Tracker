import React from "react";
import { Modal, Button } from "react-bootstrap";
import DatePicker from "react-date-picker";
import "bootstrap/dist/css/bootstrap.min.css";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import "./Behalf.css";
import axios from "axios";
function OnBehalf() {
  const [li, setli] = React.useState("");
  const [start, setstartState] = React.useState(null);
  const [half, sethalf] = React.useState(false);
  const [end, setendState] = React.useState("");
  const [check, setcheck] = React.useState(false);
  const prevlival = React.useRef();
  const [txtarea, settxtarea] = React.useState("");
  const [liemp, setliemp] = React.useState("");
  const [list2, setnamelist] = React.useState([{}]);
  const [list3, setnamelist3] = React.useState([{}]);
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const [selectedval, setselectedval] = React.useState([{}]);
  const [token, setToken] = React.useState();
  // React.useEffect(() => {
  //   if (localStorage.getItem("token") === null) {
  //     console.log("there is no token");
  //     navigate("/Login");
  //   }
  // }, []);
  React.useEffect(() => {
    const Token = localStorage.getItem("token");
    setToken(Token);
  }, []);

  const handleChangearea = (event) => {
    settxtarea(event.target.value);
  };
  const url1 = "https://pkdservers.com/LeaveTracker/api/AuthUser/GetAllUsers";
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

  const url2 =
    "https://pkdservers.com/LeaveTracker/api/AuthUser/GetAllManagers";
  React.useEffect(() => {
    const getdata = async () => {
      try {
        const response = await axios.get(url2);
        console.log(JSON.stringify(response.data));
        setnamelist3(response.data);
        console.log(list3);
      } catch (error) {
        console.log(error);
      }
    };
    getdata();
  }, []);

  const handlebehalf = async (e) => {
    e.preventDefault();
    const userid = localStorage.getItem("ID");
    const start_date = new Date(start).toISOString();
    const end_date = new Date(end).toISOString();
    setselectedval(list2.find((x) => x.Name === li));

    const data = {
      User_id: userid,
      StartDate: start_date,
      EndDate: end_date,
      HalfDay: check,
      Team_lead_id: selectedval.Id,
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
    // setstartState("");
    // setendState("");
    // setli("");
    // setliemp("");

    // settxtarea("");
    setTimeout(() => setShow(false), 2000);
  };

  function handleChange(date) {
    setstartState(date);
  }

  function handleChangeend(date) {
    setendState(date);
  }
  function handleChangelist(e) {
    setli(e.target.value);
  }

  function handleChangelistemp(e) {
    setliemp(e.target.value);
  }
  function handleChangecheck(e) {
    setcheck(e.target.checked);
  }

  const Handelreset = (e) => {
    e.preventDefault();
    e.target.reset();

    setstartState();
    setendState();
    settxtarea("");
  };
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

  const nameslist = list3.map((value, index) => {
    return (
      <>
        <option>{value.Name}</option>
      </>
    );
  });

  const empnameslist = list2.map((value, index) => {
    return (
      <>
        <option>{value.Name}</option>
      </>
    );
  });

  React.useEffect(() => {
    console.log(new Date(start).getTime());
    console.log(new Date(end).getTime());
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
        <form onSubmit={Handelreset}>
          <div className="login-style">
            <h3>On Behalf Leave</h3>
            <br />

            <div className="mb-3">
              <label>Select Employee</label>
              <select
                className="form-control input"
                value={liemp}
                onChange={(e) => handleChangelistemp(e)}
              >
                {empnameslist}
              </select>
            </div>
            <div className="mb-3">
              <label>Start Date </label>
              <DatePicker
                styles={{ border: "none" }}
                style={{ border: "none" }}
                className="form-control input "
                placeholder="Enter Start Date"
                value={start}
                onChange={(date) => handleChange(date)}
              />
            </div>

            <div className="mb-3">
              <label>End Date </label>
              <DatePicker
                className="form-control input r"
                placeholder="Enter End Date"
                value={end}
                onChange={(date) => handleChangeend(date)}
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
              <div className="btn-area">
                <button
                  disabled={!validate()}
                  type="submit"
                  className="btn btn-primary  btn"
                  onClick={handlebehalf}
                >
                  Send
                </button>
                <button type="submit" className="btn btn-danger  btn  ">
                  Reset
                </button>{" "}
              </div>

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

export default OnBehalf;
