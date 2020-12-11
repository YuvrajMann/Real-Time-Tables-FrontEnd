import React, { Component } from "react";
import { Table, Select, Button } from "antd";

const { Option } = Select;
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
class CompleteTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completeDetails: {
        Monday: {},
        Tuesday: {},
        Wednesday: {},
        Thursday: {},
        Friday: {},
        Saturday: {},
        Sunday: {},
      },
    };
  }
  createMenuOption = () => {
    let options = [];
    const subs = this.props.tableinfo;
    for (let i = 1; i <= subs.numberOfSub; ++i) {
      let temp = {};
      temp[`Sub_${i}_Name`] = subs.subInfo[`Sub_${i}_Name`];
      temp[`Sub_${i}_Teacher`] = subs.subInfo[`Sub_${i}_Teacher`];
      options.push(temp);
    }
    return options;
  };
  createData = () => {
    let data = [];
    let periods = this.props.tableinfo.numberOfPeriods;
    for (let i = 0; i < 7; ++i) {
      let row = [];
      row["key"] = i + 1;
      row["Day"] = days[i];
      for (let j = 0; j < periods; ++j) {
        row[`Lecture_${j + 1}_Slot`] = i;
      }
      data.push(row);
    }
    return data;
  };
  handleSelectChange = (details) => {
    console.log(details);
    const x = details.split(" ");
    var sub = x[0];
    var day = x[1];
    var slot = x[2];
    this.setState((prevState) => {
      const setObj = prevState.completeDetails;
      setObj[days[day]][slot] = sub;
      console.log(setObj);
      return {
        ...prevState,
        completeDetails: setObj,
      };
    });
  };
  createColumns = () => {
    let columns = [];
    columns.push({
      title: "Day",
      dataIndex: "Day",
      key: "Day",
      render: (day) => {
        return <div style={{ fontWeight: 700 }}>{day}</div>;
      },
    });
    for (let i = 1; i <= this.props.tableinfo.numberOfPeriods; ++i) {
      var s = `Lecture_${i}_Slot`;
      let timeSlots = this.props.tableinfo.lec_slot;
      let slot;
      for (var prop in timeSlots) {
        if (s == prop) {
          slot = timeSlots[prop];
        }
      }

      let tit = `${slot[0].format("hh:mm")} - ${slot[1].format("hh:mm")}`;
      let subjects = this.createMenuOption();
      columns.push({
        title: tit,
        dataIndex: s,
        key: s,
        render: (row) => {
          return (
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a subject"
              optionFilterProp="children"
              onChange={this.handleSelectChange}
            >
              {subjects.map((sub, index) => {
                const str = sub[`Sub_${index + 1}_Name`];

                return (
                  <Option key={index} value={`${str} ${row} ${i}`}>
                    {str}
                  </Option>
                );
              })}
              <Option value={`Break ${row} ${i}`}>Break</Option>
              <Option value={`NA ${row} ${i}`}>---</Option>
            </Select>
          );
        },
      });
    }
    return columns;
  };
  render() {
    const columns = this.createColumns();
    const data = this.createData();
    return (
      <div className="input_wrapper">
        <Table
          columns={columns}
          dataSource={data}
          style={{
            overflowX: "scroll",
          }}
        ></Table>
        <div
          style={{
            marginTop: "20px",
            textAlign: "right",
          }}
        >
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
            Create
          </Button>
        </div>
      </div>
    );
  }
}
export default CompleteTable;
