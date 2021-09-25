import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";

//css
import "./forgotpassword.css";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import {useSelector} from 'react-redux';

//components
import { Form, Input, Button,Spin} from 'antd';
import { UserOutlined,LoadingOutlined} from '@ant-design/icons';

import image from '../../images/logo.png';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading,setLoading] = useState(false);
  const history = useHistory();
const {user} = useSelector((state)=>({...state}));
useEffect(()=>{
  const unsubscribe = ()=>{
  if(user && user.token){
    history.push('/')
  }}

  return ()=>unsubscribe();
},[user,history]);

  const onFinish = async (e,values) => {
try {
  if(!email){
    toast.error("Please enter your email",{
      position: "bottom-right"
    })
    setLoading(false)
    return ;
  }
setLoading(true)
  const config = {
    url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
    handleCodeInApp: true,
  };

  await auth.sendPasswordResetEmail(email,config)
  toast.success('password reset link is sent to your email',{
    position: "bottom-right"
  })

  setLoading(false)
} catch (error) {
  setLoading(false)
  toast.error("Email is not registered",{
    position: "bottom-right"
  })
}
  };

  const handleChange = (e) => {
    setEmail(e.target.value)
  };

  return (
    <>
    <div className="forgot__password">
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
        name="username"
        rules={[
          {
            required: true,
            message: 'Please enter your Email',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" value={email} onChange={handleChange} />
      </Form.Item>
     
     

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" size="middle" style={{width:'100%'}}>
         {loading?(<Spin indicator={antIcon} />) : 'Reset'}
        </Button>
      </Form.Item>
    </Form>
    </div>
    </>
  );
}

export default ForgotPassword;