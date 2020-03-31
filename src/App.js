import React, { Fragment } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import AlertState from './context/alert/AlertState';
import AuthState from './context/auth/AuthState';
import Home from './components/pages/Home';
function App() {
  return (
    <AlertState>
    <AuthState>
      <Router>

        <Fragment>
          <Navbar/>
          <div className='container'>
            <Alert/>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Switch>
          </div>
        </Fragment>
        

      </Router>
      </AuthState>
    </AlertState>
  );
}

export default App;
