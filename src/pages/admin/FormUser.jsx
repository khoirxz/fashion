import { useState, useEffect } from "react";
import { Box, Input, Text, Button, Select, Skeleton } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CreateUser, reset } from "../../features/usersSlice";

import Layout from "./Layout";

import { InputControl } from "../../components/global";
import axios from "axios";

const FormUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const { data } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table({ name, email, password, confirmPassword, role });
    if (id) {
      const data = {
        name,
        email,
        password,
        confirmPassword,
        role,
        modifiedAt: new Date().toISOString(),
      };

      await axios.patch(`http://localhost:5000/user/${id}`, data);
      navigate("/dashboard/users");
    } else {
      dispatch(CreateUser({ name, email, password, confirmPassword, role }));
    }
  };

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async (id) => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/user/${id}`);

        if (response.status !== 201 || response.status === 500)
          return navigate("/dashboard");

        setName(response.data.name);
        setEmail(response.data.email);
        setRole(response.data.role);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        navigate("/dashboard");
        // console.log(error);
      }
    };

    if (data?.status === 200) {
      navigate("/dashboard/users");
      dispatch(reset());
    }

    if (id) {
      fetchUser(id);
    }
  }, [id, data]);

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
          <Box as="form" p="5" onSubmit={handleSubmit}>
            <InputControl title="Name" my="15px">
              {loading ? (
                <Skeleton height="30px" />
              ) : (
                <Input
                  type="text"
                  placeholder="Name"
                  background="white"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              )}
            </InputControl>
            <InputControl title="Email" my="15px">
              {loading ? (
                <Skeleton height="30px" />
              ) : (
                <Input
                  type="email"
                  placeholder="Email adress"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              )}
            </InputControl>
            <InputControl title="Password" my="15px">
              <Input
                type="password"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputControl>
            <InputControl title="Confrim Password" my="15px">
              <Input
                type="password"
                placeholder="Reapeat Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </InputControl>
            <InputControl title="role" my="15px">
              {loading ? (
                <Skeleton height="30px" />
              ) : (
                <Select
                  placeholder="Select role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </Select>
              )}
            </InputControl>

            <Box mt="5">
              {id ? (
                <Button colorScheme="facebook" type="submit">
                  Update
                </Button>
              ) : (
                <Button colorScheme="facebook" type="submit">
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

export default FormUser;
