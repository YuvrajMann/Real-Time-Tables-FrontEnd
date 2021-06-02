import React, { Component } from "react";
import { Skeleton, message, Avatar, Image, Button, Modal } from "antd";
import "./viewUser.css";
import { axiosInstance } from "../../utils/axiosInterceptor";
import { UserOutlined, EditFilled } from "@ant-design/icons";
import EditProfile from "./EditProfileModal";
import UploadModal from "./uploadModal.js";
class ViewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      userData: null,
      isdeleteModalVisible: false,
      deleteBtnLoading: false,
    };
    this.onProfileDelte = this.onProfileDelte.bind(this);
    this.fetchUserDetails = this.fetchUserDetails.bind(this);
    this.formRef = React.createRef();
  }
  fetchUserDetails() {
      this.setState({
        ...this.state,
        loading: true,
        userData: null,
      });
      axiosInstance
        .get(`/users/`)
        .then((res) => {
          this.setState(
            {
              ...this.state,
              loading: false,
              userData: res.data,
            },
            () => {
              const userData = this.state.userData;
            }
          );
        })
        .catch((err) => {
        //   message.err(err.message);
          this.setState({
            ...this.state,
            loading: false,
          });
        });
  }
  componentDidMount() {
  
    this.fetchUserDetails();
  }
  onProfileDelte() {
    this.setState({ ...this.state, deleteBtnLoading: true }, () => {
      axiosInstance
        .delete("/upload/profilePic")
        .then((res) => {
          message.success("Removed profile pic successfully");
          this.setState({
            ...this.state,
            deleteBtnLoading: false,
          });
        })
        .catch((err) => {
          this.setState({
            ...this.state,
            deleteBtnLoading: false,
          });
          message.success("Error while removing profile pic");
        });
    });
  }
  render() {

    return (
      <div className="user_wrapper">
        <Modal
          visible={this.state.isdeleteModalVisible}
          onCancel={() => {
            this.setState({ ...this.state, isdeleteModalVisible: false });
          }}
          footer={[]}
        >
          <div className="delte_modal_wrapper">
            <div className="modal_header">
              Are you sure that you want to delete profile pic?
            </div>
            <div className="modal_action_btns">
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
                onClick={this.onProfileDelte}
                loading={this.state.deleteBtnLoading}
              >
                Delete
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
                    isdeleteModalVisible: false,
                  });
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
        {!this.state.loading && this.state.userData ? (
          <div className="cover_user">
            <div className="profilePic">
              {this.state.userData.hasOwnProperty("profilePic") &&
              this.state.userData.profilePic ? (
                <Avatar
                  size={200}
                  src={
                    <Image
                      style={{ height: "200px" }}
                      src={`https://real-time-tables.herokuapp.com/${this.state.userData.profilePic}`}
                    />
                  }
                ></Avatar>
              ) : (
                <>
                  <Avatar
                    size={270}
                    style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                  >
                    <UserOutlined
                      style={{
                        fontSize: "50px",
                        alignContent: "center",
                        justifyContent: "center",
                        paddingTop: "25px",
                      }}
                    ></UserOutlined>
                  </Avatar>
                </>
              )}
              <div className="action_btns">
                <div className="profile_upload_btn">
                  <UploadModal
                    fetchUserDetails={this.fetchUserDetails}
                  ></UploadModal>
                </div>
                <div className="remove_profile_btn">
                  <Button
                    style={{
                      border: "1px solid #f05454",
                      background: "white",
                      color: "#f05454",
                      fontWeight: "600",
                      borderRadius: "7px",
                    }}
                    onClick={() => {
                      this.setState({
                        ...this.state,
                        isdeleteModalVisible: true,
                      });
                    }}
                  >
                    Remove Profile Pic
                  </Button>
                </div>
              </div>
            </div>
            <div className="divider"></div>
            <div className="right_content">
              <div className="user_name">
                <u>{this.state.userData.username}</u>
              </div>
              <div className="email">
                {`Email : `}
                {this.state.userData.hasOwnProperty("email") ? (
                  this.state.userData.email
                ) : (
                  <></>
                )}
              </div>
              <div className="first_name">
                {`First Name : `}
                {this.state.userData.hasOwnProperty("firstName") ? (
                  this.state.userData.firstName
                ) : (
                  <></>
                )}
              </div>
              <div className="last_name">
                {`Last Name : `}
                {this.state.userData.hasOwnProperty("lastName") ? (
                  this.state.userData.lastName
                ) : (
                  <></>
                )}
              </div>
              <div className="institutionName">
                {`Institution Name : `}
                {this.state.userData.hasOwnProperty("institutionName") ? (
                  this.state.userData.institutionName
                ) : (
                  <></>
                )}
              </div>
              <div className="sex">
                {`Sex : `}
                {this.state.userData.hasOwnProperty("sex") ? (
                  this.state.userData.sex
                ) : (
                  <></>
                )}
              </div>
              <div className="standard">
                {`Standard : `}
                {this.state.userData.hasOwnProperty("standard") ? (
                  this.state.userData.standard
                ) : (
                  <></>
                )}
              </div>
              <div className="age">
                {`Age : `}
                {this.state.userData.hasOwnProperty("age") ? (
                  this.state.userData.age
                ) : (
                  <></>
                )}
              </div>
              <EditProfile
                userData={this.state.userData}
                formRef={this.formRef}
                fetchUserDetails={this.fetchUserDetails}
              ></EditProfile>
            </div>
          </div>
        ) : (
          <Skeleton active></Skeleton>
        )}
      </div>
    );
  }
}
export default ViewUser;
