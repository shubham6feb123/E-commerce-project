import React, { useEffect, useState } from "react";
//css
import "./cart.css";
import CartEmpty from "./CartEmpty";
import CartFill from "./CartFill";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import userCart from "../../functions/userCart";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import Loading from "../Loading/Loading";

const antIcon = <LoadingOutlined/>

function Cart() {
  const [cartItem, setCartItem] = useState([]);
  const [loading,setLoading] = useState(false);
  const { cart, user } = useSelector((state) => ({ ...state }));
  const history = useHistory();
  // console.log("cart---",cart,cart.length)
  useEffect(() => {
    //    let cart = [];
    //    cart = JSON.parse(window.localStorage.getItem("cart"))
    setCartItem(cart);
  }, [cart]);

  const proceedToCheckOut = async () => {
   try{ 
     setLoading(true);
    const res = await userCart(cart, user.token);
    // console.log("cart post res", res);
    if (res.data.ok) {
      setLoading(false)
      history.push("/checkout");
    }
  }catch(e){
   setLoading(false);
   console.log("error in cart",e)
  }
  };
  return user?.token?(
    <div className="cart__container">
      {cart.length <= 0 ? <CartEmpty heading={"My Cart"} text1={"Your cart is empty!"} text2={"Add items to it now."} button={"Shop now"} /> : <CartFill cart={cartItem} />}
     { cart?.length>0&&(
      <div style={{display:"flex",justifyContent:"flex-end",marginRight:"4px",padding:"0px 2px 8px 0px"}}>
     <div className="proceed__to__checkout">
         <button disabled={loading?true:false} onClick={proceedToCheckOut}>{loading?(<Spin size="large" indicator={antIcon} tip="Proceeding to checkout" />):"Proceed to checkout"}</button>
     </div>
     </div>
      )}
    </div>
  ):(<Loading/>);
}

export default Cart;
