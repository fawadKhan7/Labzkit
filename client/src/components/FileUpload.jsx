import React from "react";

const CustomFileUpload = ({ fileList, setFileList, handleRemoveImage }) => {
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newFileList = [...fileList, ...files];
    setFileList(newFileList);
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="hidden" // Hide the input field
        id="fileInput"
      />

      <div className="mt-4 flex flex-wrap">
        {fileList.map((file, index) => (
          <div key={index} className="relative mb-4 mr-4">
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              style={{ width: "100px", height: "100px" }}
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(file.name)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomFileUpload;
