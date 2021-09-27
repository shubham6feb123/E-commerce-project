import React from "react";

//css
import "./home.css"

//components
import Carosel from "../components/carousel/Carousel"
import Category from "../components/ProductCategory/Category";
import ProductCard from "../components/ProductCard/ProductCard";

function Home() {
  return (
    <>
      <div className="home">
        <Category/>
        <div className="home__wrapper">
        <Carosel/>
        <ProductCard/>
        </div>
      </div>
    </>
  );
}

export default Home;
