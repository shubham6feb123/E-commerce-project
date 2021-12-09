import React, { useEffect, useState } from "react";
import CheckOutForm from "../../components/form/CheckOutForm";
import getCart from "../../functions/getUserCart";
import { useSelector,useDispatch } from "react-redux";
import {useHistory} from "react-router-dom";
import CurrencyFormatter from "react-currency-format";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

//css
import "./checkout.css";
import { currentUser } from "../../functions/auth";
import { verifyCoupon } from "../../functions/coupon";
import { verifyUser } from "../../functions/payment";
import Loading from "../../components/Loading/Loading";

const antIcon = <LoadingOutlined/>
function CheckOut() {
  const [details, setDetails] = useState({
    name: "",
    mobileNumber: "",
    pincode: "",
    city: "",
    address: "",
    state: "",
    zip: "",
  });
  const [showCoupon, setShowCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderLoading,setOrderLoading] = useState(false);
  const [totalAfterDiscount,setTotalAfterDiscount] = useState(0);
  // const [verifiedCoupon,setVerifiedCoupon] = useState({});
  const { user } = useSelector((state) => ({ ...state }));
  const [storeCart, setStoreCart] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (user) loadUser();
    loadCart();
    // eslint-disable-next-line
  }, [user,totalAfterDiscount]);

  const loadCart = async () => {
    try {
      const cart = await getCart(user?.email);
      if(cart.data==="Your cart is empty"){
        history.push("/")
      }else{
      setStoreCart(cart.data);
      // console.log("cart loaded", cart);
    }
    } catch (e) {
      history.push("/")
      // console.log("failed to get cart", e);
    }
  };

  const loadUser = async () => {
    const userDetails = await currentUser(user?.email);
    // console.log("user got it", userDetails);

    if (userDetails?.data)
      setDetails({
        name: userDetails?.data.name,
        mobileNumber: userDetails?.data?.details?.mobileNumber,
        pincode: userDetails?.data?.details?.pincode,
        city: userDetails?.data?.details?.city,
        address: userDetails?.data?.details?.address,
        state: userDetails?.data?.details?.state,
        zip: userDetails?.data?.details?.zip,
      });
  };

  const applyCoupon = async (e) => {
    // console.log("code sending to backend",couponCode,e)
    try {
      if (couponCode&&user?.token) {
        setLoading(true);
        const verified = await verifyCoupon(couponCode, user?.token);
         setTotalAfterDiscount(Number(verified?.data?.totalAfterDiscount));
        // console.log("verified",verified)
        setLoading(false)
        setError("Hurrey coupon applied !");
        dispatch({type:"COUPON_APPLIED",payload:true})
      }
    } catch (error) {
      setError("code invalid!");
      setLoading(false);
      e.target.previousSibling.style.color = "red";
      dispatch({type:"COUPON_APPLIED",payload:false})
    }
  };

  //place order function
  const placeOrder = ()=>{
    setOrderLoading(true)
   if(details.address&&details.city&&details.mobileNumber&&details.name&&details.pincode&&details.state&&details.zip){
     verify();  
   }
  }

  const verify = async()=>{
   try {
     const verified = await verifyUser(user?._id)
     console.log("verified",verified)
    verified?.data?.status&& history.push(`/payment/${user?._id}`);
    setOrderLoading(false)
   } catch (error) {
     setOrderLoading(false)
   }
  }

  return !storeCart?.products?(<Loading/>):(
    <div className="checkout">
      <div className="checkout__details__container">
        <div className="checkout__delivery__address">
          <p className="heading">Delivery Details</p>
          <CheckOutForm
            details={details}
            setDetails={setDetails}
            authtoken={user?.token}
          />
        </div>
        <div className="checkout__coupon__container">
          <div
            className="apply__coupon__heading"
            onClick={(e) => {
              setShowCoupon(!showCoupon);
              e.target.nextSibling.style.display = "block";
            }}
          >
            Apply Coupon
          </div>
          <div
            className="apply__coupon__container"
            style={showCoupon ? { display: "block" } : { display: "none" }}
          >
            <input
              type="text"
              placeholder="Enter Coupon"
              value={couponCode}
              onChange={(e) => {
                setCouponCode(e.target.value);
                e.target.style.color = "inherit";
                setError("");
              }}
            />
            <button onClick={applyCoupon}>{loading?"Verifying...":"Apply"}</button>
            {error === "code invalid!" && (
              <div>
                <small style={{ color: "red", letterSpacing: "1px",fontWeight:"bold" }}>
                  code invalid !
                </small>
              </div>
            )}
            {error === "Hurrey coupon applied !" && (
              <div>
                <small style={{ color: "#2774f0", letterSpacing: "1px",fontWeight:"bold" }}>
                  Hurrey coupon applied !
                </small>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="checkout__order__summary cart__fill__price__details__container">
        <div
          style={{ textTransform: "uppercase", letterSpacing: "1px" }}
          className="cart__fill__price__details__heading"
        >
          Order Summary
        </div>
        <div className="cart__fill__price__details__calculation">
          {storeCart?.products?.map((item, index) => (
            <div key={item?._id} className="cart__fill__price__details">
              <div>
                {item?.product.title.slice(0, 20)} ({item.color}) x{" "}
                {item?.count}
              </div>{" "}
              <div>
                {
                  <CurrencyFormatter
                    value={item?.product.price * item?.count}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix="₹"
                  />
                }
              </div>
            </div>
          ))}
          <div className="cart__fill__price__details__total">
            <div>Total Payable</div>
            <div>
              {
                <CurrencyFormatter
                value={storeCart?.totalAfterDiscount?storeCart.totalAfterDiscount:storeCart?.cartTotal}
                displayType={"text"}
                  thousandSeparator={true}
                  prefix="₹"
                />
              }
            </div>
          </div>
        </div>
      </div>
      {
        <div className="proceed__to__checkout">
          <button disabled={orderLoading?true:false} onClick={placeOrder}>{orderLoading?(<Spin size="large" indicator={antIcon} tip="Placeing order" />):"Place order"}</button>
        </div>
      }
    </div>
  );
}

export default CheckOut;
