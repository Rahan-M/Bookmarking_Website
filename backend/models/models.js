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

const folderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: Number,
      required: true,
    },
    passwordHash: {
      type:String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BookMark = mongoose.model("Bookmark", bookMarkSchema);
const Folder = mongoose.model("Folder", folderSchema);
const User = mongoose.model("User", userSchema);
export { BookMark, Folder, User };
