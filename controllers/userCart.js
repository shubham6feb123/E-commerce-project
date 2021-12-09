const Cart = require("../models/cart");
const User = require("../models/user");
const product = require("../models/product");

exports.userCart = async (req, res) => {
  try {
    // console.log(req.body);
    let products = [];
    const { cart } = req.body;
    const user = await User.findOne({ email: req.user.email }).exec();

    // console.log("user from fb",user)

    //check that cart with logged in user already exists
    let cartExistByThisUser = await Cart.findOne({ orderdBy: user._id });

    if (cartExistByThisUser) {
      // console.log("cartExistByThisUser",cartExistByThisUser);
      cartExistByThisUser.remove();
      // console.log("removed old cart");
    }

    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.color = cart[i].color[0];
      let { price } = await product.findById(cart[i]._id);
      object.price = price;
      products.push(object);
    }

    //   console.log("products array ",products)

    let cartTotal = products.reduce(
      (prev, curr) => prev + curr.price * curr.count,
      0
    );

    //   console.log("cart Total",cartTotal);

    await new Cart({
      products,
      cartTotal,
      orderdBy: user._id,
    }).save();

    //   console.log("new cart",newCart)
    res.json({ ok: true });
  } catch (e) {
    console.log("err in cart controller", e);
  }
};

exports.getUserCart = async (req, res) => {
  try {
    console.log("get cart se h ", req.params.email);
    const user = await User.findOne({ email: req.params.email });
    console.log("get cart se user", user);
    let cart = await Cart.findOne({ orderdBy: user._id })
      .populate("products.product")
      .populate("orderdBy")
      .exec();
    // console.log("cart get -------->",cart)
    if (!cart) {
      throw "Your cart is empty";
    }
    res.json(cart);
  } catch (error) {
    console.log("error in getting cart", error);
    res.json(error);
  }
};

exports.deleteUserCart = async (req, res) => {
  try {
    console.log("id--------->",req.params.Id)
    const cartDeleted = await Cart.findByIdAndDelete({_id:req.params.Id});
    console.log("deleted cart---->", cartDeleted);
    if(cartDeleted){
      res.json({ message: "Cart Deleted", status: 200 });
    }else{
      throw "failed to delete cart"
    }
  } catch (error) {
    console.log("failed to delete cart ");
    res.json(error);
  }
};
