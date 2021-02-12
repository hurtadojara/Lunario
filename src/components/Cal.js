import React, { Component } from "react";
import {Calendar, momentLocalizer} from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from "moment";

require('moment/locale/es.js');
  
  const localizer = momentLocalizer(moment);

const myEventsList= [{
  title: "today",
  start: new Date('2019-05-05 10:22:00'),
  end: new Date('2019-05-05 10:42:00')
},
{
  title: "string",
   start: new Date('2021-2-12 12:22:00'),
  end: new Date('2021-02-13 13:42:00')
}]

  class EventsCalendar extends Component {  render() {
    return (
  <div style={{height:`${400}px`, backgroundColor:"white", margin:"15px", marginLeft:"300px"}} className="bigCalendar-container">
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
      />
    </div>);
    }
  }

export default EventsCalendar