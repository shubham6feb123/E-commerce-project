import React, { useState } from 'react'

//css
import "./card1.css"

//component
import {NavLink} from "react-router-dom"
import {HeartFilled } from "@ant-design/icons";
// import heart from '../Card/icons8-heart.gif';
import {Tooltip } from 'antd';
import CurrencyFormat from "react-currency-format";


function Card1({product}) {
    const [heartIcon,SetHeartIcon] = useState(true);
    // const [showHeartAnim,setShowHeartAnim] = useState(false);
  

  const heartIconClicked = ()=>{
    SetHeartIcon(!heartIcon);

  }

  const showPrice = ()=>(
    <CurrencyFormat value={product?.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
  )




  const anim = ()=>{
     return <HeartFilled style={{color:"#F35355",fontSize:"16px"}}/>
  };

    return (
        <div className="card__container">
           <div className="card__image__container">
              <NavLink to={`/product/${product.slug}`}><img alt="product__image" src={product?.images[1].secure_url}/></NavLink> 
           </div>
           <div className="card__label__container">
               <NavLink to={`/product/${product.slug}`}>
               {product?.title.slice(0,60)}...
               </NavLink>
           </div>
  
           <div className="card__rating__container"></div>

           <div className="card__price__container">
           <h4>{showPrice()}</h4>
           </div>


        <Tooltip title="Add to Wishlist">
           <div className="wishlist__button" onClick={heartIconClicked}>
               {heartIcon?(<HeartFilled style={{color:"#c2c2c2",fontSize:"16px"}} />):anim()}
           </div>
           </Tooltip>
        </div>
    )
}

export default Card1
