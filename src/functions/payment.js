const axios = require("axios");
exports.verifyUser = async(id)=>{
return await axios.post(`${process.env.REACT_APP_API}/payment/user/verify`,{
    user:id,
})
}