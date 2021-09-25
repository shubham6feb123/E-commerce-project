import React, { useState } from 'react'
import './adminNav.css'
import {NavLink} from 'react-router-dom'

//components
import { Tooltip,Drawer } from 'antd';
import { MoreOutlined} from '@ant-design/icons';



const text = <span>Admin Options</span>;

function AdminNav({path}) {
    const[show,setShow] = useState({ visible: false, placement: 'left' });

    //Drawer function to show Drawer
   const  showDrawer = () => {
        setShow({visible:true})
      };

    const   onClose = () => {
        setShow({
          visible: false,
        });
      };

    return (
        <div className="adminnav">
            <div className="adminnav__links__wrapper">
            <li><NavLink to={`${path}`} exact >DASHBOARD</NavLink></li>
            <li><NavLink to={`${path}/product`}>PRODUCT</NavLink></li>
            <li><NavLink to={`${path}/productlist`}>PRODUCT LIST</NavLink></li>
            <li><NavLink to={`${path}/category`}>CATEGORY</NavLink></li>
            <li><NavLink to={`${path}/subcategory`}>SUB CATEGORY</NavLink></li>
            <li><NavLink to={`${path}/coupon`}>COUPON</NavLink></li>
            </div>
            {/* for mobile purpose */}
            <div className="adminnav__links__wrapper__mobile">
            <Tooltip placement="right" title={text}><MoreOutlined onClick={showDrawer}/></Tooltip>
            <Drawer
            className="drawer"
          title="Admin Options"
          placement={show.placement}
          closable={false}
          onClose={onClose}
          visible={show.visible}
          key={show.placement}
        >
          <ul className="adminnav__options">
          <li><NavLink to={`${path}`} exact >DASHBOARD</NavLink></li>
            <li><NavLink to={`${path}/product`}>PRODUCT</NavLink></li>
            <li><NavLink to={`${path}/productlist`}>PRODUCT LIST</NavLink></li>
            <li><NavLink to={`${path}/category`}>CATEGORY</NavLink></li>
            <li><NavLink to={`${path}/subcategory`}>SUB CATEGORY</NavLink></li>
            <li><NavLink to={`${path}/coupon`}>COUPON</NavLink></li>
          </ul>
        </Drawer>
            </div>
        </div>
    )
}

export default AdminNav


