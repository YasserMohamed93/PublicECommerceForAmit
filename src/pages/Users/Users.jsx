import { useEffect, useState, useRef } from "react";
import { errorHandler } from "../../utils/errorHandler";
import { API } from "../../api/api";
import { ProductsPreview } from "../../components/ProductsPreview/ProductsPreview";
import { Loading } from "../../components/Loading/Loading";
import { Button, Form, Pagination } from "react-bootstrap";
import UsersPreview from "../../components/UsersPreview/UsersPreview";

export const Users = () => {
  // State
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const searchRef = useRef();

  // Pagination
  const LIMIT = 12;
  const [skip, setSkip] = useState(0);
  const [pages, setPages] = useState(0);
  const [curretPage, setPage] = useState(1);

  function calcSkip(page) {

    setSkip((page - 1) * LIMIT);

    setPage(page);
  }

  async function handleSearch(ev) {
    ev.preventDefault();
    try {
      // Enable Loading
      setLoading(true);

      var searchValue = searchRef.current.value.trim();

      const apiCall = searchValue
        ? `/users/search?q=${searchValue}&limit=${LIMIT}&skip=${skip}`
        : `/users?limit=${LIMIT}&skip=${skip}`;

      const response = await API.get(apiCall);

      const { users, total } = response.data;

      setUsers(users);
      setPages(Math.ceil(total / LIMIT));
    } catch (error) {
      errorHandler(error);
    } finally {
      // Disable Loading
      setLoading(false);
    }
  }

  // Effect
  useEffect(
    function () {
      async function fetchUsers() {
        try {
          // Enable Loading
          setLoading(true);
          // Hit Endpoint
          const response = await API.get(`/users?limit=${LIMIT}&skip=${skip}`);
          // Extract Data
          const { users, total } = response.data;

          setUsers(users);

          setPages(Math.ceil(total / LIMIT));
        } catch (error) {
          errorHandler(error);
        } finally {
          // Disable Loading
          setLoading(false);
        }
      }

      fetchUsers();
    },
    [skip],
  );

  if (loading) return <Loading />;
  return (
    <div>
      <h1>Users</h1>
      <Form onSubmit={handleSearch}>
        <Form.Control
          type="search"
          placeholder="Search"
          name="search"
          className="my-2"
          aria-label="Search"
          ref={searchRef}
        />
        <Button variant="outline-success" type="submit" className="w-100 mb-4">
          Search
        </Button>
      </Form>

      <UsersPreview users={users} />
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
