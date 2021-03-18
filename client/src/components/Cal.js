import React, { Component } from "react";
import {Calendar, momentLocalizer} from "react-big-calendar";
import './styles/Cal.css';
import moment from "moment";

var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

require('moment/locale/es.js');
  
  const localizer = momentLocalizer(moment);

process.REACT_APP_MYEVENTSLIST = [{
}]

  class EventsCalendar extends Component {  
    render() {
    return (
  <div>
      <Calendar
        localizer={localizer}
        events={process.REACT_APP_MYEVENTSLIST}
        startAccessor="start"
        endAccessor="end"
      />
    </div>);
    }
  }


export default EventsCalendar