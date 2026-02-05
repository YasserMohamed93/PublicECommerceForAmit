import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { API } from "../../api/api";
import { errorHandler } from "../../utils/errorHandler";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  // Ref's
  const fNameRef = useRef();
  const lNameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();

  // Navigator
  const navigate = useNavigate();

  // Handler
  async function handleSignUp(ev) {
    ev.preventDefault();
    try {
      // Prepare Data
      const data = {
        firstName: fNameRef.current.value,
        lastName: lNameRef.current.value,
        email: emailRef.current.value,
        password: passRef.current.value,
      };

      // Hit Endpoint
      const response = await API.post("/users/add", data);
      console.log(response.data);

      // Redirect to Login
      navigate("/login");

      // Success
      toast.success("Data Submited Successfully", {
        icon: "🎉",
      });
    } catch (error) {
      errorHandler(error, "User Can not SignUp with This Data, Try Another.");
    }
  }

  return (
    <div>
      <h3 className="mb-4">Sign Up Form</h3>

      <Form onSubmit={handleSignUp}>
        {/* First Name & Last Name */}
        <div className="d-flex flex-column flex-md-row gap-3 mb-3">
          <Form.Group className="flex-fill">
            <Form.Label htmlFor="first-name">First Name</Form.Label>
            <Form.Control
              type="text"
              id="first-name"
              name="first-name"
              placeholder="John"
              required
              minLength={3}
              maxLength={50}
              ref={fNameRef}
            />
          </Form.Group>

          <Form.Group className="flex-fill">
            <Form.Label htmlFor="last-name">Last Name</Form.Label>
            <Form.Control
              type="text"
              id="last-name"
              name="last-name"
              placeholder="Smith"
              required
              minLength={3}
              maxLength={50}
              ref={lNameRef}
            />
          </Form.Group>
        </div>

        {/* Email */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            id="email"
            name="email"
            placeholder="john-smith@mail.com"
            required
            ref={emailRef}
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
          Sign Up
        </Button>
      </Form>
    </div>
  );
};
