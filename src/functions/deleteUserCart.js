import axios from "axios";

const deleteUserCart = async(Id)=>{
return await axios.delete(`${process.env.REACT_APP_API}/user/cart/delete/${Id}`);
}

export default deleteUserCart;