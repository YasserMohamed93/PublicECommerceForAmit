import { Badge, Button, Card } from "react-bootstrap";
// import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addItemToCart } from "../../store/slices/cartSlice";
import { FaMale,FaFemale  } from "react-icons/fa";

export const UserCard = ({ user }) => {

  return (
    <Card className="h-100">
      <div className="position-relative">
        <Card.Img src={user.image} variant="top" className="p-3" />
      </div>

      <Card.Body>
        <Card.Title>
          {`${user.firstName} ${user.lastName}`}
          {user.gender == "male" ? <FaMale /> : <FaFemale />}
        </Card.Title>

        <div className="d-flex align-items-center mb-2">
          <span className="fw-meduim me-2">{user.age} Years</span>
          <FaStar className="me-1 text-warning" />
        </div>

        <div className="mb-3">
          <h6 className="fw-bold fs-5 text-primary me-2">UserName:{user.username}</h6>
          <h6 className="fw-bold fs-5 text-primary me-2">BirthDay:{user.birthDate}</h6>
        </div>
      </Card.Body>

      <Card.Footer>
        <Button
          className="w-100 my-3"
          as={Link}
          to={`/user-details/${user.id}`}
        >
          Show More
        </Button>
      </Card.Footer>
    </Card>
  );
};
