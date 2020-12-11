import React, { Component } from "react";
import { Layout } from "antd";
import { Table } from "antd";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import MyTables from "../../Pages/MyTables/MyTables";
import AddTable from "../../Pages/AddTable/AddTable";
const { Content } = Layout;

class MainContent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.history);
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
            path="/tables/"
            key={1}
            exact={true}
            children={() => {
              console.log("inside tables");
              return <MyTables history={this.props.history}></MyTables>;
            }}
          ></Route>
          <Route
            path="/addTable"
            children={() => {
              return <AddTable history={this.props.history}></AddTable>;
            }}
          ></Route>
        </Switch>
      </Content>
    );
  }
}
export default MainContent;
