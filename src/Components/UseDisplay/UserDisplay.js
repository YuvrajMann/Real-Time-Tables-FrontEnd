import React, { Component } from "react";
import { Popover, Avatar, Image } from "antd";
import { axiosInstance } from "../../utils/axiosInterceptor.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, message } from "antd";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../Spinner/Spinner";
import "./UserDisplay.css";
import { Link } from "react-router-dom";

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
      return (
        <div className="view_profile">
          <div className="profile_header">
            <Avatar
              size={40}
              src={
                <Image
                  src={
                    this.state.userData &&
                    this.state.userData.hasOwnProperty("profilePic") &&
                    this.state.userData.profilePic ? (
                      `https://localhost:3433/${this.state.userData.profilePic}`
                    ) : (
                      <>H</>
                    )
                  }
                ></Image>
              }
            ></Avatar>
            <div className="user_name_view">{this.state.userData.username}</div>
          </div>
          <Link to={`/viewUser`}>
            <div className="view_profile_btn"> View Profile</div>
          </Link>
        </div>
      );
    }
  };
  render() {
    console.log(this.state.userData);
    const content = this.content();
    return (
      <Popover content={content} trigger="click">
        <Avatar
          style={{
            color: "#f05454",
            backgroundColor: "#f0545473",
            cursor: "pointer",
          }}
          src={
            this.state.userData &&
            this.state.userData.hasOwnProperty("profilePic") &&
            this.state.userData.profilePic ? (
              `https://localhost:3433/${this.state.userData.profilePic}`
            ) : (
              <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
            )
          }
        ></Avatar>
      </Popover>
    );
  }
}
export default UserDisplay;
