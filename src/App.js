import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddnewUser from "./components/AddnewUser/AddnewUser";
import EmpLeaves from "./components/EmployeeLeaves/EmpLeaves";
import Hrside from "./constants/Hrside";
import Login from "./components/Login Page/Login";
import SideBar from "./components/Sidebar";
import sidebar_menu from "./constants/sidebar-menu";
import Applyform from "./components/Application Form/Applyform";
import "./App.css";
import Orders from "./pages/Orders";
import EventCal from "./components/EventCalendar/EventCal";
import OnBehalf from "./components/OnBehalfForm/Onbehalf";
import Userlist from "./components/UserList/Userlist";
function App() {
  const getemailhr = localStorage.getItem("emailDatahr");
  const getpasswordhr = localStorage.getItem("passwordDatahr");
  const getemail = localStorage.getItem("emailData");
  const getpassword = localStorage.getItem("passwordData");
  return (
    <Router>
      <Routes>
        {" "}
        <Route
          path="/Login"
          element={
            <>
              <Login />
            </>
          }
        />
      </Routes>
      {getemail === "osama.517@live.com" && getpassword === "12345" ? (
        <div className="dashboard-container">
          <SideBar menu={sidebar_menu} />
          <div className="dashboard-body">
            <Routes>
              <Route path="*" element={<div></div>} />
              <Route path="/" element={<EventCal />} />
              <Route exact path="/Leaves" element={[<Orders />]} />
              <Route exact path="/Apply" element={<Applyform />} />
            </Routes>
          </div>
        </div>
      ) : (
        ""
      )}

      {getemailhr === "hr@live.com" && getpasswordhr === "1234" ? (
        <div className="dashboard-container">
          <SideBar menu={Hrside} />
          <div className="dashboard-body">
            <Routes>
              <Route path="*" element={<div></div>} />
              <Route path="/hrHome" element={<EventCal />} />
              <Route exact path="/hrLeaves" element={[<Orders />]} />
              <Route exact path="/hrApply" element={<Applyform />} />
              <Route exact path="/EmpLeaves" element={<EmpLeaves />} />
              <Route exact path="/OnBehalf" element={<OnBehalf />} />
              <Route exact path="/NewUser" element={<AddnewUser />} />
              <Route exact path="/List" element={<Userlist />} />
            </Routes>
          </div>
        </div>
      ) : (
        ""
      )}
    </Router>
  );
}

export default App;
