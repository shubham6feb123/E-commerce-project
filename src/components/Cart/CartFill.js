// import { useEffect, useState } from "react";
//css
import "./cart.css";
//componets
import CartItemCard from "./CartItemCard";
import CurrencyFormatter from "react-currency-format";
// import { useState } from "react";

const CartFill = ({ cart }) => {
  // const [totalAmount,setTotalAmount]  = useState(0);
  const total = () => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price * cart[i].count;
    }
    // setTotalAmount(total);
    return total;
  };

  return (
    <>
      <div className="cart__fill__container">
        <div className="cart__fill__item__container">
          <div className="cart__fill__item__heading">
            <span>My Cart ({cart?.length})</span>
          </div>
          {cart?.map((c) => (
            <CartItemCard key={c._id} item={c} />
          ))}
        </div>
        <div className="cart__fill__price__details__container">
          <div className="cart__fill__price__details__heading">
            PRICE DETAILS
          </div>
          <div className="cart__fill__price__details__calculation">
            {cart?.map((item, index) => (
              <div key={item?._id} className="cart__fill__price__details">
                <div>
                  {item?.title.slice(0, 20)} x {item?.count}
                </div>{" "}
                <div>
                  {
                    <CurrencyFormatter
                      value={item?.price * item?.count}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix="₹"
                    />
                  }
                </div>
              </div>
            ))}
          </div>
          <div className="cart__fill__price__details__total">
            <div>Total Amount</div>
            <div>
              {
                <CurrencyFormatter
                  value={total()}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix="₹"
                />
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartFill;
