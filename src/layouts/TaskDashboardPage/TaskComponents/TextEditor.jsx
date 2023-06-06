import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Button } from "antd";
import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { TaskContext } from "../TaskDashboardPage";

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
  const { taskDetails, setTaskDetails } = useContext(TaskContext);
  const [textEditorValue, setTextEditorValue] = useState(
    taskDetails.description
  );
  const [showTextEditor, setShowTextEditor] = useState(false);

  const handleSaveDescription = () => {
    setShowTextEditor(false);
    setTaskDetails((prev) => ({ ...prev, description: textEditorValue }));
  };

  return (
    <>
      {showTextEditor ? (
        <Box sx={{ mb: 3 }}>
          <ReactQuill
            theme="snow"
            value={textEditorValue}
            onChange={(content) => setTextEditorValue(content)}
            modules={EditorModules}
            formats={EditorFormats}
            className="h-52"
            id="content"
          />
          <Box sx={{ mt: 2 }}>
            <Button
              type="primary"
              style={{ marginRight: "1rem" }}
              onClick={handleSaveDescription}
            >
              Save
            </Button>
            <Button onClick={() => setShowTextEditor(false)}>Discard</Button>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            background: "#091e420f",
            color: "#172b4d",
            width: "100%",
            minHeight: "100px",
            mb: 2,
            p: 2,
            borderRadius: "5px",
          }}
          onDoubleClick={() => setShowTextEditor(true)}
        >
          {textEditorValue.trim().length === 0 ||
          textEditorValue === "<p><br></p>" ? (
            <Typography>Write Something...</Typography>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: textEditorValue }}></div>
          )}
        </Box>
      )}
    </>
  );
};

export default TextEditor;
