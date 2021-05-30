import React, { Component } from "react";
import {
  message,
  Button,
  Tooltip,
  Popover,
  Skeleton,
  notification,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell,faCalendar } from "@fortawesome/free-solid-svg-icons";
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
  giveAccess(user, table, access_type, notificationId) {
    this.setState({
      ...this.state,
      loading: true,
    });
    setTimeout(() => {
      axiosInstance
        .post("/access/approveRequest", {
          user: user,
          table: table,
          access_type: access_type,
          notification_id: notificationId,
        })
        .then((res) => {
          console.log(res);
          this.setState({
            ...this.state,
            loading: false,
          });
          message.success("Access given successfully!");
        })
        .catch((error) => {
          this.setState({
            ...this.state,
            loading: false,
          });
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            message.warn(error.response.data.error);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
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
          let revNot=res.data.reverse();
          this.setState({
            ...this.state,
            notifications: revNot,
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
                  <div>
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
                        notification.access_request,
                        notification._id
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
                  <Tooltip placement="left" title={()=>{
                    let createdAt=notification.createdAt;
                    let date=createdAt.split('T')[0];
                    let time=createdAt.split('T')[1];
                    time=time.split('.')[0];
                    return(
                      <>
                      {date}
                      <br></br>{time}
                      </>
                      
                    )
                  }}>
                      <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>
                  </Tooltip>
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
