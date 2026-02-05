import { Button } from "react-bootstrap";
import { GiExitDoor } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { clearUser } from "../../store/slices/authSlice";

export const LogoutButton = () => {
  // Dispatch
  const dispatch = useDispatch();

  // Handler
  function logoutHandler() {
    // Global Clear User
    dispatch(clearUser());

    // Clear AccessToken
    localStorage.removeItem("accessToken");
  }

  return (
    <Button variant="outline-danger" onClick={logoutHandler}>
      <GiExitDoor />
    </Button>
  );
};
