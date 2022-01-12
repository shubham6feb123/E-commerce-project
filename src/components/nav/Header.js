import React, {useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./header.css";
//images
import flipkartLogo from './flipkartLogo.png'
import { Badge, Avatar } from 'antd';
import {
  ShoppingCartOutlined,
  PoweroffOutlined ,
  UserAddOutlined,
  LockFilled,
  LoginOutlined,
  WindowsFilled,
  SkinFilled,
  HeartFilled,
  QuestionCircleFilled
} from "@ant-design/icons";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../searchBar/SearchBar";

const style = {
  color:"black",
  fontWeight:500
}
function Header() {
  let dispatch = useDispatch();
  const history = useHistory();
  let { user,cart } = useSelector((state) => ({ ...state }));

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };
 
  return (
    <>
      <div className="header">
        <div className="header__logo" title="flipshop">
          <NavLink to="/">
            <img
              src={flipkartLogo}
              alt="FlipShop"
            />
          </NavLink>
        </div>
        <SearchBar/>
        <div className="header__navigationOptions">
          <div className="my__avatar">
          <Avatar src="https://joeschmoe.io/api/v1/random" />
          <div
        className="header__user__dropdown" >
        <ul>
          {!user && (
            <li>
              <NavLink to="/login">
              <LoginOutlined />
                <span style={style}>Login</span>
              </NavLink>
            </li>
          )}
          {!user && (
            <li>
              <NavLink to="/register">
                <UserAddOutlined />
                <span style={style}>Register</span>
              </NavLink>
            </li>
          )}
         
          {user && (
            <li >
              <NavLink to="/user/wishlist">
              <HeartFilled />
               <span style={style}>Wishlist</span> 
              </NavLink>
            </li>
          )}
           {user && (
            <li >
              <NavLink to="/user/orders">
              <SkinFilled />
               <span style={style}>Orders</span>
              </NavLink>
            </li>
          )}
        
          {user&&(<li>
            <NavLink to="/userpassword">
            <LockFilled/>
             <span style={style}>Password</span>
            </NavLink>
          </li>)}
          {user&&user.role==="admin"&& (<li>
            {
              user.role==="admin"?(
                <NavLink to="/admin">
            <WindowsFilled />
             <span style={style}>Admin</span>
            </NavLink>
              ):""
            }
          </li>)}
          {user && (
            <li>
              <NavLink to="/support">
                <QuestionCircleFilled /> 
               <span style={style}>Support</span>
              </NavLink>
            </li>
          )}
          {user && (
            <li onClick={logout}>
              <NavLink to="/">
                <PoweroffOutlined /> 
               <span style={style}>Logout</span>
              </NavLink>
            </li>
          )}
        </ul>
      </div>
          </div>
          {/* cart */}
        <NavLink to="/cart">
        <Badge count={cart.length}>
          <ShoppingCartOutlined/>
        </Badge>
        </NavLink>  
        </div>
      </div>
      <div className="header__behind__strip"></div>
    </>
  );
}

export default Header;
