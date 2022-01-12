import {useState} from "react"
//components
import { DeleteFilled,StarFilled } from "@ant-design/icons";
import { Tag } from "antd";
import CurrencyFormatter from "react-currency-format";
import {getAverageRating} from "../../functions/rating";
import { useEffect } from "react";
import CurrencyFormat from "react-currency-format";
import {removeFromWishList} from "../../functions/wishList";
import {useHistory} from "react-router-dom"


function WishListCard({title,slug,price,url,id,setRerender,token}) {
    const [avgs,setAvg] = useState(null);
    const history = useHistory();
    useEffect(()=>{
        if(slug)
        avgRate(slug);
    },[slug])

    const avgRate = async(slug)=>{
      const rate = await getAverageRating(slug);
    //   console.log("avg rate of product",rate.data);
      // setRate(rate.data);
      rate.data.avg!=null?setAvg(rate.data):setAvg(null);
  } 

 const deleteFromWishlist = async()=>{
    try{ 
    const done = await removeFromWishList(id,token);
    //  console.log("done--->")
     setRerender((prev)=>!prev);
    }catch(error){
         console.log("error from delete wishlist",error)
    }
 } 
  
 const remove = ()=>{
    deleteFromWishlist();
 } 
    return (
      <>
        <div className="wishlist__card__container" onClick={()=>{history.push(`/product/${slug}`)}}>
          <div className="image__container">
            <img
              src={`${url}`}
              alt="images"
            />
          </div>
          <div className="card__content">
            <div className="title">{title.substring(0,38)}...</div>
            <div className="rating">
            <Tag color="#428E3C">{avgs?Number(avgs?.avg).toPrecision(2):"0.0"} {<StarFilled/>}</Tag>
            <span className="rating__text">
            (
            {avgs ? (
              <CurrencyFormat
                value={avgs.allUsers}
                displayType={"text"}
                thousandSeparator={true}
              />
            ) : (
              0
            )}
            )
          </span>
            </div>
            <div className="card__price">
              <CurrencyFormatter
                value={price}
                displayType={"text"}
                thousandSeparator={true}
                prefix="₹"
              />
            </div>
          </div>
          <div className="delete" onClick={()=>{remove()}}>
            <DeleteFilled />
          </div>
        </div>
      </>
    );
  }
  
  export default WishListCard;
