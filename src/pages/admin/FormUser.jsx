import { Box, Input, Text, Textarea, Button, Select } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Layout from "./Layout";

import { InputControl } from "../../components/admin";

const FormUser = () => {
  const { id } = useParams();

  //! check param id
  // console.log(id);
  return (
    <Layout>
      <Box>
        <Box>
          <Text as="h1" fontSize="2xl">
            {id ? "Edit User" : "Add User"}
          </Text>
        </Box>
        <Box my="10" bgColor="white" shadow="md" rounded="xl">
          <Box as="form" p="5">
            <InputControl title="Name" space="sm">
              <Input type="text" placeholder="Name" />
            </InputControl>
            <InputControl title="Email" space="sm">
              <Input type="email" placeholder="Email adress" />
            </InputControl>
            <InputControl title="role" space="sm">
              <Select placeholder="Select role">
                <option value="admin">Admin</option>
                <option value="user">user</option>
              </Select>
            </InputControl>

            <Box mt="5">
              {id ? (
                <Button colorScheme="facebook">Update</Button>
              ) : (
                <Button colorScheme="facebook">Save</Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default FormUser;
