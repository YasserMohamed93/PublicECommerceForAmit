import React, { useRef } from "react";
import { errorHandler } from "../../utils/errorHandler";
import { Button, Form } from "react-bootstrap";
import { API } from "../../api/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";

export const Login = () => {
  // Ref's
  const usernameRef = useRef();
  const passRef = useRef();

  // Navigator
  const navigate = useNavigate();

  // Dispatch
  const dispatch = useDispatch();

  // Handler
  async function handleSignIn(ev) {
    ev.preventDefault();

    try {
      // Prepare Data
      const data = {
        username: usernameRef.current.value,
        password: passRef.current.value,
      };

      // Hit Endpoint
      const response = await API.post("/auth/login", data);

      // Store User Data - Global: UserSlice
      const payload = response.data;
      dispatch(setUser(payload)); // Call Action

      // Store Access Token - LocalStorage
      localStorage.setItem("accessToken", payload.accessToken);

      // Redirect to Home
      navigate("/");

      // Success
      toast.success("Welcome to Our E-Commerce", {
        icon: "🎉",
      });
    } catch (error) {
      console.log(error);
      errorHandler(error, "Invalid Crediental");
    }
  }

  return (
    <div>
      <h3 className="mb-4">Sign In Form</h3>

      <Form onSubmit={handleSignIn}>
        {/* Username */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            type="text"
            id="username"
            name="username"
            placeholder="JohnSmith"
            required
            ref={usernameRef}
          />
        </Form.Group>

        {/* Password */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            name="password"
            placeholder="Strong Password"
            required
            ref={passRef}
          />
        </Form.Group>

        {/* Submit */}
        <Button type="submit" className="w-25">
          Sign In
        </Button>
      </Form>
    </div>
  );
};
