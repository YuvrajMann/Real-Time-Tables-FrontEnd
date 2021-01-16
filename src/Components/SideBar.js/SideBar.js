import React, { Component } from "react";
import { Layout, Menu, Button, Tooltip, message } from "antd";
import MyButton from "../MyButton/MyButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable, faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Link, withRouter } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosInterceptor.js";
import Spinner from "../Spinner/Spinner";
import "./SideBar.css";
const { Sider } = Layout;
const { SubMenu } = Menu;

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tables: null,
      loading: false,
      isAllTable: false,
    };
    this.getAllTable = this.getAllTable.bind(this);
  }
  getAllTable() {
    this.setState({ ...this.state, loading: true });
    setTimeout(() => {
      axiosInstance
        .get("/table")
        .then((res) => {
          console.log(res);
          this.setState({
            ...this.state,
            tables: res.data.results,
            loading: false,
          });
        })
        .catch((err) => {
          this.setState({
            ...this.state,
            loading: false,
          });
          console.log(err);
          message.warn(err.message);
        });
    }, 2000);
  }
  componentDidMount() {
    this.getAllTable();
  }
  render() {
    return (
      <Sider
        collapsible
        collapsed={this.props.collapsed}
        onCollapse={this.props.onCollapse}
        style={{
          background: "#30475e",
          boxShadow: "rgba(114, 114, 114, 0.42) 1px 3px 5px -1px",
        }}
      >
        <Link to="/allTables">
          <div className="mytable_btn">
            {this.props.collapsed ? (
              <Tooltip title="My Tables" placement="right">
                <Button
                  style={{
                    width: "90%",
                    height: "50px",
                    marginBottom: "30px",
                    justifyContent: "center",
                    backgroundColor: "#f05454",
                    borderColor: "#f05454",
                    color: "#fff",
                    fontWeight: 800,
                    textAlign: "center",
                  }}
                >
                  {this.props.collapsed == false ? (
                    "My Tables"
                  ) : (
                    <FontAwesomeIcon icon={faTable}></FontAwesomeIcon>
                  )}
                </Button>
              </Tooltip>
            ) : (
              <Button
                style={{
                  width: "90%",
                  height: "50px",
                  marginBottom: "30px",
                  justifyContent: "center",
                  backgroundColor: "#f05454",
                  borderColor: "#f05454",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "18px",
                  textAlign: "center",
                  borderRadius: "10px",
                }}
              >
                {this.props.collapsed == false ? (
                  "My Tables"
                ) : (
                  <FontAwesomeIcon icon={faTable}></FontAwesomeIcon>
                )}
              </Button>
            )}
          </div>
        </Link>
        <Link to="/addTable">
          <Tooltip title="New Table" placement="right">
            <div className="add_btn">
              <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>{" "}
            </div>
          </Tooltip>
        </Link>
        {!this.state.loading ? (
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            style={{
              background: "#30475e",
              maxHeight: "48vh",
              overflowY: "scroll",
            }}
            mode="inline"
            id={this.props.collapsed ? "col_tables" : "tables"}
          >
            {this.state.tables
              ? this.state.tables.map((table, index) => {
                  const tableName = table.tableName.replace(/ /g, "_");
                  return (
                    <Menu.Item key={table._id}>
                      <Link to={`/tables/${table._id}`}>{table.tableName}</Link>
                    </Menu.Item>
                  );
                })
              : null}
          </Menu>
        ) : (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <Spinner
              style={{
                color: "white",
                textAlign: "center",
                fontSize: "1.8em",
              }}
            ></Spinner>
          </div>
        )}
      </Sider>
    );
  }
}

export default SideBar;
