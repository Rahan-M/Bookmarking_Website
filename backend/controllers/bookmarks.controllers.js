import { BookMark, Folder } from "../models/models.js";
import jwt from 'jsonwebtoken'

const getBookMark = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, msg: "Please Proide Id" });
    }
    const bookmark = await BookMark.findById(id);
    res.status(200).json({ success: true, data: bookmark });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Server Error" });
  }
};

const getAll = async (req, res) => {
  try {
    const bookMarks = await BookMark.find({});
    if (bookMarks.length == 0) {
      return res.status(400).json({
        success: false,
        msg: "Your BookMarks will be visible once it's created",
      });
    }
    return res.status(200).json({ success: true, data: bookMarks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Server Error" });
  }
};

const getFolder = async (req, res) => {
  try {
    const { folder } = req.params;
    const bookmarks = await BookMark.find({ folder: folder });
    if (!bookmarks) {
      return res.status(400).json({
        success: false,
        msg: "Your bookmarks will be visible once it's created",
      });
    }
    return res.status(200).json({ success: true, data: bookmarks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Server Error" });
  }
};

const createBookMark = async (req, res) => {
  try {
    if (!(req.body.name && req.body.link && req.body.folder )) {
      return res
        .status(400)
        .json({ success: false, msg: "Please fill all fields" });
    }

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

    const token=req.headers['authorization'].split(" ")[1];
    const secret_key=process.env.SECRET_KEY;

    try{
      const decodedToken=jwt.verify(token, secret_key);
      const requiredFolder = await Folder.findOne({ 
        name: req.body.folder,
        user: decodedToken.id
      });
      const newBookMark = await BookMark.create(req.body);
      if (!requiredFolder) {
        const folder = { name: req.body.folder, user:decodedToken.id, count: 1 };
        const newFolder = await Folder.create(folder);
        return res
          .status(200)
          .json({ success: true, data: newBookMark, folder: newFolder });
      }
  
      const id = requiredFolder.id;
      const updatedFolder = await Folder.findByIdAndUpdate(
        id,
        { $inc: { count: 1 } },
        {
          new: true,
        }
      );
      return res
        .status(200)
        .json({ success: true, data: newBookMark, folder: updatedFolder });
    }catch(err){
      if(err.name=="TokenExpiredError"){
        return res
          .status(200)
          .json({success:false, code:0, msg:"Token Expired"});
      }else{
        console.error(err);
        return res
          .status(200)
          .json({success:false, code:1, msg:"Invalid Token"});
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Server Error" });
  }
};

const deleteBookMark = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, msg: "Please Proide Id" });
    }
    const deletedBookMark = await BookMark.findByIdAndDelete(id);
    const requiredFolder = await Folder.findOne({
      name: deletedBookMark.folder,
    });
    const updatedFolder = await Folder.findByIdAndUpdate(
      requiredFolder._id,
      { $inc: { count: -1 } },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      data: deletedBookMark,
      updatedFolder: updatedFolder,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Server Error" });
  }
};

const getBookMarkId=async(req, res)=>{
  try {
    const {name}=req.body;
    const bookMark = await BookMark.findOne({name:name});
    if (!bookMark) {
      return res.status(400).json({
        success: false,
        msg: "Your folders will be visible once it's created",
      });
    }
    return res.status(200).json({ success: true, data: bookMark._id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Server Error" });
  }
}

const updateBookMark = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, msg: "Please Proide Id" });
    }
    if (!req.body.name || !req.body.link || !req.body.folder) {
      return res
        .status(400)
        .json({ success: false, msg: "Please fill all fields" });
    }
    const updatedBookMark = await BookMark.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedBookMark });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Server Error" });
  }
};

const deleteAllBookmarks = async (req, res) => {
  try {
    await BookMark.deleteMany({});
    return res
      .status(200)
      .json({ success: true, msg: "Collection Cleared Succesfully" });
  } catch {
    return res
      .status(500)
      .json({ success: false, msg: "Some Error occured from our side" });
  }
};

const moveFolder = async (req, res) => {
  try {
    const {id}=req.params;
    const {newName}=req.body;
    const oldBookMark=await BookMark.findById(id);
    const oldFolderName=oldBookMark.folder;
    
    //Now we will decrease the count of the old folder;
    await Folder.updateOne({name:oldFolderName},{$inc:{count:-1}});

    //Here we will update the bookmark and increment the folder count
    await BookMark.updateOne({_id:id},{$set:{folder:newName}});
    const newFolder=await Folder.findOne({name:newName});
    if(newFolder){
      await Folder.updateOne({name:newName},{$inc :{count:1}});
      return res.status(200).json({success:true,data:newFolder});
    }else{
      const creationJSON={name:newName,count:1};
      const createdFolder=await Folder.create(creationJSON);
      return res.status(200).json({success:true,data:createdFolder});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Server Error" });
  }
};

export {
  createBookMark,
  getAll,
  getFolder,
  deleteBookMark,
  getBookMark,
  updateBookMark,
  deleteAllBookmarks,
  moveFolder
};
