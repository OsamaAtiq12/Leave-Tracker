import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDate from "date-fns/getDate";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function EventCal() {
  const [token, setToken] = React.useState();

  const navigate = useNavigate();
  const [list2, setnamelist] = React.useState([{}]);

  const url =
    "https://pkdservers.com/LeaveTracker/api/LeaveRequests/GetClanderData";

  React.useEffect(() => {
    const Token = localStorage.getItem("token");

    const getdata = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: "Bearer" + " " + Token,
          },
        });
        console.log(JSON.stringify(response.data));
        setnamelist(response.data);
        console.log(list2);
      } catch (error) {
        console.log(error);
      }
    };
    getdata();
  }, []);

  React.useEffect(() => {
    if (!localStorage.getItem("token")) {
      console.log("there is no item");
      navigate("/Login");
    }
  }, []);
  return (
    <div className="My-calendar">
      <Calendar
        showAllEvents
        no-overlap
        localizer={localizer}
        events={list2}
        views={["month"]}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700, margin: "50px", width: "auto" }}
      />
    </div>
  );
}

export default EventCal;
