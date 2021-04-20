import React, { Component } from "react";
import { Layout, Tooltip, message, notification } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faUser,
  faShareAlt,
  faEllipsisH,
  faSignOutAlt,
  faBell,
  faBellOn,
} from "@fortawesome/free-solid-svg-icons";
import { UserOutlined } from "@ant-design/icons";
import { axiosInstance } from "../../utils/axiosInterceptor";
import "./MyHeader.css";

import Spinner from "../Spinner/Spinner";
import SiteLogo from "../../assests/clock1.svg";
import UserDisplay from "../UseDisplay/UserDisplay";
import NotificationPopover from "../Notification/NotificationPopover";

const { Header } = Layout;
class MyHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableName: null,
    };
  }

  logout = () => {
    console.log(this.props.history);
    this.props.history.push("/");
    localStorage.setItem("token", null);
    axiosInstance.interceptors.request.use((config) => {
      config.headers.Authorization = null;
      return config;
    });
    this.props.toggleLoggedIn();
    message.success("Successfully logged out");
  };
  render() {
    return (
      <Header
        className="site-layout-background"
        style={{
          padding: 0,
          backgroundColor: "white",
          borderLeft: "1px solid rgba(255, 255, 255, 0.137)",
          boxShadow: "rgba(114, 114, 114, 0.42) 1px 3px 5px -1px",
        }}
      >
        <div className="header_content">
          <div className="logo_header">
            <div>
              <img src={SiteLogo} width={25}></img>
            </div>
            <div>Real Time Tables</div>
          </div>

          <div className="options">
            <div className="rod"></div>
            <NotificationPopover></NotificationPopover>
            <div className="rod"></div>
            <UserDisplay></UserDisplay>

            <div className="rod"></div>

            <Tooltip title="Logout">
              <FontAwesomeIcon
                icon={faSignOutAlt}
                style={{ fontSize: "1.3em" }}
                onClick={this.logout}
              ></FontAwesomeIcon>
            </Tooltip>
          </div>
        </div>
      </Header>
    );
  }
}
export default MyHeader;
