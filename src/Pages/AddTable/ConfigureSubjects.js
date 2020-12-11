import React, { Component } from "react";
import { Form, Input, Button } from "antd";
class configureSubjects extends Component {
  constructor(props) {
    super(props);
    this.onFinish = this.onFinish.bind(this);
    this.onFinishFailed = this.onFinishFailed.bind(this);
  }
  onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }
  onFinish(values) {
    this.props.next();
    this.props.setSubInfo(values);
  }
  render() {
    console.log(this.props);
    const formItems = () => {
      let items = [];
      for (var i = 1; i <= this.props.numberOfSub; ++i) {
        items.push(
          <div
            className={`Sub${i}`}
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Form.Item
              label={`Sub ${i} Name`}
              name={`Sub_${i}_Name`}
              rules={[
                {
                  required: true,
                  message: "Please fill the subject name",
                },
              ]}
              style={{ width: "40%" }}
            >
              <Input placeholder={`Fill Sub ${i} Name`}></Input>
            </Form.Item>
            <Form.Item
              label={`Sub ${i} Teacher`}
              name={`Sub_${i}_Teacher`}
              rules={[
                {
                  required: true,
                  message: "Please fill the subject name",
                },
              ]}
              style={{ width: "40%" }}
            >
              <Input placeholder={`Fill Sub ${i} Teacher`}></Input>
            </Form.Item>
          </div>
        );
      }
      return items;
    };
    return (
      <div className="input_wrapper">
        <Form
          name="basic"
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          {formItems().map((jsxel) => {
            return jsxel;
          })}
          <Form.Item style={{ textAlign: "right" }}>
            <Button htmlType="button" onClick={this.props.prev}>
              Previous
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                marginLeft: "10px",
              }}
            >
              Next
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default configureSubjects;
