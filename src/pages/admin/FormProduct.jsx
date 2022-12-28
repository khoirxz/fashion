import {
  Box,
  chakra,
  Input,
  Text,
  Flex,
  Stack,
  Icon,
  VisuallyHidden,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Layout from "./Layout";

import { InputControl } from "../../components/admin";

const FormProduct = () => {
  const { id } = useParams();

  //! check param id
  // console.log(id);
  return (
    <Layout>
      <Box>
        <Box>
          <Text as="h1" fontSize="2xl">
            {id ? "Edit Product" : "Add Product"}
          </Text>
        </Box>
        <Box my="10" bgColor="white" shadow="md" rounded="xl">
          <Box as="form" p="5">
            <InputControl title="Thumbnails" my="3">
              <Flex
                w="52"
                h="52"
                rounded="md"
                borderWidth="2px"
                borderColor="gray.500"
                borderStyle="dashed"
                justify="center"
              >
                <Stack
                  spacing={1}
                  textAlign="center"
                  id="Flex"
                  justifyContent="center"
                >
                  <Icon
                    mx="auto"
                    boxSize={12}
                    color="gray.400"
                    _dark={{
                      color: "gray.500",
                    }}
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Icon>
                  <Flex
                    fontSize="sm"
                    color="gray.600"
                    _dark={{
                      color: "gray.400",
                    }}
                    alignItems="center"
                    flexDir="column"
                  >
                    <chakra.label
                      htmlFor="file-upload"
                      cursor="pointer"
                      rounded="md"
                      fontSize="md"
                      color="brand.600"
                      _dark={{
                        color: "brand.200",
                      }}
                      pos="relative"
                      _hover={{
                        color: "brand.400",
                        _dark: {
                          color: "brand.300",
                        },
                      }}
                    >
                      <span>Upload a file</span>
                      <VisuallyHidden>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                        />
                      </VisuallyHidden>
                    </chakra.label>
                  </Flex>
                  <Text
                    fontSize="xs"
                    color="gray.500"
                    _dark={{
                      color: "gray.50",
                    }}
                  >
                    PNG, JPG, GIF up to 10MB
                  </Text>
                </Stack>
              </Flex>
            </InputControl>

            <InputControl title="Title" my="3">
              <Input
                type="text"
                placeholder="Product name"
                background="white"
              />
            </InputControl>
            <InputControl title="Price" my="3">
              <Input type="number" placeholder="Price" />
            </InputControl>
            <InputControl title="Description" my="3">
              <Textarea placeholder="you@example.com" mt={1} rows={3} />
            </InputControl>

            <Box>
              {id ? (
                <Button colorScheme="facebook">Update</Button>
              ) : (
                <Button colorScheme="facebook">Save</Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default FormProduct;
