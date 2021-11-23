import React, {useLayoutEffect, useRef, useState } from "react";
import "../../auth/register.css";
import "../category/category.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { list,create,remove } from "../../../functions/category";

//css
import "./category.css";

//components
import { Input, Form, Button, Spin, Space,Typography,Popconfirm } from "antd";
import {NavLink,useRouteMatch} from "react-router-dom";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const { Search } = Input;
const { Paragraph } = Typography;

const text = "Are you sure?"
function Category() {
  const [fetched,setFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(null);
  const [keywords,setKeywords] = useState("");
  const [render, setRender] = useState(false);
  const {path} = useRouteMatch();
  const buttonRef = useRef(null);


  //redux
  const { user } = useSelector((state) => ({ ...state }));



  useLayoutEffect(()=>{
    loadCategory();
    return ()=>fetched;
    // eslint-disable-next-line
  },[render]);

  const loadCategory = ()=>{
    list()
    .then((category) => {
      setCategories([...category.data]);
       setFetched(true)
    })
    .catch((error) => {
    });

  }

  const onFinish = (value) => {
    if (value) {
      setLoading(true);

      createCategory(user.email, value.category);
    }
  };

  //creating subcategory function
  const createCategory = (email, category) => {
    // console.log("category-->",email,category)
    create(email, category)
      .then((response) => {
        setLoading(false);
        toast.success("category created", { position: "bottom-right" });
        setRender(!render);
      })
      .catch((error) => {
        setLoading(false);
        toast.error("failed to create category", {
          position: "bottom-right",
        });
      });
  };


  const onSearch = (value)=>{
setKeywords(value)
  }

 

  const deleteSubcategory = (slug,email)=>{
// console.log(`We are deleting ${slug} ${email}`);
  remove(slug,email).then(()=>{
  toast.success("category deleted",{position:"bottom-right"});
  setRender(!render);
}).catch((error)=>{
  toast.error("failed to updated category",{position:"bottom-right"})
})

  }

const confirm = (e)=>{
 if(e.target.textContent==="Yes"){ 
    deleteSubcategory(buttonRef.current.value,user.email)
  }
}


  return (
    <>
      <div className="subcategory">
        <div className="subcategory__wrapper">
          <h1 style={{textAlign:"center"}}>Create Category</h1>
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
                {loading ? <Spin indicator={antIcon} /> : "Create"}
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="subcategory__list__wrapper">
          <Space direction="vertical">
        <Search className="search" placeholder="search category" onSearch={onSearch} enterButton />
        </Space>
          <ul className="list__container">
           { categories?.filter((c)=>(c.name.toLowerCase().includes(keywords))).map((category) => 
           (
            <li key={category._id}>
            <Paragraph >
              {category.name}
            </Paragraph>
              <div>
                <Space>
                <Button type="primary" name="update">
                  <NavLink to={`${path}/update/${category.slug}`}>
                Update
                </NavLink>
                </Button>
                <Popconfirm placement="left" title={text} value={category.slug} onConfirm={confirm} okText="Yes" cancelText="No">
                <Button type="primary" name="delete" value={category.slug} ref={buttonRef} danger >
                Delete
                </Button>
                </Popconfirm>
                </Space>
              </div>
            </li>
           
            )
            
           )
        }
          </ul>
        </div>
      </div>
    </>
  );
}

export default Category;



