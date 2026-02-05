import React, { useEffect, useState } from "react";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { useParams } from "react-router-dom";
import { Loading } from "../../components/Loading/Loading";
import { API } from "../../api/api";
import { errorHandler } from "../../utils/errorHandler";
import ProductDetail from "../../components/productDetail/ProductDetail";
import UserDetail from "../../components/UserDetail/UserDetail";

export const UserDetails = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [userState, setUserState] = useState();

  useEffect(
    function () {
      async function fetchUser() {
        try {
          // Enable Loading
          setLoading(true);
          // Hit Endpoint
          const response = await API.get(`/users/${id}`);
          console.log(response);
          // Extract Data
          const product = response.data;

          setUserState(product); // Store Products
        } catch (error) {
          errorHandler(error);
        } finally {
          // Disable Loading
          setLoading(false);
        }
      }
      fetchUser();
    },
    [id],
  );

  if (loading) return <Loading />;

  return (
    <div>
      <UserDetail user={userState} />
    </div>
  );
};
