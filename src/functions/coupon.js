const axios  = require("axios")

exports.Create = async(coupon,email)=>{
    // console.log("coupon",coupon)
return await axios.post(`${process.env.REACT_APP_API}/coupon/create`,coupon,{
    headers:{
        email:email
    }
})
}

exports.Remove = async(couponId,email)=>{
    return await axios.delete(`${process.env.REACT_APP_API}/coupon/remove/${couponId}`,{
        headers:{
            email:email
        }
    })
    }

 exports.List = async()=>{
        return await axios.get(`${process.env.REACT_APP_API}/coupon/list`);
        }

exports.verifyCoupon = async(code,authtoken)=>{
    return await axios.post(`${process.env.REACT_APP_API}/coupon/verify`,{verify:code},{
        headers:{
            authtoken:authtoken
        }
    })
}        