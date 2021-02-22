import React, { Component } from "react";
import { Modal, Tooltip, Button, message } from "antd";
import { faShare, faClipboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./MyTables.css";

class ShareModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  showModal = () => {
    this.setState({
      ...this.state,
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };
  render() {
    return (
      <>
        <Tooltip title="Share Table" placement={"bottom"}>
          <div className="share_btn" onClick={this.showModal}>
            <FontAwesomeIcon icon={faShare}></FontAwesomeIcon>
          </div>
        </Tooltip>
        <Modal
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <div className="share_header">
            Share this table with your classmates
          </div>
          <div className="copy">
            <div>{this.props.pathname}</div>
            <div id="copy_icon">
              <Tooltip placement={"bottom"} title="copy link to cliboard">
                <FontAwesomeIcon
                  icon={faClipboard}
                  onClick={() => {
                    navigator.clipboard.writeText(this.props.pathname);
                    message.success("Copied link to clipboard");
                  }}
                ></FontAwesomeIcon>
              </Tooltip>
            </div>
          </div>
          <div className="share_footer">
            Share this link with anyone and ask them to send an access request,
            approve the request to start using table collaboratively
          </div>
        </Modal>
      </>
    );
  }
}

export default ShareModal;
