import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import EventsCalendar from "./Cal"
import GoogleAuth from "./GoogleAuth"

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <EventsCalendar />
    <GoogleAuth />
        <footer>
        </footer>
    </BrowserRouter>
  );
}

export default App;
