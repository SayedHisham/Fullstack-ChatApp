const User = require('./../models/user');
const bcrypt =require('bcryptjs');
const generatewebtoken = require ('./../util');


exports.signup = async (req,res) => {
    const { fullName,email,password } =req.body;
    console.log(req.body);
       
    try {
       if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
          }

       if (password.length < 6) 
        {res.status(400).json({status: 'password not long enough'})}
       
       const user = await User.findOne({email});

       if (user) return res.status(400).json({status: 'password not long enough'})

       const salt = await bcrypt.genSalt(10);
       const hashedpass = await bcrypt.hash(password,salt); 
       const newUser = await User({
        fullName,
         email,
        password:hashedpass,
       });
       if(newUser){

       generatewebtoken(newUser._id,res);
       console.log({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
       await newUser.save();
       res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
       
    } else {
        res.status(400).json({ message: "Invalid user data" });
    }
}
     catch (err) {
        console.log(err);
    }
};
exports.login = async (req,res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
    
        if (!user) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
    
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
    
        generatewebtoken(user._id, res);
    
        res.status(200).json({
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          profilePic: user.profilePic,
        });
      } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
      }
    };

exports.logout = (req,res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
      } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
      }
    };
    
exports.updateprofilepicture = async (req,res) => {
    try{
        const {profilePic} = req.body;
        const userID = req.user._id;
        if(!profilePic){
            return res.status(400).json({message:"pp is required"})
        }
        const uploadResponse = await cloudianry.uploader.upload({profilePic});
        const updateUser = await User.findByIdAndUpdate(userID,{profilePic:uploadResponse.secure_url},{new:true}); 
        res.status(200).json({message:"updatedprofile"});
    }
    catch(err){
        res.status(400).json({message:"err"}); 
    }
};

exports.checkAuth = (req,res) => {
    try {
        res.status(200).json(req.user);
      } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
      }
};
