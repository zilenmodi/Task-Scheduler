import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const EditorModules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
      { align: ["", "right", "center", "justify"] },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const EditorFormats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "align",
  "direction",
];

const TextEditor = () => {
  const [textEditorValue, setTextEditorValue] = useState("");
  return (
    <>
      <ReactQuill
        theme="snow"
        value={textEditorValue}
        onChange={(content) => setTextEditorValue(content)}
        modules={EditorModules}
        formats={EditorFormats}
        className="h-52"
        id="content"
      />
      <div dangerouslySetInnerHTML={{ __html: textEditorValue }}></div>
    </>
  );
};

export default TextEditor;
