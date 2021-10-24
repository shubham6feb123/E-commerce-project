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


function SingleProduct() {
  const { slug } = useParams();
  const [data, setData] = useState({});
  const [heartIcon, SetHeartIcon] = useState(true);
  const [clicked, SetClicked] = useState(false);
  const [products,setProducts] = useState([]);
  const [avgRateing,setAvgRating] = useState(null)
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
    // console.log("images--->",signleProduct.data);
  };

  const loadAverageRating = async(slug)=>{
   try {
    const averageRating = await getAverageRating(slug)
    setAvgRating({...averageRating.data})
    // console.log("average rating of this product is ",averageRating)
   } catch (error) {
    //  console.log("failed to get average rating",error)
   }
  }

  return (
    <>
      <div className="single__product__container">
        <div className="single__product__carousel__container">
          <SingleProductCarousel images={data.images} />
          <div className="button__group">
            <button className="cart">
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
          <Tag icon={<StarFilled />} color="#428E3C">{avgRateing?.avg}.0</Tag>
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
          <ProductItmList product={data} id={data._id} slug={slug}/>
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
