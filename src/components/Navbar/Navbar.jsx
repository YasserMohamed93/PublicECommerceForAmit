import { Navbar as BNavbar, Button, Container, Nav } from "react-bootstrap";
import { SiWoocommerce } from "react-icons/si";
import { Link } from "react-router-dom";
import { LogoutButton } from "../LogoutButton/LogoutButton";
import { useSelector } from "react-redux";

export const Navbar = () => {
  // Select isLoggedIn
  const { isLoggedIn } = useSelector((store) => store.auth);

  return (
    <div>
      <BNavbar expand="md" bg="light" data-bs-theme="light">
        <Container>
          {/* Brand */}
          <BNavbar.Brand to="/" as={Link}>
            <SiWoocommerce className="display-1" />
          </BNavbar.Brand>

          {/* Toggler */}
          <BNavbar.Toggle />

          {/* Collapse */}
          <BNavbar.Collapse>
            {/* Links */}
            <Nav className="me-auto">
              {/* Home Link */}
              <Nav.Item>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
              </Nav.Item>

              {/* Products Link */}
              <Nav.Item>
                <Nav.Link as={Link} to="/products">
                  Products
                </Nav.Link>
              </Nav.Item>

              {/* Fliter Link */}
              <Nav.Item>
                <Nav.Link as={Link} to="/filters">
                  Filter Products
                </Nav.Link>
              </Nav.Item>

              {/* Cart Link */}
              <Nav.Item>
                <Nav.Link as={Link} to="/cart">
                  Cart
                </Nav.Link>
              </Nav.Item>

              {isLoggedIn && (
                <Nav.Link as={Link} to="/users">
                  Users
                </Nav.Link>
              )}
            </Nav>

            {/* Buttons Auth */}
            <div className="d-flex gap-2">
              {isLoggedIn ? (
                <>
                  {/* Logout Button */}
                  <LogoutButton />
                </>
              ) : (
                <>
                  <Button as={Link} to="/login">
                    Login
                  </Button>

                  <Button variant="outline-primary" as={Link} to="/register">
                    Register
                  </Button>
                </>
              )}
            </div>
          </BNavbar.Collapse>
        </Container>
      </BNavbar>
    </div>
  );
};
