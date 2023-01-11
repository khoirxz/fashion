import { useEffect } from "react";
import DataTable from "react-data-table-component";
import { ButtonGroup, Button, Text, Box, Spinner } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { FetchAllUser, DeleteUser } from "../../features/usersSlice";

import Layout from "./Layout";

const ListUser = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(FetchAllUser());
  }, [dispatch]);

  const DataTableUser = () => {
    return (
      <DataTable
        columns={[
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
                    <Link to={`/dashboard/user/edit/${row._id}`}>Edit</Link>
                  </Button>
                  {user?._id === row._id ? (
                    <Button
                      color="red.300"
                      _hover={{
                        color: "red.500",
                      }}
                      disabled
                    >
                      Delete
                    </Button>
                  ) : (
                    <Button
                      color="red.300"
                      _hover={{
                        color: "red.500",
                      }}
                      onClick={() => dispatch(DeleteUser(row._id))}
                    >
                      Delete
                    </Button>
                  )}
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
              Add User
            </Button>
          </Box>
          {isLoading ? (
            <Box display="flex" justifyContent="center">
              <Spinner size="xl" />
            </Box>
          ) : data?.length >= 0 ? (
            <DataTableUser />
          ) : (
            "tidak tampil"
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default ListUser;
