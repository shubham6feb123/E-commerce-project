import axios from "axios";

export const sendMail = async(authtoken,supportDetails)=>{
    console.log("support se",supportDetails)
    return await axios.post(`${process.env.REACT_APP_API}/user/support/mail`,supportDetails,{
        headers:{
            authtoken:authtoken
        }
    })
}