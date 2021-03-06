import React, { Component } from "react";
import logo from "../../assests/clock1.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faExclamation,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Input, Button, Tooltip, message } from "antd";
import "./Login.css";
import MyButton from "../../Components/MyButton/MyButton";
import MyInput from "../../Components/Input/MyInput";
import axios from "axios";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosInterceptor";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      loading: false,
      userTooltip: false,
      passwordTooltip: false,
      btnLoading: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin = () => {
    const { username, password } = this.state;
    console.log(username, password);
    if (
      username != null &&
      username != "" &&
      password != null &&
      password != ""
    ) {
      this.setState(
        {
          ...this.state,
          userTooltip: false,
          passwordTooltip: false,
          btnLoading: true,
        },
        () => {
          setTimeout(() => {
            axios
              .post("https://localhost:3433/users/login", {
                username: username,
                password: password,
              })
              .then((res) => {
                this.setState({
                  ...this.state,
                  btnLoading: false,
                });
                const token = res.data.token;
                if (token) {
                  axiosInstance.interceptors.request.use((config) => {
                    config.headers.Authorization = "Bearer " + token;
                    return config;
                  });
                  localStorage.setItem("token", token);
                  message.success("Successfully logged in");
                  this.props.toggleLoggedIn();
                }
                console.log(res);
              })
              .catch((err) => {
                this.setState({
                  ...this.state,
                  btnLoading: false,
                });
                console.log(err);
              });
          }, 2000);
        }
      );
    } else if (
      (username == null || username == "") &&
      (password == null || password == "")
    ) {
      this.setState({
        ...this.state,
        userTooltip: true,
        passwordTooltip: true,
      });
    } else if (username == null || username == "") {
      this.setState({
        ...this.state,
        userTooltip: true,
      });
    } else if (password == null || password == "") {
      this.setState({
        ...this.state,
        passwordTooltip: true,
      });
    }
  };
  render() {
    return (
      <div className="login-page">
        <div className="loginheader">
          <div>
            <img src={logo} width={40} height={40}></img>
            <div id="title_name">Real Time Table</div>
          </div>
          <div className="links">
            <div>About</div>
            {/* <Link to="/signUp">
              <MyButton
                text="Sign Up"
                id="signup_btn1"
                style={{ width: "90px", height: "40px", borderRadius: "20px" }}
              ></MyButton>
            </Link> */}
          </div>
        </div>
        <div className="logincontent">
          <div>
            <FontAwesomeIcon icon={faUser} />
            <div>Login</div>
          </div>
          <div ref={this.myBox}>
            <Tooltip
              color="#FF8A8A"
              title={() => {
                return (
                  <>
                    <FontAwesomeIcon icon={faExclamation}></FontAwesomeIcon>
                    <span> Username required</span>
                  </>
                );
              }}
              placement="topRight"
              visible={this.state.userTooltip}
              overlayClassName="numeric-input"
            >
              <MyInput
                placeholder="User Name"
                onChange={(event) => {
                  this.setState({
                    ...this.state,
                    userTooltip: false,
                    username: event.target.value,
                  });
                }}
              ></MyInput>
            </Tooltip>
            <Tooltip
              color="#FF8A8A"
              placement="topRight"
              visible={this.state.passwordTooltip}
              overlayClassName="numeric-input"
              title={() => {
                return (
                  <>
                    <FontAwesomeIcon icon={faExclamation}></FontAwesomeIcon>
                    <span> Password required</span>
                  </>
                );
              }}
            >
              <Input.Password
                placeholder="password"
                id="my_pass"
                onChange={(event) => {
                  this.setState({
                    ...this.state,
                    passwordTooltip: false,
                    password: event.target.value,
                  });
                }}
              />
            </Tooltip>
            <div className="login_btn">
              <MyButton
                text="Login"
                loading={false}
                onClick={this.handleLogin}
                style={{
                  width: "100%",
                }}
                loading={this.state.btnLoading}
              ></MyButton>
            </div>
            <Link to="/signUp">
              <div className="signup_btn">
                <MyButton
                  text="Sign Up"
                  loading={false}
                  style={{
                    width: "100%",
                  }}
                ></MyButton>
              </div>
            </Link>
          </div>
        </div>
        <div className="loginfooter">
          * Real Time Tables Created by Yuvraj Mann *
        </div>
      </div>
    );
  }
}
export default Login;
