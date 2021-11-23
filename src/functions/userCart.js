import axios from "axios";

const userCart = async(cart,authtoken)=>{
  return await axios.post(`${process.env.REACT_APP_API}/user/cart`,{cart},{
      headers:{
          authtoken:authtoken,
      }
  })

}

export default userCart;