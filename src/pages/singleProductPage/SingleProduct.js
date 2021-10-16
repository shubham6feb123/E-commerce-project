import { useLayoutEffect, useState } from "react";

//css
import "./singleProduct.css";

//components
import { GetProduct } from "../../functions/product";
import { useParams } from "react-router";
import {
  ThunderboltFilled,
  ShoppingFilled,
  HeartFilled,
} from "@ant-design/icons";
import SingleProductCarousel from "../../components/carousel/singleProduct/SingleProduct";
import WishListAlert from "../../components/Alert/wishListAlert/WishListAlert";
import CurrencyFormat from "react-currency-format";
import ProductItmList from "../../components/ProductItemList/ProductItmList";
import ProductCard from "../../components/ProductCard/ProductCard";
import {GetProductsByCount} from "../../functions/product";

function SingleProduct() {
  const { slug } = useParams();
  const [data, setData] = useState({});
  const [heartIcon, SetHeartIcon] = useState(true);
  const [clicked, SetClicked] = useState(false);
  const [products,setProducts] = useState([]);
  // console.log(slug);

  useLayoutEffect(() => {
    loadSingleProduct(slug);
    similarProduct();
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
          <div className="single__product__rating"></div>

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
          <ProductItmList product={data} />
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
