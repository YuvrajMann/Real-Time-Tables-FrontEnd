import React, { Component } from "react";
import { Input, Form, Button, Space, InputNumber } from "antd";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
class CompleteTable extends Component {
  constructor(props) {
    super(props);
    this.onFinish = this.onFinish.bind(this);
  }
  onFinish(values) {
    this.props.next();
    this.props.configTableChange(values);
  }
  onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }
  render() {
    return (
      <div className="input_wrapper">
        <Form
          {...layout}
          name="basic"
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            label="Lectures in a day"
            name="numberOfPeriods"
            rules={[
              {
                required: true,
                message: "Please Select number of periods/Lectures in a day",
              },
            ]}
          >
            <InputNumber
              min={1}
              max={100}
              style={{
                width: "100%",
              }}
              placeholder="Number of lectures in a day"
            ></InputNumber>
            {/* <Input
              required={true}
              placeholder="Number of lectures in a day"
            ></Input> */}
          </Form.Item>
          <Form.Item
            label="Table Name"
            name="table_name"
            rules={[
              {
                required: true,
                message: "Please input the table name",
              },
            ]}
          >
            <Input placeholder="Table Name"></Input>
          </Form.Item>
          <Form.Item
            label="Number of Subjects"
            name="numberOfSub"
            rules={[
              {
                required: true,
                message: "Please input number of subjects",
              },
            ]}
          >
            <InputNumber
              min={1}
              max={100}
              style={{
                width: "100%",
              }}
              placeholder="Number of subjects"
            ></InputNumber>
          </Form.Item>
          <Form.Item style={{ justifyContent: "flex-end" }}>
            <Button htmlType="button">Cancel</Button>
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
export default CompleteTable;
