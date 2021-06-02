import React, { Component } from "react";
import { Button, message, Modal } from "antd";
import Dropzone from "react-dropzone";
import { UploadOutlined } from "@ant-design/icons";
import { axiosInstance } from "../../utils/axiosInterceptor";

class UploadModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      files: [],
      upload_button_loading: false,
    };
    this.onDrop = (files) => {
      this.setState({ files });
    };
    this.onUpload = this.onUpload.bind(this);
  }
  onUpload() {
    var formData = new FormData();
    var imagefile = this.state.files;
    formData.append("profile", imagefile[0]);

    this.setState(
      {
        ...this.state,
        upload_button_loading: true,
      },
      () => {
        axiosInstance
          .post("/upload/profilePic", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            this.setState(
              {
                ...this.state,
                upload_button_loading: false,
                isModalVisible: false,
              },
              () => {
                this.props.fetchUserDetails();
                message.success(
                  "Profile updated successfully!Please reload to view changes!"
                );
              }
            );

          
          })
          .catch((err) => {
            this.setState({
              ...this.state,
              upload_button_loading: false,
            });
            console.log(err.message);
            message.warn("Failed to update profile pic");
          });
      }
    );
  }
  render() {
 
    const files = this.state.files.map((file) => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));
    return (
      <>
        <Modal
          visible={this.state.isModalVisible}
          footer={[]}
          onCancel={() => {
            this.setState({ ...this.state, isModalVisible: false });
          }}
        >
          <Dropzone onDrop={this.onDrop}>
            {({ getRootProps, getInputProps }) => (
              <section className="container">
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} accept="image/*" />
                  <div>
                    <UploadOutlined></UploadOutlined>
                    <div>
                      Drag 'n' drop some files here, or click to select files
                    </div>
                  </div>
                </div>
                <aside>
                  <div style={{ textAlign: "center", marginTop: "10px" }}>
                    {files}
                  </div>
                </aside>
              </section>
            )}
          </Dropzone>
          <div className="action_upload_btns">
            <Button
              style={{
                backgroundColor: "#f05454",
                color: "white",
                border: "1px solid #f05454",
                marginLeft: "5px",
                borderRadius: "10px",
                fontWeight: 600,
                loading: false,
              }}
              loading={this.state.upload_button_loading}
              onClick={() => {
                this.onUpload();
              }}
            >
              Upadte
            </Button>
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
                this.setState({
                  ...this.state,
                  isModalVisible: false,
                });
              }}
            >
              Cancel
            </Button>
          </div>
        </Modal>
        <Button
          style={{
            border: "1px solid #f05454",
            background: "white",
            color: "#f05454",
            fontWeight: "600",
            borderRadius: "7px",
            marginRight: "10px",
          }}
          onClick={() => {
            this.setState({ ...this.state, isModalVisible: true });
          }}
        >
          Update Profile Pic
        </Button>
      </>
    );
  }
}
export default UploadModal;
