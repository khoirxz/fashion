import { Box, Image, chakra } from "@chakra-ui/react";
import Carousel from "react-multi-carousel";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

import "react-multi-carousel/lib/styles.css";

import DummyImg from "../../../assets/images/heroSlider.png";

const HeroBanner = () => {
  return (
    <Box my={8} maxW="1200px" maxH="500px" position="relative">
      <Carousel
        swipeable={true}
        draggable={true}
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        customDot={<CustomDot />}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        responsive={{
          desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
            slidesToSlide: 3, // optional, default to 1.
          },
          tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
            slidesToSlide: 2, // optional, default to 1.
          },
          mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
          },
        }}
        autoPlay={true}
        autoPlaySpeed={3000}
        showDots={true}
      >
        <Image
          src={DummyImg}
          alt="Slider"
          w="full"
          objectFit="cover"
          rounded="lg"
        />
        <Image
          src={DummyImg}
          alt="Slider"
          w="full"
          objectFit="cover"
          rounded="lg"
        />
      </Carousel>
    </Box>
  );
};

const CustomLeftArrow = ({ onClick }) => (
  <chakra.span
    onClick={() => onClick()}
    position="absolute"
    left="calc(1% + 1px)"
    cursor="pointer"
  >
    <BiChevronLeft size={30} />
  </chakra.span>
);
const CustomRightArrow = ({ onClick }) => (
  <chakra.span
    onClick={() => onClick()}
    position="absolute"
    right="calc(1% + 1px)"
    cursor="pointer"
  >
    <BiChevronRight size={30} />
  </chakra.span>
);
const CustomDot = ({ onClick, active, index, carouselState }) => {
  const { currentSlide } = carouselState;
  return (
    <chakra.button
      style={{ background: active ? "#352828" : "#898989ad" }}
      onClick={() => onClick()}
      w="15px"
      h="15px"
      rounded="full"
      mx="3px"
      my={2}
    ></chakra.button>
  );
};

export default HeroBanner;
