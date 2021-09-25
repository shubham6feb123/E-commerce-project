const User = require("../models/user");
exports.createOrUpdateUser = async (req, res) => {
  try {
    const { email } = req.user;
    console.log("controllers", email);
    const name = email.split("@")[0];
    console.log("controllers name", name);

    const user = await User.findOneAndUpdate(
      { email: email },
      { name: name },
      { new: true }
    );

    if (user) {
      console.log("USER UPDATED", user);
      res.json(user);
    } else {
      const newUser = await new User({
        name: name,
        email: email,
      }).save();
      console.log("NEW USER CREATED", newUser);
      res.json(newUser);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.currentUser = async(req,res)=>{
try {
  const {email} = req.headers;
  const current  = await User.findOne({email:email});
  console.log('currentUser----->',current)
  res.status(200).json(current);
} catch (error) {
  console.log(error);
}
}
