import React, { useState } from 'react';
import "./productItmList.css";

//components
import {Tabs, Tooltip,message } from 'antd';
import Rating from '../StarRating/Rating';
import { useSelector } from 'react-redux';
import ProductReview from '../productReview/ProductReview';
import { postReview } from "../../functions/review";

function ProductItmList({product,id,slug,review}) {
    const [borderColor,setBorderColor] = useState(false);
    const {user} = useSelector((state)=>({...state}));
    const [reviewMessage,setReviewMessage] = useState("")
    // console.log("product item",product);
    const selectColor = (e)=>{
    //   console.log(e,e.target.style)
      setBorderColor(!borderColor);
    }
    const submitReview = async()=>{
    try{  
    if(reviewMessage.length>100){
         message.warning({content:"Character limit 100 exceed",style:{position:"fixed",bottom:"0px",right:"35%"}})
      }else if(reviewMessage===""){
        message.warning({content:"Review field cant not be empty!",style:{position:"fixed",bottom:"0px",right:"35%"}})
      }
      else{
          const review = await postReview(user?.token,reviewMessage,id);
          console.log("review submit",review);
          message.success({content:"Review submitted!",style:{position:"fixed",bottom:"0px",right:"35%"}})
      }
    }catch(error){
        console.log("error from review",error,error.message)
        message.error({content:"Review already submitted!",style:{position:"fixed",bottom:"0px",right:"35%"}})
    }
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
              <p style={product?.quantity===0?{fontWeight:600,color:"black",width:"107px"}:{fontWeight:600,color:"black",width:"65px"}}>{product?.quantity<=0?"Out of Stock":product?.quantity}</p >
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
           {/* description review rating in tabs */}
           <div className="tabs">
                <Tabs type="card">
                    <Tabs.TabPane tab="Description" key="1">
                        {product.description}
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Reviews" key="2">
                       {
                           
                          review?.map((rev,index)=>(
                             <ProductReview key={index} message={rev?.message} postedBy={rev?.postedBy} user={user}/>
                           ))
    
                       }
                       <div className="review__input">
                       <input className="form-control" type="text" value={reviewMessage} placeholder='Submit Review....' onChange={(e)=>{setReviewMessage(e.target.value)}}/>
                       <button type="button" onClick={submitReview} >Submit</button>
                       </div>
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
