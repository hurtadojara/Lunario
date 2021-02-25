import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import EventsCalendar from "./Cal"

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <EventsCalendar />
        <Switch>
          <Route exact path="/oauth" component={Navbar} />
        </Switch>
        <footer>
        </footer>
    </BrowserRouter>
  );
}

export default App;
