import { useEffect, useState } from "react";
import { errorHandler } from "../../utils/errorHandler";
import { API } from "../../api/api";
import { Loading } from "../Loading/Loading";
import { ProductsPreview } from "../ProductsPreview/ProductsPreview";

export const SortedProducts = ({ sortBy, order }) => {
  // State
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(
    function () {
      async function fetchSortedProducts() {
        try {
          // Enable Loading
          setLoading(true);

          // Hit EndPoint
          const response = await API.get(
            `/products?sortBy=${sortBy}&order=${order}`
          );

          // Extract Data
          const { products } = response.data;
          setProducts(products);
        } catch (error) {
          console.log(error);
          errorHandler(error);
        } finally {
          // Disable Loading
          setLoading(false);
        }
      }

      fetchSortedProducts();
    },
    [order, sortBy]
  );

  if (loading) return <Loading />;

  return (
    <div>
      <ProductsPreview products={products} />
    </div>
  );
};
