import React, { Component } from "react";
import TableContent from "../../Components/Content/content";
import MyButton from "../../Components/MyButton/MyButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClock,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { axiosInstance } from "../../utils/axiosInterceptor.js";
import { Divider, Space, message, Skeleton } from "antd";
import { Link } from "react-router-dom";
import "./MyTables.css";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
class MyTables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curTime: null,
      tableName: null,
      loading: false,
      columns: [],
      data: [],
      tableId: null,
    };
    this.clock = this.clock.bind(this);
  }
  fetchTableDetails = () => {
    const tableId = this.props.history.location.pathname.split("/")[2];
    this.setState({ ...this.state, loading: true });
    setTimeout(() => {
      axiosInstance
        .get(`/table/${tableId}`)
        .then((table) => {
          console.log(table);
          this.createColumns(table.data.periods);
          this.createData(table.data.table);
          this.setState({
            ...this.state,
            tableName: table.data.tableName,
            tableId: tableId,
            loading: false,
          });
        })
        .catch((err) => {
          console.log(err);
          if (err.message) {
            message.warn(err.message);
          }
          this.setState({
            ...this.state,

            loading: false,
          });
        });
    }, 1000);
  };
  componentDidMount() {
    this.clock();
    setInterval(this.clock, 1000);
    console.log("asdsad");
    this.fetchTableDetails();
  }
  createColumns(periods) {
    console.log(periods);
    var columns = [];
    let dayCol = {
      title: "Day",
      dataIndex: "Day",
      key: "Day",
      render: (day) => {
        return <div style={{ fontWeight: 700 }}>{day}</div>;
      },
    };
    columns.push(dayCol);
    periods.map((period, index) => {
      let temp = {};
      temp["title"] = period[1];
      temp["dataIndex"] = index + 1;
      temp["key"] = index + 1;
      columns.push(temp);
    });
    console.log(columns);
    this.setState({
      ...this.state,
      columns: columns,
    });
  }
  createData(data) {
    var tabledata = [];
    data.map((row, index) => {
      var temp = {};
      temp["key"] = index;
      temp["Day"] = row.day;
      let merged = { ...temp, ...row.schedule };

      tabledata.push(merged);
    });
    this.setState({
      ...this.state,
      data: tabledata,
    });
  }
  // data = [
  //   {
  //     key: "1",
  //     Day: "Monday",
  //     slot1: "Mathematics",
  //     slot2: "Hindi",
  //     slot3: "Computer",
  //     slot4: "Geography",
  //     slot5: "Social Studies",
  //   },
  //   {
  //     key: "1",
  //     Day: "Tuesday",
  //     slot1: "Mathematics",
  //     slot2: "Hindi",
  //     slot3: "Computer",
  //     slot4: "Geography",
  //     slot5: "Social Studies",
  //   },
  //   {
  //     key: "1",
  //     Day: "Wednesday",
  //     slot1: "Mathematics",
  //     slot2: "Hindi",
  //     slot3: "Computer",
  //     slot4: "Geography",
  //     slot5: "Social Studies",
  //   },
  //   {
  //     key: "1",
  //     Day: "Thursday",
  //     slot1: "Mathematics",
  //     slot2: "Hindi",
  //     slot3: "Computer",
  //     slot4: "Geography",
  //     slot5: "Social Studies",
  //   },
  //   {
  //     key: "1",
  //     Day: "Friday",
  //     slot1: "Mathematics",
  //     slot2: "Hindi",
  //     slot3: "Computer",
  //     slot4: "Geography",
  //     slot5: "Social Studies",
  //   },
  //   {
  //     key: "1",
  //     Day: "Saturday",
  //     slot1: "Mathematics",
  //     slot2: "Hindi",
  //     slot3: "Computer",
  //     slot4: "Geography",
  //     slot5: "Social Studies",
  //   },
  // ];
  // columns = [
  //   {
  //     title: "Day",
  //     dataIndex: "Day",
  //     key: "Day",
  //     render: (day) => {
  //       return <div style={{ fontWeight: 700 }}>{day}</div>;
  //     },
  //   },
  //   {
  //     title: "9:45 - 10:45",
  //     dataIndex: "slot1",
  //     key: "slot1",
  //   },
  //   {
  //     title: "10:45 - 11:45",
  //     dataIndex: "slot2",
  //     key: "slot2",
  //   },
  //   {
  //     title: "11:45 - 12:45",
  //     dataIndex: "slot3",
  //     key: "slot3",
  //   },
  //   {
  //     title: "1:45 - 2:45",
  //     dataIndex: "slot4",
  //     key: "slot4",
  //   },
  //   {
  //     title: "9:45 - 10:45",
  //     dataIndex: "slot5",
  //     key: "slot5",
  //   },
  // ];

  clock() {
    // We create a new Date object and assign it to a variable called "time".
    var time = new Date(),
      // Access the "getHours" method on the Date object with the dot accessor.
      hours = time.getHours(),
      // Access the "getMinutes" method with the dot accessor.
      minutes = time.getMinutes(),
      seconds = time.getSeconds();
    function harold(standIn) {
      if (standIn < 10) {
        standIn = "0" + standIn;
      }
      return standIn;
    }
    var str = `${harold(hours)}:${harold(minutes)}:${harold(seconds)}`;
    this.setState({ ...this.state, curTime: str });
  }

  render() {
    const d = new Date();
    const dateToFormat = "dddd, MMMM Do YYYY";
    return (
      <div className="wrapper">
        <div className="tableHeader">
          <div className="table_name">My Tables/{this.state.tableName}</div>

          <div className="date">
            <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>

            <div>
              {moment().format(dateToFormat)}
              {/* {d.getDate()}-{d.getMonth() + 1}-{d.getFullYear()} */}
            </div>
            <div id="bar"></div>
            <div style={{ width: "90px", display: "flex" }}>
              <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
              <div>{this.state.curTime}</div>
            </div>
          </div>
        </div>
        <Divider></Divider>
        {this.state.loading ? (
          <Skeleton active></Skeleton>
        ) : (
          <>
            <TableContent
              id="displayTable"
              columns={this.state.columns}
              data={this.state.data}
            ></TableContent>
            <Link to={`/editTable/${this.state.tableId}`}>
              <div className="edit_btn">
                <MyButton text="Edit"></MyButton>
              </div>
            </Link>
          </>
        )}
      </div>
    );
  }
}
export default MyTables;
