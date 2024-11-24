import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles

const TextEditor = () => {
  const [editorValue, setEditorValue] = useState("");

  const handleChange = (value) => {
    setEditorValue(value);
  };

  return (
    <div>
      <ReactQuill
        value={editorValue}
        onChange={handleChange}
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline"],
            ["link"],
            [{ align: [] }],
            ["image"],
            ["blockquote", "code-block"],
          ],
        }}
      />
    </div>
  );
};

export default TextEditor;
