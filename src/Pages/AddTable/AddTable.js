import React, { Component } from "react";
import { Steps, Input, Form, Button, Space, message } from "antd";
import MyInput from "../../Components/Input/MyInput";
import CompleteTable from "./CompleteTable";
import ConfigureSubjects from "./ConfigureSubjects";
import ConfigureTable from "./ConfigureTable.js";
import SelectSlots from "./SelectSlots.js";
import "./AddTable.css";

const { Step } = Steps;

const steps = [
  {
    title: "Configure Table",
  },
  {
    title: "Configure Subjects",
  },
  {
    title: "Select Time Slots For Lectures",
  },
  {
    title: "Complete Table",
  },
];

class AddTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      numberOfPeriods: 0,
      table_name: null,
      numberOfSub: 0,
      subInfo: null,
      lec_slot: null,
    };
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.configTableChange = this.configTableChange.bind(this);
    this.setSubInfo = this.setSubInfo.bind(this);
    this.setLectureSlots = this.setLectureSlots.bind(this);
  }
  setLectureSlots(values) {
    this.setState({
      ...this.state,
      lec_slot: values,
    });
  }
  setSubInfo(values) {
    this.setState({
      ...this.state,
      subInfo: values,
    });
  }
  configTableChange(values) {
    this.setState({
      numberOfPeriods: values.numberOfPeriods,
      numberOfSub: values.numberOfSub,
      table_name: values.table_name,
    });
  }
  next() {
    this.setState({ ...this.state, current: this.state.current + 1 });
  }
  prev() {
    this.setState({ ...this.state, current: this.state.current - 1 });
  }
  redirectToHome = () => {
    this.props.history.push("/allTables");
  };
  render() {
    const current = this.state.current;
    switch (current) {
      case 0:
        return (
          <div className="add_wrapper">
            <Steps current={this.state.current}>
              {steps.map((item) => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            <ConfigureTable
              next={this.next}
              configTableChange={this.configTableChange}
            ></ConfigureTable>
          </div>
        );
      case 1:
        return (
          <div className="add_wrapper">
            <Steps current={this.state.current}>
              {steps.map((item) => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            <ConfigureSubjects
              next={this.next}
              prev={this.prev}
              numberOfSub={this.state.numberOfSub}
              setSubInfo={this.setSubInfo}
            ></ConfigureSubjects>
          </div>
        );
      case 2:
        return (
          <div className="add_wrapper">
            <Steps current={this.state.current}>
              {steps.map((item) => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            <SelectSlots
              numberOfPeriods={this.state.numberOfPeriods}
              setLectureSlots={this.setLectureSlots}
              next={this.next}
              prev={this.prev}
            ></SelectSlots>
          </div>
        );
      case 3:
        return (
          <div className="add_wrapper">
            <Steps current={this.state.current}>
              {steps.map((item) => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            <CompleteTable
              redirectToHome={this.redirectToHome}
              tableinfo={this.state}
              next={this.next}
              prev={this.prev}
            ></CompleteTable>
          </div>
        );
    }
  }
}

export default AddTable;
