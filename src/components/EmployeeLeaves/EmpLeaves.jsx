import React from "react";
import "./Leaves.css";
function EmpLeaves() {
  const [emp, setEmp] = React.useState("");
  const [month, setMonth] = React.useState("");
  const [Year, setYear] = React.useState("");

  const months = [
    {
      month: "January",
    },

    {
      month: "Febuary",
    },

    {
      month: "March",
    },
    {
      month: "April",
    },

    {
      month: "May",
    },

    {
      month: "June",
    },

    {
      month: "July",
    },

    {
      month: "August",
    },

    {
      month: "September",
    },

    {
      month: "October",
    },

    {
      month: "November",
    },

    {
      month: "December",
    },
  ];

  const monthlist = months.map((value, index) => {
    return (
      <>
        <option> {value.month}</option>
      </>
    );
  });

  const handleemp = (e) => {
    setEmp(e.target.value);
  };

  const handlemon = (e) => {
    setMonth(e.target.value);
  };

  const handleyear = (e) => {
    setYear(e.target.value);
  };

  const validate = () => {
    if (emp !== "" && month !== "" && Year !== "") return true;
  };
  return (
    <>
      <form>
        <div className="login-style">
          <h3>Employee Leaves</h3>

          <div className="mb-3">
            <label>Employee Name</label>
            <select className="form-control input" onChange={handleemp}>
              <option value="" disabled selected>
                Select Employee
              </option>

              <option> Osama</option>
              <option> Shoaib</option>
              <option> Ali</option>
            </select>
          </div>
          <div className="mb-3">
            <label>Month</label>
            <select className="form-control input" onChange={handlemon}>
              <option value="" disabled selected>
                Select Month
              </option>
              {monthlist}
            </select>
          </div>

          <div className="mb-3">
            <label>Year</label>
            <select className="form-control input" onChange={handleyear}>
              <option value="" disabled selected>
                Select Year
              </option>
              <option> 2020</option>
              <option> 2021</option>
              <option> 2022</option>
            </select>
          </div>

          <div className="mb-3 input-div">
            <div className="custom-control custom-checkbox"></div>
          </div>
          <div className="d-grid">
            <button
              type="Search"
              className="btn btn-primary  btn"
              disabled={!validate()}
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default EmpLeaves;
