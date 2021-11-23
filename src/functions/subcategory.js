const axios = require("axios");

//create category using this api request
exports.subcreate = async (email,subcategory,parentId)=>{
    // console.log("email subcreate func",email,"subcategory",subcategory,"parent",parentId)
    return await axios.post(`${process.env.REACT_APP_API}/subcategory`,{name:subcategory,parent:parentId},
    {
        headers:{
            email:email,
        }
    })
}

//get all the category list using this api request
exports.sublist = async ()=>{
    return await axios.get(`${process.env.REACT_APP_API}/subcategories`)
}

//read single category that u have made using slug using this api request
exports.subread = async (slug,email)=>{
    return await axios.get(`${process.env.REACT_APP_API}/${slug}`,{},
    {
        headers:{
            email:email,
        }
    })
}

//update category using this api request
exports.subupdate = async(slug,email,category)=>{

return await axios.put(`${process.env.REACT_APP_API}/subcategory/${slug}`,{category},
{
   headers:{
       email:email
   }
}
)
}

//delete category that u have made using this api request
exports.subremove = async(slug,email)=>{
    console.log("slug",slug,"email",email)
    return await axios.delete(`${process.env.REACT_APP_API}/subcategory/${slug}`,{
        headers:{
            email:email
        }
    })
}


//getting all the subCategories with their parent id
exports.subCategories = async(_id)=>{
 return await axios.get(`${process.env.REACT_APP_API}/subcategories/${_id}`)
}
