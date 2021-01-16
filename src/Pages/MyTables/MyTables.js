import React, { Component } from "react";
import TableContent from "../../Components/Content/content";
import MyButton from "../../Components/MyButton/MyButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClock,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { axiosInstance } from "../../utils/axiosInterceptor.js";
import { Divider, Space, message, Skeleton } from "antd";
import "./MyTables.css";

class MyTables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curTime: null,
      tableId: null,
      tableName: null,
      loading: false,
    };
    this.clock = this.clock.bind(this);
  }
  fetchTableDetails = () => {
    this.setState({ ...this.state, loading: true });
    setTimeout(() => {
      axiosInstance
        .get(`/table/${this.state.tableId}`)
        .then((table) => {
          console.log(table);
          this.setState({
            ...this.state,
            tableName: table.data.tableName,
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
    const tableId = this.props.history.location.pathname.split("/")[2];
    this.setState(
      {
        ...this.state,
        tableId: tableId,
      },
      () => {
        this.fetchTableDetails();
      }
    );
    console.log(tableId);
  }
  columns = [
    {
      title: "Day",
      dataIndex: "Day",
      key: "Day",
      render: (day) => {
        return <div style={{ fontWeight: 700 }}>{day}</div>;
      },
    },
    {
      title: "9:45 - 10:45",
      dataIndex: "slot1",
      key: "slot1",
    },
    {
      title: "10:45 - 11:45",
      dataIndex: "slot2",
      key: "slot2",
    },
    {
      title: "11:45 - 12:45",
      dataIndex: "slot3",
      key: "slot3",
    },
    {
      title: "1:45 - 2:45",
      dataIndex: "slot4",
      key: "slot4",
    },
    {
      title: "9:45 - 10:45",
      dataIndex: "slot5",
      key: "slot5",
    },
  ];
  data = [
    {
      key: "1",
      Day: "Monday",
      slot1: "Mathematics",
      slot2: "Hindi",
      slot3: "Computer",
      slot4: "Geography",
      slot5: "Social Studies",
    },
    {
      key: "1",
      Day: "Tuesday",
      slot1: "Mathematics",
      slot2: "Hindi",
      slot3: "Computer",
      slot4: "Geography",
      slot5: "Social Studies",
    },
    {
      key: "1",
      Day: "Wednesday",
      slot1: "Mathematics",
      slot2: "Hindi",
      slot3: "Computer",
      slot4: "Geography",
      slot5: "Social Studies",
    },
    {
      key: "1",
      Day: "Thursday",
      slot1: "Mathematics",
      slot2: "Hindi",
      slot3: "Computer",
      slot4: "Geography",
      slot5: "Social Studies",
    },
    {
      key: "1",
      Day: "Friday",
      slot1: "Mathematics",
      slot2: "Hindi",
      slot3: "Computer",
      slot4: "Geography",
      slot5: "Social Studies",
    },
    {
      key: "1",
      Day: "Saturday",
      slot1: "Mathematics",
      slot2: "Hindi",
      slot3: "Computer",
      slot4: "Geography",
      slot5: "Social Studies",
    },
  ];
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
    const dateToFormat = "dd/mm/yyyy";
    return (
      <div className="wrapper">
        <div className="tableHeader">
          <div className="table_name">My Tables/{this.state.tableName}</div>

          <div className="date">
            <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>

            <div>
              {d.getDate()}-{d.getMonth()}-{d.getFullYear()}
            </div>
            <div id="bar"></div>
            <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
            <div>{this.state.curTime}</div>
          </div>
        </div>
        <Divider></Divider>
        {this.state.loading ? (
          <Skeleton active></Skeleton>
        ) : (
          <>
            <TableContent
              id="displayTable"
              columns={this.columns}
              data={this.data}
            ></TableContent>
            <div className="edit_btn">
              <MyButton text="Edit"></MyButton>
            </div>
          </>
        )}
      </div>
    );
  }
}
export default MyTables;