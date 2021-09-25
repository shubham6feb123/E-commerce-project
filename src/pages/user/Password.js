import React, { useState} from "react";
import { auth } from "../../firebase";
import "./password.css";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import {LoadingOutlined} from "@ant-design/icons";

//components
import { Form, Input, Button, Spin } from 'antd';
import {  LockOutlined } from '@ant-design/icons';
import image from '../../images/logo.png';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function Password() {
  const [loading,setLoading] = useState(false);
  const history = useHistory();

  const onFinish = async (values) => {
    const {password,confirmpassword} = values;
try {
    if(!password||!confirmpassword){
        toast.error('password daal madarchod hosiyaari mat kr',{
            position: "bottom-right"
          
        })
        return;
    } else if(password!==confirmpassword){
    toast.error("Password not matching",{
        position: "bottom-right"
    })
    return;
    }else if(password.length <6){
toast.error('Password should be 6 character long',{
    position: "bottom-right"
})
    }
    else{
        setLoading(true);
          await auth.currentUser.updatePassword(password);
           setLoading(false);
           toast.success('Password Updated',{
               position: "bottom-right"
           })
           history.push('/');
    }
} catch (error) {
    console.log(error);
    setLoading(false);
    toast.error(error.message,{
        position: "bottom-right",
    })

}

  }
  return (
    <>
      <div className="password">
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
      style={{textAlign:"center"}}
    >
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please enter your Password',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item
        name="confirmpassword"
        rules={[
          {
            required: true,
            message: 'Please enter your Password',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Confirm Password"
        />
      </Form.Item>


      <Form.Item>
        <Button size="large" type="primary" htmlType="submit" className="login-form-button" style={{width:"100%"}}>
        {loading?(<Spin indicator={antIcon} />) : 'Reset'}
        </Button>
      </Form.Item>
    </Form>
      </div>
    </>
  );
}

export default Password;

