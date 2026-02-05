import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { errorHandler } from "../../utils/errorHandler";
import { Loading } from "../../components/Loading/Loading";
import { API } from "../../api/api";
import { ProductsPreview } from "../../components/ProductsPreview/ProductsPreview";

export const Filters = () => {
  // Ref's
  const searchRef = useRef();
  const categoryRef = useRef();
  const sortRef = useRef();
  const sortOrderRef = useRef();

  const sortingList = [
    { showValue: "None", apiValue: "" },
    { showValue: "Title", apiValue: "title" },
    { showValue: "Price", apiValue: "price" },
    { showValue: "Rating", apiValue: "rating" },
    { showValue: "Stock", apiValue: "stock" },
    { showValue: "Brand", apiValue: "brand" },
    { showValue: "Category", apiValue: "category" },
    { showValue: "Discount Percentage", apiValue: "discountPercentage" },
  ];

  const sortingOrder = ["asc", "desc"];

  // State
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(function () {
    async function fetchProductCategories() {
      try {
        // Enable Loading
        setLoading(true);
        // Hit Endpoint
        const response = await API.get(`/products/categories`);

        // Extract Data
        const categoryList = response.data;

        setCategories([{ name: "None" }, ...categoryList]);

        setLoading(false);
      } catch (error) {
        errorHandler(error);
      } finally {
        // Disable Loading
        setLoading(false);
      }
    }

    fetchProductCategories();
  }, []);

  // Handler
  async function handleSearch(ev) {
    ev.preventDefault();
    try {
      // Enable Loading
      setLoading(true);

      const endPoint = getEndPoint();
      console.log(endPoint);
      const response = await API.get(endPoint);

      setProducts(response.data.products);
    } catch (error) {
      errorHandler(error);
    } finally {
      // Disable Loading
      setLoading(false);
    }
  }

  function getEndPoint() {
    const searchTerm = searchRef.current.value.trim();
    const searchCategory = categoryRef.current.value;
    const searchSort = sortRef.current.value;
    const searchSortOrder = sortOrderRef.current.value;

    let baseEndpoint = "/products";

    if (searchTerm) baseEndpoint += `/search?q=${searchTerm}`;

    if (searchCategory != "None" && searchTerm)
      baseEndpoint += `&category=${searchCategory}`;
    else if (searchCategory != "None" && !searchTerm)
      baseEndpoint += `/category/${searchCategory}`;

    const sortElement = sortingList.find((x) => x.showValue == searchSort);

    if (searchSort != "None" && searchTerm)
      baseEndpoint += `&sortBy=${sortElement.apiValue}&order=${searchSortOrder}`;
    else if (searchSort != "None")
      baseEndpoint += `?sortBy=${sortElement.apiValue}&order=${searchSortOrder}`;

    return baseEndpoint;
  }

  if (loading) return <Loading />;

  return (
    <div>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h1>Search</h1>

        <div>
          <Form onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search"
              name="search"
              className="mb-2"
              aria-label="Search"
              ref={searchRef}
            />

            <Form.Select className="mb-2" ref={categoryRef}>
              {categories.map((category, i) => (
                <option key={i}>{category.name}</option>
              ))}
            </Form.Select>

            <div className="d-flex gap-2">
              <Form.Select className="mb-2" ref={sortRef} id="sortList">
                {sortingList.map((sort, i) => (
                  <option key={i}>{sort.showValue}</option>
                ))}
              </Form.Select>

              <Form.Select className="mb-2" ref={sortOrderRef}>
                {sortingOrder.map((sort, i) => (
                  <option key={i}>{sort}</option>
                ))}
              </Form.Select>
            </div>
            <Button variant="outline-success" type="submit" className="w-100">
              Search
            </Button>
          </Form>
        </div>
      </div>

      <div className="my-3">
        <ProductsPreview products={products} />
      </div>
    </div>
  );
};
