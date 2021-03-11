/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
import React from "react";
import googleauth from './GoogleAuth'
import Form from "react-jsonschema-form";


var dict = [];

const schema = {
  "title": "Date and time widgets",
  "type": "object",
  "properties": {
    "alternative": {
      "title": "Alternative",
      "description": "These work on most platforms.",
      "type": "object",
      "properties": {
        "alt-datetime": {
          "type": "string",
          "format": "date-time"
        }
      }
    }
  }
}
const uiSchema = {
  "alternative": {
    "alt-datetime": {
      "ui:widget": "alt-datetime",
      "ui:options": {
        "yearsRange": [
          1980,
          2030
        ]
      }
    }
  }
}




  function CreateEvent(dict) {
    gapi.client.load('calendar', 'v3', function() {				
      var req = gapi.client.calendar.events.insert({
        'calendarId':		'primary',	
        "resource":			dict							
      });
      req.execute(function(event) {
        console.log('Event created: ' + event.htmlLink);
      });
    });
  }


  const onSubmit = ({formData}, e) => handleEvent(formData);

  function handleEvent(formData) {


    CreateEvent()
    function CreateEvent(dict) {
      gapi.client.load('calendar', 'v3', function() {				
        var req = gapi.client.calendar.events.insert({
          'calendarId':		'primary',	
          "resource":			dict							
        });
        req.execute(function(event) {
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
  );
  }
}

export default FormEvent
