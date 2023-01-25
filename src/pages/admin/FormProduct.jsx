import { useState, useEffect } from "react";
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
  Image,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "./Layout";

import { CreateProduct, reset } from "../../features/productSlice";
import { InputControl } from "../../components/admin";

import axios from "axios";

const FormProduct = () => {
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  const { data } = useSelector((state) => state.product);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const uploadImage = async (file) => {
    const base64 = await convertBase64(file.target.files[0]);
    setThumbnail(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      const data = {
        title,
        thumbnail,
        price,
        description,
        createdAt: new Date().toISOString(),
      };
      await axios.patch(`http://localhost:5000/product/${id}`, data);
    } else {
      const data = {
        title,
        thumbnail,
        price,
        description,
        createdAt: new Date().toISOString(),
      };
      dispatch(CreateProduct(data));
    }
    navigate("/dashboard/products");
  };

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    const fetchProduct = async (id) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/product/${id}`,
          { cancelToken: cancelToken.token }
        );

        setTitle(response.data.title);
        setPrice(response.data.price);
        setThumbnail(response.data.thumbnail);
        setDescription(response.data.description);
      } catch (error) {
        if (axios.isCancel(err)) {
          console.log(err);
        }
        console.log(error);
      }
    };

    if (data?.status === 200) {
      navigate("/dashboard/products");
      dispatch(reset());
    }

    if (id) {
      fetchProduct(id);
    }

    return () => {
      cancelToken.cancel();
    };
  }, [dispatch]);

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
          <Box as="form" onSubmit={handleSubmit} p="5">
            <InputControl title="Thumbnails" my="3">
              {thumbnail ? (
                <Box w="52" h="52" rounded="md" position="relative">
                  <Image
                    position="absolute"
                    zIndex="10"
                    objectFit="cover"
                    w="full"
                    h="full"
                    src={thumbnail}
                    alt={title}
                  />
                  <Box
                    w="52"
                    h="52"
                    rounded="md"
                    bg="#0000009e"
                    zIndex="20"
                    position="relative"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    opacity={0}
                    transition="all"
                    cursor="pointer"
                    onClick={() => setThumbnail(null)}
                    _hover={{
                      opacity: 1,
                    }}
                    sx={{
                      transition: "opacity 0.3s",
                    }}
                  >
                    <Text fontSize="lg" fontWeight="bold" color="white">
                      Hapus
                    </Text>
                  </Box>
                </Box>
              ) : (
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
                            onChange={(e) => uploadImage(e)}
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
              )}
            </InputControl>

            <InputControl title="Title" my="3">
              <Input
                type="text"
                placeholder="Product name"
                background="white"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </InputControl>
            <InputControl title="Price" my="3">
              <Input
                type="number"
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </InputControl>
            <InputControl title="Description" my="3">
              <Textarea
                placeholder="Tulis tentang produkmu..."
                onChange={(e) => setDescription(e.target.value)}
                mt={1}
                rows={3}
                value={description}
              />
            </InputControl>

            <Box>
              {id ? (
                <Button colorScheme="facebook" type="submit">
                  Update
                </Button>
              ) : (
                <Button colorScheme="facebook" type="submit">
                  Save
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default FormProduct;
