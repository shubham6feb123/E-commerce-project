import React, { useLayoutEffect, useState } from "react";

//css
import "./home.css";

//components
import Carosel from "../components/carousel/Carousel";
import Category from "../components/ProductCategory/Category";
import ProductCard from "../components/ProductCard/ProductCard";

//api
import { GetProductsByCount } from "../functions/product";
import Loading from "../components/Loading/Loading";

function Home() {
  const [products, setProducts] = useState([]);
  const [laptops,setLaptops] = useState([]);
  const [tablets,setTablets] = useState([]);
  const [appliances,setAppliances] = useState([]);
  const [electronics,setElectronics] = useState([]);
  const [mobiles,setMobiles] = useState([]);
  const [desktops,setDesktops] = useState([]);
  const [groceries,setGroceries] = useState([])
  const [clothes,setClothes] = useState([]);
  const [footWear,setFootWear] = useState([])
  const [books,setBooks] = useState([]);
  const [instruments,setInstruments] = useState([]);
  const [toys,setToys] = useState([]);
  const [stationary,setStationary] = useState([]);
  const [sports,setSports] = useState([]);
  const [fitness,setFitness] = useState([]);
  useLayoutEffect(() => {
    loadProduct();
    // eslint-disable-next-line
  }, []);

  const loadProduct = async () => {
    const allProduct = await GetProductsByCount(10);
    setProducts([...products, ...allProduct.data]);
    // console.log("all products",allProduct)
      setLaptops(allProduct.data.filter(val=>(val.category.name==="Laptop")))
      setTablets(allProduct.data.filter(val=>(val.category.name==="Tablet")))
      setAppliances(allProduct.data.filter(val=>(val.category.name==="Appliances")))
      setElectronics(allProduct.data.filter(val=>(val.category.name==="Electronics")))
      setMobiles(allProduct.data.filter(val=>(val.category.name==="Mobiles")))
      setDesktops(allProduct.data.filter(val=>(val.category.name==="Desktop")))
      setGroceries(allProduct.data.filter(val=>(val.category.name==="Groceries")))
      setClothes(allProduct.data.filter(val=>(val.category.name==="Clothes")))
      setFootWear(allProduct.data.filter(val=>(val.category.name==="FootWear")))
      setBooks(allProduct.data.filter(val=>(val.category.name==="Books")))
      setInstruments(allProduct.data.filter(val=>(val.category.name==="Instruments")))
      setToys(allProduct.data.filter(val=>(val.category.name==="Toys")))
      setStationary(allProduct.data.filter(val=>(val.category.name==="Stationary")))
      setSports(allProduct.data.filter(val=>(val.category.name==="Sports")))
      setFitness(allProduct.data.filter(val=>(val.category.name==="Fitness")))
  };

  return (
    <>
      <div className="home">
        <Category />
        <div className="home__wrapper">
          <Carosel />
          {products.length > 0 ? (
            <>
            <ProductCard products={products} heading={"All Products"} />
            <ProductCard products={laptops} heading={"Laptops"} />
            {desktops.length>0?<ProductCard products={desktops} heading={"Desktops"} />:""}
           {tablets.length>0?<ProductCard products={tablets} heading={"Tablet"} />:""}
           {appliances.length>0?<ProductCard products={appliances} heading={"Appliances"} />:""}
           {electronics.length>0?<ProductCard products={electronics} heading={"Electronics"} />:""}
           {mobiles.length>0?<ProductCard products={mobiles} heading={"Mobiles"} />:""}
           {books.length>0?<ProductCard products={books} heading={"Books"} />:""}
           {instruments.length>0?<ProductCard products={instruments} heading={"Instruments"} />:""}
           {sports.length>0?<ProductCard products={sports} heading={"Sports"} />:""}
           {toys.length>0?<ProductCard products={toys} heading={"Toys"} />:""}
           {fitness.length>0?<ProductCard products={fitness} heading={"Exercise Fitness"} />:""}
           {stationary.length>0?<ProductCard products={stationary} heading={"Stationary"} />:""}
           {groceries.length>0?<ProductCard products={groceries} heading={"Grocery"} />:""}
           {clothes.length>0?<ProductCard products={clothes} heading={"Clothes"} />:""}
           {footWear.length>0?<ProductCard products={footWear} heading={"Footwear"} />:""}
            </>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
