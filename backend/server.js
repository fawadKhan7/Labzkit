const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const imageRoutes = require("./routes/imagesRoutes");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const path = require("path");

// Middleware
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  cors({
    origin: "http://localhost:3000", // Your frontend URL
    credentials: true, // Allow credentials if you are using cookies
  })
);

app.use(morgan("dev"));
// Routes

// Endpoint to handle image uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/images", imageRoutes);
app.get("/", (req, res) => {
  res.send("Deployed");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
