/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
import React from "react";

var google_access_token;

function appendPre(message) {
  var pre = document.getElementById('content');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}

var dict = [];


class FormEvent extends React.Component {
  state = {
    name: '',
    lastName: ''
  }

handleSummary(e) { 
  this.setState({summary: e.target.value})
}
handleLocation(e) { 
  this.setState({location: e.target.value})
}
handleDescription(e) { 
  this.setState({description: e.target.value}) 
}
handleStart(e) { 
  this.setState({start: e.target.value}) 
}
handleEnd(e) { 
  this.setState({end: e.target.value}) 
}

handleSubmit() {
  dict.push({
    key: "summary",
    value: this.state.summary
  });
  dict.push({
    key: "description",
    value: this.state.description
  });
  dict.push({
    key: "location",
    value: this.state.location
  });
  dict.push({
    key: "start",
    value: this.state.start
  });
  dict.push({
    key: "end",
    value: this.state.end
  });
  console.log(dict);

  google_access_token = window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token
    var xhr = new XMLHttpRequest();
    var requestURL = 'https://www.googleapis.com/calendar/v3/calendars/calendarId/events'; 
    var params = dict;


     var paramsjasonString = JSON.stringify(params); // convert the javascript object to a Json string
     console.log("paramsjasonString = " + paramsjasonString);

     xhr.open('POST', requestURL + '?access_token=' + encodeURIComponent(google_access_token), true );
     // Specify the http content-type as json
      xhr.setRequestHeader(
       'Content-Type', 'application/json');

     // Response handlers
     xhr.onload = function() {
       var responseText = xhr.responseText;
       console.log(responseText);
       // process the response.
     };

    xhr.onerror = function() {
      console.log('There was an error!');
    };
    xhr.send(paramsjasonString)
}

  render() {
    return (
      <div className="form">
      <React.Fragment>
        <label>
          {'Summary '}
          <input type="text" name="summary" onChange={(e)=>this.handleSummary(e)}/>
        </label>
        <label>
          {'Location '}
          <input type="text" name="location " onChange={(e)=>this.handleLocation(e)}/>
        </label>
        <label>
          {'Description '}
          <input type="text" name="description" onChange={(e)=>this.handleDescription(e)}/>
        </label>
        <label>
          {'Start '}
          <input type="text" name="start" onChange={(e)=>this.handleStart(e)}/>
        </label>
        <label>
          {'End '}
          <input type="text" name="start" onChange={(e)=>this.handleEnd(e)}/>
        </label>
        <input type="submit" value="Submit" onClick={()=>this.handleSubmit()}/>
      </React.Fragment>
      </div>
    )
  }
}

export default FormEvent
