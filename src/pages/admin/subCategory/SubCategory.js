import React, {useLayoutEffect, useRef, useState } from "react";
import "../../auth/register.css";
import "../category/category.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { list } from "../../../functions/category";
import {
  subcreate,
  sublist,
  subremove,
} from "../../../functions/subcategory";

//css
import "./subcategory.css";

//components
import { Input, Form, Button, Spin, Select, Space,Typography,Popconfirm } from "antd";
import {NavLink,useRouteMatch} from "react-router-dom";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const { Option } = Select;
const { Search } = Input;
const { Paragraph } = Typography;

const text = "Are you sure?"
function SubCategory() {
  const [fetched,setFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(null);
  const [subcategories, setSubcategories] = useState(null);
  const [keywords,setKeywords] = useState("");
  const [render, setRender] = useState(false);
  const {path} = useRouteMatch();
  const buttonRef = useRef(null);


  //redux
  const { user } = useSelector((state) => ({ ...state }));

  //Getting list of category
  useLayoutEffect(() => {
    list()
      .then((category) => {
        setCategories([...category.data]);
        setFetched(true)

      })
      .catch((error) => {
      
      });

      return ()=> fetched;
      // eslint-disable-next-line
  }, []);

  useLayoutEffect(()=>{
    loadSubcategory();
  },[render])

  const onFinish = (value) => {
    // console.log("sub categories",value)
    if (value) {
      setLoading(true);

      createSubcategory(user.email, value.subcategory, value.parentId);
    }
  };

  //creating subcategory function
  const createSubcategory = (email, subcategory, parentId) => {
    subcreate(email, subcategory, parentId)
      .then((response) => {
        setLoading(false);
        toast.success("subcategory created", { position: "bottom-right" });
        setRender(!render);
      })
      .catch((error) => {
        setLoading(false);
        toast.error("failed to create subcategory", {
          position: "bottom-right",
        });
      });
  };

  const loadSubcategory = () => {
    sublist()
      .then((response) => {
        setSubcategories([...response.data]);
      })
      .catch((error) => {});
  };

  // console.log("subcategories",subcategories)

  const onSearch = (value)=>{
setKeywords(value)
  }

 

  const deleteSubcategory = (slug,email)=>{
  subremove(slug,email).then(()=>{
  toast.success("subcategory deleted",{position:"bottom-right"});
  setRender(!render);
}).catch((error)=>{
  toast.error("failed to updated subcategory",{position:"bottom-right"})
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
          <h1 style={{textAlign:"center"}}>Create Subcategory</h1>
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

            <Form.Item
              name="parentId"
              label="Category"
              rules={[
                {
                  required: true,
                  message: "Please select category",
                },
              ]}
            >
              <Select placeholder="select your parent category">
                {categories?.map((category) => (
                  <Option key={category._id} value={category._id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
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
        <Search className="search" placeholder="search subcategory" onSearch={onSearch} enterButton />
        </Space>
          <ul className="list__container">
           { subcategories?.filter((sub)=>(sub.name.toLowerCase().includes(keywords))).map((subcategory) => 
           (
            <li key={subcategory._id}>
            <Paragraph >
              {subcategory.name}
            </Paragraph>
              <div>
                <Space>
                <Button type="primary" name="update">
                  <NavLink to={`${path}/update/${subcategory.slug}`}>
                Update
                </NavLink>
                </Button>
                <Popconfirm placement="left" title={text} value={subcategory.slug} onConfirm={confirm} okText="Yes" cancelText="No">
                <Button type="primary" name="delete" value={subcategory.slug} ref={buttonRef} danger >
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

export default SubCategory;



