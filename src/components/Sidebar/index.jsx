import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Collapse } from "react-bootstrap";
import Hritem from "./Hritem";
import SideBarItem from "./sidebar-item";
import Hrside from "../../constants/Hrside";
import { Link } from "react-router-dom";
import "./styles.css";
import logo from "../../assets/images/white-logo.png";
import LogoutIcon from "../../assets/icons/logout.svg";
import { Outlet } from "react-router-dom";
import axios from "axios";
function SideBar({ menu }) {
  const url = "https://pkdservers.com/LeaveTracker/api/Account/Logout";
  const handleclick = async () => {
    const Token = localStorage.getItem("token");
    try {
      const response = await axios.post(url, {
        headers: {
          Authorization: "Bearer" + " " + Token,
        },
      });
      console.log(Token);
      console.log(JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
    localStorage.clear();
    navigate("/Login");
    window.location.reload();
  };
  const navigate = useNavigate();
  React.useEffect(() => {
    if (localStorage.getItem("token") === null) {
      console.log("there is no token");
      navigate("/Login");
    }
  }, []);

  const getemail = localStorage.getItem("username");

  const getrole = localStorage.getItem("role");

  var final_role = [];
  if (getrole) {
    final_role = getrole.split(",");
  }
  const location = useLocation();

  const [active, setActive] = useState(1);
  const [empbar, setempbar] = useState(false);
  const [hrbar, sethrbar] = useState(false);

  useEffect(() => {
    if (final_role.includes("HR") && final_role.includes("Employee")) {
      sethrbar(true);
    }
  });

  useEffect(() => {
    if (final_role.includes("Manager") || final_role.includes("Employee")) {
      setempbar(true);
      sethrbar(false);
    }
  });

  useEffect(() => {
    if (
      final_role.includes(
        "Employee" &&
          !final_role.includes("Manager") &&
          !final_role.includes("HR")
      )
    ) {
      setempbar(true);

      sethrbar(false);
    }
  });
  useEffect(() => {
    menu.forEach((element) => {
      if (location.pathname === element.path) {
        setActive(element.id);
      }
    });
  }, [location.pathname]);

  const __navigate = (id) => {
    setActive(id);
  };

  return (
    <>
      {empbar === true ? (
        <nav className="sidebar">
          <div className="sidebar-container">
            <div className="sidebar-logo-container">
              {/* <img
                      src={logo}
                      alt="logo" /> */}
              <h1 className="header"> Leave Tracker System</h1>;
              <h3 className="header2"> Welcome , {getemail.split("@")[0]} </h3>;
            </div>

            <div className="sidebar-container">
              <div className="sidebar-items">
                {menu.map((item, index) => (
                  <div key={index} onClick={() => __navigate(item.id)}>
                    <SideBarItem active={item.id === active} item={item} />
                  </div>
                ))}
              </div>

              <div className="sidebar-footer">
                <span className="sidebar-item-label">Logout</span>

                <img
                  onClick={handleclick}
                  src={LogoutIcon}
                  alt="icon-logout"
                  className="sidebar-item-icon"
                />
              </div>
            </div>
          </div>
        </nav>
      ) : (
        ""
      )}

      {hrbar === true ? (
        <nav className="sidebar">
          <div className="sidebar-container">
            <div className="sidebar-logo-container">
              {/* <img
            src={logo}
            alt="logo" /> */}
              <h1 className="header"> Leave Tracker System</h1>;
              {/* <h3 className="header2"> Welcome , {getemailhr.split("@")[0]}</h3> */}
              ;
            </div>

            <div className="sidebar-container">
              <div className="sidebar-items">
                {menu.map((item, index) => (
                  <div key={index} onClick={() => __navigate(item.id)}>
                    <Hritem active={item.id === active} item={item} />
                  </div>
                ))}
              </div>

              <div className="sidebar-footer">
                <span className="sidebar-item-label">Logout</span>

                <img
                  onClick={handleclick}
                  src={LogoutIcon}
                  alt="icon-logout"
                  className="sidebar-item-icon"
                />
              </div>
            </div>
          </div>
        </nav>
      ) : (
        ""
      )}
    </>
  );
}

export default SideBar;
