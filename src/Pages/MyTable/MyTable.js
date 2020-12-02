import React, { Component } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import SideBar from "../../Components/SideBar.js/SideBar.js";
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
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              Bill is a cat.
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}></Footer>
        </Layout>
      </Layout>
    );
  }
}
export default MyTables;
