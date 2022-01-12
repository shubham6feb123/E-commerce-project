import React,{ useEffect,useState } from "react";
//css
import "./wishlist.css";

import {getWishList} from "../../functions/wishList";
import { useSelector } from "react-redux";
import WishListCard from "../../components/WishListCard/WishListCard";
import CartEmpty from "../../components/Cart/CartEmpty";


function WishList() {
    const {user}  = useSelector((state)=>({...state}));
    const [wishList,setWishList] = useState(null);
    const [rerender,setRerender] = useState(true);
    useEffect(()=>{
        if(user)
        loadWishlist();
    },[user,rerender])

    const loadWishlist = async()=>{
       try {
           const list = await getWishList(user?.token);
           setWishList(list.data.wishlist)
           console.log("load wishlist",list); 
       } catch (error) {
          setWishList("empty")
           console.log("error to get wishlist",error)
       }
    }
 if(wishList==="empty"){ return <CartEmpty heading={"My WishList"} text1={"Your WishList is empty!"} text2={"Add items to it now."} button={"Shop now"}/>}
  return (
    <div className="wishlist">
      <div className="wishlist__container">
        <div className="wishlist__heading">
         {wishList?<span>My WishList ({wishList?.length})</span>:""}
        </div>
        {/* wishlist card */}
          {
            wishList?.map((i,index)=>(
              <WishListCard key={index+1} title={i.title} slug={i.slug} price={i.price} url={i.images[0].secure_url} id={i._id} setRerender={setRerender} token={user?.token}/>
            ))
          }
      </div>
    </div>
  );
}

export default WishList