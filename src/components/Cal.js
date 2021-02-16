import React, { Component } from "react";
import {Calendar, momentLocalizer} from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from "moment";
import axios from 'axios';

require('moment/locale/es.js');
  
  const localizer = momentLocalizer(moment);

const myEventsList= [{
  title: "today",
  start: new Date('2021-05-05 10:22:00'),
  end: new Date('2021-05-05 10:42:00')
},
{
  title: "string",
   start: new Date('2021-2-12 12:22:00'),
  end: new Date('2021-02-13 13:42:00')
}]

  class EventsCalendar extends Component {  
    componentDidMount() {
      axios.get("http://localhost:8080/oauth")
      .then( (response) => {
      this.setState({response: response})
      })
      .catch( (error) => {
      console.log(error);
    })
    }
    render() {
    return (
  <div style={{height:`${400}px`, backgroundColor:"white", margin:"15px", marginLeft:"300px"}} className="bigCalendar-container">
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
      />
      <button variant="outlined" size="large">Create Event</button>
    </div>);
    }
  }

export default EventsCalendar