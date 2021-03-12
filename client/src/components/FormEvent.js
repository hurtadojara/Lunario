/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
import React from "react";
import googleauth from './GoogleAuth'
import Form from "react-jsonschema-form";



var dict = [];

const schema = {
  "title": "Create an event",
  "type": "object",
  required: [
    "summary"
  ],
  "properties": {
    "summary": { "type": "string", "title": "Summary", "default": "Add  title" },
    "location": { "type": "string", "title": "Location", "default": " " },
    "description": { "type": "string", "title": "Description", "default": "Add a description" },
    "alternativeStart": {
      "title": "Start",
      "description": "Add a time",
      "type": "object",
      "properties": {
        "dateTimeStart": {
          "type": "string",
          "format": "date-time"
        },
        "timeZone": { "type": "string", "title": "TimeZone", "default": " " }
      }
    },
    "alternativeEnd": {
      "title": "End",
      "description": "Add a valid end time",
      "type": "object",
      "properties": {
        "dateTimeEnd": {
          "type": "string",
          "format": "date-time"
        },
        "timeZone": { "type": "string", "title": "TimeZone", "default": " " }
      }
    },
    "attendees": {
      "title": "Attendees",
      "description": "Click on the buttoms to add or remove your attendees",
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  }
}
const uiSchema = {
  "schema": {
    "description": {
      "ui:widget": "textarea",
    }
  },
  "alternativeStart": {
    "dateTimeStart": {
      "ui:widget": "alt-datetime",
      "ui:options": {
        "yearsRange": [
          2021,
          2080
        ]
      }
    }
  },
  "alternativeEnd": {
    "dateTimeEnd": {
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


  CreateEvent()
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

}


class FormEvent extends React.Component {
  render() {
    return (
      <div>
        <Form schema={schema}
          uiSchema={uiSchema}
          onSubmit={onSubmit} />
      </div>
    )
  }
}

export default FormEvent
