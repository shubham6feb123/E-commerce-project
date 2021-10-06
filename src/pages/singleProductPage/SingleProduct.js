import { useLayoutEffect,useState } from "react";

//css
import "./singleProduct.css";

//components
import { GetProduct } from "../../functions/product";
import { useParams } from "react-router";
import {ThunderboltFilled,ShoppingFilled,HeartFilled} from "@ant-design/icons"
import SingleProductCarousel from "../../components/carousel/singleProduct/SingleProduct";
import WishListAlert from "../../components/Alert/wishListAlert/WishListAlert";

function SingleProduct() {
  const { slug } = useParams();
  const [data,setData]  = useState({});
  const [heartIcon,SetHeartIcon] = useState(true);
  const [clicked,SetClicked] = useState(false);
  console.log(slug);

  useLayoutEffect(() => {
    loadSingleProduct(slug);
  }, [slug]);

  const heartIconClicked = ()=>{
    alert();
    SetHeartIcon(!heartIcon);
    SetClicked(true);
    setTimeout(()=>{
      SetClicked(false);
      console.log("single Product page se ---------->")
    },10000)
  }

  const anim = ()=>{
    return <HeartFilled style={{color:"#F35355",fontSize:"16px"}}/>
 };

 const alert = ()=>{
   if(!heartIcon){
     return  <WishListAlert heading="Added to your WishList" clicked={clicked}/>
   }
   else{
     return  <WishListAlert heading="Removed from your WishList"/>
   }
 }

  const loadSingleProduct = async (slug) => {
    const signleProduct = await GetProduct(slug);
    setData({...signleProduct.data})
    console.log("images--->",signleProduct.data);
  };

  return (
    <>
    <div className="single__product__container">
      <div className="single__product__carousel__container">
          <SingleProductCarousel images={data.images}/>
          <div className="button__group">
           <button className="cart"><ShoppingFilled /> ADD TO CART</button>
           <button className="bolt"><ThunderboltFilled /> BUY NOW</button>
          </div>
          <div className="single__product__wishlist__button" onClick={heartIconClicked}>
               {heartIcon?(<HeartFilled style={{color:"#c2c2c2",fontSize:"16px"}} />):anim()}
           </div>
      </div>
      <div className="single__product__description__container">
      Single Product Page....
      Single Product Page....
      Single Product Page....
      Single Product Page....
      Single Product Page....
      Single Product Page....
      Single Product Page....
      Single Product Page....
      </div>
    </div>
    {alert()}
    </>
  );
}

export default SingleProduct;
