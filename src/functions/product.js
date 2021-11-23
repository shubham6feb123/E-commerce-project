const axios  = require("axios")

exports.Create = async(values,email)=>{
    // console.log("function product",values)
  return await axios.post(`${process.env.REACT_APP_API}/product`,values,{
      headers:{
          email:email
      }
  })
}

exports.GetProductsByCount = async(count)=>{
  return await axios.get(`${process.env.REACT_APP_API}/products/${count}`)
}

exports.DeleteProduct = async(slug)=>{
  return await axios.delete(`${process.env.REACT_APP_API}/products/${slug}`)
}

exports.GetProduct = async(slug)=>{
  return await axios.get(`${process.env.REACT_APP_API}/product/${slug}`)
}

//get products by search text
exports.GetBySearchText = async(text)=>{
  return await axios.post(`${process.env.REACT_APP_API}/search/filters`,text)
}

// module.exports = Create;
