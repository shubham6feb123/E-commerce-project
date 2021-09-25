import React, { useState } from 'react'
import {subupdate} from "../../../functions/subcategory";

//css
import "./subcategory.css"

//components
import { Input, Form, Button, Spin} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';
import {useParams} from "react-router-dom";


const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function UpdateSubcategory() {
    const [loading,setLoading] = useState(false)
    const { slug } = useParams();
    const {user} = useSelector((state)=>({...state}))


    const onFinish = (value) => {
        if (value) {
          setLoading(true);
          // console.log("value", value);
        //   createSubcategory(user.email, value.subcategory, value.parentId);
        updateSubcategory(slug,user.email,value.subcategory)
        }
      };

      const  updateSubcategory = (slug,email,category)=>{
          subupdate(slug,email,category).then(()=>{
              toast.success("subcategory updated",{position:"bottom-right"})
              setLoading(false)
          }).catch(()=>{
            setLoading(false)
            toast.error("failed to updated subcategory",{position:"bottom-right"})
          })
      }
    return (
        <>
        <div className="subcategory">
        <div className="subcategory__wrapper" style={{marginTop:"100px"}}>
          <h1 style={{textAlign:"center"}}>Update Subcategory</h1>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Subcategory"
              name="subcategory"
              rules={[
                {
                  required: true,
                  message: "Please enter subcategory",
                },
              ]}
            >
              <Input placeholder="Subcategory" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                size="large"
                style={{ width: "100%" }}
              >
                {loading ? <Spin indicator={antIcon} /> : "Update"}
              </Button>
            </Form.Item>
          </Form>
          </div>
          </div>
          </>
    )
}

export default UpdateSubcategory
