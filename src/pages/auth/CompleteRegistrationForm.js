import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import "./completeregister.css";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

//components
import { Form, Input, Button,Spin } from 'antd';
import { UserOutlined, LockOutlined,LoadingOutlined } from '@ant-design/icons';
import image from '../../images/logo.png';
// import { useSelector } from "react-redux";


const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
function CompleteRegistrationForm() {
  const [email, setEmail] = useState("");
  const [loading,setLoading] = useState(false);
  // const {user} = useSelector((state)=>({...state}))
  const history = useHistory();

  useEffect(() => {
    // console.log(window.localStorage.getItem("EmailForRegistration"));
    setEmail(window.localStorage.getItem("EmailForRegistration"));
  }, []);

// console.log("email",email)

  const onFinish = async (value) => {
    const {password} = value;
    console.log(value)
    //validation for password
    if (!password) {
      toast.error(`Password is required`, { position: "bottom-right" });
      return;
    } else if (password.length < 6) {
      toast.error(`Password sholud be atleast 6 characters long`, {
        position: "bottom-right",
      });
      return;
    } else
      try {
        setLoading(true)
        const result = await auth.signInWithEmailLink(
          email,
          window.location.href
        );
        if (result.user.emailVerified) {
          //deleting email from localstorage
          window.localStorage.removeItem("EmailForRegistration");
          const user = await auth.currentUser;
         await user.updatePassword(password);
        await user.getIdTokenResult();
          // console.log("idTokenResult", idTokenResult);
          // console.log("newPassword", newPassword);

          //Redirect user
          history.push("/");
        } else {
          console.log(
            "user is not verified",
            window.localStorage.getItem("EmailForRegistration")
          );
        }
      } catch (error) {
        setLoading(false)
        console.log(error);
        toast.error(
          `Verification link sent to email has been expired or not working. Try to register again `,
          {
            position: "bottom-right",
          }
        );
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
      fields={[
        {
          name: ["Email"],
          value: email,
        },
      ]}
    >
      <Form.Item
        name="Email"
        // initialValue={email}
        rules={[
          {
            required: false,
            message: 'Please enter your Email',
          },
        ]}
        
      >
        <Input disabled prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
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
        <Button size="large" type="primary" htmlType="submit" className="login-form-button" style={{width:"100%"}}>
        {loading?(<Spin indicator={antIcon} />) : 'Complete Registration'}
        </Button>
        {/* Or <NavLink to="/register">register now!</NavLink> */}
      </Form.Item>
    </Form>
      </div>
    </>
  );
}

export default CompleteRegistrationForm;
