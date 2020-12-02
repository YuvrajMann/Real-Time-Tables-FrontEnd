import React, { Component } from "react";
import { Input } from "antd";
import "./MyInput.css";
class MyInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Input id="my_inut" {...this.props}></Input>;
  }
}
export default MyInput;
