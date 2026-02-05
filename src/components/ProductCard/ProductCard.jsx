import { Badge, Button, Card } from "react-bootstrap";
// import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addItemToCart } from "../../store/slices/cartSlice";
// Input: Product
export const ProductCard = ({ product }) => {
  // Calc Discount
  const discountedPrice = (
    product.price -
    product.price * (product.discountPercentage / 100)
  ).toFixed(2);

  // Dispatch
  const dispatch = useDispatch();

  function handleAddToCart() {
    // Dispatch Add To Cart
    dispatch(addItemToCart(product));
  }

  return (
    <Card className="h-100">
      {/* Header Image + Budge */}
      <div className="position-relative">
        <Card.Img src={product.thumbnail} variant="top" className="p-3" />

        <Badge bg="danger" className="position-absolute top-0 start-0 m-2">
          -{product.discountPercentage} %
        </Badge>
      </div>

      {/* Text - Title + Rating + Price */}
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>

        <div className="d-flex align-items-center mb-2">
          <FaStar className="me-1 text-warning" />
          <span className="fw-meduim me-2">{product.rating}</span>
          <small className="text-muted">(Reviews)</small>
        </div>

        <div className="mb-3">
          <span className="fw-bold fs-5 text-primary me-2">
            ${discountedPrice}
          </span>

          <small className="text-muted text-decoration-line-through">
            ${product.price}
          </small>
        </div>
      </Card.Body>

      <Card.Footer>
        <Button
          className="w-100 mb-3"
          as={Link}
          to={`/product-details/${product.id}`}
        >
          Show More
        </Button>

        <Button
          variant="dark"
          disabled={product.stock <= 0}
          className="w-100"
          onClick={handleAddToCart}
        >
          {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </Card.Footer>
    </Card>
  );
};
