import DataTable from "react-data-table-component";
import { ButtonGroup, Button, Text, Box, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import Layout from "./Layout";

const column = [
  {
    name: "Title",
    selector: (row) => row.title,
    sortable: true,
  },
  {
    name: "Year",
    selector: (row) => row.year,
  },
  {
    name: "Edit",
    selector: (row) => (
      <>
        <ButtonGroup size="sm" isAttached variant="outline">
          <Button>
            <Link to={`/dashboard/product/edit/${row.id}`}>Edit</Link>
          </Button>
          <Button
            color="red.300"
            _hover={{
              color: "red.500",
            }}
          >
            Delete
          </Button>
        </ButtonGroup>
      </>
    ),
  },
];

const data = [
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
];

const ListProduct = () => {
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
          <DataTable columns={column} data={data} />
        </Box>
      </Box>
    </Layout>
  );
};

export default ListProduct;
