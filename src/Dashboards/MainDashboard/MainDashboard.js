import React, { Component } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import SideBar from "../../Components/SideBar.js/SideBar.js";
import MyHeader from "../../Components/MyHeader/MyHeader";
import MainContent from "../../Components/MainContent/MainContent";
import { Switch, Route } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
class MyTables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <SideBar
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        ></SideBar>
        <Layout className="site-layout">
          <MyHeader></MyHeader>
          <MainContent history={this.props.history}></MainContent>
        </Layout>
      </Layout>
    );
  }
}
export default MyTables;
