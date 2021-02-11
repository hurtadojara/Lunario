import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Calendar from "./Cal"

function App() {
  return (
    <BrowserRouter>
    <Navbar />
        <Switch>
          <Route exact path="/calendar" component={Calendar} />
        </Switch>
        <footer>

        </footer>
    </BrowserRouter>
  );
}

export default App;
