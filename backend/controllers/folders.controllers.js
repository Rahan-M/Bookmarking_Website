import { Folder } from "../models/models.js";
import mongoose from "mongoose";


const getAllfolders = async (req, res) => {
  const folders = await Folder.find({});
  if (!folders) {
    return res.status(400).json({
      success: false,
      msg: "Your folders will be visible once it's created",
    });
  }
  res.status(200).json({ success: true, data: folders });
};



const deleteFolder = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ success: false, msg: "Please Proide Id" });
  }
  const deletedFolder = await Folder.findByIdAndDelete(id);
  res.status(200).json({ success: true, data: deletedFolder });
};

export { getAllfolders, deleteFolder };
