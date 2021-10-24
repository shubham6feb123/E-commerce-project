import React, { useState } from 'react';
import "./productItmList.css";

//components
import {Tabs, Tooltip } from 'antd';
import Rating from '../StarRating/Rating';
import { useSelector } from 'react-redux';

function ProductItmList({product,id,slug}) {
    const [borderColor,setBorderColor] = useState(false);
    const {user} = useSelector((state)=>({...state}));
    // console.log("product item",product);
    const selectColor = (e)=>{
    //   console.log(e,e.target.style)
      setBorderColor(!borderColor);
    }
    return (
        <>
        <div className="product__item__list__container">

            {/* color section */}
            <div className="product__item__list">
               <p>Color</p> 
               <div>
                   {product?.color?.map((p,index)=>(
                    <Tooltip title={p} key={index}><span onClick={selectColor} style={{backgroundColor:p,borderColor:borderColor?"#2774F0":""}}></span ></Tooltip> 
                   ))}
                   </div>
            </div>

            {/* brand section */}
            <div className="product__item__list">
               <p>Brand</p> 
               <div>
               <p style={{fontWeight:600,color:"black",width:'65px',textAlign:"end"}}>{product?.brand}</p >
                </div>
            </div>

            {/* shipping section */}
            <div className="product__item__list">
               <p>Shipping</p> 
               <div>
              <p style={{fontWeight:600,color:"black",width:'65px'}}>{product?.shipping}</p >
                </div>
            </div>

            {/* qunatity section */}
            <div className="product__item__list">
               <p>Available</p> 
               <div>
              <p style={{fontWeight:600,color:"black",width:'65px'}}>{product?.quantity}</p >
                </div>
            </div>

            {/* sold section */}
            <div className="product__item__list">
               <p>Sold</p> 
               <div>
              <p style={{fontWeight:600,color:"black",width:'65px',textAlign:"end"}}>{product?.sold}</p >
                </div>
            </div>

        </div>
           {/* description in tabs */}
           <div className="tabs">
                <Tabs type="card">
                    <Tabs.TabPane tab="Description" key="1">
                        {product.description}
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Reviews" key="2">
                        {product.title}
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Rate Product" key="3">
                       <Rating id={id} token={user?.token} slug={slug}/>
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </>
    )
}

export default ProductItmList
