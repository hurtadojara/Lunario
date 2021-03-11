/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
import React from "react";
import googleauth from './GoogleAuth'
import Form from "react-jsonschema-form";


var dict = [];

const schema = {
  title: "Todo",
  type: "object",
  required: ["title"],
  properties: {
    title: {type: "string", title: "Title", default: "A new task"},
    done: {type: "boolean", title: "Done?", default: false}
  }
};




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
        onSubmit={onSubmit} />
      </div>
  );
  }
}

export default FormEvent
