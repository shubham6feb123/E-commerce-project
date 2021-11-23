import React, { useEffect, useState } from "react";

//css
import "./cartitemcard.css";

//components
import CurrencyFormatter from "react-currency-format";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { message, Tooltip } from "antd";
import { useDispatch } from "react-redux";

function CartItemCard({ item }) {
  const [counter, setCounter] = useState(1);
  const [colorSelect, setColorSelect] = useState(false);

  const dispatch = useDispatch();
  function heading(str) {
    return str?.slice(0, 60);
  }

  useEffect(() => {
    if (counter !== undefined) setCounter(item?.count);
    // eslint-disable-next-line
  }, [item]);

  let count = item?.count;

  const increment = () => {
    if (counter < 7) {
      let cart = [];
      if (typeof window !== undefined) {
        cart = JSON.parse(window.localStorage.getItem("cart"));
      }

      cart?.map((product, i) => {
        if (product?._id === item?._id) {
          cart[i].count = count + 1;
        }
        return 0;
      });

      window.localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });

      //  console.log("item------> ",ite)
      setCounter(counter + 1);
    } else {
      message.error({
        content: "You can buy only up to 7 unit(s) of this product",
        style: {
          position: "fixed",
          bottom: "10px",
          left: "25px",
          right: "20px",
        },
      });
    }
  };

  const decrement = () => {
    if (counter > 1) {
      let cart = [];
      if (typeof window !== undefined) {
        cart = JSON.parse(window.localStorage.getItem("cart"));
      }

      cart?.map((product, i) => {
        if (product?._id === item._id) {
          cart[i].count = count - 1;
        }
        return 0;
      });

      window.localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
      setCounter(counter - 1);
    }
  };

  const removeProduct = () => {
    let cart = [];
    if (typeof window !== undefined) {
      cart = JSON.parse(window.localStorage.getItem("cart"));
    }

    let index = cart.findIndex((it) => {
      return it._id === item._id;
    });

    console.log("index of item in cart", index);

    cart.splice(index, 1);

    window.localStorage.setItem("cart", JSON.stringify(cart));

    dispatch({
      type: "ADD_TO_CART",
      payload: cart,
    });

    message.success({
      content: "Item removed from your cart!",
      style: {
        position: "fixed",
        bottom: "10px",
        left: "25px",
        right: "20px",
      },
    })
  };

  const selectColor = (e) => {

    // console.log("select color", e.target.attributes[0].value, e);
    if (!e.target.style.border) {
      if(!colorSelect){
      e.target.style.border = "2px solid #2774f0";
      setColorSelect(true)
      message.success({
        content: "Color selected!",
        style: {
          position: "fixed",
          bottom: "10px",
          left: "25px",
          right: "20px",
        },
      })

      dispatchColorToCart(e.target.attributes[0].value)
   } 
   else{
     if(e.target.style.border){
 
         e.target.style.border=""
         setColorSelect(false)
     }
   }
  } 
    else {
      // setColorSelect(false);
      e.target.style.border = "";
      setColorSelect(false)
      message.success({
        content: "Color unselected!",
        style: {
          position: "fixed",
          bottom: "10px",
          left: "25px",
          right: "20px",
        },
      })
    }
  };

  const dispatchColorToCart = (color)=>{
    let cart = []
      if(typeof window !== undefined){
          cart = JSON.parse(window.localStorage.getItem("cart"))
      }

      for(let i=0;i<cart.length;i++){
        if(cart[i]._id===item._id){
        cart[i].color = [color];
      }
      }

      window.localStorage.setItem("cart",JSON.stringify(cart));

      dispatch({
        type:"ADD_TO_CART",
        payload:cart
      })
  }

  return (
    <div className="cart__item__card__container">
      <div className="cart__item__content">
        <div className="cart__item__image">
          <img
            style={{ width: "150px" }}
            src={
              //   "https://res.cloudinary.com/dsapr3fkl/image/upload/v1635517652/1635517650390.jpg"
              item?.images[0].secure_url
            }
            alt="product"
          />
        </div>
        <div className="cart__item__details">
          <div className="cart__item__details__heading">
            {heading(item?.title)}
            ...
          </div>
          <div className="cart__item__details__price">
            <CurrencyFormatter
              value={item?.price}
              displayType={"text"}
              thousandSeparator={true}
              prefix="₹"
            />
          </div>
          <div className="cart__item__details__color">
            <div>Select Color</div>
            <div>
              {item?.color?.map((it, index) => (
                <Tooltip key={index} title={it}>
                  <span
                    value={it}
                    key={index}
                    style={{ background: it }}
                    onClick={selectColor}
                  ></span>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="cart__item__features">
        <div className="cart__item__features__counter">
          <button
            style={
              counter === 1
                ? { pointerEvents: "auto", cursor: "not-allowed" }
                : { cursor: "pointer" }
            }
            className="minus"
            onClick={decrement}
            disabled={counter <= 1 ? true : false}
          >
            <MinusOutlined
              style={
                counter === 1
                  ? { pointerEvents: "auto", cursor: "not-allowed" }
                  : { cursor: "pointer" }
              }
              className={"minus"}
              onClick={decrement}
            />
          </button>
          <input value={item?.count} readOnly />
          <button
            style={
              counter === 7
                ? { pointerEvents: "auto", cursor: "not-allowed" }
                : { cursor: "pointer" }
            }
            className={"plus"}
            onClick={increment}
          >
            <PlusOutlined
              style={
                counter === 7
                  ? { pointerEvents: "auto", cursor: "not-allowed" }
                  : { cursor: "pointer" }
              }
              className={"plus"}
              onClick={increment}
            />
          </button>
        </div>
        <div className="cart__item__features__save__button">
          <button>Save for later</button>
        </div>
        <div className="cart__item__features__remove__button">
          <button onClick={removeProduct}>Remove</button>
        </div>
      </div>
    </div>
  );
}

export default CartItemCard;
