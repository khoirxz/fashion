import { Box, Flex, Image, Text, LinkBox } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { CustomButton } from "../../global";

const CardProduct = ({ data }) => {
  console.log(data?.title);
  return (
    <Box display="flex" flexDir="column" justifyContent="space-between">
      <Box>
        <LinkBox as={Link} to={`/product/${data.slug}`}>
          <Image
            rounded="sm"
            mx="auto"
            src={data.thumbnail}
            maxW="180px"
            w="full"
            height="180px"
            objectFit="cover"
            objectPosition="center center"
            alt="product"
          />
        </LinkBox>
        <Box
          display="flex"
          flexDir="column"
          justifyContent="flex-start"
          textAlign="center"
          p={2}
        >
          <Flex flexDir="column" gap="5px">
            <Text as="h1" mt={1} fontWeight="semibold">
              <Link to={`/product/${data.slug}`}>{data?.title}</Link>
            </Text>
            <Text
              color="gray.600"
              fontSize="sm"
              _hover={{
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              <Link to="/category/keybord">{data?.category?.name}</Link>
            </Text>
            <Text fontWeight="semibold" mb={3}>
              Rp.{data.price}
            </Text>
            <CustomButton title="beli" textTransform="capitalize" />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default CardProduct;
