import React, { Component } from "react";
import { TimePicker, Form, Input, Button } from "antd";

const { RangePicker } = TimePicker;

class SelectSlots extends Component {
  constructor(props) {
    super(props);
    this.onFinish = this.onFinish.bind(this);
  }
  onFinish(values) {
    this.props.setLectureSlots(values);
    this.props.next();
  }
  render() {
    const formItems = () => {
      let items = [];
      for (var i = 1; i <= this.props.numberOfPeriods; ++i) {
        items.push(
          <Form.Item
            label={`Lecture ${i} Slot`}
            name={`Lecture_${i}_Slot`}
            
            rules={[
              {
                required: true,
                message: "Please Select Time Slot",
              },
            ]}
            style={{ width: "100%" }}
          >
            <RangePicker order={true}></RangePicker>
          </Form.Item>
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
export default SelectSlots;
