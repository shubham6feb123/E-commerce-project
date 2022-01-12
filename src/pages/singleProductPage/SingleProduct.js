import { useLayoutEffect, useState } from "react";

//css
import "./singleProduct.css";

//components
import {Tag} from "antd";
import { GetProduct } from "../../functions/product";
import { useParams } from "react-router";
import {
  ThunderboltFilled,
  ShoppingFilled,
  HeartFilled,
  StarFilled
} from "@ant-design/icons";
import SingleProductCarousel from "../../components/carousel/singleProduct/SingleProduct";
import WishListAlert from "../../components/Alert/wishListAlert/WishListAlert";
import CurrencyFormat from "react-currency-format";
import ProductItmList from "../../components/ProductItemList/ProductItmList";
import ProductCard from "../../components/ProductCard/ProductCard";
import {GetProductsByCount} from "../../functions/product";
import { getAverageRating } from "../../functions/rating";
import lodash from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import Loading from "../../components/Loading/Loading";
import { addToWishList } from "../../functions/wishList";

const numArray = [1,2,3,4,5];
function SingleProduct() {
  const {user}  = useSelector((state)=>({...state}));
  const { slug } = useParams();
  const [data, setData] = useState({});
  const [heartIcon, SetHeartIcon] = useState(true);
  const [clicked, SetClicked] = useState(false);
  const [products,setProducts] = useState([]);
  const [avgRateing,setAvgRating] = useState(null)

  //redux
  const dispatch = useDispatch();

  // console.log("cart",cart)
  // console.log(slug);

  useLayoutEffect(() => {
    loadSingleProduct(slug);
    similarProduct();
    loadAverageRating(slug);
    // eslint-disable-next-line
  }, [slug]);

  const similarProduct = async()=>{
    const similarProduct  = await GetProductsByCount(10);
    setProducts([...similarProduct.data]);
  }
  const heartIconClicked = () => {
    alert();
    putToWishList();
    SetHeartIcon(!heartIcon);
    SetClicked(true);
    setTimeout(() => {
      SetClicked(false);
      // console.log("single Product page se ---------->")
    }, 5000);
  };

  const anim = () => {
    return <HeartFilled style={{ color: "#F35355", fontSize: "16px" }} />;
  };

  const alert = () => {
    if (!heartIcon) {
      return (
        <WishListAlert heading="Added to your WishList" clicked={clicked} />
      );
    }
    //  else{
    //    return  <WishListAlert heading="Removed from your WishList"/>
    //  }
  };

  const loadSingleProduct = async (slug) => {
    const signleProduct = await GetProduct(slug);
    setData({ ...signleProduct.data });
    // console.log("singleProduct--->",signleProduct.data);
  };

  const loadAverageRating = async(slug)=>{
   try {
    const averageRating = await getAverageRating(slug);
    // console.log("avg rating",averageRating.data.avg)
    setAvgRating({...averageRating.data})
    // console.log("average rating of this product is ",averageRating)
   } catch (error) {
    //  console.log("failed to get average rating",error)
   }
  }


  //adding item to cart
  const addToCartHandle = (e)=>{
//create cart array
let cart = [];
    if(typeof window !==undefined){
      message.success({content: "Item added to your cart",
      style: { position: "fixed", bottom: "10px", left: "25px",right:"20px" },})

      if(window.localStorage.getItem("cart")){
         cart = JSON.parse(window.localStorage.getItem("cart"))
         window.localStorage.removeItem("cart");
      }

     

     cart.push({...data,count:1});

     let unique = lodash.uniqWith(cart,lodash.isEqual)
    //  console.log("unique--->",unique)

     window.localStorage.setItem("cart",JSON.stringify(unique))


     //add to redux state
     dispatch({
       type:"ADD_TO_CART",
       payload: unique,
     })

    }

  }
  const putToWishList = async () => {
    try {
      const added = await addToWishList(data?._id,user?.token);
      // console.log("added to wishlist", added);
    } catch (error) {
      // console.log("error wishlist", error);
    }
  };

  return !data?(<Loading/>):(
    <>
      <div className="single__product__container">
        <div className="single__product__carousel__container">
          <SingleProductCarousel images={data?.images} />
          <div className="button__group">
            <button className="cart" onClick={addToCartHandle}>
              <ShoppingFilled /> ADD TO CART
            </button>
            <button className="bolt">
              <ThunderboltFilled /> BUY NOW
            </button>
          </div>
          <div
            className="single__product__wishlist__button"
            onClick={heartIconClicked}
          >
            {heartIcon ? (
              <HeartFilled style={{ color: "#c2c2c2", fontSize: "16px" }} />
            ) : (
              anim()
            )}
          </div>
        </div>
        <div className="single__product__description__container">
          {/* heading section */}
          <div className="single__product__heading">
            <span>{data?.title}</span>
          </div>

          {/* rating section */}
          <div className="single__product__rating">
          <Tag color="#428E3C">{avgRateing?.avg!=null?numArray.includes(avgRateing?.avg)?Number(avgRateing?.avg).toPrecision(2):avgRateing?.avg :"0.0"} {<StarFilled />}</Tag>
          <span className="rating__text">{avgRateing?.allUsers} Ratings</span>
          </div>

          {/* price section */}
          <div className="single__product__price">
            <CurrencyFormat
              value={data?.price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₹"}
            />
          </div>

          {/* details section */}
          <ProductItmList product={data} id={data._id} slug={slug} review={data.review}/>
        </div>

      </div> 
                   
      <div className="similar__products">
        <ProductCard products={products} heading={"Similar Products"}/>
      </div>
      {alert()}
    </>
  );
}

export default SingleProduct;
