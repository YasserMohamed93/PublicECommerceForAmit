import { Button, Carousel, Container, Image } from "react-bootstrap";
import { FaStar } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/slices/cartSlice";

function ProductDetail({ product }) {
  const dispatch = useDispatch();

  function handleAddToCart() {
    // Dispatch Add To Cart
    dispatch(addItemToCart(product));
  }

  const discountedPrice = (
    product.price -
    product.price * (product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <Container>
      <div className="mt-5 d-flex flex-column flex-lg-row justify-content-center ">
        <div className="">
          {/* <Image src={product.images}  /> */}
          <Carousel fade controls indicators>
            {product.images.map((image, i) => (
              <Carousel.Item key={i}>
                <Image src={image} alt="HERO_1" style={{ width: "500px" }} />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <div className="mt-5">
          <h2>{product.title}</h2>
          <h4>Category:{product.category}</h4>

          <div className="d-flex align-items-center mb-2">
            <FaStar className="me-1 text-warning" />
            <span className="fw-meduim me-2">{product.rating}</span>
            <small className="text-muted">(Reviews)</small>
          </div>

          <p>Description:{product.description}</p>

          <div>
            <h4>Dimensions</h4>
            <ul>Width:{product.dimensions.width}</ul>
            <ul>Height:{product.dimensions.height}</ul>
            <ul>Depth:{product.dimensions.depth}</ul>
          </div>
          <h4>{product.returnPolicy}</h4>
          <h4 style={{ color: "red" }}> {product.availabilityStatus}</h4>

          <h4>{product.shippingInformation}</h4>
          <div className="mb-3">
            <span className="fw-bold fs-5 text-primary me-2">
              ${discountedPrice}
            </span>

            <small className="text-muted text-decoration-line-through">
              ${product.price}
            </small>
          </div>
          {product.stock != 0 && (
            <Button onClick={handleAddToCart}>AddToCart</Button>
          )}
        </div>
      </div>

      <div>
        <h2>Reviews</h2>
        <hr />
        {product.reviews.map((review, i) => (
          <div className="mb-5" key={i}>
            <div className="d-flex align-items-center mb-2">
              <span className="fw-meduim me-2">{review.rating}</span>
              <FaStar className="me-1 text-warning" />
            </div>
            <h5>Reviewer:{review.reviewerName}</h5>
            <p>Comment:{review.comment}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default ProductDetail;
