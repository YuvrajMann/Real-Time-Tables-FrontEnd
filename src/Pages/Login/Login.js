import React, { Component } from "react";
import logo from "../../assests/clock1.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Input, Button } from "antd";
import "./Login.css";
import MyButton from "../../Components/MyButton/MyButton";
import MyInput from "../../Components/Input/MyInput";

class Login extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.history);
    return (
      <div className="login-page">
        <div className="loginheader">
          <div>
            <img src={logo} width={40} height={40}></img>
            <div id="title_name">Real Time Table</div>
          </div>
          <div className="links">
            <div>About</div>
            <MyButton text="Sign Up" id="signup_btn1"></MyButton>
          </div>
        </div>
        <div className="logincontent">
          <div>
            <FontAwesomeIcon icon={faUser} />
            <div>Login</div>
          </div>
          <div>
            <MyInput placeholder="User Name" autoComplete={false}></MyInput>
            <Input.Password placeholder="password" id="my_pass" />
            <div className="login_btn">
              <MyButton
                text="Login"
                loading={false}
                style={{
                  width: "100%",
                }}
                onClick={this.props.toggleLoggedIn}
              ></MyButton>
            </div>
            <div className="signup_btn">
              <MyButton
                text="Sign Up"
                loading={false}
                style={{
                  width: "100%",
                }}
              ></MyButton>
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
