import { useEffect, useState } from "react";

//css
import "./rating.css";

//components
import {postRating,getRating} from "../../functions/rating";
import { useHistory } from "react-router";
import { Rate,message,Space } from "antd";

const desc = ["Very Bad", "Bad", "Good", "Very Good", "Excellent"];
function Rating({id,token,slug}) {
  const [rateValue, setRateValue] = useState(null);
  const[saveRating,setSaveRating] = useState(false);
  const history =  useHistory();
  useEffect(()=>{
   if(!token){
     history.push("/login")
   }
  //  console.log("id changed",id)
   alreadyRated(id,token);
   // eslint-disable-next-line
  },[id])
  

  const value = (value) => {
    console.log("value", value);
    // console.log("product id", id);
    setRateValue(value);
    Rating(value,id,token);
  };

  const Rating = async(rating,productId,token)=>{
  try {
    message.success({content:"Thanks for rate the product",style:{position:"fixed",bottom:"10px",left:"33vw"}});
    await postRating(rating,productId,token);
    setSaveRating(true);
    // console.log("product rated",rated);
  } catch (error) {
    // console.log("error from rating fun",error)
    setSaveRating(false);
  }

  }
  const alreadyRated = async(productId,token)=>{
   try{ 
     const rated = await getRating(productId,token);
    //  console.log("already rated",rated)   
    if(rated?.data!==''){
    setRateValue(rated.data.star)
    setSaveRating(true);
  }else{
    setSaveRating(false);
  }
  }catch(error){
    setRateValue(null)
    setSaveRating(false)
    // console.log("failed to get rating",error)
  }
  }
  return (
    <>
      <span>
       <Space size="large">
        <Rate
        className="rate"
          tooltips={desc}
          defaultValue={saveRating?rateValue: 5}
          disabled={saveRating?true:false}
          allowClear={false}
          onChange={value}
          value={rateValue!==null?rateValue:5}
        />
        {/* {storeRating?.star} */}
       { rateValue!=null?(<span>{desc[rateValue - 1]}</span>):(<span>{desc[4]}</span>)}
       </Space>
      </span>
    </>
  );
}

export default Rating;
