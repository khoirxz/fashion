import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Input, Flex, Button, Text } from "@chakra-ui/react";

import { LoginUser, reset } from "../../features/authSlice";

import { InputControl } from "../../components/admin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
      dispatch(reset());
    }
  }, [user, isSuccess, dispatch, navigate, message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));

    // console.table({ email, password });
  };

  return (
    <Flex
      w="100%"
      h="100vh"
      bg="gray.50"
      flexDir="column"
      justify="center"
      alignItems="center"
    >
      <Box
        as="form"
        maxW="400px"
        p="8"
        bg="white"
        display="flex"
        flexDir="column"
        shadow="md"
        rounded="md"
        onSubmit={handleSubmit}
      >
        <InputControl title="Email" mb="5">
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputControl>
        <InputControl title="Password" mb="5">
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputControl>
        {isLoading ? (
          <Button type="submit" colorScheme="facebook" disabled>
            Login
          </Button>
        ) : (
          <Button type="submit" colorScheme="facebook">
            Login
          </Button>
        )}
        {message ? (
          <Text textAlign="center" color="red.500" mt="3" fontWeight="bold">
            {message}
          </Text>
        ) : null}
      </Box>
    </Flex>
  );
};

export default Login;
