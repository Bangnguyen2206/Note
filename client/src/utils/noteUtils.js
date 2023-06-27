/* eslint-disable no-unused-vars */
import { graphQLRequest } from "./request";

export const notesLoader = async ({ params: { folderId } }) => {
  const query = `query Notes($folderId: String) {
      folder(folderId: $folderId) {
        id
        name
        notes{
          id
          content
        }
      }
    }`;
  const data = await graphQLRequest({
    query,
    variables: {
      folderId,
    },
  });
  return data;
};

export const noteLoader = async ({ params: { noteId } }) => {
  const query = `query Note($noteId: String) {
        note(noteId: $noteId) {
          id
          content
        }
      }`;
  const data = await graphQLRequest({
    query,
    variables: {
      noteId,
    },
  });
  return data;
};

export const addNewNote = async ({ params, request }) => {
  // Request: dữ liệu submit là content và uid
  const newNote = await request.formData();
  // Convert form data
  const formDataObject = {};
  newNote.forEach((value, key) => (formDataObject[key] = value));
  const query = `mutation Mutation($content: String!, $folderId: ID!){
    addNote(content: $content, folderId: $folderId){
      id
      content
    }
  }`;
  const data = await graphQLRequest({
    query,
    variables: formDataObject,
  });
  return data;
};
export const updateNote = async ({ params, request }) => {
  // Request: dữ liệu submit là content và uid
  const updatedNote = await request.formData();
  // Convert form data
  const formDataObject = {};
  updatedNote.forEach((value, key) => (formDataObject[key] = value));
  const query = `mutation Mutation($id: String!, $content: String!){
    updateNote(id: $id, content: $content){
      id
      content
    }
  }`;
  const data = await graphQLRequest({
    query,
    variables: formDataObject,
  });
  return data;
};
