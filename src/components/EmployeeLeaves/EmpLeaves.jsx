import React from "react";
import "./Leaves.css";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import DoneIcon from "../../assets/icons/done.svg";
import CancelIcon from "../../assets/icons/cancel.svg";
import { Icon } from "@iconify/react";
import { setDate } from "date-fns";
import { useNavigate } from "react-router-dom";

import axios from "axios";
function EmpLeaves() {
  const navigate = useNavigate();
  const [selectedval, setselectedval] = React.useState([{}]);
  const [emp, setEmp] = React.useState("");
  const [month, setMonth] = React.useState("");
  const [Year, setYear] = React.useState("");
  const [spin, setspinner] = React.useState(false);
  const [list2, setnamelist] = React.useState([{}]);
  const url1 = "https://pkdservers.com/LeaveTracker/api/AuthUser/GetAllUsers";

  const [token, setToken] = React.useState();
  React.useEffect(() => {
    if (!localStorage.getItem("token")) {
      console.log("there is no item");
      navigate("/Login");
    }
  }, []);
  React.useEffect(() => {
    getdata();
    const Token = localStorage.getItem("token");
    setToken(Token);
  }, []);

  const getdata = async () => {
    try {
      const response = await axios.get(url1);
      console.log(JSON.stringify(response.data));
      setnamelist(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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

  // Searching Api data
  const handleSearch = async (event) => {
    event.preventDefault();
    setselectedval(list2.find((x) => x.Name === emp));

    const id = selectedval.Id;

    const Searchurl =
      "https://pkdservers.com/LeaveTracker/api/LeaveRequests/SearchEmployeeLeaves ";

    const apimon = monthsLong[month];
    const data = {
      Id: id,
      Month: apimon,
      Year: Year,
    };
    try {
      const response = await axios.post(
        Searchurl,
        data,

        {
          headers: {
            Authorization: "Bearer" + " " + token,
          },
        }
      );
      console.log(JSON.stringify(response.data));
      setdata(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (index, e) => {
    const Token = localStorage.getItem("token");
    console.log(Token);
    try {
      const response = await axios.get(
        "https://pkdservers.com/LeaveTracker/api/LeaveRequests/DeleteLeaveRequest?ID=" +
          " " +
          index,
        {
          headers: {
            Authorization: "Bearer" + " " + Token,
          },
        }
      );
      // console.log(JSON.stringify(response.data));
      // setnamelist(response.data);
      // console.log(list2);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    console.log("handleSubmit ran");
    //

    console.log("Name 👉️", emp);
    console.log("Date 👉️", month);
    console.log("Year 👉️", Year);
  };

  const [data, setdata] = React.useState([]);

  const tabledata = data.map((value, index) => {
    return (
      <>
        <tr>
          <td>{value.ID}</td>
          <td>{value.name}</td>
          <td>{value.from}</td>
          <td>{value.to}</td>
          <td>{value.reason}</td>
          <td>{value.days}</td>
          <td>{value.unpaidLeaves}</td>
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
              ) : value.Status === "Approved" ? (
                <Icon
                  onClick={(e) => handleDelete(index, e)}
                  className="dashboard-content-icon  pointer"
                  icon="fluent:delete-dismiss-24-filled"
                />
              ) : (
                ""
              )}
              <span>{value.Status}</span>
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

  const namelisting = list2.map((value, index) => {
    return (
      <>
        <option> {value.Name}</option>
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
