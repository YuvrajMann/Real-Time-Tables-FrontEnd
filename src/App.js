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

    if (token) {
      axios
        .get("https://localhost:3433/users/checkJWTToken", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res);
          axiosInstance.interceptors.request.use((config) => {
            const auth = `Bearer ${token}`;
            console.log(auth);
            config.headers.Authorization = `Bearer ${token}`;
            return config;
          });
          this.toggleLoggedIn();
        })
        .catch((err) => {
          console.log(err);
          message.warn("Invalid token");
        });
    }
  }
  render() {
    const NoMatch = (props) => {
      // setTimeout(() => {
      //   props.history.push("/");
      // }, 2000);

      return (
        <>
          <h1 style={{ textAlign: "center", paddingTop: "10px" }}>
            You are not logged in to Real Time Tables.Please login to continue.
          </h1>
          <div style={{ textAlign: "center" }}>
            <a href="/">Click here to move to home page</a>
          </div>
        </>
      );
    };
    const NoMatch2 = () => <p>Oops nothing found</p>;
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
            <Route
              path="/signUp"
              exact
              history={this.props.history}
              render={(props) => <SignUp history={props.history}></SignUp>}
            ></Route>
            <Route
              path="*"
              component={(props) => {
                return <NoMatch history={props.history}></NoMatch>;
              }}
            />
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
