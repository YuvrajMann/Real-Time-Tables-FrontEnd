import React, { Component } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import SideBar from "../../Components/SideBar.js/SideBar.js";
import MyHeader from "../../Components/MyHeader/MyHeader";
import MainContent from "../../Components/MainContent/MainContent";
import { Switch, Route, Link } from "react-router-dom";
import AllTables from "../../Pages/AllTables/AllTables";
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
  componentDidMount(){
    const page = this.props.history.location.search.split("=")[1];
    if(page){
      this.props.history.push(page);
    }
  }
  render() {
    const page = this.props.history.location.pathname.split("/")[1];
    const isAllTable = page == "allTables";

    return (
      <Layout style={{ minHeight: "100vh" }}>
        {!isAllTable ? (
          <SideBar
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
            history={this.props.history}
          ></SideBar>
        ) : null}
        <Layout className="site-layout">
          <MyHeader
            toggleLoggedIn={this.props.toggleLoggedIn}
            history={this.props.history}
          ></MyHeader>
          <MainContent history={this.props.history}></MainContent>
        </Layout>
      </Layout>
    );
  }
}
export default MyTables;
