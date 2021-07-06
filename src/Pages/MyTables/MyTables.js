import React, { Component } from "react";
import TableContent from "../../Components/Content/content";
import MyButton from "../../Components/MyButton/MyButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClock,
  faSpinner,
  faShare,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { axiosInstance } from "../../utils/axiosInterceptor.js";
import { Divider, Button, Space, message, Skeleton } from "antd";
import { Link } from "react-router-dom";
import "./MyTables.css";
import SubjectModal from "./SubjectModal.js";
import ShareModal from "./ShareModal.js";
import OwnershipDisplay from "./OwnershipDisplay.js";
import axios from "axios";

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
      loading1:false,
      columns: [],
      data: [],
      pathLink: null,
      tableId: null,
      isAccessible: true,
      makeRequestLoading: false,
      isButtonDisabled: false,
      owner: null,
      viewers: null,
      editors: null,
      loggedUserDetails: null,
      isSaveAble: false,
      saveBtnLoading: false,
    };
    this.clock = this.clock.bind(this);
    this.handleMakeRequest = this.handleMakeRequest.bind(this);
    this.saveTable = this.saveTable.bind(this);
    this.getViewsDetails=this.getViewsDetails.bind(this);
  }

  getViewsDetails = (fetchData) => {
    const tableId = this.props.history.location.pathname.split("/")[2];
    this.setState({ ...this.state, loading1: true });

    axiosInstance
      .get(`/table/${tableId}`)
      .then((table) => {
        this.setState({
          ...this.state,
          owner: table.data.user,
          viewers: table.data.view_access,
          editors: table.data.edit_acces,
          loading1:false,
        },()=>{
          fetchData();
        })
      }).catch((err) => {
        message.warn("Some error occured");
        this.setState({
          ...this.state,
          loading1: false,
        });
        console.log(err);
      });
  };
  fetchTableDetails = () => {
    const tableId = this.props.history.location.pathname.split("/")[2];
    this.setState({ ...this.state, loading: true });

    axiosInstance
      .get(`/table/${tableId}`)
      .then((table) => {
        axiosInstance
          .get(`/users`)
          .then((userInfo) => {
            this.setState({ ...this.state, isAccessible: true });
            this.createColumns(table.data.periods);
            this.createData(table.data.table);
            this.setState(
              {
                ...this.state,
                tableName: table.data.tableName,
                tableId: tableId,
                owner: table.data.user,
                viewers: table.data.view_access,
                editors: table.data.edit_access,
                loggedUserDetails: userInfo.data,
              },
              () => {
                this.setSaveable();
              }
            );
          })
          .catch((err) => {
            message.warn("Some error occured");
            this.setState({
              ...this.state,
              loading: false,
            });
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err.response.status == 403) {
          this.setState({ ...this.state, isAccessible: false });
          message.warn("You are forbidden to access this table!");
        }
        if (err.message) {
          console.log(err.message);
        }
        this.setState({
          ...this.state,

          loading: false,
        });
      });
  };
  setSaveable() {
    const tableId = this.props.history.location.pathname.split("/")[2];
    this.setState({
      ...this.state,
      loading: true,
    });
    axiosInstance
      .get(`/savetable/checkSavable/${tableId}`)
      .then((res) => {
        this.setState({
          ...this.state,
          loading: false,
          isSaveAble: true,
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          loading: false,
          isSaveAble: false,
        });
      });
  }
  componentDidMount() {
    let path = `https://realtimetables.netlify.app/${this.props.history.location.pathname}`;
    this.clock();
    setInterval(this.clock, 1000);
    this.fetchTableDetails();
  }
  createColumns(periods) {
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
  handleMakeRequest() {
    const tableId = this.props.history.location.pathname.split("/")[2];
    this.setState({
      ...this.state,
      makeRequestLoading: true,
    });

    axiosInstance
      .post(`/access/accessRequest/${tableId}`, {
        access_request: "View",
      })
      .then((res) => {
        message.success("Request sent successfully!");
        this.setState({
          ...this.state,
          makeRequestLoading: false,
          isButtonDisabled: true,
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          makeRequestLoading: false,
        });
        message.warn("Failed to make access request");
        if (err.message) {
          console.log(err.message);
        }
      });
  }
  saveTable() {
    this.setState({
      ...this.state,
      saveBtnLoading: true,
    });
    axiosInstance
      .post(`/savetable/saveTable`, { table: `${this.state.tableId}` })
      .then((res) => {
        this.setState({
          ...this.state,
          saveBtnLoading: false,
        });
        message.success(
          "Table saved successfully.Please reload to view changes !"
        );
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          saveBtnLoading: false,
        });
        message.warn("Not able to save the table");
      });
  }
  render() {
    const d = new Date();
    // const dateToFormat = "dddd, MMMM Do YYYY";
    const dateToFormat = "ddd-DD/MM/yyyy";

    return (
      <div className="wrapper">
        {!this.state.loading && this.state.isSaveAble ? (
          <>
            <Button
              loading={this.state.saveBtnLoading}
              onClick={this.saveTable}
              style={{
                textAlign: "center",
                marginBottom: "25px",
                backgroundColor: "black",
                color: "white",
                fontSize: "1.1em",
                fontWeight: "bold",
                borderRadius: "10px",
                border: "1px solid black",
              }}
            >
              <FontAwesomeIcon icon={faSave}></FontAwesomeIcon>
              <sapn>{` `}Save Table</sapn>
            </Button>
          </>
        ) : (
          <></>
        )}
        {this.state.isAccessible ? (
          <>
            <div className="tableHeader">
              <div className="table_name">
                My Tables/{this.state.tableName}{" "}
                <ShareModal
                  pathname={`https://realtimetables.netlify.app${this.props.history.location.pathname}`}
                />
              </div>

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

                <div className="my_tablefooter">
                  <div className="ownership_info">
                    <OwnershipDisplay
                      type="owner"
                      tableId={this.state.tableId}
                      history={this.props.history}
                      owner={this.state.owner}
                      loggedUserDetails={this.state.loggedUserDetails}
                    ></OwnershipDisplay>
                    <OwnershipDisplay
                      tableId={this.state.tableId}
                      type="viewer"
                      loading1={this.state.loading1}
                      getViewsDetails={this.getViewsDetails}
                      history={this.props.history}
                      viewers={this.state.viewers}
                      owner={this.state.owner}
                      loggedUserDetails={this.state.loggedUserDetails}
                    ></OwnershipDisplay>
                    <OwnershipDisplay
                      type="editor"
                      loading1={this.state.loading1}
                      tableId={this.state.tableId}
                      getViewsDetails={this.getViewsDetails}
                      loggedUserDetails={this.state.loggedUserDetails}
                      history={this.props.history}
                      editors={this.state.editors}
                      owner={this.state.owner}
                    ></OwnershipDisplay>
                  </div>
                  <div className="option_aval">
                    <SubjectModal history={this.props.history}></SubjectModal>
                    <Link to={`/editTable/${this.state.tableId}`}>
                      <div className="edit_btn">
                        <MyButton
                          text="Edit"
                          style={{ borderRadius: "10px" }}
                        ></MyButton>
                      </div>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <div className="inaccessibe_wrapper">
            <div className="oops">Oops!</div>
            <div className="inaccess_header">
              This table is inaccessible to you
            </div>
            <div>Make an access request to the owner of this table</div>
            <Button
              style={{
                textAlign: "center",
                marginTop: "25px",
                backgroundColor: "black",
                color: "white",
                fontSize: "1.1em",
                fontWeight: "bold",
                borderRadius: "10px",
                border: "1px solid black",
              }}
              disabled={this.state.isButtonDisabled}
              loading={this.state.makeRequestLoading}
              className="access_button"
              onClick={this.handleMakeRequest}
            >
              Make Request
            </Button>
          </div>
        )}
      </div>
    );
  }
}
export default MyTables;
