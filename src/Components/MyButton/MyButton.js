import React, { Component } from "react";
import { Button } from "antd";
import "./MyButton.css";
class MyButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Button className="outlined" {...this.props}>
        {this.props.text}
      </Button>
    );
  }
}
export default MyButton;
