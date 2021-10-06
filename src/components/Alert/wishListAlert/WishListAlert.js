import React,{useEffect, useRef} from 'react'

//css
import "./wishListAlert.css"

//components
import {CheckCircleFilled } from "@ant-design/icons";

function WishListAlert({heading,clicked}) {
    const alertRef = useRef(null);

  useEffect(()=>{
    console.log("clicked--->",alertRef.current.attributes[0])
      setTimeout(()=>{
        // alertRef.current.classList[1] = "remove"
        console.log(alertRef.current.attributes[0])
        alertRef.current.attributes[0].value = "alert__container";
      },5000)
  },[clicked])




    return (
        <div className={`alert__container ${clicked?"clicked":""}`} ref={alertRef}>
            <CheckCircleFilled style={{color:"#428E3C",fontSize:"22px"}} /> <p style={{marginBottom:"0px",marginLeft:"10px",color:"#fff"}}>{heading}</p>
        </div>
    )
}

export default WishListAlert
