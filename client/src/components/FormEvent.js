/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
import React from 'react';
import './styles/FormEvent.css';
import Form from "react-jsonschema-form";

const schema = {
  "type": "object",
  required: [
    "summary", "location"
  ],
  "properties": {
    "summary": { "type": "string", "title": "Summary", "default": "Add a title" },
    "location": { "type": "string", "title": "Location", "default": " " },
    "description": { "type": "string", "title": "Description", "default": "Add description" },
    "start": {
      "title": "Start date",
      "description": "Add a time",
      "type": "object",
      "properties": {
        "dateTime": {
          "type": "string",
          "format": "date-time"
        },
        "timeZone": { "type": "string", "title": "TimeZone", "default": "America/Los Angeles" }
      }
    },
    "end": {
      "title": "End date",
      "description": "Add a valid end time",
      "type": "object",
      "properties": {
        "dateTime": {
          "type": "string",
          "format": "date-time"
        },
        "timeZone": { "type": "string", "title": "TimeZone", "default": "America/Bogota" }
      }
    },
    "attendees": {
      "title": "Attendees",
      "description": "Click on the buttoms to add or remove your attendees",
      "type": "string",
    }
  },
  "definitions": {
    "largeEnum": {
      "type": "string",
      "enum": [
        "SECONDLY",
        "MINUTELY",
        "HOURLY",
        "DAILY",
        "WEEKLY",
        "MONTHLY",
        "YEARLY"
      ]
    }
  },
  "lastform": {
    "title": "Recurrence",
    "type": "object",
    "properties": {
      "recurrence": {
        "$ref": "#/definitions/largeEnum"
      },
      "COUNT": {
        "type": "integer",
        "title": "Interval",
        "minimum": 0,
        "maximum": 31,
      }
    }
  }
};

const uiSchema = {
  "description": {
    "classNames": "test",
    "ui:widget": "textarea"
  },
  "start": {
    "dateTime": {
      "ui:widget": "alt-datetime",
      "ui:options": {
        "yearsRange": [
          2021,
          2080
        ]
      }
    }
  },
  "end": {
    "dateTime": {
      "ui:widget": "alt-datetime",
      "ui:options": {
        "yearsRange": [
          2021,
          2080
        ]
      }
    }
  }
}

const log = (type) => console.log.bind(console, type);


function CreateEvent(dict) {
  gapi.client.load('calendar', 'v3', function () {
    var req = gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      "resource": dict
    });
    req.execute(function (event) {
      console.log('Event created: ' + event.htmlLink);
    });
  });
}


const onSubmit = ({ formData }, e) => handleEvent(formData);

function handleEvent(formData) {
  if (formData.attendees) {
    var inv = []
    var finalAttendees = [{}]
    var initstring = "\{\"email\":\""
    var laststring = "\"\}"
    formData.attendees = formData.attendees.replace(/\s+/g, '');
    inv = formData.attendees.split(',')
    for(var invited of inv) {
      var mail = invited
      var jText = initstring + mail + laststring
      inv[invited] = JSON.parse(jText)
      finalAttendees.push(inv[invited])
    }
    finalAttendees.shift()
    formData.attendees = finalAttendees
    console.log(formData.attendees)
  }

  CreateEvent(formData)
  function CreateEvent(dict) {
    gapi.client.load('calendar', 'v3', function () {
      var req = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        "resource": dict
      });
      req.execute(function (event) {
        if (event.htmlLink) {
        alert('Event created: ' + event.htmlLink)
        }
        setTimeout(3000)
        console.log(formData)
        if (event.htmlLink === undefined){
          alert("Ha ingresado erroneamente los datos.\nNo se ha creado el evento.")
        }
      });
    });
  }

}

class FormEvent extends React.Component {
  state = {
    show: false
  }

  createButtom = () => {
    this.setState({ show: !this.state.show })
  }

  render() {
    if (this.state.show) {
      return (
        <div id="eventDesing">
          Fill the form
          <p></p>
          <Form schema={schema}
            onSubmit={onSubmit}
            onError={log("errors")}
            uiSchema={uiSchema} />
          <div id="submit-btn">
            <button id="submitEvent" onClick={this.createButtom} type="submit" className="btn btn-info">Done!</button>
          </div>
        </div>
      );
    } else {
      return <h1>
        <button onClick={this.createButtom} className="btn btn-info btn-xs">
          Create Event
        </button>
      </h1>
    }
  }
}

export default FormEvent