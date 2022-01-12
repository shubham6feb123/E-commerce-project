const User = require("../models/user");

const addToWishList = async (req, res) => {
  try {
    const { ProductId } = req.body;
    // console.log("added to wishlist", req.body);
    const added = await User.findOneAndUpdate(
      { email: req.user.email },
      { $addToSet: { wishlist: ProductId } },
      { new: true }
    ).exec();
    // console.log("added to wishlist", added);
    res.status(200).json({ ok: true });
  } catch (error) {
    console.log("error from add to wishlist", error);
  }
};

const getWishList = async (req, res) => {
  try {
    const list = await User.findOne({ email: req.user.email })
      .select("wishlist")
      .populate("wishlist").exec();
    // console.log("wishlist ", list);

  if(list.wishlist.length>0){
    res.status(200).json(list);
  }else{
    throw new Error("wishlist empty")
  }
  } catch (error) {
    console.log("error from get wishlist", error);
    res.status(403).json(error)
  }
};

const deleteWishList = async (req, res) => {
  try {
   const {productId} = req.params;
   const user = await User.findOneAndUpdate({email:req.user.email},{$pull:{wishlist:productId}}).exec();
  //  console.log("user",user)
   res.json({ok:true});
  } catch (error) {
    console.log("error from delete",error)
  }
};

module.exports = { addToWishList, getWishList, deleteWishList };
