import { Box, Button, Image, Text, LinkBox } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import productImg from "../../../assets/images/item.png";

const CardProduct = ({ data }) => {
  console.log(data?.title);
  return (
    <Box
      display="flex"
      flexDir="column"
      height="345px"
      justifyContent="space-between"
    >
      <Box>
        <LinkBox maxH="200px" as={Link} to={`/product/${data.slug}`}>
          <Image
            src={data.thumbnail}
            maxW="500px"
            w="full"
            height="200px"
            objectFit="cover"
            objectPosition="center center"
            alt="product"
          />
        </LinkBox>
        <Box display="flex" flexDir="column" justifyContent="flex-start">
          <Box mb={3}>
            <Text as="h1" fontWeight="bold" mt={1}>
              <Link to={`/product/${data.slug}`}>{data?.title}</Link>
            </Text>
            <Text
              color="gray.500"
              fontSize="sm"
              _hover={{
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              <Link to="/category/keybord">keyboard</Link>
            </Text>
          </Box>
          <Text fontWeight="bold" my={1}>
            Rp.{data.price}
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
