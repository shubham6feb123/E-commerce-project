const axios = require("axios");

exports.postRating = async (rating, productId, token) => {
  console.log("from ratinng function", rating, productId, token);
  return await axios.post(
    `${process.env.REACT_APP_API}/product/star/${productId}`,
    {
      star: rating,
    },
    {
      headers: {
        authtoken: token,
      },
    }
  );
};

exports.getRating  = async(productId,token)=>{
  return await axios.post(
    `${process.env.REACT_APP_API}/product/star/rated/${productId}`,
    {},
    {
      headers: {
        authtoken: token,
      },
    }
  )
}

exports.getAverageRating = async(slug)=>{
  return await axios.get(`${process.env.REACT_APP_API}/product/star/average/${slug}`)
}

