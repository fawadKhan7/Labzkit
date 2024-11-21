const ImageModel = require("../models/imageMode");

// Get all images
const getImages = async (req, res) => {
  try {
    const images = await ImageModel.find();
    res.json({ images });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve images", error });
  }
};

// Create new images
const createImages = async (req, res) => {
  try {
    // Extracting the file URLs from the uploaded files
    const imageUrls = req.files.map((file) => file.filename);

    // Create individual image documents for each uploaded file
    const imageDocs = imageUrls.map((url) => new ImageModel({ url }));

    // Save all the image documents
    await ImageModel.insertMany(imageDocs);

    res
      .status(200)
      .json({ message: "Images uploaded successfully", imageUrls });
  } catch (error) {
    res.status(500).json({ message: "Failed to upload images", error });
  }
};

// Update image
const updateImages = async (req, res) => {
  try {
    const { id } = req.params;
    const imageUrl = `${
      process.env.MODE !== "development"
        ? process.env.PRODUCTION_URL
        : process.env.DEV_URL
    }/uploads/${req.file.filename}`;

    // Update the image document with the new URL
    const updatedImageDoc = await ImageModel.findByIdAndUpdate(
      id,
      { url: imageUrl },
      { new: true }
    );

    if (!updatedImageDoc) {
      return res.status(404).json({ message: "Image document not found" });
    }

    res
      .status(200)
      .json({ message: "Image updated successfully", updatedImageDoc });
  } catch (error) {
    res.status(500).json({ message: "Failed to update image", error });
  }
};

// Delete image
const deleteImages = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedImageDoc = await ImageModel.findByIdAndDelete(id);

    if (!deletedImageDoc) {
      return res.status(404).json({ message: "Image document not found" });
    }

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete image", error });
  }
};

module.exports = { getImages, createImages, updateImages, deleteImages };
