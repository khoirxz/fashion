import { useState, useEffect } from "react";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { CreateCategory, UpdateCategory } from "../../features/categorySlice";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "./Layout";
import { InputControl } from "../../components/global";
import axios from "axios";

const FormCategories = () => {
  const [category, setCategory] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      dispatch(UpdateCategory({ category, id }));
      navigate("/dashboard/categories");
    } else {
      const data = { category };
      dispatch(CreateCategory(data));
      navigate("/dashboard/categories");
    }
    console.log(category);
  };

  useEffect(() => {
    const getCategory = async (id) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/category/${id}`
        );

        // console.log(response);
        setCategory(response.data.title);
      } catch (error) {
        console.log(error);
      }
    };

    getCategory(id);
  }, []);

  return (
    <Layout>
      <Box>
        <Text as="h1" fontSize="3xl" fontWeight="bold">
          {id ? "Edit Kategori" : "Tambah kategori"}
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
