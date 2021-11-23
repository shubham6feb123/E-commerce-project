import React from 'react'
import {Remove} from "../../functions/coupon";
//css
import "./couponcard.css"

//components
import { message } from "antd";

function CouponCard({name,discount,expiry,couponId,email,loadCoupon}) {
    const deleteCoupon = async()=>{
        //    console.log("coupon deleted",couponId)
           const deleted = await Remove(couponId,email);
        //    console.log("coupon deleted",deleted)
           message.error({
            content: `${name} coupon deleted!`,
            style: { position: "fixed", bottom: "10px", left: "25px", right: "20px" },
          });
          loadCoupon();
    }
    return (
        <div className="coupon__card">
            <div className="coupon__heading">{name}</div>
            <div className="coupon__discount">{discount}%</div>
            <div className="coupon__expiry">Expiry:{new Date(expiry).toLocaleDateString()}</div>
            <div className="coupon__delete" onClick={deleteCoupon}>x</div>
        </div>
    )
}

export default CouponCard
