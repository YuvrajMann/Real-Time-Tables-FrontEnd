import React, { Component } from "react";
import { Layout, Menu, Button } from "antd";
import SiteLogo from "../../assests/cloud1_white.svg";
import MyButton from "../MyButton/MyButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./SideBar.css";
const { Sider } = Layout;
const { SubMenu } = Menu;

class SideBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Sider
        collapsible
        collapsed={this.props.collapsed}
        onCollapse={this.props.onCollapse}
        style={{
          background: "#30475e",
        }}
      >
        <div className="logo">
          <img src={SiteLogo} width={80}></img>
          {!this.props.collapsed ? <h3>Real Time Tables</h3> : ""}
        </div>
        <div className="mytable_btn">
          {" "}
          <Button
            style={{
              width: "90%",
              height: "50px",
              marginBottom: "30px",
              justifyContent: "center",
              backgroundColor: "#f05454",
              borderColor: "#f05454",
              color: "#fff",
              fontWeight: 800,
              textAlign: "center",
            }}
          >
            {this.props.collapsed == false ? (
              "My Tables"
            ) : (
              <FontAwesomeIcon icon={faTable}></FontAwesomeIcon>
            )}
          </Button>
        </div>
        <div className="add_btn">
          <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          style={{
            background: "#30475e",
          }}
          mode="inline"
          id="tables"
        >
          <Menu.Item key="1">
            {this.props.collapsed == false ? "Class 9" : "9"}
          </Menu.Item>
          <Menu.Item key="2">Option 2</Menu.Item>
          <Menu.Item key="3">Option 3</Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default SideBar;
