import fakeData from "../fakeData/index.js";
import FolderModel from "../models/FolderModel.js";

export const resolvers = {
  Query: {
    // All folders
    // Get database from mongoseDB
    folders: async (parent, args, context) => {
      const folders = await FolderModel.find({
        authorId: context.uid,
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
    note: (parant, args) => {
      const noteId = args.noteId;
      return fakeData.notes.find((note) => note.id === noteId);
    },
  },
  // resolver child
  Folder: {
    author: (parent, args) => {
      const authorId = parent.authorId;
      return fakeData.authors.find((author) => author.id === authorId);
    },
    // Parent: folder is selected
    notes: (parent, args) => {
      return fakeData.notes.filter((note) => note.folderId === parent.id);
    },
  },
  Mutation: {
    addFolder: async (parent, args) => {
      // Args: data is sent from client side
      const newFolder = new FolderModel(args);
      await newFolder.save();
      return newFolder;
    },
  },
};
