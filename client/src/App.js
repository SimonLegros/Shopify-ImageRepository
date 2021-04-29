import React, { useState } from "react";
import logo from './logo.svg';
import Header from './components/Header.component';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login.component';
import MyImages from './components/MyImages.component';
import './App.css';

function App() {
    const [token, setToken] = useState();
    return (
      <div className="App">
        <Router>
          <Header></Header>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            SHOPIFY CHALLENGE - IMAGE REPOSITORY
          </p>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/private">
              <MyImages />
            </Route>
          </Switch>
        </Router>
      </div>
    );
}

export default App;
