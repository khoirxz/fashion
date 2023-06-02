import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  Text,
  Flex,
  Stack,
  Textarea,
  Button,
  Image,
  IconButton,
  Select,
  Skeleton,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { RiAddFill, RiDeleteBin7Fill } from "react-icons/ri";
import Layout from "./Layout";

import { CreateProduct } from "../../features/productSlice";
import { FetchAllCategories } from "../../features/categorySlice";
import { InputImage } from "../../components/admin";
import { InputControl } from "../../components/global";

import axios from "axios";

const FormProduct = () => {
  const [thumbnail, setThumbnail] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [titleOption, setTitleOption] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [options, setOptions] = useState([
    {
      value: "",
    },
  ]);
  const [specification, setSpecification] = useState([{ key: "", value: "" }]);

  const { data: category, isLoading } = useSelector((state) => state.category);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //! handle Information field
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
  //! end of handle information

  //! handle options field
  const handleAddOptions = () => {
    setOptions([...options, { value: "" }]);
  };
  const handleRemoveOption = (index) => {
    setOptions(options.filter((o, i) => i !== index));
  };
  const handleValueOption = (e, index) => {
    const newOption = [...options];
    newOption[index] = { value: e.target.value };
    setOptions(newOption);
  };
  //! end of handle options field

  //! handle submit or update
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
      const data = new FormData();
      data.append("title", title);
      thumbnail.map((item) => {
        data.append("image", item.file);
      });
      data.append("price", price);
      data.append("description", description);
      data.append("category", selectCategory);
      data.append("titleOptions", titleOption);
      options.map((item) => {
        data.append("values", item.value);
      });
      specification.map((itemkey, i) => {
        data.append("key", itemkey.key);
        data.append("svalue", specification[i].value);
      });
      console.log(thumbnail);
      dispatch(CreateProduct(data));
    }
    // navigate("/dashboard/products");
  };

  useEffect(() => {
    dispatch(FetchAllCategories());

    const fetchProduct = async (id) => {
      try {
        const { data: response } = await axios.get(
          `http://localhost:5000/product/${id}`
        );

        console.log(response);
        setTitle(response.title);
        setPrice(response.price);
        setSelectCategory(response.category.name);
        setDescription(response.description);
        setTitleOption(response.option.title);
        setOptions(response.option.options);
        setThumbnail(response.thumbnail);
        setSpecification(response.specification);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      fetchProduct(id);
    }
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
              <Box display="flex" gap={4}>
                {thumbnail.map((item, i) => (
                  <React.Fragment key={i}>
                    <Box w="52" h="52" rounded="md" position="relative">
                      <Image
                        position="absolute"
                        zIndex="10"
                        objectFit="cover"
                        w="full"
                        h="full"
                        rounded="md"
                        alt={item.name}
                        src={id ? `http:${item.url}` : item.url}
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
                        onClick={() => setThumbnail([])}
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
                  </React.Fragment>
                ))}
                {thumbnail.length >= 5 ? null : (
                  <InputImage
                    thumbnail={thumbnail}
                    setThumbnail={setThumbnail}
                  />
                )}
              </Box>
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
              {isLoading ? (
                <Skeleton height="30px" />
              ) : (
                <Select
                  placeholder="Pilih kategori"
                  borderColor="blackAlpha.400"
                  borderRadius="none"
                  value={selectCategory}
                  onChange={(e) => setSelectCategory(e.target.value)}
                >
                  {category?.length >= 0
                    ? category?.map((item) => (
                        <option key={item._id} value={item.title}>
                          {item.title}
                        </option>
                      ))
                    : null}
                </Select>
              )}
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

            <InputControl title="Opsi produk" my="10">
              <Input
                borderColor="blackAlpha.400"
                borderRadius="none"
                type="text"
                placeholder="Contoh: Warna, Model, Seri"
                onChange={(e) => setTitleOption(e.target.value)}
                value={titleOption}
              />
              <Stack my="5">
                {options?.map((item, index) => (
                  <Flex gap={3} justifyContent="space-between" key={index}>
                    <Input
                      pl="5"
                      variant="flushed"
                      maxW="600px"
                      placeholder="Contoh: Merah, i7, Seri Produk"
                      onChange={(e) => handleValueOption(e, index)}
                      value={item.value}
                    />
                    <Flex gap={3}>
                      {options.length === index + 1 ? (
                        <IconButton
                          aria-label="Add Form"
                          borderRadius="none"
                          bgColor="black"
                          onClick={handleAddOptions}
                          _hover={{ bgColor: "blackAlpha.700" }}
                          icon={<RiAddFill size={28} color="#ffffff" />}
                        />
                      ) : null}
                      {console.table({ table: options.length, index })}
                      <IconButton
                        aria-label="Delete Form"
                        borderRadius="none"
                        bgColor="black"
                        onClick={() => handleDelete(index)}
                        _hover={{ bgColor: "blackAlpha.700" }}
                        onClickCapture={() => handleRemoveOption(index)}
                        icon={<RiDeleteBin7Fill size="28px" color="#ffffff" />}
                      />
                    </Flex>
                  </Flex>
                ))}
              </Stack>
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
