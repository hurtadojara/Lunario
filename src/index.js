import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import App from './components/App';
/*import { oauth2 } from 'googleapis/build/src/apis/oauth2';*/

const container = document.getElementById('App');
/*const { google } = require ( "googleapis");
const { OAuth2 } = google.auth
const OAuth2Client = new OAuth2("503743076427-t4figa0pg76kpa96uq1m8er0s6qjsvhv.apps.googleusercontent.com",
                                "ZbVn89pnbhzEm38wapc50Sw6")*/
ReactDOM.render(<App />, container);

/*OAuth2Client.setCredentials({refresh_token: "1//040pPQV0h-qyACgYIARAAGAQSNwF-L9Ir0oBTHh_rWv-UdtBXu2VNYSNy1QyhxdgtbUNrw9vUNt4ATQdxcexNHotJzSJPfb3EZio"})
const calendar = google.calendar({version: "v3", auth: OAuth2Client})*/