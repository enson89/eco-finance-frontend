import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Login.js';
import PortfolioApp from './PortfolioApp';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route } from "react-router-dom";

ReactDOM.render(

  <React.StrictMode>
    <Router>
      <div>
        <Route exact path="/App">
          <Login />
        </Route>
        <Route path="/App/Portfolio">
          <PortfolioApp />
        </Route>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
