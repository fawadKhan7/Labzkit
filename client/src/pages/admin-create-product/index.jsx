import React, { useEffect, useState } from "react";
import { createProduct } from "../../api/products";
import { createCategory, getCategories } from "../../api/categories";
import {
  availableSizes,
  availableColors,
  genders,
} from "../../data/selectFieldsData";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProductForm from "../../components/Forms/ProductForm";

const ProductCreate = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isProductForm, setIsProductForm] = useState(true);
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    discountedPrice: "",
    quantity: "",
    size: [],
    color: [],
    gender: "",
    description: "",
  });
  const [category, setCategory] = useState({
    name: "",
  });
  const [productImageFiles, setProductImageFiles] = useState([]);
  const [categoryImageFile, setCategoryImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "quantity" && value < 0) {
      toast.error("You can't select less than 0");
      return;
    }
    setProduct({ ...product, [name]: value });
  };

  const handleDescriptionChange = (value) => {
    setProduct({ ...product, description: value });
  };

  const handleSizeChange = (size) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      size: prevProduct.size.includes(size)
        ? prevProduct.size.filter((s) => s !== size)
        : [...prevProduct.size, size],
    }));
  };

  const handleCategoryInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleColorChange = (color) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      color: prevProduct.color.includes(color)
        ? prevProduct.color.filter((c) => c !== color)
        : [...prevProduct.color, color],
    }));
  };

  const handleProductImageChange = (event) => {
    const files = event.target.files;
    if (files) {
      if (productImageFiles.length + files.length <= 5) {
        setProductImageFiles((prevFiles) => [...prevFiles, ...files]);
      } else {
        toast.error("You can only upload a maximum of 5 images.");
      }
    }
  };
  const handleCategoryImageChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }
    setCategoryImageFile(file);
  };

  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    if (!category.name) {
      toast.error("Category name is required");
      return;
    }
    const formData = new FormData();
    formData.append("name", category.name);
    if (categoryImageFile) {
      formData.append("image", categoryImageFile);
    }
    setIsLoading(true);
    try {
      const createdCategory = await createCategory(formData);
      setCategory({});
      toast.success("Category Created Successfully");

      setIsProductForm(true);
    } catch (error) {
      toast.error("Category creation failed");
    } finally {
      setIsLoading(false);
    }
  };

  const removeImage = (index) => {
    setProductImageFiles((prevFiles) =>
      prevFiles.filter((_, i) => i !== index)
    );
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("discountedPrice", product.discountedPrice);
    formData.append("quantity", product.quantity);
    formData.append("size", JSON.stringify(product.size));
    formData.append("color", JSON.stringify(product.color));
    formData.append("gender", product.gender);
    formData.append("description", product.description);

    productImageFiles.forEach((file) => {
      formData.append("images", file); // Append each file
    });

    if (!product.name) {
      toast.error("Product name is required");
      return;
    }
    if (!product.category) {
      toast.error("Product category is required");
      return;
    }
    if (!product.price) {
      toast.error("Product price is required");
      return;
    }
    if (!product.quantity) {
      toast.error("Product quantity is required");
      return;
    }
    if (!product.size || product.size.length === 0) {
      toast.error("Product size is required");
      return;
    }
    if (!product.color || product.color.length === 0) {
      toast.error("Product color is required");
      return;
    }
    if (!product.gender) {
      toast.error("Product gender is required");
      return;
    }
    if (!product.description) {
      toast.error("Product description is required");
      return;
    }
    if (productImageFiles.length === 0) {
      toast.error("At least one product image is required");
      return;
    }
    setIsLoading(true);
    try {
      const createdProduct = await createProduct(formData);
      setProduct({});
      setProductImageFiles([]);
      toast.success("Product Created Successfully");
      navigate("/admin/products");
    } catch (error) {
      toast.error("Product creation failed");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    const response = await getCategories().then((res) => {
      let data = res.map((elem) => {
        return { label: elem?.name, value: elem?._id };
      });
      setCategories(data);
    });
  };
  useEffect(() => {
    fetchCategories();
  }, [isProductForm]);
  const location = useLocation();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const selectedTab = searchParams.get("tab");
    setIsProductForm(selectedTab === "products");
  }, []);
  return (
    <div className="p-8 max-w-4xl m-auto bg-white dark:bg-DarkPrimary dark:text-darkText shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800 dark:text-darkText">
        {isProductForm ? "Create Product" : "Create Category"}
      </h2>

      <button
        onClick={() => setIsProductForm(!isProductForm)}
        className="mb-4 text-blue-600"
      >
        {isProductForm
          ? "Switch to Create Category"
          : "Switch to Create Product"}
      </button>
      <form
        onSubmit={isProductForm ? handleSubmitProduct : handleSubmitCategory}
        className="flex flex-col items-center gap-8"
      >
        {isProductForm ? (
          <ProductForm
            product={product}
            categories={categories}
            genders={genders}
            availableSizes={availableSizes}
            availableColors={availableColors}
            handleInputChange={handleInputChange}
            handleProductImageChange={handleProductImageChange}
            handleSizeChange={handleSizeChange}
            handleColorChange={handleColorChange}
            productImageFiles={productImageFiles}
            removeImage={removeImage}
            handleDescriptionChange={handleDescriptionChange}
          />
        ) : (
          <div className="w-full flex flex-col gap-2">
            {/* Category Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 dark:text-darkText mb-2">
                Category Name:
              </label>
              <input
                type="text"
                name="name"
                value={category.name}
                onChange={handleCategoryInputChange}
                placeholder="Enter category name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleCategoryImageChange}
              className="p-2 w-full text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
            />
          </div>
        )}

        {/* Submit Button */}
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md focus:outline-none transition-all duration-300 ease-in-out ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
            }`}
            disabled={isLoading}
          >
            {isProductForm
              ? isLoading
                ? "Creating Product..."
                : "Create Product"
              : isLoading
              ? "Creating Category..."
              : "Create Category"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductCreate;
