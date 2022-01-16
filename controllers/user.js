const User = require("../models/user");
const Cart = require("../models/cart");
const Order = require("../models/orders");
const Product  = require("../models/product");
const nodemailer = require("nodemailer");

exports.saveDetails = async (req, res) => {
  try {
    const { mobileNumber, pincode, zip, name, address, state, city } =
      req.body.details;

    const userAddress = await User.findOneAndUpdate(
      { email: req.user.email },
      {
        details: {
          mobileNumber: Number.parseInt(mobileNumber),
          address,
          state,
          city,
          pincode: Number.parseInt(pincode),
          zip: Number.parseInt(zip),
        },
        name,
      }
    );

    //   console.log("userAddress",userAddress);
    res.json({ ok: true });
  } catch (e) {
    console.log("failed to save details", e);
  }
};

exports.createOrder = async (req, res) => {
  console.log("stripeResponse---->", req.body.stripeResponse);
  try {
    const {paymentIntent} = req.body.stripeResponse;
    const user = await User.findOne({ email: req.user.email }).exec();
    // console.log("user------------>", user);
    let { products } = await Cart.findOne({ orderdBy: user._id }).exec();
    // console.log("products------>", products);

    let newOrder = await new Order({
      products,
      paymentIntent,
      orderdBy: user._id,
    }).save();
    console.log("new order", newOrder);

    //decreament quantity and increament sold

    let bulkOption = [];

  products.map((p)=>{
   
    bulkOption.push({
      updateOne:{
        filter:{_id:p.product},
        update:{$inc:{quantity:-p.count,sold:+p.count}},
      }
    })

  })

  const updated = await Product.bulkWrite(bulkOption,{new:true})
  console.log("updated products sold and quantity",updated)

    res.json({ ok: true });
  } catch (error) {
    console.log("error in create order", error);
  }
};

exports.getAllOrders = async(req,res)=>{
try {
  let user = await User.findOne({email:req.user.email});
  const orders = await Order.find({orderdBy:user._id}).populate("products.product").populate("orderdBy").sort({createdAt:-1}).exec();
// console.log("orders------>",orders);
if(orders.length>0){
  res.json(orders);
}
else{
  throw "no orders";
}
} catch (error) {
  // console.log("error to get ordedrs",error)
  res.status(404).json({message:"order not found"})
}

}

exports.sendMail = async(req,res)=>{
  try {
    const {message,requestSubject,email} = req.body;
    console.log(req.body);
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MY_GMAIL, // generated ethereal user
      pass: process.env.MY_PASS, // generated ethereal password
    },
    });
    
    let mailOptions = {
      from: process.env.MY_GMAIL,
      to: process.env.MY_GMAIL2,
      subject: requestSubject,
      html:`<h2>FlipShop Support Page</h2><br/>
            <b>Request Subject:- ${requestSubject}</b><br/>
            <b>Sender:- ${email}</b><br/>
            <p>Message:- ${message}</p>`,
    };

    let emailsent = await transporter.sendMail(mailOptions);
    // console.log("email sent",emailsent);

    res.json({sent:true})
  } catch (error) {
    console.log("error from support",error)
    res.status(400).json({sent:false})
  }
}