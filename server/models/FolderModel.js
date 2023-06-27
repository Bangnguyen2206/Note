import mongoose from "mongoose";

const folderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    authorId: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
// TimeStamps: created two fields such as createdAt and updatedAt
const FolderModel = mongoose.model("Folder", folderSchema);
export default FolderModel;
