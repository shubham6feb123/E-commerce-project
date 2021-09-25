import React, { useState } from 'react'
import { update } from "../../../functions/category";

//css
import "../subCategory/subcategory.css"

//components
import { Input, Form, Button, Spin} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';
import {useParams} from "react-router-dom";


const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function UpdateCategory() {
    const [loading,setLoading] = useState(false)
    const { slug } = useParams();
    const {user} = useSelector((state)=>({...state}))


    const onFinish = (value) => {
        if (value) {
          setLoading(true);
        updateCategory(slug,user.email,value.category)
        }
      };

      const  updateCategory = (slug,email,category)=>{
          update(slug,email,category).then(()=>{
              toast.success("category updated",{position:"bottom-right"})
              setLoading(false)
          }).catch(()=>{
            setLoading(false)
            toast.error("failed to updated category",{position:"bottom-right"})
          })
      }
    return (
        <>
        <div className="subcategory">
        <div className="subcategory__wrapper" style={{marginTop:"100px"}}>
          <h1 style={{textAlign:"center"}}>Update Category</h1>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Category"
              name="category"
              rules={[
                {
                  required: true,
                  message: "Please enter category",
                },
              ]}
            >
              <Input placeholder="Category" />
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

export default UpdateCategory
