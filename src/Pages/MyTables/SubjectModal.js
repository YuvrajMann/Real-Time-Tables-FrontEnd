import React, { Component } from "react";
import { Modal, message, Skeleton, Divider } from "antd";
import MyButton from "../../Components/MyButton/MyButton";
import "./MyTables.css";
import { axiosInstance } from "../../utils/axiosInterceptor.js";

class SubjectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      loading: false,
      subjectData: null,
    };
    this.fetchSubjectDetails = this.fetchSubjectDetails.bind(this);
  }
  fetchSubjectDetails() {
    this.setState({
      ...this.state,
      loading: true,
    });
    const tableId = this.props.history.location.pathname.split("/")[2];

    axiosInstance
      .get(`/table/${tableId}/subjects`)
      .then((res) => {
        this.setState({
          ...this.state,
          loading: false,
          subjectData: res.data,
        });
      })
      .catch((err) => {
        message.warn(err.message);
        this.setState({
          ...this.state,
          loading: false,
        });
      });
  }
  render() {
    return (
      <>
        <div className="subject_btn">
          <Modal
            visible={this.state.isModalVisible}
            onCancel={() => {
              this.setState({
                ...this.state,
                isModalVisible: false,
              });
            }}
            style={{
              height: "20vh",
            }}
            footer={[]}
          >
            <div className="sub_modal">
              {this.state.subjectData && !this.state.loading ? (
                <>
                  <div className="sub_modal_header">
                    <h1>Subjects</h1>
                  </div>

                  <div className="sub_modal_content">
                    {/* <div className="particular_sub_header">
                      <div>Subject Name</div>
                      <div>Teacher Name</div>
                    </div> */}
                    <div className="particular_subname_header">
                      <div className="header_subname">
                        <div
                          style={{
                            fontWeight: "600",
                            fontSize: "16px",
                            textAlign: "center",
                          }}
                        >
                          Subject Name
                        </div>
                        <div
                          style={{
                            textAlign: "center",
                            fontWeight: "600",
                            fontSize: "16px",
                          }}
                        >
                          Teacher Name
                        </div>
                      </div>
                      <div className="content_subname">
                        {this.state.subjectData.subjects.map((subject) => {
                          return (
                            <div className="particular_sub">
                              <div>{subject.name}</div>
                              <div>{subject.teacher}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    {/* <div className="particular_subteacher_header">
                      <div style={{ fontWeight: "600", fontSize: "16px" }}>
                        Teacher Name
                      </div>
                      {this.state.subjectData.subjects.map((subject) => {
                        return (
                          <div className="particular_subteacher">
                            <div>{subject.teacher}</div>
                          </div>
                        );
                      })}
                    </div> */}
                  </div>
                </>
              ) : (
                <Skeleton active></Skeleton>
              )}
            </div>
          </Modal>
          <MyButton
            onClick={() => {
              this.setState(
                {
                  ...this.state,
                  isModalVisible: true,
                },
                () => {
                  this.fetchSubjectDetails();
                }
              );
            }}
            text="Subjects"
            style={{
              borderRadius: "10px",
              width: "100px",
              marginRight: "10px",
              marginTop: "19px",
            }}
          ></MyButton>
        </div>
      </>
    );
  }
}

export default SubjectModal;
