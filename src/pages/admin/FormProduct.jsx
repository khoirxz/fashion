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
  IconButton,
  Select,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { RiAddFill, RiDeleteBin7Fill } from "react-icons/ri";
import Layout from "./Layout";

import { CreateProduct, reset } from "../../features/productSlice";
import { InputControl } from "../../components/admin";

import axios from "axios";

const FormProduct = () => {
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [specification, setSpecification] = useState([{ key: "", value: "" }]);

  const { data } = useSelector((state) => state.product);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddInput = () => {
    setSpecification([...specification, { key: "", value: "" }]);
  };

  const handelChangeInput = (e, index) => {
    const newSpecification = [...specification];
    newSpecification[index][e.target.name] = e.target.value;
    setSpecification(newSpecification);
  };

  const handleDelete = (index) => {
    setSpecification(specification.filter((s, i) => i !== index));
  };

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
        specification,
        modifiedAt: new Date().toISOString(),
      };
      await axios.patch(`http://localhost:5000/product/${id}`, data);
    } else {
      const data = {
        title,
        thumbnail,
        price,
        description,
        specification,
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
        setSpecification(response.data.specification);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log(error);
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
          <Text as="h1" fontSize="3xl" fontWeight="bold">
            {id ? "Edit Product" : "Add Product"}
          </Text>
        </Box>
        <Box my="10" bgColor="white">
          <Box as="form" onSubmit={handleSubmit} p="5">
            <InputControl title="Thumbnails" my="5">
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

            <InputControl title="Title" my="10">
              <Input
                borderColor="blackAlpha.400"
                borderRadius="none"
                type="text"
                placeholder="Product name"
                background="white"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </InputControl>

            <InputControl title="Price" my="10">
              <Input
                borderColor="blackAlpha.400"
                borderRadius="none"
                type="number"
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </InputControl>

            <InputControl title="Kategori" my="10">
              <Select
                placeholder="Pilih kategori"
                borderColor="blackAlpha.400"
                borderRadius="none"
              >
                <option value="keyboard">keyboard</option>
              </Select>
            </InputControl>

            <InputControl title="Information" my="10">
              {specification.map((s, index) => (
                <Flex gap={3} key={index} mb={3}>
                  {s?.id && <Input type="hidden" value={s?.id} />}
                  <Input
                    type="text"
                    name="key"
                    value={s.key}
                    onChange={(e) => handelChangeInput(e, index)}
                    placeholder="Properti contoh: Merk, Berat"
                    borderColor="blackAlpha.400"
                    borderRadius="none"
                  />
                  <Input
                    type="text"
                    name="value"
                    value={s.value}
                    onChange={(e) => handelChangeInput(e, index)}
                    placeholder="Properti contoh: Logitech, 1 kg"
                    borderColor="blackAlpha.400"
                    borderRadius="none"
                  />
                  {specification.length <= 1 ? (
                    <IconButton
                      aria-label="Delete Form"
                      borderRadius="none"
                      bgColor="black"
                      _hover={{ bgColor: "blackAlpha.700" }}
                      icon={<RiDeleteBin7Fill size="28px" color="#ffffff" />}
                      disabled
                    />
                  ) : (
                    <IconButton
                      aria-label="Delete Form"
                      borderRadius="none"
                      bgColor="black"
                      onClick={() => handleDelete(index)}
                      _hover={{ bgColor: "blackAlpha.700" }}
                      icon={<RiDeleteBin7Fill size="28px" color="#ffffff" />}
                    />
                  )}
                </Flex>
              ))}
              <Stack direction="row" spacing={4} my={3}>
                <Button
                  leftIcon={<RiAddFill size={28} color="#ffffff" />}
                  borderRadius="none"
                  bgColor="black"
                  color="white"
                  _hover={{ bgColor: "blackAlpha.700" }}
                  onClick={handleAddInput}
                >
                  Add properties
                </Button>
              </Stack>
            </InputControl>

            <InputControl title="Description" my="10">
              <Textarea
                borderColor="blackAlpha.400"
                borderRadius="none"
                placeholder="Tulis tentang produkmu..."
                onChange={(e) => setDescription(e.target.value)}
                mt={1}
                rows={3}
                value={description}
              />
            </InputControl>

            <Box>
              {id ? (
                <Button
                  borderRadius="none"
                  bgColor="black"
                  color="white"
                  type="submit"
                  _hover={{
                    bgColor: "blackAlpha.700",
                  }}
                >
                  Update
                </Button>
              ) : (
                <Button
                  borderRadius="none"
                  bgColor="black"
                  color="white"
                  type="submit"
                  _hover={{
                    bgColor: "blackAlpha.700",
                  }}
                >
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
