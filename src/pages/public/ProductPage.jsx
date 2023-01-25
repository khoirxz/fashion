import {
  Grid,
  Box,
  Text,
  Image,
  Badge,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";

import Layout from "./Layout";

import imgProduct from "../../assets/images/item.png";

const ProductPage = () => {
  return (
    <Layout>
      <Grid
        templateColumns="repeat(2, 1fr)"
        gap={3}
        my="20"
        mx={{ base: 5, xl: 0 }}
      >
        <Box>
          <Box maxW="400px" maxH="400px">
            <Image
              src={imgProduct}
              alt="Keyboard"
              maxW="500px"
              w="full"
              h="400px"
            />
          </Box>
        </Box>
        <Box>
          <Box>
            <Badge size="lg">Keyboard</Badge>
            <Text fontSize="5xl" fontWeight="bold" my={1}>
              Keychron K2
            </Text>
            <Box>
              <Text fontSize="sm" color="gray.500">
                200 Sold
              </Text>
            </Box>
            <Box my={3}>
              <Text>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias,
                expedita odio. Aspernatur, eveniet fugit consequuntur est earum
                molestiae, optio quia, velit nihil ex dolorum vitae ipsa enim
                doloribus odit eaque! Earum quos tempora, totam atque blanditiis
                corporis accusamus, asperiores, illo ea corrupti alias eos saepe
                quaerat sint. Deleniti quisquam non dicta, pariatur, optio,
                tenetur animi nobis quis quasi numquam sed!
              </Text>
            </Box>
            <Box mt={8}>
              <Text fontSize="sm" color="gray.500" textTransform="uppercase">
                Quantity
              </Text>
              <Box>
                <Flex>
                  <Box>
                    <InputGroup size="md">
                      <Input
                        type="number"
                        defaultValue={1}
                        border="1px"
                        borderRadius="none"
                        borderColor="black"
                      />
                      <InputRightElement>
                        <IconButton
                          bgColor="black"
                          borderRadius="none"
                          _hover={{
                            bgColor: "blackAlpha.700",
                          }}
                          size="sm"
                          icon={<AiOutlinePlus color="#ffffff" />}
                        />
                      </InputRightElement>
                    </InputGroup>
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Layout>
  );
};

export default ProductPage;
