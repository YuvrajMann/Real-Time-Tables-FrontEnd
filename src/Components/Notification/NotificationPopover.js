import React, { Component } from "react";
import { message, Button, Tooltip, Popover, Skeleton } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { axiosInstance } from "../../utils/axiosInterceptor.js";
import "./NotificationPopover.css";
class NotificationPopover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: null,
      loading: false,
      grantButtonLoading: false,
    };
    this.giveAccess = this.giveAccess.bind(this);
  }
  giveAccess(user, table, access_type) {
    this.setState({
      ...this.state,
      loading: true,
    });
    setTimeout(() => {
      axiosInstance
        .post("/access/approveRequest", {
          user: [user],
          table: [table],
          access_type: [access_type],
        })
        .then((res) => {
          console.log(res);
          this.setState({
            ...this.state,
            loading: false,
          });
          message.success("Access given successfully!");
        })
        .catch((err) => {
          this.setState({
            ...this.state,
            loading: false,
          });
          console.log(err.message);
          message.warn(err.message);
        });
    }, 2000);
  }
  fetchNotifications() {
    this.setState({
      ...this.state,
      loading: true,
    });
    setTimeout(() => {
      axiosInstance
        .get("/notifications")
        .then((res) => {
          console.log(res.data);
          this.setState({
            ...this.state,
            notifications: res.data,
            loading: false,
          });
        })
        .catch((err) => {
          this.setState({
            ...this.state,
            loading: false,
          });
          console.log(err);
          if (err.message) {
            message.warn(err.message);
          }
        });
    }, 2000);
  }
  render() {
    const Maincontent = () => {
      return this.state.loading ? (
        <Skeleton active></Skeleton>
      ) : (
        <div className="notification_wrapper">
          {this.state.notifications.map((notification) => {
            return (
              <div className="notification">
                <div className="message">{notification.message}</div>
                <div className="access_btn">
                  <Button
                    style={{
                      backgroundColor: "#f05454",
                      borderColor: "#f05454",
                      color: "#fff",
                      fontWeight: "600",
                      padding: "5px",
                      marginRight: "10px",
                      fontSize: "12px",
                      borderRadius: "10px",
                    }}
                    loading={this.state.grantButtonLoading}
                    onClick={(e) => {
                      this.giveAccess(
                        notification.from_user,
                        notification.table,
                        notification.access_request
                      );
                    }}
                  >
                    Grant Access
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "#f05454",
                      borderColor: "#f05454",
                      color: "#fff",
                      fontWeight: "600",
                      padding: "5px",
                      fontSize: "12px",
                      borderRadius: "10px",
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      );
    };
    return (
      <Popover
        trigger="click"
        content={() => {
          return (
            <Maincontent
              loading={this.state.loading}
              notifications={this.state.notifications}
            ></Maincontent>
          );
        }}
        title="Notifications"
      >
        <FontAwesomeIcon
          icon={faBell}
          onClick={() => {
            console.log("x");
            this.fetchNotifications();
          }}
        ></FontAwesomeIcon>
      </Popover>
    );
  }
}
export default NotificationPopover;
