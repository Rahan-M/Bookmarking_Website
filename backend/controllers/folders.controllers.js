import { BookMark, Folder } from "../models/models.js";

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

const renameFolder = async (req, res) => {
  const {id} = req.params;
  const { newName } = req.body;
  const updationJSON={name:newName};
  const requiredFolder = await Folder.findById(id); // Returns document as it was before updation
  const oldName = requiredFolder.name;
  const updatedFolder = await Folder.findByIdAndUpdate(id, updationJSON, { new: true });
  await BookMark.updateMany(
    { folder: oldName },
    { $set: { folder: newName } }
  );
  res.status(200).json({ success: true, data: updatedFolder });
};

const deleteFolder = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ success: false, msg: "Please Proide Id" });
  }
  const deletedFolder = await Folder.findByIdAndDelete(id);
  const folderName = deletedFolder.name;
  await BookMark.deleteMany({ folder: folderName });
  res.status(200).json({ success: true, data: deletedFolder });
};

const deleteAllFolders = async (req, res) => {
  try {
    await Folder.deleteMany({});
    return res
      .status(200)
      .json({ success: true, msg: "Collection Cleared Succesfully" });
  } catch {
    return res
      .status(500)
      .json({ success: false, msg: "Some Error occured from our side" });
  }
};

export { getAllfolders, deleteFolder, deleteAllFolders, renameFolder };
