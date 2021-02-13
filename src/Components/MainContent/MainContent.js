import React, { Component } from "react";
import { Layout } from "antd";
import { Table } from "antd";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import MyTables from "../../Pages/MyTables/MyTables";
import AddTable from "../../Pages/AddTable/AddTable";
import AllTables from "../../Pages/AllTables/AllTables";
import EditTables from "../../Pages/EditTable/EditTable";
const { Content } = Layout;

class MainContent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Content
        style={{
          margin: "40px 20px",
          borderRadius: "20px",
          minHeight: "auto",
        }}
      >
        <Switch>
          <Route
            path="/"
            exact
            children={() => {
              return <AllTables history={this.props.history}></AllTables>;
            }}
          ></Route>
          <Route
            path="/tables/:tableId"
            exact={true}
            component={() => {
              return <MyTables history={this.props.history}></MyTables>;
            }}
          ></Route>
          <Route
            path="/addTable"
            children={() => {
              return <AddTable history={this.props.history}></AddTable>;
            }}
          ></Route>
          <Route
            path="/allTables"
            children={() => {
              return <AllTables history={this.props.history}></AllTables>;
            }}
          ></Route>
          <Route
            path="/editTable/:tableId"
            exact={true}
            component={() => {
              return <EditTables history={this.props.history}></EditTables>;
            }}
          ></Route>
        </Switch>
      </Content>
    );
  }
}
export default MainContent;
