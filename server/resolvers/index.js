import fakeData from "../fakeData/index.js";
import AuthorModel from "../models/AuthorModel.js";
import FolderModel from "../models/FolderModel.js";
import NoteModel from "../models/NoteModel.js";

export const resolvers = {
  Query: {
    // All folders
    // Get database from mongoseDB
    folders: async (parent, args, context) => {
      const folders = await FolderModel.find({
        authorId: context.uid,
      }).sort({
        updatedAt: "desc",
      });
      return folders;
    },
    // Get each folder by folder ID
    folder: async (parant, args) => {
      const folderId = args.folderId;
      const foundFolder = await FolderModel.findOne({
        _id: folderId,
      });
      return foundFolder;
    },
    // Get note by noteId
    note: async (parant, args) => {
      const noteId = args.noteId;
      const note = await NoteModel.findById(noteId);
      return note;
    },
  },
  // resolver child
  Folder: {
    author: async (parent, args) => {
      const authorId = parent.authorId;
      const author = await AuthorModel.findOne({
        uid: authorId,
      });
      return author;
    },
    // Parent: folder is selected
    notes: async (parent, args) => {
      console.log({ parent });
      const notes = await NoteModel.find({
        folderId: parent.id,
      }).sort({
        updatedAt: "desc",
      });
      return notes;
    },
  },
  Mutation: {
    // Create new note
    addNote: async (parent, args, context) => {
      // Args: data is sent from client side
      const newNote = new NoteModel(args);
      await newNote.save();
      return newFolder;
    },
    // Update
    updateNote: async (parent, args) => {
      // Args: data is sent from client side
      // args: dữ liệu được gửi từ phía client
      const noteId = args.id;
      const note = await NoteModel.findByIdAndUpdate(noteId, args);
      return note;
    },
    // Create new folder and save in database
    addFolder: async (parent, args, context) => {
      // Args: data is sent from client side
      const newFolder = new FolderModel({ ...args, authorId: context.uid });
      await newFolder.save();
      return newFolder;
    },
    // Get data into database
    register: async (parent, args) => {
      const foundUser = await AuthorModel.findOne({ uid: args.uid });
      if (!foundUser) {
        const newUser = new AuthorModel(args);
        await newUser.save();
        return newUser;
      }
    },
  },
};
