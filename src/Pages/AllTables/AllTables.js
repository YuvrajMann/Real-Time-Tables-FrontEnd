import React, { Component } from "react";
import { Row, Col, Skeleton, message, Tooltip, Divider, Modal } from "antd";
import { axiosInstance } from "../../utils/axiosInterceptor.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import DelTable from "./DelTable";
import "./AllTables.css";

const Card = (props) => {

  let creationDate;
  if (props.createdAt) {
    creationDate = props.createdAt.split("T")[0];
  }
  let updateDate;
  if (props.updatedAt) {
    updateDate = props.updatedAt.split("T")[0];
  }
  return (
    <div className="table_card">
      <div className="table_card_name">
        <div></div>
        <div>{props.tableName}</div>

        <DelTable type={props.type} table={props}></DelTable>
      </div>
      <div className="option_table">
        <Link to={`/tables/${props.tableId}`}>
          <div className="view ">View</div>
        </Link>
        <Link to={`/editTable/${props.tableId}`}>
          <div className="update">Update</div>
        </Link>
      </div>
      <div className="table_card_dates">
        <Tooltip title={props.createdAt}>
          <div>Created On : {creationDate}</div>
        </Tooltip>

        <Tooltip title={props.updatedAt} placement="bottom">
          <div>updated On : {updateDate}</div>
        </Tooltip>
      </div>
    </div>
  );
};
class AllTables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      tables: null,
      savedTables:null
    };
    this.fetchAllTables = this.fetchAllTables.bind(this);
  }
  fetchAllTables() {
    this.setState({ ...this.state, loading: true });

    axiosInstance
      .get("/table")
      .then((res) => {
   
        this.setState({
          ...this.state,
          tables: res.data.results,
        },()=>{
          this.getSavedTables();
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
  }
  getSavedTables(){
    this.setState({
      ...this.state,loading:true
    });
    axiosInstance.get("/savetable").then((res)=>{
      this.setState({
        ...this.state,savedTables:res.data,loading:false
      })
    })
    .catch((err)=>{
      this.setState({
        ...this.state,loading:false
      })
    })
  }
  componentDidMount() {
    this.fetchAllTables();
  }
  render() {
    return (
      <div className="wrapper">
        <div className="all_header">Owned Tables</div>
        <Divider></Divider>
        {!this.state.loading ? (
          <Row gutter={[16, 24]}>
            <Col md={8} sm={12} xs={24}>
              <div className="table_card addTable">
                <Tooltip title="Add Tables">
                  <Link to="/addTable">
                    <div id="dots">
                      <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                    </div>
                  </Link>
                </Tooltip>
              </div>
            </Col>
           
           {this.state.tables
              ? this.state.tables.map((table) => {
                  return (
                    <Col md={8} sm={12} xs={24}>
                      <Card
                        tableName={table.tableName}
                        createdAt={table.createdAt}
                        updatedAt={table.updatedAt}
                        tableId={table._id}
                        type="owned_table"
                        fetchAllTables={this.fetchAllTables}
                      ></Card>
                    </Col>
                  );
                })
              : null}
               <Col span={24} style={{marginTop:'20px'}} className="all_header">Saved Tables</Col>
              <Divider></Divider>
              {this.state.savedTables
              ? this.state.savedTables.map((table) => {
                  return (
                    <Col md={8} sm={12} xs={24}>
                      <Card
                        tableName={table.tableName}
                        createdAt={table.createdAt}
                        updatedAt={table.updatedAt}
                        tableId={table._id}
                        type="saved_table"
                        fetchAllTables={this.fetchAllTables}
                      ></Card>
                    </Col>
                  );
                })
              : null}
          </Row>
        ) : (
          <Skeleton ative></Skeleton>
        )}
      </div>
    );
  }
}
export default AllTables;
