import React, { Component } from "react";
import { Layout, Menu, Button, Tooltip } from "antd";
import SiteLogo from "../../assests/cloud1_white.svg";
import MyButton from "../MyButton/MyButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
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
          {this.props.collapsed ? (
            <Tooltip title="My Tables" placement="right">
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
            </Tooltip>
          ) : (
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
          )}
        </div>

        <Link to="/addTable">
          <Tooltip title="New Table" placement="right">
            <div className="add_btn">
              <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>{" "}
            </div>
          </Tooltip>
        </Link>

        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          style={{
            background: "#30475e",
            maxHeight: "48vh",
            overflowY: "scroll",
          }}
          mode="inline"
          id={this.props.collapsed ? "col_tables" : "tables"}
        >
          <Menu.Item key="1">
            <Link to="/tables">
              {this.props.collapsed == false ? "Class 9" : "9"}
            </Link>
          </Menu.Item>
          <Menu.Item key="2">Option 2</Menu.Item>
          <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">
            {this.props.collapsed == false ? "Class 9" : "9"}
          </Menu.Item>
          <Menu.Item key="5">Option 2</Menu.Item>
          <Menu.Item key="6">Option 3</Menu.Item>
          <Menu.Item key="7">
            {this.props.collapsed == false ? "Class 9" : "9"}
          </Menu.Item>
          <Menu.Item key="8">Option 2</Menu.Item>
          <Menu.Item key="9">Option 3</Menu.Item>
          <Menu.Item key="10">
            {this.props.collapsed == false ? "Class 9" : "9"}
          </Menu.Item>
          <Menu.Item key="11">Option 2</Menu.Item>
          <Menu.Item key="12">Option 3</Menu.Item>
          <Menu.Item key="13">
            {this.props.collapsed == false ? "Class 9" : "9"}
          </Menu.Item>
          <Menu.Item key="14">Option 2</Menu.Item>
          <Menu.Item key="15">Option 3</Menu.Item>
          <Menu.Item key="16">
            {this.props.collapsed == false ? "Class 9" : "9"}
          </Menu.Item>
          <Menu.Item key="17">Option 2</Menu.Item>
          <Menu.Item key="18">Option 3</Menu.Item>
          <Menu.Item key="19">
            {this.props.collapsed == false ? "Class 9" : "9"}
          </Menu.Item>
          <Menu.Item key="20">Option 2</Menu.Item>
          <Menu.Item key="21">Option 3</Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default SideBar;
