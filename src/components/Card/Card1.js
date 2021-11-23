import React, { useEffect, useState } from "react";

//css
import "./card1.css";

//component
import { NavLink } from "react-router-dom";
import { HeartFilled, StarFilled } from "@ant-design/icons";
// import heart from '../Card/icons8-heart.gif';
import { Tag, Tooltip } from "antd";
import CurrencyFormat from "react-currency-format";

let numArray = [1,2,3,4,5,6,7,8,9];
function Card1({ product, rating,rate}) {
  const [heartIcon, SetHeartIcon] = useState(true);
  const [avgRate,setAvgRate] = useState(null);
  // const [showHeartAnim,setShowHeartAnim] = useState(false);

useEffect(()=>{
let addStar = rate?.reduce((prev,cur)=>prev+cur.star,0);
if(addStar){
  setAvgRate(addStar/rate?.length);
  // console.log("addstar",addStar);
}
},[rate]);

  const heartIconClicked = () => {
    SetHeartIcon(!heartIcon);
  };

  const showPrice = () => (
    <CurrencyFormat
      value={product?.price}
      displayType={"text"}
      thousandSeparator={true}
      prefix={"₹"}
    />
  );

  const anim = () => {
    return <HeartFilled style={{ color: "#F35355", fontSize: "16px" }} />;
  };

  return (
    <div className="card__container">
      <div className="card__image__container">
        <NavLink to={`/product/${product.slug}`}>
          <img alt="product__image" src={product?.images[1].secure_url} />
        </NavLink>
      </div>
      <div className="card__label__container">
        <NavLink to={`/product/${product.slug}`}>
          {product?.title.slice(0, 60)}...
        </NavLink>
      </div>

      {rating ? (
        <div className="card__rating__container">
          <Tag color="#428E3C">
          {avgRate?numArray.includes(avgRate)?Number(avgRate).toPrecision(2):avgRate:"0.0"}{<StarFilled />}
          </Tag>
          <span className="rating__text">
            (
            {rate ? (
              <CurrencyFormat
                value={rate.length}
                displayType={"text"}
                thousandSeparator={true}
              />
            ) : (
              0
            )}
            )
          </span>
        </div>
      ) : (
        ""
      )}

      <div className="card__price__container">
        <h4>{showPrice()}</h4>
      </div>

      <Tooltip title="Add to Wishlist">
        <div className="wishlist__button" onClick={heartIconClicked}>
          {heartIcon ? (
            <HeartFilled style={{ color: "#c2c2c2", fontSize: "16px" }} />
          ) : (
            anim()
          )}
        </div>
      </Tooltip>
    </div>
  );
}

export default Card1;
