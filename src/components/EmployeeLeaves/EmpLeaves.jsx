import React from "react";
import "./Leaves.css";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import DoneIcon from "../../assets/icons/done.svg";
import CancelIcon from "../../assets/icons/cancel.svg";
import { Icon } from "@iconify/react";
import { setDate } from "date-fns";

function EmpLeaves() {
  const [emp, setEmp] = React.useState("");
  const [month, setMonth] = React.useState("");
  const [Year, setYear] = React.useState("");
  const [spin, setspinner] = React.useState(false);

  const monthsLong = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };

  // const filtered = !search
  //   ? data
  //   : data.filter(
  //       (item) =>
  //         item.Name.toLowerCase().includes(emp.toLowerCase()) ||
  //         monthsLong[new Date(item.From).getMonth()]
  //           .toLowerCase()
  //           .includes(monthsLong[month.toLowerCase()]) ||
  //         new Date(item.From)
  //           .getFullYear()
  //           .toLowerCase()
  //           .includes(Year.toLowerCase())
  //     );

  const handleSearch = (event) => {
    event.preventDefault();
    const newdata = data.filter((item) => item.Name == emp);
    // .filter((y) => new Date(y.From).getFullYear() === parseInt(Year));

    setdata(newdata);
  };

  const handleDelete = (index, e) => {
    setdata(data.filter((v, i) => i !== index));
  };

  const handleSubmit = (event) => {
    console.log("handleSubmit ran");
    //

    console.log("Name 👉️", emp);
    console.log("Date 👉️", month);
    console.log("Year 👉️", Year);
  };

  React.useEffect(() => {});

  const [data, setdata] = React.useState([
    {
      id: "#1236",
      Name: "osama",
      From: "8-3-2022",
      To: "8-3-2022",

      Days: "2",
      Reason: "Illness",
      UnpaidLeaves: "1",
      status: "Accepted",
    },
    {
      id: "#1234",
      Name: "ahmad",
      From: "8-3-2021",
      To: "8-3-2022",

      Days: "2",
      Reason: "Illness",
      UnpaidLeaves: "3",
      status: "Applied",
    },
    {
      id: "#1235",
      Name: "Umer",
      From: "8-3-2020",
      To: "8-3-2022",

      Days: "2",
      Reason: "Illness",
      UnpaidLeaves: "5",
      status: "Rejected",
    },
  ]);

  const tabledata = data.map((value, index) => {
    return (
      <>
        <tr>
          <td>{value.id}</td>
          <td>{value.Name}</td>
          <td>{value.From}</td>
          <td>{value.To}</td>
          <td>{value.Days}</td>
          <td>{value.Reason}</td>
          <td>{value.UnpaidLeaves}</td>
          <td>
            <div className="icon-inline">
              {value.status === "Accepted" ? (
                <img
                  src={DoneIcon}
                  alt="paid-icon"
                  className="dashboard-content-icon"
                />
              ) : value.status === "Rejected" ? (
                <img
                  src={CancelIcon}
                  alt="canceled-icon"
                  className="dashboard-content-icon"
                />
              ) : value.status === "Applied" ? (
                <Icon
                  onClick={(e) => handleDelete(index, e)}
                  className="dashboard-content-icon  pointer"
                  icon="fluent:delete-dismiss-24-filled"
                />
              ) : (
                ""
              )}
              <span>{value.status}</span>
            </div>
          </td>
        </tr>
      </>
    );
  });

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

  const namelist = [
    {
      name: "osama",
    },

    {
      name: "ahmad",
    },

    {
      name: "Umer",
    },
  ];

  const namelisting = namelist.map((value, index) => {
    return (
      <>
        <option> {value.name}</option>
      </>
    );
  });

  const handleemp = (e) => {
    setEmp(e.currentTarget.value);
  };

  const handlemon = (e) => {
    setMonth(e.currentTarget.value);
  };

  const handleyear = (e) => {
    setYear(e.currentTarget.value);
  };

  const validate = () => {
    if (emp !== "" && month !== "" && Year !== "") return true;
    if (emp !== "" && month == "" && Year == "") {
      return true;
    }
    if (emp == "" && month == "" && Year !== "") {
      return true;
    }
    if (emp !== "" && month == "" && Year !== "") {
      return true;
    }
    if (emp == "" && month !== "" && Year !== "") {
      return true;
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="login-style">
          <h3>Employee Leaves</h3>

          <div className="mb-3">
            <label>Employee Name</label>
            <select
              className="form-control input"
              defaultValue="Select employee"
              onChange={handleemp}
            >
              <option value={emp} selected>
                Select Employee
              </option>
              {namelisting}
            </select>
          </div>
          <div className="mb-3">
            <label>Month</label>
            <select className="form-control input" onChange={handlemon}>
              <option value={month} disabled selected>
                Select Month
              </option>
              {monthlist}
            </select>
          </div>

          <div className="mb-3">
            <label>Year</label>
            <select className="form-control input" onChange={handleyear}>
              <option value={Year} disabled selected>
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
              type="submit"
              className="btn btn-primary  btn"
              disabled={!validate()}
              onClick={handleSearch}
            >
              {spin === true ? (
                <Spinner
                  as="span"
                  variant="light"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  animation="border"
                />
              ) : (
                ""
              )}
              Search
            </button>
          </div>
        </div>
        <br />

        <Table striped bordered hover className="table-style">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>From</th>
              <th>To</th>
              <th>Days</th>
              <th>Reason</th>
              <th>Unpaid Leaves</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{tabledata}</tbody>
        </Table>
      </form>
    </>
  );
}

export default EmpLeaves;
