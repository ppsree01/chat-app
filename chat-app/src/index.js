import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Chat from './Chat';
import reportWebVitals from './reportWebVitals';
import Home from './Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <Home />
            
          </Route>
          <Route path="/chat" >
              <Chat />
          </Route>
          <Route path="/" >
              <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
