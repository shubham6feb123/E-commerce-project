import axios from "axios";

export const getUserNameReview = async(userId)=>{
    return await axios.get(`${process.env.REACT_APP_API}/product/get-review/${userId}`)
}

export const postReview = async(authtoken,review,productId)=>{
    return await axios.post(`${process.env.REACT_APP_API}/product/review/${productId}`,{
        review:review,
    },
    {
        headers:{
            authtoken:authtoken
        }
    })
}
