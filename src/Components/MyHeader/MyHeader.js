import React, { Component } from "react";
import { Layout, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faUser,
  faShareAlt,
  faEllipsisV,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import "./MyHeader.css";
const { Header } = Layout;
class MyHeader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Header
        className="site-layout-background"
        style={{
          padding: 0,
          backgroundColor: "#30475e",
          borderLeft: "1px solid rgba(255, 255, 255, 0.137)",
        }}
      >
        <div className="header_content">
          <div>
            My Tables/Class 10th{" "}
            <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
          </div>
          <div className="options">
            <div></div>
            <Tooltip title="User">
              <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
            </Tooltip>

            <div></div>
            <Tooltip title="Share">
              <FontAwesomeIcon icon={faShareAlt}></FontAwesomeIcon>
            </Tooltip>

            <div></div>
            <FontAwesomeIcon icon={faEllipsisV}></FontAwesomeIcon>
          </div>
        </div>
      </Header>
    );
  }
}
export default MyHeader;
