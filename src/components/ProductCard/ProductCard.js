import React from "react";

//css
import "./productCard.css";

//components
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card1 from "../Card/Card1";

function ProductCard({ products,heading }) {

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 4
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 400 },
          items: 1
        },
        // mobile: {
        //   breakpoint: { max: 400, min: 0 },
        //   items: 1
        // }
      };


  return (
    <>
      <div className="product__card__container">
        <div className="product__card__label">
          <h2>{heading}</h2>
        </div>
        <Carousel responsive={responsive}>
        {products?.map((product)=>(
          <Card1 key={product._id} product={product}/>
        ))}
        </Carousel>
      </div>
    </>
  );
}

export default ProductCard;
