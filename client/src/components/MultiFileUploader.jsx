import React, { useState, useEffect } from "react";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Image, Upload, Modal, Button, Space } from "antd";
import { getImages, uploadImages, deleteImages } from "../api/images";
import { toast } from "react-toastify";
import { getImageUrl } from "../utils/functions";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const MultiFileUploader = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]); // To store newly selected/uploaded images
  const [images, setImages] = useState([]); // To store fetched images
  const [loading, setLoading] = useState(false);

  // Fetch previously uploaded images from the API
  const fetchImages = async () => {
    try {
      const response = await getImages(); // API call to get images
      const fetchedImages = response?.images || [];

      // Format fetched images for the Ant Design Upload component
      const imageFiles = fetchedImages.map((img) => ({
        uid: img._id, // Use _id as unique ID for each image
        name: img.url.split("/").pop(), // Extract the filename from URL for display
        status: "done", // The image has already been uploaded
        url: getImageUrl(img.url), // The URL of the uploaded image
      }));

      setImages(imageFiles); // Update the images state
      setFileList(imageFiles); // Populate the file list with the fetched images
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages(); // Fetch images on component mount
  }, []);

  // Preview the selected image
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  // Handle file list change
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  // Handle file upload
  const handleUpload = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("images", file.originFileObj);
      }
    });

    try {
      setLoading(true);
      const response = await uploadImages(formData); // API call to upload images
      if (response) {
        toast.success("Images uploaded successfully");
        setFileList([]); // Clear the file list after successful upload
        fetchImages(); // Refresh the image list to include newly uploaded images
      } else {
        toast.error("Failed to upload images");
      }
    } catch (error) {
      toast.error("Error uploading images");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete image
  const handleDelete = async (imageId) => {
    try {
      await deleteImages(imageId); // Call API to delete the image
      toast.success("Image deleted successfully");

      // Remove the deleted image from the images and file list
      setImages((prevImages) =>
        prevImages.filter((file) => file.uid !== imageId)
      ); // Remove from images list
      setFileList((prevList) =>
        prevList.filter((file) => file.uid !== imageId)
      ); // Remove from file list
    } catch (error) {
      toast.error("Error deleting image");
      console.error(error);
    }
  };

  // Upload button UI
  const uploadButton = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px",
        border: "1px dashed #d9d9d9",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      <PlusOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
      <div style={{ marginTop: 8, fontSize: "14px", color: "#1890ff" }}>
        Upload
      </div>
    </div>
  );

  // Modal confirm for delete
  const confirmDelete = (imageId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this image?",
      onOk: () => handleDelete(imageId),
    });
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <h3>Uploaded Images</h3>

        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          beforeUpload={() => false} // Prevent automatic upload
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>

        <Button
          type="primary"
          onClick={handleUpload}
          loading={loading}
          style={{ marginTop: "16px", width: "200px" }}
        >
          {loading ? "Uploading..." : "Upload Selected Images"}
        </Button>

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          {images.map((file) => (
            <div
              key={file.uid}
              style={{
                width: "100%",
                maxWidth: "120px", // Limit width of each box
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Add shadow for elevation
                overflow: "hidden", // To make sure the image doesn't overflow
                display: "flex",
                flexDirection: "column", // Align image and button in a column
                alignItems: "center", // Center-align content horizontally
                padding: "10px",
              }}
            >
              <img
                src={file.url}
                alt={file.name}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "5px",
                  marginBottom: "10px", // Space between image and button
                }}
              />
              <Button
                icon={<DeleteOutlined />}
                danger
                onClick={() => confirmDelete(file.uid)}
                style={{
                  width: "100%",
                  padding: "6px 0",
                  fontSize: "14px",
                  textAlign: "center", // Center text inside button
                }}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      </Space>

      {previewImage && (
        <Image
          width={200}
          src={previewImage}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
        />
      )}
    </div>
  );
};

export default MultiFileUploader;
