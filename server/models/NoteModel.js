import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    folderId: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
// TimeStamps: created two fields such as createdAt and updatedAt
const NoteModel = mongoose.model("Note", noteSchema);
export default NoteModel;
