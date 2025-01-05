import {BookMark, Folder} from "../models/models.js";
import mongoose from "mongoose";

const getBookMark = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ success: false, msg: "Please Proide Id" });
  }
  const bookmark = await BookMark.findById(id);
  res.status(200).json({ success: true, data: bookmark });
};

const getAll = async (req, res) => {
  const bookMarks = await BookMark.find({});
  if (bookMarks.length==0) {
    return res.status(400).json({
      success: false,
      msg: "Your BookMarks will be visible once it's created",
    });
  }
  res.status(200).json({ success: true, data: bookMarks });
};

const getFolder = async (req, res) => {
  const { folder } = req.params;
  const bookmarks = await BookMark.find({ folder: folder });
  if (!bookmarks) {
    return res.status(400).json({
      success: false,
      msg: "Your bookmarks will be visible once it's created",
    });
  }
  res.status(200).json({ success: true, data: bookmarks });
};

const createBookMark = async (req, res) => {
  if (!req.body.name || !req.body.link || !req.body.folder) {
    return res
      .status(400)
      .json({ success: false, msg: "Please fill all fields" });
  }
  const requiredFolder = await Folder.find({ name: req.body.folder });
  const newBookMark = await BookMark.create(req.body);
  console.log(requiredFolder[0].count);
  const folder={name:req.body.folder,count:0};
  const newFolder=  await Folder.create(folder);
  // if(requiredFolder.length==0){
  //   res.status(200).json({ success: true, data: newBookMark, folder:newFolder });
  // }else{
  //   const folder={name:req.body.folder,count:requiredFolder.count+1};
  //   const id=requiredFolder.id;
  //   const updatedFolder= await Folder.findByIdAndUpdate(id, folder, {
  //     new: true,
  //   });
  //   res.status(200).json({ success: true, data: newBookMark, folder:updatedFolder });
  // }
  res.status(200).json({ success: true, data: newBookMark, folder:newFolder });
};

const deleteBookMark = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ success: false, msg: "Please Proide Id" });
  }
  const deletedBookMark = await BookMark.findByIdAndDelete(id);
  res.status(200).json({ success: true, data: deletedBookMark });
};

const updateBookMark = async (req, res) => {
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
};

export {
  createBookMark,
  getAll,
  getFolder,
  deleteBookMark,
  getBookMark,
  updateBookMark,
};
