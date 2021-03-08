import React, { Component } from "react";
import { Button, Modal } from "antd";
import Dropzone from "react-dropzone";
import { UploadOutlined } from "@ant-design/icons";

class UploadModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      files: [],
    };
    this.onDrop = (files) => {
      this.setState({ files });
    };
  }
  render() {
    console.log(this.state.files);
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
                  <input {...getInputProps()} />
                  <div>
                    <UploadOutlined></UploadOutlined>
                    <div>
                      Drag 'n' drop some files here, or click to select files
                    </div>
                  </div>
                </div>
                <aside>
                  <div style={{ textAlign: "center", marginTop: "10px" }}>
                    {" "}
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
            >
              Cancel
            </Button>
          </div>
        </Modal>
        <Button
          style={{
            border: "1px solid black",
            background: "rgba(0, 0, 0, 0.8)",
            color: "white",
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
