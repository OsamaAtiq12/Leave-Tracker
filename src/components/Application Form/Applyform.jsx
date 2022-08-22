import React from "react";
import DatePicker from "react-date-picker";
import "bootstrap/dist/css/bootstrap.min.css";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Modal, Button } from "react-bootstrap";
import "./Apply.css";

function Applyform() {
  const [li, setli] = React.useState("");
  const [start, setstartState] = React.useState(null);
  const [half, sethalf] = React.useState(false);
  const [end, setendState] = React.useState("");
  const [check, setcheck] = React.useState(false);
  const prevlival = React.useRef();
  const [txtarea, settxtarea] = React.useState("");

  const handleChangearea = (event) => {
    settxtarea(event.target.value.trim());
  };

  const list = [
    {
      names: "Alpha",
    },
    {
      names: "Manager Tester",
    },

    {
      names: "Fahad Shahid",
    },
  ];
  function handleChange(date) {
    setstartState(date);
  }

  function handleChangeend(date) {
    setendState(date);
  }
  function handleChangelist(e) {
    setli(e.target.value);
  }
  function handleChangecheck(e) {
    setcheck(e.target.checked);
  }
  const validate = () => {
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
      check === false
    )
      return true;
  };

  const nameslist = list.map((value, index) => {
    return (
      <>
        <option>{value.names}</option>
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
        <form>
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
              />
            </div>

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
              <button
                disabled={!validate()}
                type="submit"
                className="btn btn-primary  btn"
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Applyform;
