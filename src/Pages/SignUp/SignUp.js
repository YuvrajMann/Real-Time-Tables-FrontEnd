import React, { Component } from "react";
import "./SignUp.css";
import {
  Form,
  Row,
  Col,
  Input,
  InputNumber,
  Select,
  Button,
  message,
} from "antd";
import { Link } from "react-router-dom";
import logo from "../../assests/clockWhite.svg";
import { axiosInstance } from "../../utils/axiosInterceptor.js";
import * as EmailValidator from "email-validator";
import axios from "axios";
import left_img from "../../assests/alex-iby-xVPaGwmde0A-unsplash.jpg";
const { Option } = Select;
const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnLoading: false,
      userName: {
        value: "",
      },
      email: {
        value: "",
      },
    };
    this.onUserChange = this.onUserChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
  }
  validateEmail(user_email) {
    if (EmailValidator.validate(user_email)) {
      return {
        validateStatus: "success",
        errorMsg: null,
      };
    } else {
      return {
        validateStatus: "error",
        errorMsg: "Invalid",
      };
    }
  }
  onEmailChange(value) {
    const userEmail = value.target.value;
    this.setState({
      email: { ...this.validateEmail(value.target.value), userEmail },
    });
  }
  validateUsername(user_name) {
    if (user_name.length > 6) {
      return {
        validateStatus: "success",
        errorMsg: null,
      };
    } else {
      return {
        validateStatus: "error",
        errorMsg: "Should be at least 6 characters long!",
      };
    }
  }
  onUserChange(value) {
    const userValue = value.target.value;
    this.setState({
      userName: { ...this.validateUsername(value.target.value), userValue },
    });
  }
  onSubmit(e) {
   
    if (
      this.state.userName.validateStatus == "success" &&
      this.state.email.validateStatus == "success"
    ) {
    
      this.setState({ ...this.state, btnLoading: true });
      axiosInstance
        .post("/users/signup", { ...e })
        .then((res) => {
          this.setState({ ...this.state, btnLoading: false }, () => {
      
            this.props.history.push("/");
            message.success("Successfully Signed Up");
          });
        })
        .catch((err) => {
          var error = err.response;
          if (error) {
            this.setState({ ...this.state, btnLoading: false });
            message.warn(error.data.err.message);
          } else {
            this.setState({ ...this.state, btnLoading: false });
            console.log(err);
            message.warn(err.message);
          }
        });
    } else if (this.state.userName.validateStatus == "error") {
      message.warn("Enter a valid password!");
    } else if (this.state.email.validateStatus == "error") {
      message.warn("Enter a valid email!");
    }
  }
  render() {
    return (
      <div className="signUpWrapper">
        <div className="left_content">
          <img src={left_img}></img>
          <div className="in_context">
            <div>
            <div className="logo">
                <img src={logo} width={60}></img>
              </div>
                  <div id="left_text">
                    <div>Real Time Tables</div>
                    <div>Time management starts here</div>
                  </div>
                  <div id="sign_text">Sign up to experince the change</div>
               </div>
            </div>
          </div>
        <div className="right_content">
          <Row id="header_signup">
            <Col span={24}>
              <h1 style={{ fontWeight: "600" }}>Join Real Time Tables</h1>
            </Col>
            <Col span={24} style={{ marginTop: "-15px" }}>
              <span>
                Already have an account?{" "}
                <Link to="/">
                  <u style={{ color: " rgba(0, 0, 0, 0.685)" }}>Login</u>
                </Link>
              </span>
            </Col>
          </Row>

          <Row>
            <Form
              {...layout}
              name="signUp"
              id="sign"
              colon={false}
              autoComplete="off"
              style={{ width: "100%", marginTop: "40px" }}
              onFinish={(e) => {
                this.onSubmit(e);
              }}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: "Pl" }]}
              >
                <Input autoComplete={false}></Input>
              </Form.Item>
              <Form.Item
                label="Password(min 6 char)"
                name="password"
                hasFeedback
                validateStatus={this.state.userName.validateStatus}
                // help={this.state.userName.errorMsg}
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  value={this.state.userName.value}
                  onChange={this.onUserChange}
                  autoComplete={false}
                ></Input.Password>
              </Form.Item>
              <Form.Item
                label="Firstname"
                name="firstname"
                rules={[
                  {
                    required: true,
                    message: "Please input your firstname!",
                  },
                ]}
              >
                <Input autoComplete={false}></Input>
              </Form.Item>

              <Form.Item name="lastname" label="Lastname">
                <Input autoComplete={false}></Input>
              </Form.Item>
              <Form.Item
                validateStatus={this.state.email.validateStatus}
                // help={this.state.email.errorMsg}
                label="Email Address(Enter a valid one)"
                name="email"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please input your emailAddress!",
                  },
                ]}
              >
                <Input
                  value={this.state.email.value}
                  onChange={this.onEmailChange}
                ></Input>
              </Form.Item>

              <Form.Item label="Age" name="age">
                <InputNumber style={{ width: "100%" }}></InputNumber>
              </Form.Item>
              <Form.Item label="Sex" name="sex">
                <Select style={{ width: "100%" }}>
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="notSay">Rather not say</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Institution Name" name="institutionName">
                <Input style={{ width: "100%" }}></Input>
              </Form.Item>
              <Form.Item label="Standard" name="standard">
                <Input style={{ width: "100%" }}></Input>
              </Form.Item>
              <Form.Item>
                <Button
                  loading={this.state.btnLoading}
                  id="join_btn"
                  htmlType="submit"
                >
                  Join
                </Button>
              </Form.Item>
            </Form>
          </Row>
        </div>
      </div>
    );
  }
}
export default SignUp;
