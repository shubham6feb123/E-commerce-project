const cloudinary = require("cloudinary").v2;

//config
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
});


exports.upload = async (req,res)=>{
    
       try{  
            
            //  res.json({message:'working fine'})
            // console.log('uploaded images------->',req.body.image)
          const result = await cloudinary.uploader.upload(req.body.image,{
            public_id:`${Date.now()}`,
            resource_type:'auto' //jpeg,jpg
        });
        console.log("uploaded images",result);
        res.json({public_id:result.public_id,secure_url:result.secure_url});
      }
     catch (error) {
        res.status(403).json('error in uploading',error);
    }
};

exports.remove = async (req,res)=>{
try {
    let image_id = req.body.public_id;
  const deletedImg = await cloudinary.uploader.destroy(image_id);
  console.log("image deleted",deletedImg);
  res.status(200).json(deletedImg);
} catch (error) {
    console.log(error);
    res.status(400).send("Failed to Delete");
}
};

// module.exports = {upload,remove};