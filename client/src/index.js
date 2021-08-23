import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route } from 'react-router-dom';

import './bootstrap.min.css';
import './index.css';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Users from './pages/Users';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/' component={Home} exact />
      <Route path='/users' component={Users} exact />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
