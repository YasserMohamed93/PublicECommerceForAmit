import React, { useEffect, useState } from "react";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { useParams } from "react-router-dom";
import { Loading } from "../../components/Loading/Loading";
import { API } from "../../api/api";
import { errorHandler } from "../../utils/errorHandler";
import ProductDetail from "../../components/productDetail/ProductDetail";

export const ProductDetails = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [productState, setProduct] = useState();

  useEffect(
    function () {
      async function fetchProducts() {
        try {
          // Enable Loading
          setLoading(true);
          // Hit Endpoint
          const response = await API.get(`/products/${id}`);

          // Extract Data
          const product = response.data;

          setProduct(product); // Store Products
        } catch (error) {
          errorHandler(error);
        } finally {
          // Disable Loading
          setLoading(false);
        }
      }

      fetchProducts();
    },
    [id],
  );

  if (loading) return <Loading />;

  return (
    <div>
      <ProductDetail product={productState} />
    </div>
  );
};
