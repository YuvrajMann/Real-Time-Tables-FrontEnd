import React, { Component } from "react";
import { axiosInstance } from "../../utils/axiosInterceptor.js";
import { Button, Divider, message, Modal, Skeleton } from "antd";
import MyButton from "../../Components/MyButton/MyButton";
import "./MyTables.css";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import {Link} from 'react-router-dom';

class OwnershipDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: [],
      viewer: [],
      editor: [],
      ownerVisible: false,
      viewerVisible: false,
      editorVisible: false,
      loading: false,
      loading1:false,
    };
    this.fetchData = this.fetchData.bind(this);
  }
  fetchData() {
    this.setState({ ...this.state, loading: true,viewer:[],editor:[] });
    if (this.props.owner && this.props.type.toString() == "owner") {
      axiosInstance
        .get(`/users/${this.props.owner}`)
        .then((res) => {
          this.setState({ ...this.state, owner: [res.data], loading: false });
        })
        .catch((err) => {
          this.setState({ ...this.state, loading: false });
          console.log(err);
        });
    } else if (this.props.editors && this.props.type.toString() == "editor") {
      var editor_view = [];
      this.props.editors.map((editor) => {
        axiosInstance
          .get(`/users/${editor}`)
          .then((res) => {
            editor_view.push(res.data);
            this.setState({
              ...this.state,
              editor: editor_view,
              loading1: false,
            });
          })
          .catch((err) => {
            console.log(err);
            this.setState({
              ...this.state,
              loading1: false,
            });
          });
      });
      
    } else if (this.props.viewers && this.props.type.toString() == "viewer") {
      var setView = [];
      this.props.viewers.map((editor) => {
        axiosInstance
          .get(`/users/${editor}`)
          .then((res) => {
            setView.push(res.data);
            this.setState({
              ...this.state,
              viewer: setView,
              loading: false,
            });
          })
          .catch((err) => {
            console.log(err);
            this.setState({
              ...this.state,
              loading: false,
            });
          });
      });
     
    }
  }
  componentDidMount() {
    this.fetchData();
  }
  render() {
    if (this.props.type.toString() == "owner") {
      return (
            (!this.state.loading)?(
              <div>
                {this.state.owner.map((owner)=>{
                 
                  return (<div className="owner_disp">
                      Owner - <Link to={`/viewUser/${owner._id}`}>{owner.username}</Link>
                  </div>);
                })}
              </div>
            ):('Owner') 
      );
    } else if (this.props.type.toString() == "editor") {
      return (
        <>
          <Modal
            visible={this.state.editorVisible}
            onCancel={() => {
              this.setState({
                ...this.state,
                editorVisible: false,
              });
            }}
            style={{
              height: "20vh",
            }}
            footer={[]}
          >
            <>
              {!this.props.loading1 ? (
                <div
                  className="viewer_list"
                  style={{
                    overflowY: "sroll",
                  }}
                >
                  {this.state.editor.map((editor) => {
                    return (
                      <div className="li_wrap_hold">
                        <div
                          className="li_holder"
                          onClick={() => {
                            this.props.history.push(`/viewUser/${editor._id}`);
                          }}
                        >
                          <div style={{ marginRight: "10px" }}>
                            {editor.profilePic ? (
                              <Avatar
                                src={`https://real-time-tables.herokuapp.com/${editor.profilePic}`}
                              />
                            ) : (
                              <Avatar
                                style={{
                                  color: "#f56a00",
                                  backgroundColor: "#fde3cf",
                                }}
                              >
                                <UserOutlined
                                  style={{
                                    alignContent: "center",
                                    justifyContent: "center",
                                  }}
                                ></UserOutlined>
                              </Avatar>
                            )}
                          </div>
                          <div>{editor.username}</div>
                        </div>
                        {this.props.loggedUserDetails &&
                        this.props.owner &&
                        this.props.loggedUserDetails._id.toString() ==
                          this.props.owner.toString() ? (
                          <MyButton
                            onClick={() => {
                              axiosInstance
                                .post("/access/removeAccess/edit", {
                                  table: `${this.props.tableId}`,
                                  ofUser: `${editor._id}`,
                                })
                                .then((res) => {
                                  message.success(
                                    "Edit access successfully taken away!"
                                  );
                                  this.setState({
                                    ...this.state,
                                    viewerVisible: false,
                                  });
                                })
                                .catch((err) => {
                                  message.warn("Some error occured");
                                  console.log(err);
                                });
                            }}
                            text="Take away edit access"
                            style={{ borderRadius: "10px", marginLeft: "10px" }}
                          ></MyButton>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <Skeleton></Skeleton>
              )}
            </>
          </Modal>
          <MyButton
            onClick={() => {
              this.setState(
                {
                  ...this.state,
                  editorVisible: true,
                })
            }}
            text="Editors"
            style={{ borderRadius: "10px", marginRight: "10px" }}
          ></MyButton>
        </>
      );
    } else if (this.props.type.toString() == "viewer") {
      return (
        <>
          <Modal
            visible={this.state.viewerVisible}
            onCancel={() => {
              this.setState({
                ...this.state,
                viewerVisible: false,
              });
            }}
            style={{
              height: "20vh",
            }}
            footer={[]}
          >
            <>
            {!this.props.loading1 ? (
              <div
                className="viewer_list"
                style={{
                  overflowY: "sroll",
                }}
              >
                {this.state.viewer.map((viewer) => {
                  return (
                    <div className="li_wrap_hold">
                      <div
                        className="li_holder"
                        onClick={() => {
                          this.props.history.push(`/viewUser/${viewer._id}`);
                        }}
                      >
                        <div>
                          {viewer.profilePic ? (
                            <Avatar
                              src={`https://real-time-tables.herokuapp.com/${viewer.profilePic}`}
                            />
                          ) : (
                            <Avatar
                              style={{
                                color: "#f56a00",
                                backgroundColor: "#fde3cf",
                              }}
                            >
                              <UserOutlined
                                style={{
                                  alignContent: "center",
                                  justifyContent: "center",
                                }}
                              ></UserOutlined>
                            </Avatar>
                          )}
                        </div>
                        <div style={{ marginLeft: "10px" }}>
                          {viewer.username}
                        </div>
                      </div>
                      {this.props.loggedUserDetails &&
                      this.props.owner &&
                      this.props.loggedUserDetails._id.toString() ==
                        this.props.owner.toString() ? (
                        <MyButton
                          onClick={() => {
                            axiosInstance
                              .post("/access/removeAccess/view", {
                                table: `${this.props.tableId}`,
                                ofUser: `${viewer._id}`,
                              })
                              .then((res) => {
                                message.success(
                                  "View access successfully taken away!"
                                );
                                axiosInstance
                                  .post("/access/removeAccess/edit", {
                                    table: `${this.props.tableId}`,
                                    ofUser: `${viewer._id}`,
                                  })
                                  .then((res) => {
                                    this.setState({
                                      ...this.state,
                                      viewerVisible: false,
                                    });
                                  });
                              })
                              .catch((err) => {
                                message.warn("Some error occured");
                              });
                          }}
                          text="Take away view access"
                          style={{ borderRadius: "10px", marginLeft: "10px" }}
                        ></MyButton>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <Skeleton></Skeleton>
            )}
            </>
          </Modal>
          <MyButton
            text="Viewers"
            onClick={() => {
              this.setState(
                {
                  ...this.state,
                  viewerVisible: true,
                }
              );
            }}
            style={{
              borderRadius: "10px",
              marginRight: "10px",
              textAlign: "center",
            }}
          >
            Viewers
          </MyButton>
        </>
      );
    }
  }
}

export default OwnershipDisplay;