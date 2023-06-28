// Create cutsomt type for fields such as updatedAt: Date

export const typeDefs = `#graphql
  scalar Date 

  type Folder {
    id: String,
    name: String,
    createdAt: String,
    author: Author,
    notes: [Note]
  }

  type Note {
    id: String,
    content: String,
    updatedAt: Date
  }

  type Author {
    id: String,
    uid: String,
    name: String
  }

  type Query{
    folders: [Folder],
    folder(folderId: String): Folder,
    note(noteId: String): Note
  }
  type Message {
    message: String
  }

  type Mutation {
      addFolder(name: String!): Folder,
      register(uid: String!, name: String!): Author,
      addNote(content: String!, folderId: ID!): Note,
      updateNote(id: String, content: String!): Note,
      pushNotification(content: String): Message
  }
  
  type Subscription {
    folderCreated: Message,
    notification: Message
  }
`;
