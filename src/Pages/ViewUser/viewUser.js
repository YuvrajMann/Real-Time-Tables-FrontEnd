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
    this.fetchUserDetails = this.fetchUserDetails.bind(this);
    this.formRef = React.createRef();
  }
  fetchUserDetails(userId) {
    setTimeout(() => {
      this.setState({
        ...this.state,
        loading: true,
        userData: null,
      });
      axiosInstance
        .get(`/users/${userId}`)
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
          message.err(err.message);
          this.setState({
            ...this.state,
            loading: false,
          });
        });
    }, 2000);
  }
  componentDidMount() {
    let userId=this.props.history.location.pathname.split('/')[2];
    console.log(userId);
    this.fetchUserDetails(userId);
  }
  
  render() {
    console.log(this.state.userData);
    return (
      <div className="user_wrapper">
       
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
                      src={`https://localhost:3433/${this.state.userData.profilePic}`}
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
