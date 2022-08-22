import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDate from "date-fns/getDate";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
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

const events = [
  {
    title: "Syed Talha Hassan (Pending)",
    allDay: true,
    start: new Date(2022, 8, 0),
    end: new Date(2022, 8, 3),
  },

  {
    title: "Shoaib  (Pending)",
    allDay: true,
    start: new Date(2022, 7, 3),
    end: new Date(2022, 7, 9),
  },
  {
    title: "Vacation",
    start: new Date(2021, 6, 7),
    end: new Date(2021, 6, 10),
  },
  {
    title: "Conference",
    start: new Date(2021, 6, 20),
    end: new Date(2021, 6, 23),
  },
];
function EventCal() {
  return (
    <div className="My-calendar">
      <Calendar
        localizer={localizer}
        events={events}
        views={["month"]}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px", width: "auto" }}
      />
    </div>
  );
}

export default EventCal;
