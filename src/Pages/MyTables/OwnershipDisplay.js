import React, { Component } from "react";
import { axiosInstance } from "../../utils/axiosInterceptor.js";
import { Button, message, Modal } from "antd";
import MyButton from "../../Components/MyButton/MyButton";
import "./MyTables.css";

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
    };
  }
  componentDidMount() {
    console.log(this.props.type);
    if (this.props.owner && this.props.type.toString() == "owner") {
      axiosInstance
        .get(`/users/${this.props.owner}`)
        .then((res) => {
          this.setState({ ...this.state, owner: [res.data] });
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (this.props.editors && this.props.type.toString() == "editor") {
      var editor_view = [];
      this.props.editors.map((editor) => {
        axiosInstance
          .get(`/users/${editor}`)
          .then((res) => {
            editor_view.push(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      });
      this.setState({
        ...this.state,
        editor: editor_view,
      });
    } else if (this.props.viewers && this.props.type.toString() == "viewer") {
      var setView = [];
      console.log(this.props.viewers);
      this.props.viewers.map((editor) => {
        axiosInstance
          .get(`/users/${editor}`)
          .then((res) => {
            setView.push(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      });
      console.log(setView);
      this.setState({
        ...this.state,
        viewer: setView,
      });
    }
  }
  render() {
    if (this.props.type.toString() == "owner") {
      return (
        <>
          <Modal
            visible={this.state.ownerVisible}
            onCancel={() => {
              this.setState({
                ...this.state,
                ownerVisible: false,
              });
            }}
            style={{
              height: "20vh",
              overflowY: "sroll",
            }}
            footer={[]}
          >
            <div
              className="viewer_list"
              style={{
                overflowY: "sroll",
              }}
            >
              {this.state.owner.map((owner) => {
                return <div>{owner.username}</div>;
              })}
            </div>
          </Modal>
          <MyButton
            onClick={() => {
              this.setState({
                ...this.state,
                ownerVisible: true,
              });
            }}
            text="Owner"
            style={{ borderRadius: "10px", marginRight: "10px" }}
          ></MyButton>
        </>
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
            <div
              className="viewer_list"
              style={{
                overflowY: "sroll",
              }}
            >
              {this.state.editor.map((editor) => {
                return <div>{editor.username}</div>;
              })}
            </div>
          </Modal>
          <MyButton
            onClick={() => {
              this.setState({
                ...this.state,
                editorVisible: true,
              });
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
            <div
              className="viewer_list"
              style={{
                overflowY: "sroll",
              }}
            >
              {this.state.viewer.map((viewer) => {
                return <div>{viewer.username}</div>;
              })}
            </div>
          </Modal>
          <MyButton
            text="Viewers"
            onClick={() => {
              this.setState({
                ...this.state,
                viewerVisible: true,
              });
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
