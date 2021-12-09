const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/product");
const Coupon = require("../models/coupon");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    const { cartTotal, totalAfterDiscount } = await Cart.findOne({
      orderdBy: user._id,
    });

    console.log("CART TOTAL CHARGED", cartTotal,"TOTAL AFTER DISCOUNT",totalAfterDiscount);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAfterDiscount!==undefined?totalAfterDiscount*100:cartTotal*100,
      currency: "INR",
    });
    // console.log("payment intent", paymentIntent);
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log("error in payment", error);
  }
};
