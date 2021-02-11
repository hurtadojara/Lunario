import React from "react";
import Calendar from "./Calendar";

import "./styles/Cal.css";

class Cal extends React.Component {
  render() {
    return (
      <div className="App">
        <header>
        </header>
        <main>
          <Calendar />
        </main>
      </div>
    );
  }
}

export default Cal;