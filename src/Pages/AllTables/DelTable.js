import React, { Component } from "react";
import { Modal, Tooltip, Button, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas, faTrash } from "@fortawesome/free-solid-svg-icons";
import { axiosInstance } from "../../utils/axiosInterceptor.js";
import "./AllTables.css";
class DelTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.deleteTable = this.deleteTable.bind(this);
    this.deleteSaveTable=this.deleteSaveTable.bind(this);
  }
  handleCancel() {
    this.setState({
      ...this.state,
      isOpen: false,
      btnLoading: false,
    });
  }
  deleteSaveTable() {
    this.setState({ ...this.state, btnLoading: true });

    axiosInstance
      .delete(`/savetable/removeTable/${this.props.table.tableId}`)
      .then((res) => {
       
        message.success("Table deleted successfully");
        this.setState(
          { ...this.state, btnLoading: false, isOpen: false },
          () => {
            this.props.table.fetchAllTables();
          }
        );
      })
      .catch((err) => {
        console.log(err);
        this.setState({ ...this.state, btnLoading: false, isOpen: false });
        message.warn(err.message);
      });
  }
  deleteTable() {
    console.log(this.props.table.tableId);
    this.setState({ ...this.state, btnLoading: true });
      axiosInstance
        .delete(`/table/${this.props.table.tableId}`)
        .then((res) => {
        
          message.success("Table deleted successfully");
          this.setState(
            { ...this.state, btnLoading: false, isOpen: false },
            () => {
              this.props.table.fetchAllTables();
            }
          );
        })
        .catch((err) => {
          console.log(err);
          this.setState({ ...this.state, btnLoading: false, isOpen: false });
          message.warn(err.message);
        });
  }
  render() {
    return (
      <>
        <div>
          <Modal
            visible={this.state.isOpen}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[]}
          >
            <div className="modalContent">
              <div className="header">
                {this.props.type ? (
                  this.props.type == "owned_table" ? (
                    <>
                      Do you really want to delete {this.props.table.tableName}?
                    </>
                  ) : (
                    <>
                      Do you really want to remove {this.props.table.tableName}{" "}
                      from saved list?
                    </>
                  )
                ) : (
                  ""
                )}
              </div>
              <div className="footer">
                <Button
                  style={{
                    justifyContent: "center",
                    backgroundColor: "white",
                    borderColor: "#f05454",
                    color: "#f05454",
                    fontWeight: 600,
                    textAlign: "center",
                    borderRadius: "10px",
                    marginRight: "10px",
                  }}
                  onClick={this.handleCancel}
                >
                  Cancel
                </Button>
                {this.props.type ? (
                  this.props.type == "owned_table" ? (
                    <>
                      <Button
                        style={{
                          justifyContent: "center",
                          backgroundColor: "#f05454",
                          borderColor: "#f05454",
                          color: "#fff",
                          fontWeight: 600,
                          textAlign: "center",
                          borderRadius: "10px",
                        }}
                        loading={this.state.btnLoading}
                        onClick={this.deleteTable}
                      >
                        Delete
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        style={{
                          justifyContent: "center",
                          backgroundColor: "#f05454",
                          borderColor: "#f05454",
                          color: "#fff",
                          fontWeight: 600,
                          textAlign: "center",
                          borderRadius: "10px",
                        }}
                        loading={this.state.btnLoading}
                        onClick={this.deleteSaveTable}
                      >
                        Delete
                      </Button>
                    </>
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
          </Modal>
          <Tooltip title="Delete Table" placement="bottom">
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => {
                this.setState({ ...this.state, isOpen: true });
              }}
            ></FontAwesomeIcon>
          </Tooltip>
        </div>
      </>
    );
  }
}
export default DelTable;
