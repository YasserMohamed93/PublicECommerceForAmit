import { Carousel, Container } from "react-bootstrap";
import { IMAGES } from "../../constants/images";
import { SortedProducts } from "../../components/SortedProducts/SortedProducts";
import { PromoBannar } from "../../components/PromoBannar/PromoBannar";

export const Home = () => {
  return (
    <div>
      {/* Slider */}
      {/* <Carousel fade>
        <Carousel.Item>
          <img src={IMAGES.HERO_1} alt="HERO_1" />
        </Carousel.Item>

        <Carousel.Item>
          <img src={IMAGES.HERO_2} alt="HERO_2" />
        </Carousel.Item>

        <Carousel.Item>
          <img src={IMAGES.HERO_3} alt="HERO_3" />
        </Carousel.Item>

        <Carousel.Item>
          <img src={IMAGES.HERO_4} alt="HERO_4" />
        </Carousel.Item>
      </Carousel> */}

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
