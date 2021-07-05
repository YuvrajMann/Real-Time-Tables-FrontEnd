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
    let redirect=this.props.history.location.search.split('=')[1];
   
    console.log(redirect);
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
          axios
            .post("https://real-time-tables.herokuapp.com/users/login", {
              username: username,
              password: password,
            })
            .then((res) => {
              this.setState({
                ...this.state,
                btnLoading: false,
              });
              const newToken = res.data.token;
              axiosInstance.interceptors.request.use((config) => {
                const auth = `Bearer ${newToken}`;
            
                config.headers.Authorization = `Bearer ${newToken}`;
                return config;
              });
              localStorage.setItem("token", newToken);
              this.props.toggleLoggedIn();
              message.success("Successfully logged in");
            })
            .catch((err) => {
              this.setState({
                ...this.state,
                btnLoading: false,
              });
              console.log(err);
            });
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
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    this.handleLogin();
                  }
                }}
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
            <div className="signup_btn">
              Don't have an account?{" "}
              <Link to="/signUp">
                <u>SignUp</u>
              </Link>
            </div>
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
