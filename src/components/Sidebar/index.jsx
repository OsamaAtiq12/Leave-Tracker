import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Collapse } from "react-bootstrap";
import Hritem from "./Hritem";
import SideBarItem from "./sidebar-item";
import Hrside from "../../constants/Hrside";
import { Link } from "react-router-dom";
import "./styles.css";
import logo from "../../assets/images/white-logo.png";
import LogoutIcon from "../../assets/icons/logout.svg";
import { Outlet } from "react-router-dom";
function SideBar({ menu }) {
  const handleclick = () => {
    localStorage.clear();
  };

  const getemail = localStorage.getItem("emailData");
  const getpassword = localStorage.getItem("passwordData");
  const getemailhr = localStorage.getItem("emailDatahr");
  const getpasswordhr = localStorage.getItem("passwordDatahr");

  const location = useLocation();

  const [active, setActive] = useState(1);

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
      {getemail && getpassword ? (
        <nav className="sidebar">
          <div className="sidebar-container">
            <div className="sidebar-logo-container">
              {/* <img
                      src={logo}
                      alt="logo" /> */}
              <h1 className="header"> Leave Tracker System</h1>;
              <h3 className="header2"> Welcome , {getemail.split(".")[0]} </h3>;
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
                <Link to="/Login">
                  <img
                    onClick={handleclick}
                    src={LogoutIcon}
                    alt="icon-logout"
                    className="sidebar-item-icon"
                  />
                </Link>
              </div>
            </div>
          </div>
        </nav>
      ) : (
        ""
      )}

      {getemailhr && getpasswordhr ? (
        <nav className="sidebar">
          <div className="sidebar-container">
            <div className="sidebar-logo-container">
              {/* <img
            src={logo}
            alt="logo" /> */}
              <h1 className="header"> Leave Tracker System</h1>;
              <h3 className="header2"> Welcome , {getemailhr.split("@")[0]}</h3>
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
                <Link to="/Login">
                  <img
                    onClick={handleclick}
                    src={LogoutIcon}
                    alt="icon-logout"
                    className="sidebar-item-icon"
                  />
                </Link>
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
