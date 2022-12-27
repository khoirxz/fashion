import DataTable from "react-data-table-component";
import { ButtonGroup, Button, Text, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import Layout from "./Layout";

const column = [
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.email,
  },
  {
    name: "Role",
    selector: (row) => row.role,
  },
  {
    name: "Edit",
    selector: (row) => (
      <>
        <ButtonGroup size="sm" isAttached variant="outline">
          <Button>
            <Link to={`/dashboard/user/edit/${row.id}`}>Edit</Link>
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
    name: "Superadmin",
    email: "admin@admin.com",
    role: "admin",
  },
  {
    id: 2,
    name: "User",
    email: "user@user.com",
    role: "user",
  },
  {
    id: 3,
    name: "User1",
    email: "user@user.com",
    role: "user",
  },
];

const ListUser = () => {
  return (
    <Layout>
      <Box>
        <Box>
          <Text as="h1" fontSize="2xl">
            Daftar User
          </Text>
        </Box>

        <Box my="10" shadow="md" rounded="lg" p="5" bg="white">
          <Box mb="5">
            <Button
              size="sm"
              colorScheme="linkedin"
              as={Link}
              to="/dashboard/user/add"
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

export default ListUser;
