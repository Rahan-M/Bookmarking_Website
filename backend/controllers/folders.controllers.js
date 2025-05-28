import { BookMark, Folder } from "../models/models.js";
import jwt from "jsonwebtoken";
const getAllfolders = async (req, res) => {
  try {
    try{
      const authHeader=req.headers['authorization'];
      if(!authHeader){
        return res
        .status(200)
        .json({
          success:false,
          code:0,
          msg:"No Header"
        });
      }
      
      const token=authHeader.split(" ")[1];
      const secret_key=process.env.SECRET_KEY;
      const decodedToken=jwt.verify(token, secret_key);
      
      const folders = await Folder.find({user:decodedToken.id});
      if (!folders) {
        return res.status(400).json({
          success: false,
          msg: "Your folders will be visible once it's created",
        });
    }
    return res.status(200).json({ success: true, data: folders });
    }catch(err){
      if(err.name=="TokenExpiredError"){
        return res
          .status(200)
          .json({success:false, code:1, msg:"Token Expired"});
      }else{
        console.error(err);
        return res
          .status(200)
          .json({success:false, code:2, msg:err});
      }
    }
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Server Error" });
  }
};

const getFolderId=async(req, res)=>{
  try {
    const {name}=req.body;
    const folder = await Folder.findOne({name:name});
    if (!folder) {
      return res.status(400).json({
        success: false,
        msg: "Your folders will be visible once it's created",
      });
    }
    return res.status(200).json({ success: true, data: folder._id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Server Error" });
  }
}

const renameFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const { newName } = req.body;
    const oldFolder = await Folder.findById(id); // Returns document as it was before updation
    const folder = await Folder.findOne({ name: newName });
    if (folder) {
      if (oldFolder.name == newName) {
        return res.status(200).json({ success: true, data: folder });
      }
      // We are going to delete the old folder, then add all documents to the existing folder and update its count;
      const deletedFolder = await Folder.findByIdAndDelete(id); // Returns document as it was before deletion
      const oldName = deletedFolder.name;
      const oldCount = deletedFolder.count;
      const updatedFolder = await Folder.findByIdAndUpdate(
        folder._id,
        { $inc: { count: oldCount } },
        { new: true }
      );
      await BookMark.updateMany(
        { folder: oldName },
        { $set: { folder: newName } }
      );
      return res
        .status(200)
        .json({ success: true, data: updatedFolder, preExists: true });
    } else {
      const updationJSON = { name: newName };
      const oldName = oldFolder.name;
      const updatedFolder = await Folder.findByIdAndUpdate(id, updationJSON, {
        new: true,
      });
      await BookMark.updateMany(
        { folder: oldName },
        { $set: { folder: newName } }
      );
      return res
        .status(200)
        .json({ success: true, data: updatedFolder, preExists: false });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, msg: "Some error occured on our side" });
  }
};

const deleteFolder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, msg: "Please Proide Id" });
    }
    const authHeader=req.headers['authorization'];
    if(!authHeader){
      console.log("Hit!!!")
      return res
      .status(200)
      .json({
        success:false,
        code:0,
        msg:"No Header"
      });
    }
    
    const token=req.headers['authorization'].split(" ")[1];
    const secret_key=process.env.SECRET_KEY;

    try{
      const decodedToken=jwt.verify(token, secret_key);
      const deletedFolder = await Folder.findByIdAndDelete(id);
      const folderName = deletedFolder.name;
      await BookMark.deleteMany({ folder: folderName, user:decodedToken.id});
      return res.status(200).json({ success: true, data: deletedFolder });
      
    }catch(err){
      if(err.name=="TokenExpiredError"){
        return res
          .status(200)
          .json({success:false, code:1, msg:"Token Expired"});
      }else{
        console.error(err);
        return res
          .status(200)
          .json({success:false, code:2, msg:err});
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Server Error" });
  }
};

const deleteAllFolders = async (req, res) => {
  try {
    await Folder.deleteMany({});
    return res
      .status(200)
      .json({ success: true, msg: "Collection Cleared Succesfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Server Error" });
  }
};

export { getAllfolders, deleteFolder, deleteAllFolders, renameFolder, getFolderId };
