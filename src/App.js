import React, { Component } from "react";
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";
import logo from "./assests/clock2.png";
import Login from "./Pages/Login/Login";
import MainDashboard from "./Dashboards/MainDashboard/MainDashboard";
import TableComponent from "../src/Pages/MyTables/MyTables";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedin: false,
    };
    this.toggleLoggedIn = this.toggleLoggedIn.bind(this);
  }
  toggleLoggedIn() {
    this.setState({ ...this.state, isLoggedin: !this.state.isLoggedin });
  }
  render() {
    if (!this.state.isLoggedin) {
      return (
        <Router>
          <Switch>
            <Route
              path="/"
              exact
              history={this.props.history}
              render={(history) => (
                <Login
                  history={history}
                  toggleLoggedIn={this.toggleLoggedIn}
                ></Login>
              )}
            ></Route>
          </Switch>
        </Router>
      );
    } else {
      return (
        <Router>
          <Switch>
            <Route
              path="/"
              render={(history) => (
                <MainDashboard history={history}></MainDashboard>
              )}
            ></Route>
          </Switch>
        </Router>
      );
    }
  }
}

export default App;
