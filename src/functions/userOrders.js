const axios = require("axios");

exports.getUserOrders = async(authtoken)=>{
    return await axios.post(`${process.env.REACT_APP_API}/user/orders`,{},{
        headers:{
            authtoken:authtoken
        }
    })
}