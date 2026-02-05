import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decreaseQty,
  increaseQty,
  removeItemFromCart,
} from "../../store/slices/cartSlice";

export const Cart = () => {
  // Get Store Items
  const { items, totalAmount } = useSelector((store) => store.cart);

  // Dispatch
  const dispatch = useDispatch();

  // Handle Cart Empty
  if (items.length === 0) {
    return <h4 className="text-center text-muted"> Cart is Empty </h4>;
  }

  return (
    <Row>
      <Col md={8}>
        <Card className="border-0 rounded-4 shadow-lg">
          <Card.Header className="bg-dark text-white rounded-top-4">
            <h4 className="mb-0">
              Shopping Cart <Badge bg="success">{items.length}</Badge>
            </h4>
          </Card.Header>

          <ListGroup variant="flush">
            {items.map((item) => (
              <ListGroup.Item key={item.id} className="py-3">
                <Row className="g-1 align-items-center">
                  {/* Title & Price */}
                  <Col md={4}>
                    <h6> {item.title} </h6>
                    <small className="text-muted">${item.price}</small>
                  </Col>

                  {/* Qty */}
                  <Col md={4} className="d-flex gap-3 align-items-center">
                    <Button
                      variant={
                        item.quantity === 1 ? "secondary" : "outline-danger"
                      }
                      size="sm"
                      disabled={item.quantity === 1}
                      onClick={() => dispatch(decreaseQty(item.id))}
                    >
                      -
                    </Button>

                    <span className="fw-bold">{item.quantity}</span>

                    <Button
                      variant={
                        item.quantity >= item.stock
                          ? "secondary"
                          : "outline-success"
                      }
                      size="sm"
                      disabled={item.quantity >= item.stock}
                      onClick={() => dispatch(increaseQty(item.id))}
                    >
                      +
                    </Button>
                  </Col>

                  {/* Total Amount Per Item */}
                  <Col md={2} className="fw-bold text-success">
                    ${(item.price * item.quantity).toFixed(2)}
                  </Col>

                  {/* Remove Item */}
                  <Col md={2}>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => dispatch(removeItemFromCart(item.id))}
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>

          {/* Footer Total Amount & Clear Cart */}
          <Card.Footer className="bg-light">
            <Row className="align-items-center g-2">
              <Col>
                <h5 className="mb-0">
                  Total{" "}
                  <span className="text-success">
                    ${totalAmount.toFixed(2)}
                  </span>
                </h5>
              </Col>

              <Col className="text-end">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => dispatch(clearCart())}
                >
                  Clear Cart
                </Button>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};
