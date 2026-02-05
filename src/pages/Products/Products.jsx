import { useEffect, useState } from "react";
import { errorHandler } from "../../utils/errorHandler";
import { API } from "../../api/api";
import { ProductsPreview } from "../../components/ProductsPreview/ProductsPreview";
import { Loading } from "../../components/Loading/Loading";
import { Pagination } from "react-bootstrap";

export const Products = () => {
  // State
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  // Pagination
  const LIMIT = 12; // No of Products Per Page
  const [skip, setSkip] = useState(0); // No of Products to Skip
  const [pages, setPages] = useState(0); // No of Pages EQ: Total Products / LIMIT
  const [curretPage, setPage] = useState(1); // Current Page

  function calcSkip(page) {
    // Update Skip
    setSkip((page - 1) * LIMIT);
    // Update Page
    setPage(page);
  }

  // Effect
  useEffect(
    function () {
      async function fetchProducts() {
        try {
          // Enable Loading
          setLoading(true);
          // Hit Endpoint
          const response = await API.get(
            `/products?limit=${LIMIT}&skip=${skip}`,
          );

          // console.log(response.data);
          // Extract Data
          const { products, total } = response.data;

          setProducts(products); // Store Products

          setPages(Math.ceil(total / LIMIT)); // Store Pages
        } catch (error) {
          errorHandler(error);
        } finally {
          // Disable Loading
          setLoading(false);
        }
      }

      fetchProducts();
    },
    [skip],
  );

  if (loading) return <Loading />;
  return (
    <div>
      <h1>Products</h1>
      <ProductsPreview products={products} />

      {/* Pagination */}

      <Pagination className="my-3 justify-content-center flex-wrap">
        {curretPage != 1 && <Pagination.First onClick={() => calcSkip(1)} />}

        <Pagination.Prev
          onClick={() => calcSkip(curretPage - 1)}
          disabled={curretPage == 1}
        />

        {new Array(pages).fill(1).map((item, i) => (
          <Pagination.Item
            onClick={() => calcSkip(i + 1)}
            active={curretPage == i + 1}
          >
            {i + 1}
          </Pagination.Item>
        ))}

        <Pagination.Next
          onClick={() => calcSkip(curretPage + 1)}
          disabled={curretPage == pages}
        />

        {curretPage != pages && (
          <Pagination.Last onClick={() => calcSkip(pages)} />
        )}
      </Pagination>
    </div>
  );
};
