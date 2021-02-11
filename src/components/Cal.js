import React from "react";
import Calendar from "./Calendar";

import "./styles/Cal.css";

class Cal extends React.Component {
  render() {
    return (
      <div className="App">
        <header>
          <div id="logo">
            <span className="icon">date_range</span>
            <span>
              <b>Lunario</b>
            </span>
          </div>
        </header>
        <main>
          <Calendar />
        </main>
      </div>
    );
  }
}

export default Cal;