import React, { Component } from "react";
import { Modal, Button, Form, Input, Select, InputNumber, message } from "antd";
import { UserOutlined, EditFilled } from "@ant-design/icons";
import { axiosInstance } from "../../utils/axiosInterceptor";
import "./viewUser.css";
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      btnLoading:false,
    };
    this.onFinish=this.onFinish.bind(this);
  }
  onFinish(e) {
    this.setState({...this.state,btnLoading:true});
    axiosInstance.put('/users/profileChange',{...e}).then((res)=>{
      this.setState({
        ...this.state,btnLoading:false,
        isModalVisible:false,
      },()=>{
        this.props.fetchUserDetails();
      });
      message.success('Profile updated Successfully');
    })
    .catch((err)=>{
      this.setState({
        ...this.state,btnLoading:false,
      });
      message.warn('Not able to update the details');
    })
  }
  render() {
  
    return (
      <>
        <Modal
          visible={this.state.isModalVisible}
          footer={[]}
          onCancel={() => {
            this.setState({ ...this.state, isModalVisible: false });
          }}
        >
          <>
            <div className="edit_form_header">
              <u>Edit Details</u>
            </div>
            <Form
              {...layout}
              ref={this.props.formRef}
              name="edit-ref"
              onFinish={this.onFinish}
              style={{
                marginBottom: "-40px",
              }}
            >
              <Form.Item name="username" label="User Name">
                <Input></Input>
              </Form.Item>
              <Form.Item name="email" label="Email">
                <Input></Input>
              </Form.Item>
              <Form.Item name="firstname" label="First Name">
                <Input></Input>
              </Form.Item>
              <Form.Item name="lastname" label="Last Name">
                <Input></Input>
              </Form.Item>
              <Form.Item name="age" label="age">
                <InputNumber></InputNumber>
              </Form.Item>
              <Form.Item name="sex" label="sex">
                <Select style={{ width: "100%" }}>
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="notSay">Rather not say</Option>
                </Select>
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={this.state.btnLoading}
                  style={{
                    backgroundColor: "#f05454",
                    color: "white",
                    border: "1px solid #f05454",
                    marginLeft: "5px",
                    borderRadius: "10px",
                    fontWeight: 600,
                  }}
                >
                  Apply Changes
                </Button>
              </Form.Item>
            </Form>
          </>
        </Modal>
        <Button
          style={{
            border: "1px solid #f05454",
            background: "#f05454",
            color: "white",
            fontWeight: "600",
            borderRadius: "4px",
            marginTop: "20px",
          }}
          onClick={() => {
            const userData = this.props.userData;

            this.setState({ ...this.state, isModalVisible: true }, () => {
              if (this.props.formRef.current) {
              
                this.props.formRef.current.setFieldsValue({
                  username: userData.username,
                  email: userData.email,
                  sex: userData.sex,
                  firstname: userData.firstName,
                  lastname: userData.lastname,
                  age: userData.age,
                });
              }
            });
          }}
        >
          <EditFilled></EditFilled> Edit Profile
        </Button>
      </>
    );
  }
}

export default EditProfile;
