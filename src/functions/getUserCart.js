import axios from "axios";

const getCart = async(email)=>{
    return await axios.get(`${process.env.REACT_APP_API}/user/cart/${email}`)
}

export default getCart;