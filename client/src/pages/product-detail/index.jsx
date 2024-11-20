import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetail from "../../components/ProductDetail";
import { productsData } from "../../data/productsData";
import { getProductById } from "../../api/products";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const getProductDetail = async () => {
    const response = await getProductById(productId);
    setProduct(response);
  };

  useEffect(() => {
    getProductDetail(productId);
  }, []);
  return (
    <div className="p-6 dark:bg-[#1f2937]">
      {product ? (
        <ProductDetail product={product} />
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
};

export default ProductDetailPage;
