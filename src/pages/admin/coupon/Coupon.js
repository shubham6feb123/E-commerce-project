import React, { useEffect, useState } from "react";
import { Create, List } from "../../../functions/coupon";

//css
import "./coupon.css";

//components
import { DatePicker, Button, message } from "antd";
import { useSelector } from "react-redux";
import CouponCard from "../../../components/CouponCard/CouponCard";

function Coupon() {
  const [formDetails, setFormDetails] = useState({
    name: "",
    discount: "",
    expiry: "",
  });
  const { user } = useSelector((state) => ({ ...state }));
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    loadCoupon();
  }, []);

  function onChange(date, dateString) {
    console.log(date, dateString);
    setFormDetails({ ...formDetails, expiry: dateString });
  }

  const handleChange = (e) => {
    console.log(e.target.name);
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  };

  const submitCoupon = () => {
    if (formDetails.name && formDetails.discount && formDetails.expiry) {
      console.log("sub", formDetails);
      createCoupon();
    }
  };

  const createCoupon = async () => {
    const details = await Create(formDetails, user?.email);
    // console.log("create--->", details);
    setCoupons([...coupons,details.data])
    message.success({
      content: `${formDetails.name} coupon created!`,
      style: { position: "fixed", bottom: "10px", left: "25px", right: "20px" },
    });
    setFormDetails({ name: "", discount: "", expiry: "" });
  };

  const loadCoupon = async () => {
    const allcoupons = await List();
    setCoupons(allcoupons.data);
    // console.log("all coupons", allcoupons);
  };
  return (
    <>
      <div className="coupon">
        <form style={{ margin: "0px 10px" }}>
          <h1 className="h1 mb-3 text-center">Create Coupon</h1>
          <div className="row mb-4">
            <label htmlFor="inputName" className="col-sm-2 col-form-label">
              Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                name="name"
                style={{ textTransform: "uppercase" }}
                value={formDetails.name}
                className="form-control"
                id="inputName"
                required
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-4">
            <label htmlFor="inputDiscount" className="col-sm-2 col-form-label">
              Discount%
            </label>
            <div className="col-sm-10">
              <input
                type="number"
                name="discount"
                value={formDetails.discount}
                className="form-control"
                id="inputDiscount"
                required
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-4">
            <label htmlFor="inputExpiry" className="col-sm-2 col-form-label">
              Expiry
            </label>
            <div className="col-sm-10">
              <DatePicker onChange={onChange} />
            </div>
          </div>
          <div className="row mb-4 d-flex justify-content-center ">
            <Button
              type="primary"
              style={{ width: "57%" }}
              onClick={submitCoupon}
            >
              Create coupon
            </Button>
          </div>
        </form>
      </div>
      <div className="coupon__card__container">
        {coupons?.map((c) => (
          <CouponCard
            key={c._id}
            name={c.name}
            discount={c.discount}
            expiry={c.expiry}
            couponId={c._id}
            email={user?.email}
            loadCoupon={loadCoupon}
          />
        ))}
      </div>
    </>
  );
}

export default Coupon;
