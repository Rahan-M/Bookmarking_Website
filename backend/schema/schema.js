import mongoose from "mongoose";

const bookMarkSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    folder: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const bookMarkModel = mongoose.model("Bookmark", bookMarkSchema);
export default bookMarkModel;
