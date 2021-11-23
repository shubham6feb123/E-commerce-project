import React from 'react'
import "./singleProduct.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
//components
import {Carousel} from "react-responsive-carousel";

function SingleProductCarousel({images}) {
    const imgClicked = (e)=>{
       window.open(e.target.firstElementChild.currentSrc, '_blank');
    }


    return (
        <Carousel autoPlay={false} infiniteLoop={true} axis="horizontal" swipeable={true} showIndicators={false} showArrows={false} showStatus={false} showThumbs={true}>
         {
            images?.map(image=>(
                <div key={image.public_id} onClick={imgClicked} name={image.secure_url}>
                <img src={image.secure_url} alt={image.public_id} />
               </div>
             ))
         }
        </Carousel>
    )
}

export default SingleProductCarousel
