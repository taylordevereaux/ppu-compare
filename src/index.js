import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './utilities/registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './index.css';
import jquery from "jquery";
import popper from 'popper.js';
// This is required to set the Jquery window variables.
// Needed for bootstrap.
window.$ = window.jQuery = jquery;
window.Popper = popper;
const bootstrap = require('bootstrap');


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();