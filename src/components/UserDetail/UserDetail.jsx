import { Button, Carousel, Container, Image } from "react-bootstrap";
import { FaStar } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { FaMale, FaFemale } from "react-icons/fa";

function UserDetail({ user }) {
  console.log(user);
  return (
    <Container>
      <div className="d-flex justify-content-center">
        <h1>
          {user.firstName} {user.lastName}
          {user.gender == "male" ? <FaMale /> : <FaFemale />}
        </h1>
      </div>

      <div className="d-flex justify-content-center ">
        <Image src={user.image} style={{ width: "400px" }}></Image>
        <div className="mt-5">
          <h4>E-mail:{user.email}</h4>
          <h4>UserName:{user.username}</h4>
          <h4>BirthDay:{user.birthDate}</h4>
          <h4>PhoneNumer:{user.phone}</h4>
          <h4>Age:{user.age}</h4>
        </div>
      </div>
    </Container>
  );
}

export default UserDetail;
