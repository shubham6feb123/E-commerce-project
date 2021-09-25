const axios = require("axios");

//create category using this api request
exports.create = async (email,category)=>{

    return await axios.post(`${process.env.REACT_APP_API}/category`,{category:category},
    {
        headers:{
            email:email,
        }
    })
}

//get all the category list using this api request
exports.list = async ()=>{
    return await axios.get(`${process.env.REACT_APP_API}/categories`)
}

//read single category that u have made using slug using this api request
exports.read = async (slug,email)=>{
    return await axios.get(`${process.env.REACT_APP_API}/${slug}`,{},
    {
        headers:{
            email:email,
        }
    })
}

//update category using this api request
exports.update = async(slug,email,category)=>{
  
    // console.log("slug",slug,"email",email,"category",category)
return await axios.put(`${process.env.REACT_APP_API}/category/${slug}`,{category},
{
   headers:{
       email:email
   }
}
)

}

//delete category that u have made using this api request
exports.remove = async(slug,email)=>{
    console.log("slug",slug,"email",email)
    return await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`,{
        headers:{
            email:email
        }
    })
}

