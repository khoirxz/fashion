import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "react-data-table-component";
import {
  ButtonGroup,
  Button,
  Text,
  Box,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { FetchAllProduct, DeleteProduct } from "../../features/productSlice";
import Layout from "./Layout";

const ListProduct = () => {
  const dispatch = useDispatch();

  const deleteProduct = (id) => {
    dispatch(DeleteProduct(id));
  };

  useEffect(() => {
    dispatch(FetchAllProduct());
  }, [dispatch]);

  const { data, isLoading } = useSelector((state) => state.product);

  const DataTableList = () => {
    return (
      <DataTable
        columns={[
          {
            name: "Title",
            selector: (row) => row.title,
            sortable: true,
          },
          {
            name: "Price",
            selector: (row) => row.price,
          },
          {
            name: "Upload",
            selector: (row) => row.published.name,
          },
          {
            name: "Edit",
            selector: (row) => (
              <>
                <ButtonGroup size="sm" isAttached variant="outline">
                  <Button>
                    <Link to={`/dashboard/product/edit/${row._id}`}>Edit</Link>
                  </Button>
                  <Button
                    color="red.300"
                    _hover={{
                      color: "red.500",
                    }}
                    onClick={() => deleteProduct(row._id)}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </>
            ),
          },
        ]}
        data={data}
      />
    );
  };

  return (
    <Layout>
      <Box>
        <Flex
          flexDir="row"
          justifyItems="center"
          justifyContent="space-between"
        >
          <Text as="h1" fontSize="2xl">
            Daftar Barang
          </Text>
        </Flex>

        <Box my="10" shadow="md" rounded="lg" p="5" bg="white">
          <Box mb="5">
            <Button
              size="sm"
              colorScheme="linkedin"
              as={Link}
              to="/dashboard/product/add"
            >
              Add Product
            </Button>
          </Box>
          {isLoading ? (
            <Box display="flex" justifyContent="center">
              <Spinner size="xl" />
            </Box>
          ) : data?.length >= 0 ? (
            <DataTableList />
          ) : (
            "tidak tampil"
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default ListProduct;
