import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import EventsCalendar from "./Cal"
import  Oauth from "./oauth"

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <EventsCalendar />
    <Oauth />
        <Switch>
          <Route exact path="/oauth" component={Oauth} />
        </Switch>
        <footer>
        </footer>
    </BrowserRouter>
  );
}

export default App;
