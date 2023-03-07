import { useEffect } from "react";
import { Box, Text, Button, Skeleton } from "@chakra-ui/react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { FetchAllCategories } from "../../features/categorySlice";

import Layout from "./Layout";

const Categories = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchAllCategories());
  }, [dispatch]);

  const { data, isLoading, isError } = useSelector((state) => state.category);

  return (
    <Layout>
      <Box>
        <Text as="h1" fontSize="3xl" fontWeight="bold">
          Kategori Produk
        </Text>

        <Box my="10" p="5" bg="white">
          <Box mb="5">
            <Button
              size="sm"
              bgColor="black"
              color="white"
              borderRadius="none"
              _hover={{
                bgColor: "blackAlpha.700",
              }}
              as={Link}
              to="/dashboard/categories/add"
            >
              Add Category
            </Button>
          </Box>

          <Box display="flex" flexDir="column" mt={10}>
            {isError ? (
              <Text>Something wrong</Text>
            ) : !isLoading ? (
              data?.length >= 0 ? (
                data?.map((item) => (
                  <ListComponent
                    key={item._id}
                    title={item.title}
                    id={item._id}
                  />
                ))
              ) : null
            ) : (
              <Skeleton h="40px" />
            )}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

const ListComponent = ({ title, id }) => {
  return (
    <Box
      pb={3}
      mb="10"
      borderBottom="1px"
      borderColor="gray.200"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Text>{title}</Text>
      <Box display="flex" gap={3}>
        <Button
          leftIcon={<AiFillEdit />}
          size="sm"
          borderRadius="none"
          as={Link}
          to={`/dashboard/categories/edit/${id}`}
        >
          Edit
        </Button>
        <Button
          borderRadius="none"
          leftIcon={<AiFillDelete color="#ff4133" />}
          size="sm"
          color="#ff4133"
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default Categories;
