// Imports Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.scss";

// Imports Lib
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";

// Imports Components
import { Navbar } from "./components/Navbar/Navbar";

// Imports Pages
import { Home } from "./pages/Home/Home";
import { Products } from "./pages/Products/Products";
import { ProductDetails } from "./pages/ProductDetails/ProductDetails";
import { Cart } from "./pages/Cart/Cart";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { NotFound } from "./pages/NotFound/NotFound";
import { useEffect, useState } from "react";
import { API } from "./api/api";
import { errorHandler } from "./utils/errorHandler";
import { clearUser, setUser } from "./store/slices/authSlice";
import { Loading } from "./components/Loading/Loading";
import { Filters } from "./pages/Filters/Filters";
import {Users} from "./pages/Users/Users"
import { UserDetails } from "./pages/UserDetails/UserDetails";

export default function App() {
  // Select isLoggedIn
  const { isLoggedIn } = useSelector((store) => store.auth);

  // State
  const [loading, setLoading] = useState(true);

  // Dispatch
  const dispatch = useDispatch();

  useEffect(function () {
    async function getMe() {
      // Check Access Token
      const token = localStorage.getItem("accessToken");

      if (token) {
        try {
          // Get Information - Hit Endpoint
          const response = await API.get("/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // Data
          const payload = response.data;

          // Store Global Redux
          dispatch(setUser(payload));
        } catch (_) {
          // Error Tokan Invalid or Expired
          dispatch(clearUser());
          localStorage.removeItem("accessToken");
        }
      }

      setLoading(false);
    }

    getMe();
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      {/* Navbar */}
      <Navbar></Navbar>

      {/* Notify */}
      <Toaster position="top-right"></Toaster>

      {/* Routes */}
      <Container className="my-4">
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/products" Component={Products} />
          <Route path="/product-details/:id" Component={ProductDetails} />
          <Route path="filters" Component={Filters} />
          <Route path="/cart" Component={Cart} />
          {isLoggedIn && (
            <>
              <Route path="/users" Component={Users} />
              <Route path="/user-details/:id" Component={UserDetails} />
            </>
          )}

          {!isLoggedIn && (
            <>
              <Route path="/login" Component={Login} />
              <Route path="/register" Component={Register} />
            </>
          )}

          {/* NotFound Route */}
          <Route path="*" Component={NotFound} />
        </Routes>
      </Container>
    </div>
  );
}
