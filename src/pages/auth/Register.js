import React, { useEffect, useState } from "react";
import "./register.css";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

//components
import { Form, Input, Button,Spin } from 'antd';
import { UserOutlined,LoadingOutlined} from '@ant-design/icons';
import image from '../../images/logo.png';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function Register() {
  const history = useHistory();
  const [loading,setLoading] = useState(false);
  const {user} = useSelector((state)=>({...state}));
  useEffect(()=>{
    if(user && user.token){
      history.push('/')
    }
  },[user,history]);
  const onFinish = async (values) => {
    const {Email} = values;
    setLoading(true);
    try {
      const config = {
        url: process.env.REACT_APP_REGISTRATION_REDIRECT_URL,
        handleCodeInApp: true,
      };

     await auth.sendSignInLinkToEmail(Email, config);
      toast.success(
        `Mail sent to your email address`,
        {
          position: "bottom-right",

        }
      );
      setLoading(false);
      window.localStorage.setItem("EmailForRegistration", Email);
    } catch (error) {
      console.log(error);
      toast.error(`Something went wrong`,
      {
        position: "bottom-right",

      })
      setLoading(false);
    }
  };
  return (
    <div className="register">
      <div className="logo__wrapper">
        <img src={image} alt="logo"/>
      </div>
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="Email"
        rules={[
          {
            required: true,
            message: 'Please enter your Email',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email"/>
      </Form.Item>
     
     

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" size="large" style={{width:'100%'}}>
         {loading?(<Spin indicator={antIcon} />) : 'Register'}
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
}

export default Register;
