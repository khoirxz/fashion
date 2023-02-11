import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
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
  InputLeftElement,
  Button,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

import Layout from "./Layout";

import imgProduct from "../../assets/images/item.png";

const ProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({});
  const [quantity, setQuantity] = useState(1);

  const { slug } = useParams();
  const navigate = useNavigate();

  const handleQuantity = (e) => {
    const { value } = e.target;

    if (value === 0) {
      setQuantity(1);
    }
  };

  useEffect(() => {
    if (!slug) return navigate("/");
    // console.log(slug);

    const getProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/public/products/${slug}`
        );

        setProductData(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getProduct();
  }, [slug]);
  return (
    <Layout>
      <Grid
        templateColumns="repeat(2, 1fr)"
        gap={3}
        my="20"
        mx={{ base: 5, xl: 0 }}
      >
        {loading ? (
          <>
            <Skeleton w="400px" h="400px" />
            <Stack>
              <Skeleton h="500px" />
              <Skeleton h="200px" />
            </Stack>
          </>
        ) : (
          <>
            <Box>
              <Box maxW="400px" maxH="400px">
                <Image
                  src={productData.thumbnail}
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
                <Text fontSize="4xl" fontWeight="bold" my={1}>
                  {productData.title}
                </Text>

                <Box>
                  <Text fontSize="sm" color="gray.500">
                    200 Sold
                  </Text>
                </Box>
                <Box my="3rem">
                  <Text
                    fontSize="sm"
                    color="gray.500"
                    textTransform="uppercase"
                    mb={2}
                  >
                    Quantity
                  </Text>
                  <Box>
                    <Flex>
                      <Box>
                        <InputGroup size="md">
                          <InputLeftElement>
                            {quantity <= 1 ? (
                              <IconButton
                                bgColor="black"
                                borderRadius="none"
                                _hover={{
                                  bgColor: "blackAlpha.400",
                                }}
                                size="sm"
                                icon={<AiOutlineMinus color="#ffffff" />}
                                disabled
                                cursor="not-allowed"
                                _disabled={{
                                  bgColor: "blackAlpha.400",
                                }}
                              />
                            ) : (
                              <IconButton
                                bgColor="black"
                                borderRadius="none"
                                onClick={() => {
                                  if (quantity <= 1) {
                                    setQuantity(1);
                                  } else {
                                    setQuantity((prev) => prev - 1);
                                  }
                                }}
                                _hover={{
                                  bgColor: "blackAlpha.700",
                                }}
                                size="sm"
                                icon={<AiOutlineMinus color="#ffffff" />}
                              />
                            )}
                          </InputLeftElement>
                          <Input
                            type="number"
                            value={quantity}
                            onChange={handleQuantity}
                            border="1px"
                            borderRadius="none"
                            borderColor="black"
                            textAlign="center"
                          />
                          <InputRightElement>
                            <IconButton
                              bgColor="black"
                              borderRadius="none"
                              onClick={() => {
                                setQuantity((prev) => prev + 1);
                              }}
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

                <Box my="3rem">
                  <Text>{productData.description}</Text>
                </Box>

                <Box>
                  <Text
                    fontSize="sm"
                    textTransform="uppercase"
                    fontWeight="bold"
                    my={12}
                    mb={2}
                  >
                    Informasi
                  </Text>
                  <Flex flexDir="column">
                    {productData?.specification?.map((item, i) => (
                      <Flex
                        key={i}
                        justifyContent="space-between"
                        borderColor="gray.200"
                        mt={1}
                        mb={3}
                      >
                        <Text color="gray.500">{item.key}</Text>
                        <Text>{item.value}</Text>
                      </Flex>
                    ))}
                  </Flex>
                </Box>

                <Box my={3}>
                  <Text fontSize="3xl" fontWeight="bold" my={1}>
                    Rp.{productData.price}
                  </Text>
                </Box>
                <Box display="flex" mt={2}>
                  <Button
                    w="full"
                    bgColor="black"
                    borderRadius="none"
                    color="white"
                    _hover={{
                      bgColor: "blackAlpha.800",
                    }}
                  >
                    BELI
                  </Button>
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Grid>
    </Layout>
  );
};

export default ProductPage;
