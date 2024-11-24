import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, deleteProduct, updateProduct } from "../../api/products";
import { getCategories, deleteCategory } from "../../api/categories";
import { getImageUrl, imagesProduct } from "../../utils/functions";
import ProductUpdateModal from "../../components/EditProductModal";
import { toast } from "react-toastify";
import { DataGrid, GridDeleteIcon } from "@mui/x-data-grid";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { genders } from "../../data/selectFieldsData";
import SearchInput from "../../components/Search";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Box, Grid } from "@mui/system";
import { BiEdit } from "react-icons/bi";

const AdminProductList = () => {
  const navigate = useNavigate();
  const [productsData, setProductData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedTab, setSelectedTab] = useState("products");
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  const [anchorEl, setAnchorEl] = useState({}); // Track the anchorEl for each product

  const handleMenuOpen = (event, productId) => {
    setAnchorEl((prev) => ({ ...prev, [productId]: event.currentTarget }));
  };

  const handleMenuClose = (productId) => {
    setAnchorEl((prev) => {
      const updatedAnchorEl = { ...prev };
      delete updatedAnchorEl[productId]; // Remove the specific anchorEl when closing
      return updatedAnchorEl;
    });
  };

  const openMenu = (productId) => Boolean(anchorEl[productId]);

  const openModal = (productId) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setSelectedProductId(null);
    setIsModalOpen(false);
  };

  const handleCreateProduct = (selectedTab) => {
    navigate(`/admin/products/create?tab=${selectedTab}`);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(productId);
      fetchProducts();
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      await deleteCategory(categoryId);
      fetchCategories();
      fetchProducts();
    }
  };

  const fetchProducts = async () => {
    const response = await getProducts(searchTerm, genderFilter);
    setProductData(response?.products);
  };

  const fetchCategories = async () => {
    const response = await getCategories("");
    setCategoriesData(response);
  };

  const handleUpdate = async (id, productData) => {
    try {
      const response = await updateProduct(id, productData);
      if (response) {
        toast.success("Product Updated Successfully");
        fetchProducts();
        handleClose();
      }
    } catch {
      toast.error("Error Updating Product");
    }
  };

  const productColumns = [
    {
      field: "image",
      headerName: "Image",
      width: 120,
      renderCell: (params) => (
        <Box display={"flex"} alignItems={"center"} height={"100%"} p={1}>
          <img
            src={
              params?.row?.images && params?.row?.images.length > 0
                ? getImageUrl(params?.row?.images[0])
                : imagesProduct[params.row.gender]
            }
            alt={params.row.name}
            className="rounded-lg my-2 h-16 w-fit mx-auto"
          />
        </Box>
      ),
    },
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "category",
      headerName: "Category",
      width: 150,
      renderCell: (params) => <p>{params?.row?.category?.name}</p>,
    },
    { field: "price", headerName: "Price", width: 120 },
    { field: "discountedPrice", headerName: "Discount", width: 120 },
    { field: "quantity", headerName: "Quantity", width: 80 },
    {
      field: "size",
      headerName: "Size",
      width: 150,
      renderCell: (params) => <p>{params?.row?.size?.join(", ")}</p>,
    },
    {
      field: "color",
      headerName: "Color",
      width: 120,
      renderCell: (params) => (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{
            wordWrap: "break-word", // Enable word wrap
            whiteSpace: "normal", // Allow wrapping of long text
            height: "100%", // Ensure Box takes full height of the row
          }}
        >
          <Typography variant="body2" style={{ fontSize: 14 }}>
            {params?.row?.color?.join(", ")}
          </Typography>
        </Box>
      ),
    },
    { field: "gender", headerName: "Gender", width: 80 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <div>
          <IconButton
            aria-label="actions"
            aria-controls={
              openMenu(params.row._id) ? "product-menu" : undefined
            }
            aria-haspopup="true"
            aria-expanded={openMenu(params.row._id) ? "true" : undefined}
            onClick={(e) => handleMenuOpen(e, params.row._id)}
          >
            <BsThreeDotsVertical size={15} />
          </IconButton>
          <Menu
            id="product-menu"
            anchorEl={anchorEl[params.row._id]} // Use dynamic anchorEl
            open={openMenu(params.row._id)} // Check if the specific menu is open
            onClose={() => handleMenuClose(params.row._id)}
            MenuListProps={{
              "aria-labelledby": "product-actions",
            }}
          >
            <MenuItem
              onClick={() => {
                openModal(params.row._id);
              }}
              style={{ borderBottom: "1px solid #ddd", fontSize: "12px" }}
            >
              <BiEdit
                fontSize={"14"}
                style={{ marginRight: 5, color: "#fcba03" }}
              />
              Update
            </MenuItem>

            <MenuItem
              onClick={() => {
                handleDeleteProduct(params.row._id);
              }}
              style={{ borderTop: "1px solid #ddd", fontSize: "12px" }}
            >
              <GridDeleteIcon
                fontSize={"14"}
                style={{ marginRight: 5, color: "red" }}
              />
              Delete
            </MenuItem>
          </Menu>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, genderFilter]);

  return (
    <div className="p-6 dark:bg-[#1f2937] min-h-screen">
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-grow border-t border-1 border-black dark:border-white"></div>
        <h1 className="text-gray-900 dark:text-darkText text-lg">
          Labzkit Admin Products
        </h1>
        <div className="flex-grow border-t border-1 border-black dark:border-white"></div>
      </div>

      <div className="flex justify-center gap-6 mb-6">
        <button
          onClick={() => setSelectedTab("products")}
          className={`py-3 px-6 rounded-lg text-sm font-medium transition-all duration-300 shadow-md ${
            selectedTab === "products"
              ? "bg-blue-500 text-white shadow-blue-300"
              : "bg-gray-200 hover:bg-gray-300 text-gray-800"
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setSelectedTab("categories")}
          className={`py-3 px-6 rounded-lg text-sm font-medium transition-all duration-300 shadow-md ${
            selectedTab === "categories"
              ? "bg-blue-500 text-white shadow-blue-300"
              : "bg-gray-200 hover:bg-gray-300 text-gray-800"
          }`}
        >
          Categories
        </button>
      </div>

      <div className="flex flex-col gap-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
          <button
            onClick={() => handleCreateProduct(selectedTab)}
            className="flex-1 sm:flex-none bg-blue-500 text-white shadow-blue-300 transition-all duration-300 py-3 px-4 rounded-lg shadow-md"
          >
            {selectedTab === "products" ? "Create Product" : "Create Category"}
          </button>

          <button
            onClick={() => navigate("/admin/offer/create")}
            className="flex-1 sm:flex-none bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 transition-all duration-300 text-white py-3 px-4 rounded-lg shadow-md"
          >
            Handle Offers Banner
          </button>
        </div>

        {selectedTab === "products" && (
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex-1">
              <SearchInput
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Products"
              />
            </div>

            <div className="relative w-full lg:w-48">
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="w-full py-3 px-4 text-md border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Genders</option>
                {genders.map((elem) => (
                  <option key={elem} value={elem}>
                    {elem}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {selectedTab === "products" ? (
        <div className="overflow-x-auto">
          <DataGrid
            rows={productsData}
            columns={productColumns}
            pageSize={5}
            getRowId={(row) => row._id}
            rowHeight={80}
            disableSelectionOnClick
          />
          {isModalOpen && (
            <ProductUpdateModal
              productId={selectedProductId}
              onClose={handleClose}
              onSave={handleUpdate}
            />
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Grid container spacing={4}>
            {categoriesData.map((category) => (
              <Grid item xs={12} sm={6} md={4} key={category._id}>
                <Card style={{ paddingTop: 10 }}>
                  <CardMedia
                    component="img"
                    image={getImageUrl(category?.image)}
                    alt={category.name}
                    sx={{
                      width: 150,
                      height: 150,
                      objectFit: "contain",
                      margin: "auto",
                      borderRadius: "8px",
                    }}
                  />
                  <CardContent sx={{ textAlign: "center" }}>
                    <h2 style={{ fontWeight: "600", color: "#4B5563" }}>
                      {category.name}
                    </h2>
                    <Button
                      onClick={() => handleDeleteCategory(category._id)}
                      variant="contained"
                      color="error"
                      sx={{ mt: 2 }}
                    >
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default AdminProductList;
