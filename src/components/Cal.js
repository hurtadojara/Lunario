import React, { Component } from "react";
import {Calendar, momentLocalizer} from "react-big-calendar";
import './styles/Cal.css';
import moment from "moment";

var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

/* Component to show the events in our calendar,
   when a new event is created take 3000ms to be showed in the component;
   this component includes views by week, month and the agenda.*/

require('moment/locale/es.js');
  
  const localizer = momentLocalizer(moment);

process.REACT_APP_MYEVENTSLIST = [{
}]

  class EventsCalendar extends Component {  
    componentDidMount() {
      this.interval = setInterval(() => this.setState({ time: Date.now() }), 3000);
    }
    componentWillUnmount() {
      clearInterval(this.interval);
    }
    render() {
    return (
  <div>
      <Calendar
        localizer={localizer}
        popup={true}
        events={process.REACT_APP_MYEVENTSLIST}
        startAccessor="start"
        endAccessor="end"
      />
    </div>);
    }
  }


export default EventsCalendar