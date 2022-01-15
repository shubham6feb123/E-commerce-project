import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {LoadingOutlined} from "@ant-design/icons";
import axios from "axios";

//css
import './login.css';

//components
import { Form, Input, Button, Checkbox,Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import image from '../../images/logo.png';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function Login() {
  const [loading,setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
   const unsubscribe = ()=> {
     if (user && user.token) {
      history.push("/");
    }}

    //clean up
    return ()=> unsubscribe();
  }, [user,history]);

  const onFinish = async (values) => {
    const {Email,password} = values;
    try {
      if (!Email || !password || password.length < 6) {
        toast.error("Invalid Login Credentials ", {
          position: "bottom-right",
        });
        return;
      }

      //loading
      setLoading(true);

        //role based redirect
  const roleBaseRedirect = (res)=>{
    if(res.data.role === "admin"){
     history.push("/");
    }else{
      history.push("/");
    }
  }

      // console.log("clicked on login button");
      const signIn = await auth.signInWithEmailAndPassword(Email, password);
      const { user } = await signIn;
      // console.log("login", signIn);
      const idTokenResult = await user.getIdTokenResult();
      // console.log("login page", idTokenResult.token);

      const tokenresult = await axios.post(
        `${process.env.REACT_APP_API}/create-or-update-user`,
        {},
        {
          headers: {
            authtoken: idTokenResult.token,
          },
        }
      );
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          name: tokenresult.data.name,
          role: tokenresult.data.role,
          email: tokenresult.data.email,
          _id: tokenresult.data._id,
          token: idTokenResult.token,
        },
      });

      roleBaseRedirect(tokenresult);

      
      // history.push("/");

    } catch (error) {
      // console.log("error", error);
      setLoading(false);
      toast.error("Invalid Login Credentials", {
        position: "bottom-right",
      });
    }

  };
  return (
    <>
      <div className="login">
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
        name="Email"
        rules={[
          {
            required: true,
            message: 'Please enter your Email',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
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
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <NavLink className="login-form-forgot" to="/forgotpassword">
          Forgot password
        </NavLink>
      </Form.Item>

      <Form.Item>
        <Button size="large" type="primary" htmlType="submit" className="login-form-button" style={{width:"100%"}}>
        {loading?(<Spin indicator={antIcon} />) : 'Log in'}
        </Button>
        Or <NavLink to="/register">register now!</NavLink>
      </Form.Item>
    </Form>
      </div>
    </>
  );
}

export default Login;
