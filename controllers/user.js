const User = require("../models/user");

exports.saveDetails = async (req, res) => {
  try{const { mobileNumber, pincode, zip, name, address, state, city } =
    req.body.details;

  const userAddress = await User.findOneAndUpdate(
    { email: req.user.email },
    { details: {
        mobileNumber:Number.parseInt(mobileNumber),
        address,
        state,
        city,
        pincode:Number.parseInt(pincode),
        zip:Number.parseInt(zip)
    },name }
  );

//   console.log("userAddress",userAddress);
  res.json({ok:true})
  }catch(e){
   console.log("failed to save details",e)
  }
};
