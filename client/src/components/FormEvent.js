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
      "type": "array",
      "items": {
        "type": "string"
      }
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
  "attendees": {
    "ui:options": {
      inputType: 'email'
    }
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
            onChange={log("changed")}
            onSubmit={log("submitted")}
            onError={log("errors")}
            uiSchema={uiSchema} />
          <div id="submit-btn">
            <button id="submitEvent" onClick={this.createButtom} type="submit" class="btn btn-info">Done!</button>
          </div>
        </div>
      );
    } else {
      return <h1>
        <button onClick={this.createButtom} class="btn btn-info btn-xs">
          Create Event
        </button>
      </h1>
    }
  }
}

export default FormEvent