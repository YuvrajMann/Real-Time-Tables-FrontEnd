import React, { Component } from "react";
import { axiosInstance } from "../../utils/axiosInterceptor";
import { Button, message, Skeleton, Select } from "antd";
import TableContent from "../../Components/Content/content";
import "./EditTable.css";
const { Option } = Select;
var days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
class EditTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      tableName: null,
      columns: null,
      data: null,
      subjects: null,
      isActive: false,
      loading: false,
      btnLoading: false,
      finalData: {},
    };
    this.onSelectChange = this.onSelectChange.bind(this);
    this.saveNewChanges = this.saveNewChanges.bind(this);
  }
  fetchSubjectDetails() {
    const tableId = this.props.history.location.pathname.split("/")[2];
    this.setState({ ...this.state, loading: true });
    axiosInstance
      .get(`/table/${tableId}/subjects`)
      .then((sub) => {
        this.setState({ ...this.state, loading: false, subjects: sub.data });
      })
      .catch((err) => {
        this.setState({ ...this.state, loading: false });
        console.log(err);
        if (err.message) {
          message.warn(err.message);
        }
      });
  }
  componentDidMount() {
    this.fetchTableDetails();
    this.fetchSubjectDetails();
  }
  onSelectChange(event) {
    let change = this.state.finalData;
    let x = event.split("'__'");
    let new_sub = x[0];
    let col = x[1];
    let day = x[2];

    if (change.hasOwnProperty(day)) {
      change[day][col] = new_sub;
    } else {
      change[day] = {};
      change[day][col] = new_sub;
    }
    console.log(change);
    this.setState({
      ...this.state,
      finalData: change,
    });
  }
  saveNewChanges() {
    const tableId = this.props.history.location.pathname.split("/")[2];
    let update = this.state.finalData;
    update["tableName"] = this.state.tableName;
    console.log(update);
    this.setState({ ...this.state, btnLoading: true });

    axiosInstance
      .put(`/table/${tableId}`, update)
      .then((res) => {
        message.success("Table update successfully");
        this.setState({ ...this.state, btnLoading: false }, () => {
          this.props.history.push(`/tables/${tableId}`);
        });
      })
      .catch((err) => {
        this.setState({ ...this.state, btnLoading: false });
        message.warn(err.message);
      });
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
      temp["dataIndex"] = `Day`;
      temp["dataIndex"] = index + 1;
      temp["key"] = index + 1;
      temp["render"] = (subject) => {
        if (subject) {
          let x = subject.split("'__'");
          return (
            <Select
              onChange={this.onSelectChange}
              style={{ width: "100%" }}
              defaultValue={x[0]}
            >
              {this.state.subjects.subjects.map((sub) => {
                return (
                  <Option
                    key={sub.name}
                    value={`${sub.name}'__'${index + 1}'__'${x[1]}`}
                  >
                    {sub.name}
                  </Option>
                );
              })}
              <Option key={`Break'__'${index + 1}'__'${x[1]}`}>Break</Option>
              <Option key={`NA'__'${index + 1}'__'${x[1]}`}>---</Option>
            </Select>
          );
        }
      };
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
      var setsch = {};
      console.log(row.schedule);
      for (var key in Object.keys(row.schedule)) {
        const k = Number(key) + 1;
        if (row.schedule.hasOwnProperty(k)) {
          setsch[k] = `${row.schedule[k]}'__'${row.day}`;
        }
      }
      let merged = { ...temp, ...setsch };
      console.log(merged);
      tabledata.push(merged);
    });
    this.setState({
      ...this.state,
      data: tabledata,
    });
  }
  fetchTableDetails = () => {
    const tableId = this.props.history.location.pathname.split("/")[2];
    this.setState({ ...this.state, loading: true });
    setTimeout(() => {
      axiosInstance
        .get(`/table/${tableId}`)
        .then((table) => {
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
  render() {
    return (
      <div className="edit_table_wrapper">
        {!this.state.loading && this.state.columns && this.state.data ? (
          <>
            <div className="content_header active">
              <input
                type="text"
                className={
                  this.state.isActive ? "table_inp_active" : "table_inp"
                }
                value={this.state.tableName}
                onChange={(e) => {
                  this.setState({
                    ...this.state,
                    tableName: e.target.value,
                  });
                }}
                onFocus={() => {
                  this.setState({
                    ...this.state,
                    isActive: true,
                  });
                }}
                onBlur={() => {
                  this.setState({
                    ...this.state,
                    isActive: false,
                  });
                }}
              ></input>
            </div>
            <div>
              <TableContent
                columns={this.state.columns}
                data={this.state.data}
              ></TableContent>
            </div>
            <div className="edit_footer">
              <div className="action_btns">
                <Button
                  style={{
                    backgroundColor: "white",
                    color: "#f05454",
                    border: "1px solid #f05454",
                    marginLeft: "5px",
                    borderRadius: "10px",
                    fontWeight: 600,
                    loading: false,
                  }}
                  onClick={() => {
                    const tableId = this.props.history.location.pathname.split(
                      "/"
                    )[2];
                    this.props.history.push(`/tables/${tableId}`);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  style={{
                    backgroundColor: "#f05454",
                    color: "white",
                    border: "1px solid #f05454",
                    marginLeft: "5px",
                    borderRadius: "10px",
                    fontWeight: 600,
                  }}
                  loading={this.state.btnLoading}
                  onClick={this.saveNewChanges}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </>
        ) : (
          <Skeleton active></Skeleton>
        )}
      </div>
    );
  }
}
export default EditTable;
