import React, { useEffect, useState } from "react";
//css
import "./productReview.css";
import { getUserNameReview } from "../../functions/review";
import { Avatar } from "antd";

const ProductReview = ({ message, postedBy = "",user }) => {
  const [userDetails, setUserDetails] = useState({ role: "", name: "" });
  useEffect(() => {
    userDetail();
  }, [postedBy]);

  const userDetail = async () => {
    try {
      const data = await getUserNameReview(postedBy);
      console.log("user details", data);
      setUserDetails(data.data)
    } catch (error) {
      console.log("failed to user detail", error);
    }
  };
  return (//userDetails?.name
      <>
    <div className="review__container" style={user?.name===userDetails?.name?{marginLeft:"auto",backgroundColor:"#ff8a00"}:{backgroundColor:"#2774f0"}}>
      <div className="review__box">
        <h6 className="reviewed__by">
        <Avatar src={userDetails?.name===user?.name?"https://joeschmoe.io/api/v1/random":"https://toppng.com/uploads/preview/user-account-management-logo-user-icon-11562867145a56rus2zwu.png"} />
            {userDetails.name}{userDetails?.name===user?.name?"(You)":""}
            </h6>
        <p className="review__message">{message}</p>
      </div>
    </div>

</>
  );
};

export default ProductReview;
