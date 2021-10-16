import React, { useLayoutEffect, useState, } from "react";

//css
import "./home.css"

//components
import Carosel from "../components/carousel/Carousel"
import Category from "../components/ProductCategory/Category";
import ProductCard from "../components/ProductCard/ProductCard";

//api
import {GetProductsByCount} from "../functions/product";

function Home() {
  const [products,setProducts] = useState([]);

  useLayoutEffect(()=>{
    loadProduct();
  // eslint-disable-next-line
  },[])

  const loadProduct = async()=>{
   const allProduct  = await GetProductsByCount(10);
    setProducts([...products,...allProduct.data]);
  }
  return (
    <>
      <div className="home">
        <Category/>
        <div className="home__wrapper">
        <Carosel/>
        <ProductCard products={products} heading={"All Products"}/>
        </div>
      </div>
    </>
  );
}

export default Home;
