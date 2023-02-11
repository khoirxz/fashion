import { useState } from "react";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { CreateCategory } from "../../features/categorySlice";
import { useNavigate } from "react-router-dom";

import Layout from "./Layout";
import { InputControl } from "../../components/admin";

const FormCategories = () => {
  const [category, setCategory] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { category };
    dispatch(CreateCategory(data));
    navigate("/dashboard/categories");
  };
  return (
    <Layout>
      <Box>
        <Text as="h1" fontSize="3xl" fontWeight="bold">
          Tambah kategori
        </Text>

        <Box as="form" my="10" onSubmit={handleSubmit}>
          <InputControl title="Name" mb="10">
            <Input
              borderRadius="none"
              type="text"
              placeholder="Kategori"
              background="white"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </InputControl>
          <Button
            borderRadius="none"
            bgColor="black"
            color="white"
            type="submit"
            _hover={{
              bgColor: "blackAlpha.700",
            }}
          >
            Simpan
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default FormCategories;
