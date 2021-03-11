import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import EventsCalendar from "./Cal"
import FormEvent from "./FormEvent"
function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <EventsCalendar />
    <FormEvent />
        <footer>
        </footer>
    </BrowserRouter>
  );
}

export default App;
