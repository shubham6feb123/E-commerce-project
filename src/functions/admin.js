const axios  = require("axios");

exports.getOrders = async(authtoken,email)=>{
return await axios.post(`${process.env.REACT_APP_API}/admin/orders`,{},
{
    headers:{
        email:email,
        authtoken:authtoken,
    }
})
}

exports.changeStatus = async(authtoken,email,orderId,orderStatus)=>{
    return await axios.put(`${process.env.REACT_APP_API}/admin/order-status`,{orderId,orderStatus},
    {
        headers:{
            email:email,
            authtoken:authtoken,
        }
    })
    }