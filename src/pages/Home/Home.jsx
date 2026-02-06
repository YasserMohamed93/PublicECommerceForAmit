import { Carousel, Container } from "react-bootstrap";
import { IMAGES } from "../../constants/images";
import { SortedProducts } from "../../components/SortedProducts/SortedProducts";
import { PromoBannar } from "../../components/PromoBannar/PromoBannar";

export const Home = () => {
  return (
    <div>


      <div className="my-3">
        <h1 className="mb-3">Popular Products</h1>

        <SortedProducts order="desc" sortBy="rating" />
      </div>

      <PromoBannar />

      <div className="my-3">
        <h1 className="mb-3">Summar Saled Products</h1>

        <SortedProducts order="desc" sortBy="discountPercentage" />
      </div>
    </div>
  );
};
