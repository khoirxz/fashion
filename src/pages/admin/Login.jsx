import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Input, Flex, Button, Text } from "@chakra-ui/react";

import { LoginUser, reset } from "../../features/authSlice";

import { InputControl } from "../../components/admin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formState, setFormState] = useState(false);

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
    if (email === "" ?? password === "") {
      setFormState((state) => !state);
    } else {
      dispatch(LoginUser({ email, password }));
    }

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
      fontFamily="DM Sans"
    >
      <Box
        as="form"
        maxW="350px"
        w="full"
        p="8"
        bg="white"
        display="flex"
        flexDir="column"
        border="1px"
        borderColor="blackAlpha.500"
        onSubmit={handleSubmit}
      >
        <InputControl title="Email" mb="5">
          <Input
            placeholder="Email"
            type="email"
            borderRadius="none"
            border="1px"
            borderColor={!formState ? "blackAlpha.500" : "red.500"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputControl>
        <InputControl title="Password" mb="5">
          <Input
            borderRadius="none"
            border="1px"
            borderColor={!formState ? "blackAlpha.500" : "red.500"}
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
          <Button
            type="submit"
            border="1px"
            borderRadius="none"
            bgColor="black"
            color="white"
            _hover={{
              bgColor: "blackAlpha.800",
            }}
          >
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
