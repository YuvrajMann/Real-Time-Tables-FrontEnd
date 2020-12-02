import React, { Component } from "react";
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";
import logo from "./assests/clock2.png";
import Login from "./Pages/Login/Login";
import MyTables from "./Pages/MyTable/MyTable.js";
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            history={this.props.history}
            component={Login}
          ></Route>
          <Route
            path="/myTables"
            exact
            history={this.props.history}
            component={MyTables}
          ></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
