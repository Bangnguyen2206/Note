/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { useLoaderData } from "react-router-dom";

export default function Note() {
  const { note } = useLoaderData();
  //   Create empty
  const [editorState, setEditorState] = useState(() => {
    return EditorState.createEmpty();
  });
  const [rawHTML, setRawHTML] = useState(note.content);

  useEffect(() => {
    setRawHTML(note.content);
  }, [note.content]);

  useEffect(() => {
    //   Load initial data into rich text: convert to HTML
    const blocksFromHTML = convertFromHTML(note.content);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    setEditorState(EditorState.createWithContent(state));
  }, [note.id]);

  const handleOnchange = (e) => {
    setEditorState(e);
    setRawHTML(draftToHtml(convertToRaw(e.getCurrentContent())));
  };
  return (
    <>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        placeholder="Write something...."
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={handleOnchange}
      />
    </>
  );
}
