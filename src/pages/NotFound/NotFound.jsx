import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IMAGES } from "../../constants/images";

export const NotFound = () => {
  return (
    <div>
      <div className="d-flex gap-3 align-items-center justify-content-between">
        <h3>Not Found</h3>

        <Button as={Link} to="/" variant="dark">
          Return To Home
        </Button>
      </div>

      <div className="my-3 text-center">
        <img src={IMAGES.NOT_FOUND_GIF} alt="NOT_FOUND_GIF" />
      </div>
    </div>
  );
};
