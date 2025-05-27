import { User } from "../models/models.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const hashPassword=async(plainPassword)=>{
    const hash = await bcrypt.hash(plainPassword, 10);
    return hash;
}


// Example function called after user credentials are verified:
const generateToken=(user)=> {
    const secretKey = process.env.SECRET_KEY;
  // user is an object, e.g. { id: user._id, username: user.username }
  const payload = {
    id: user._id,
    username: user.username,
  };

  // Sign the token, usually set an expiry (e.g., 1 hour)
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

  return token;
}

const createUser = async (req, res) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ success: false, msg: "Please fill all fields" });
    }
    const hashedPassword=await hashPassword(req.body.password);
    const userData={
        name:req.body.name,
        email:req.body.email,
        passwordHash: hashedPassword
    }
    const newUser = await User.create(userData);
    const returnData={
        token:generateToken(newUser),
        user:{
          _id:newUser._id,
          name:newUser.name,
          email:newUser.email,
        }
    }
    return res.status(200).json({success:true, data:returnData});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Server Error While Registering User" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length == 0) {
      return res.status(400).json({
        success: false,
        msg: "Users will be visible once it's created",
      });
    }
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Server Error" });
  }
};

const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany({});
    return res
      .status(200)
      .json({ success: true, msg: "Collection Cleared Succesfully" });
  } catch {
    return res
      .status(500)
      .json({ success: false, msg: "Some Error occured from server side" });
  }
};

const loginUser=async(req, res)=>{
  try {
    if (!(req.body.email && req.body.password)) {
      return res
        .status(200)
        .json({ success: false, code:0, msg: "Please fill all fields" });
    }
    const {email, password}=req.body;
    const hashedPassword=await hashPassword(password);
    const user=await User.findOne({email:email});
    if(user){
      const isMatch = await bcrypt.compare(password, user.passwordHash);

      if (isMatch) {
        const returnData = {
          token: generateToken(user), // you had newUser here; should be user
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
          }
        };
        return res.status(200).json({ success: true, data: returnData });
      } else {
        return res.status(200).json({ success: false, code: 1, msg: "Incorrect Password" });
      }
    }else{
      return res
      .status(200)
      .json({ success: false, code:2, msg: "User Doesn't Exist" });
    }
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Server Error While Loggin User in" });
  }
}

export {createUser, deleteAllUsers, getAllUsers, loginUser};