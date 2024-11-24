import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom"; // Removed Router here
import HomePage from "../pages/home";
import ProductsPage from "../pages/product";
import ProductDetailPage from "../pages/product-detail";
import PrivateRoute from "./private-route";
import AdminProductList from "../pages/admin-products";
import ProductCreate from "../pages/admin-create-product";
import AdminLogin from "../pages/admin-auth";
import Cart from "../pages/cart";
import Register from "../pages/register";
import Login from "../pages/login";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UploadImagesPage from "../pages/admin-offer-images";
import AboutUS from "../pages/about-us";
import ContactUs from "../pages/contact-us";
import { useUser } from "../context/UserContext";
import ForgotPassword from "../pages/forgot-password";
import ResetPassword from "../pages/reset-password";

const AppRouter = () => {
  const location = useLocation();
  const { user, token } = useUser();

  return (
    <div className="min-h-screen bg-gray-100">
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <Header />
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUS />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route
          path="/login"
          element={token && user ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={token && user ? <Navigate to="/" replace /> : <Register />}
        />{" "}
        <Route
          path="/forgot-password"
          element={
            token && user ? <Navigate to="/" replace /> : <ForgotPassword />
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            token && user ? <Navigate to="/" replace /> : <ResetPassword />
          }
        />
        <Route
          path="/cart"
          element={token && user ? <Cart /> : <Navigate to="/" replace />}
          // element={}
        />
        <Route path="/products/:category" element={<ProductsPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/products"
          element={
            <PrivateRoute>
              <AdminProductList />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/products/create"
          element={
            <PrivateRoute>
              <ProductCreate />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/offer/create"
          element={
            <PrivateRoute>
              <UploadImagesPage />
            </PrivateRoute>
          }
        />
      </Routes>

      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <Footer />
      )}
    </div>
  );
};

export default AppRouter;
