import React, { Component } from "react";
import { Table } from "antd";
import "./content.css";
class TableContent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Table
        columns={this.props.columns}
        dataSource={this.props.data}
        theme="dark"
        id="display_table"
      ></Table>
    );
  }
}
export default TableContent;
