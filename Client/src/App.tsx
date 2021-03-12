import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import Login from "./components/containers/login";
import { Register } from "./components/containers/register";
import HomePage from "./components/containers/homepage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route key="RegisterPage" path="/RegisterPage">
            <header className="App-header">
              <Register />
            </header>
          </Route>
          <Route key="HomePage" path="/Home">
            <div>
              <HomePage />
            </div>
          </Route>

          <Route key="LoginPage" path="/">
            <header className="App-header">
              <Login />
            </header>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
