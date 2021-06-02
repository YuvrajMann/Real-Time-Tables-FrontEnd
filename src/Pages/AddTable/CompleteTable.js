import React, { Component } from "react";
import { Table, Select, Button, message } from "antd";
import { axiosInstance } from "../../utils/axiosInterceptor";
import axios from "axios";
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
const dateToFormat = "dd/mm/yyyy";
class CompleteTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnLoading: false,
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
    const x = details.split("'__'");
    var sub = x[0];
    var day = x[1];
    var slot = x[2];
    this.setState((prevState) => {
      const setObj = prevState.completeDetails;
      if (setObj) {
        setObj[days[day]][slot] = sub;
      }
      return {
        ...prevState,
        completeDetails: setObj,
      };
    });
  };
  componentDidMount(){
    this.setState((prevState) => {
      const setObj = prevState.completeDetails;
      for(var day=0;day<7;++day){
        for (let i = 1; i <= this.props.tableinfo.numberOfPeriods; ++i) {
            if(setObj){
              setObj[days[day]][i]='NA';
            }
        }
      }
      return {
        ...prevState,
        completeDetails: setObj,
      };
    });
  }
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
      let tit = `${slot[0].format("HH:mm")} - ${slot[1].format("HH:mm")}`;
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
              defaultValue={`NA'__'${row}'__'${i}`}
            >
              {subjects.map((sub, index) => {
                const str = sub[`Sub_${index + 1}_Name`];

                return (
                  <Option key={index} value={`${str}'__'${row}'__'${i}`}>
                    {str}
                  </Option>
                );
              })}
              <Option value={`Break'__'${row}'__'${i}`}>Break</Option>
              <Option value={`NA'__'${row}'__'${i}`}>---</Option>
            </Select>
          );
        },
      });
    }
    return columns;
  };
  onCreateClick = () => {
    this.setState({ ...this.state, btnLoading: true });
    const { table_name, lec_slot } = this.props.tableinfo;
    var result = {};
    result["tableName"] = table_name;
    var periods = [];
    for (var slot in lec_slot) {
      if (lec_slot.hasOwnProperty(slot)) {
        var temp = {};
        temp["1"] = `${lec_slot[slot][0].format("HH:mm")}-${lec_slot[
          slot
        ][1].format("HH:mm")}`;

        periods.push(temp);
      }
    }
    result["periods"] = periods;
    var table = [];
    for (var day in this.state.completeDetails) {
      if (this.state.completeDetails.hasOwnProperty(day)) {
        var temp = {};
        temp["day"] = day;
        temp["schedule"] = this.state.completeDetails[day];
        table.push(temp);
      }
    }
    result["table"] = table;

    let subjects = {};
    subjects["numberOfSub"] = this.props.tableinfo.numberOfSub;
    subjects["subInfo"] = this.props.tableinfo.subInfo;
    result["subjects"] = subjects;

      axiosInstance
        .post("/table", result)
        .then((res) => {
          message.success("Table created successfully");
          this.setState({ ...this.state, btnLoading: false }, () => {
            this.props.redirectToHome();
          });
        })
        .catch((err) => {
          this.setState({ ...this.state, btnLoading: false });
          message.warn(err.message);
          console.log(err);
        });

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
            loading={this.state.btnLoading}
            onClick={() => {
              this.onCreateClick();
            }}
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
