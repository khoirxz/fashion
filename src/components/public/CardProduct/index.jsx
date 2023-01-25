import { Box, Button, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import productImg from "../../../assets/images/item.png";

const CardProduct = () => {
  return (
    <Box
      display="flex"
      flexDir="column"
      height="400px"
      justifyContent="space-between"
    >
      <Box>
        <Box maxH="200px" as={Link} to="/product/keyboard-keycron">
          <Image
            src={productImg}
            maxW="500px"
            w="full"
            height="200px"
            objectFit="cover"
            objectPosition="center center"
            alt="product"
          />
        </Box>
        <Box
          display="flex"
          flexDir="column"
          justifyContent="flex-start"
          as={Link}
          to="/product/keyboard-keycron"
        >
          <Box mb={3}>
            <Text as="h1" fontWeight="bold" mt={1}>
              Keyboard Keycron
            </Text>
            <Text
              color="gray.500"
              fontSize="sm"
              _hover={{
                textDecoration: "underline",
                cursor: "pointer",
              }}
              as={Link}
              to="/category/keyboard"
            >
              keyboard
            </Text>
          </Box>
          <Text fontWeight="bold" my={1}>
            Rp.2000.000
          </Text>
        </Box>
      </Box>
      <Button
        border="1px"
        borderColor="black"
        borderRadius="none"
        bgColor="transparent"
        _hover={{
          color: "white",
          bgColor: "black",
        }}
        _active={{
          bgColor: "#4e4848",
        }}
      >
        Beli
      </Button>
    </Box>
  );
};

export default CardProduct;
