import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import EventsCalendar from "./Cal"
import Login from "./oauth"
import Logout from "./Logout"

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <EventsCalendar />
    <Login />
        <Switch>
          <Route exact path="/oauth" component={Login} />
          <Logout />
        </Switch>
        <footer>
        </footer>
    </BrowserRouter>
  );
}

export default App;
