import React, { Component } from "react";
import { Route, Link, Switch, BrowserRouter, Redirect } from "react-router-dom";
import logo from "./assests/clock2.png";
import Login from "./Pages/Login/Login";
import MainDashboard from "./Dashboards/MainDashboard/MainDashboard";
import AllTables from "../src/Pages/AllTables/AllTables";
import { axiosInstance } from "./utils/axiosInterceptor";
import { message } from "antd";
import SignUp from "./Pages/SignUp/SignUp.js";
import axios from "axios";
import './App.css';
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

  componentDidMount() {
    const token = localStorage.getItem("token");
    // if (token) {
    //   axiosInstance.interceptors.request.use((config) => {
    //     const auth = `Bearer ${token}`;
    //     console.log(auth);
    //     config.headers.Authorization = `Bearer ${token}`;
    //     return config;
    //   });
    // }
    // this.toggleLoggedIn();
    if (token) {
      this.toggleLoggedIn();
      axiosInstance.interceptors.request.use((config) => {
        const auth = `Bearer ${token}`;
      
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      });
      axios
        .post("https://real-time-tables.herokuapp.com/users/checktoken", {
          headers: { Authorization: `Bearer ${token}` },
          token: token,
        })
        .then((res) => {
          
        })
        .catch((err) => {
          this.toggleLoggedIn();
          console.log(err);
        });
    }
  }
  render() {
    const NoMatch = (props) => {
      return (
        <>
          <h1 style={{ textAlign: "center", paddingTop: "10px" }}>
            You are not logged in to Real Time Tables.Please login to continue.
          </h1>
          <div style={{ textAlign: "center" }}>
            <Link to={`/login/${props.history.location.pathname}`}>Click here to login</Link>
          </div>
        </>
      );
    };

    if (!this.state.isLoggedin) {
      return (
        <BrowserRouter>
          <Switch>
            <Route
              path="/"
              exact
              history={this.props.history}
              render={(props) => (
                <Login
                  history={props.history}
                  toggleLoggedIn={this.toggleLoggedIn}
                ></Login>
              )}
            ></Route>
            <Route path="/login"  exact
              history={this.props.history}
              render={(props) => (
                <Login
                  history={props.history}
                  toggleLoggedIn={this.toggleLoggedIn}
                ></Login>
              )}></Route>
            <Route
              path="/signUp"
              exact
              history={this.props.history}
              render={(props) => <SignUp history={props.history}></SignUp>}
            ></Route>
            <Route
              path="/nomatch"
              exact={true}
              render={(props) => <NoMatch history={props.history}></NoMatch>}
            />
            <Route history={this.props.history} render={(props) => <Redirect to={{pathname: `/`,search: `?redirect=${props.history.location.pathname}`,}} />} />
          </Switch>
        </BrowserRouter>
      );
    } else {
      return (
        <BrowserRouter>
          <Switch>
            <Route
              path="/"
              render={(props) => (
                <MainDashboard
                  history={props.history}
                  toggleLoggedIn={this.toggleLoggedIn}
                ></MainDashboard>
              )}
            ></Route>
          </Switch>
        </BrowserRouter>
      );
    }
  }
}

export default App;
