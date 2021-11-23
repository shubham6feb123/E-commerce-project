import axios from "axios";
const deliveryDetails = async(details,authtoken)=>{
return await axios.post(`${process.env.REACT_APP_API}/user/delivery/details`,{details:details},{
    headers:{
        authtoken:authtoken
    }
})
}

export default deliveryDetails;