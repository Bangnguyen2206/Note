import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    //   When we sign in succesfully we have uid that is returned by google
    uid: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
// TimeStamps: created two fields such as createdAt and updatedAt
const AuthorModel = mongoose.model("Author", authorSchema);
export default AuthorModel;
