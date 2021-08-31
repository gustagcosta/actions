import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';

import './bootstrap.min.css';
import './index.css';
import { isAuthenticated } from './services/storage';

import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import HomeScreen from './pages/HomeScreen';
import UsersScreen from './pages/UsersScreen';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )
    }
  />
);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route path='/login' component={LoginScreen} />
      <Route path='/register' component={RegisterScreen} />
      <PrivateRoute path='/' component={HomeScreen} exact />
      <PrivateRoute path='/users' component={UsersScreen} exact />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
