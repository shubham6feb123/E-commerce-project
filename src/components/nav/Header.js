import React, {useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./header.css";
//images
import flipkartLogo from './flipkartLogo.png'
import {
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
  UserAddOutlined,
  LockOutlined,
  LoginOutlined,
  ProfileOutlined,
  WindowsOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../searchBar/SearchBar";


function Header() {
  const [showDropDown, setShowDropDown] = useState(false);
  let dispatch = useDispatch();
  const history = useHistory();
  let { user } = useSelector((state) => ({ ...state }));

  const DropDown = () => {
    setShowDropDown(!showDropDown);
  };

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
        {/* <div className="header__searchbar">
          <input type="search" name="" id="" placeholder="Search" />
          <SearchOutlined />
        </div> */}
        <SearchBar/>
        <div className="header__navigationOptions">
          <ShopOutlined title="shop" />
          <ShoppingCartOutlined title="cart" />
          <UserOutlined title="user" onClick={DropDown} />
        </div>
      </div>
      <div
        className={
          showDropDown
            ? "header__user__dropdown header__user__dropdown__appear"
            : "header__user__dropdown"
        }
      >
        <ul>
          {!user && (
            <li>
              <NavLink to="/login">
              <LoginOutlined />
                LOGIN
              </NavLink>
            </li>
          )}
          {!user && (
            <li>
              <NavLink to="/register">
                <UserAddOutlined />
                REGISTER
              </NavLink>
            </li>
          )}
         
          {user && (
            <li >
              <NavLink to="/">
              <ProfileOutlined />
                PROFILE
              </NavLink>
            </li>
          )}
          {user && (
            <li >
              <NavLink to="/">
              <HeartOutlined />
                WISHLIST
              </NavLink>
            </li>
          )}
           {user && (
            <li onClick={logout}>
              <NavLink to="/">
                <LogoutOutlined />
                LOGOUT
              </NavLink>
            </li>
          )}
          {user&&(<li>
            <NavLink to="/userpassword">
            <LockOutlined />
              PASSWORD
            </NavLink>
          </li>)}
          {user&&(<li>
            {
              user.role==="admin"?(
                <NavLink to="/admin">
            <WindowsOutlined />
              ADMIN PANEL
            </NavLink>
              ):(
                <NavLink to="/">
            <WindowsOutlined />
              ABOUT US
            </NavLink>
            
              )
            }
          </li>)}
        </ul>
      </div>
      <div className="header__behind__strip"></div>
    </>
  );
}

export default Header;
