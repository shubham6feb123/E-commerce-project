import axios from "axios";

export const addToWishList = async(ProductId,authtoken)=>{
    // console.log(ProductId)
  return await axios.post(`${process.env.REACT_APP_API}/user/wishlist`,{ProductId:ProductId},{
      headers:{
          authtoken:authtoken,
      }
  })

}

export const getWishList = async(authtoken)=>{
    return await axios.post(`${process.env.REACT_APP_API}/user/get-wishlist`,{},{
        headers:{
            authtoken:authtoken,
        }
    })
  
  }

  export const removeFromWishList = async(productId,authtoken)=>{
    //   console.log("productId",productId)
    return await axios.put(`${process.env.REACT_APP_API}/user/wishlist/${productId}`,{},{
        headers:{
            authtoken:authtoken
        }
    })
  
  }  