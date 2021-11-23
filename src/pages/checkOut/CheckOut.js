import React, { useEffect, useState } from "react";
import CheckOutForm from "../../components/form/CheckOutForm";
import getCart from "../../functions/getUserCart";
import { useSelector } from "react-redux";
import CurrencyFormatter from "react-currency-format";

//css
import "./checkout.css";
import { currentUser } from "../../functions/auth";
import { verifyCoupon } from "../../functions/coupon";

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
  const [verifiedCoupon,setVerifiedCoupon] = useState({});
  const { user } = useSelector((state) => ({ ...state }));
  const [storeCart, setStoreCart] = useState(null);
  useEffect(() => {
    if (user) loadUser();
    loadCart();
    // eslint-disable-next-line
  }, [user]);

  const loadCart = async () => {
    try {
      const cart = await getCart(user?.email);
      setStoreCart(cart.data);
      // console.log("cart loaded", cart);
    } catch (e) {
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
        setVerifiedCoupon(verified.data[0])
        console.log("verified",verified)
        if(verified.data.length>0){
          setLoading(false)
        }
        setError("Hurrey coupon applied !");
      }
    } catch (error) {
      setError("code invalid!");
      setLoading(false);
      e.target.previousSibling.style.color = "red";
    }
  };


  return (
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
              // console.log("e", e);
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
                  value={storeCart?.cartTotal}
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
          <button>Place order</button>
        </div>
      }
    </div>
  );
}

export default CheckOut;
