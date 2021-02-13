import React, { Component } from "react";
import { Popover } from "antd";
import { axiosInstance } from "../../utils/axiosInterceptor.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, message } from "antd";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../Spinner/Spinner";
class UserDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      userData: null,
    };
    this.fetchUserDetails = this.fetchUserDetails.bind(this);
  }
  fetchUserDetails() {
    this.setState({
      ...this.state,
      loading: true,
    });
    setTimeout(() => {
      axiosInstance
        .get("/users")
        .then((res) => {
          console.log(res.data);
          this.setState({
            ...this.state,
            loading: false,
            userData: res.data,
          });
        })
        .catch((err) => {
          console.log(err.message);
          message.warn(err.message);
          this.setState({
            ...this.state,
            loading: false,
          });
        });
    }, 3000);
  }
  componentDidMount() {
    this.fetchUserDetails();
  }
  content = () => {
    if (this.state.loading) {
      return <Spinner></Spinner>;
    } else if (this.state.userData) {
      return <h3>{this.state.userData.username}</h3>;
    }
  };
  render() {
    const content = this.content();
    return (
      <Popover content={content} trigger="click">
        <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
      </Popover>
    );
  }
}
export default UserDisplay;
