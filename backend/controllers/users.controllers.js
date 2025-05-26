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

export {createUser};