import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// Css
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './index.css';
import './theme/dist/toolkit-inverse.css';
// Utils
import registerServiceWorker from './utilities/registerServiceWorker';
// Javascript
import jquery from "jquery";
import popper from 'popper.js';
import tether from 'tether';
// import theme from './theme/dist/toolkit.js';
var jQuery = window.$ = window.jQuery = jquery;
var Popper = window.Popper = popper;
var Tether = window.Tether = tether;

 var theme = require('./theme/dist/toolkit.js');

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();