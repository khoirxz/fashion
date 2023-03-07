import { Box, chakra, Input, Stack, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

import { CustomButton, InputControl } from "../../components/global";

const Login = () => {
  const { pathname } = useLocation();

  console.log(pathname.split("/")[1]);
  return (
    <Box fontFamily="Inter">
      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)">
        <Box
          display="flex"
          flexDir="column"
          alignItems="center"
          h="100vh"
          justifyContent="center"
        >
          {pathname.split("/")[1] === "login" ? (
            <FormLogin />
          ) : pathname.split("/")[1] === "signup" ? (
            <FormRegister />
          ) : null}
        </Box>
        <Box>Image</Box>
      </Box>
    </Box>
  );
};

const FormLogin = () => {
  return (
    <Box>
      <Text fontSize="3xl" fontWeight="bold">
        Selamat Datang
      </Text>
      <Text>Temukan berbagai peralatan gaming mu disini</Text>
      <Stack gap={2} my={5}>
        <InputControl title="Email">
          <Input placeholder="Email" borderColor="gray.300" />
        </InputControl>
        <InputControl title="Password">
          <Input placeholder="Password" borderColor="gray.300" />
        </InputControl>
        <Box>
          <Text textAlign="right" fontSize="sm" color="gray.500">
            Lupas Password?
          </Text>
        </Box>
        <CustomButton title="LOGIN" />
        <Box textAlign="center">
          <Text color="gray.500">
            Belum punya akun ?{" "}
            <chakra.span color="black">Daftar disini</chakra.span>
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

const FormRegister = () => {
  return (
    <Box>
      <Text fontSize="3xl" fontWeight="bold">
        Buat Akun
      </Text>
      <Text>Temukan berbagai peralatan gaming mu disini</Text>
      <Stack gap={2} my={5}>
        <InputControl title="Email">
          <Input placeholder="Email" borderColor="gray.300" />
        </InputControl>
        <InputControl title="Password">
          <Input placeholder="Password" borderColor="gray.300" />
        </InputControl>
        <Box>
          <Text textAlign="right" fontSize="sm" color="gray.500">
            Lupas Password?
          </Text>
        </Box>
        <CustomButton title="LOGIN" />
        <Box textAlign="center">
          <Text color="gray.500">
            Sudah punya akun ?{" "}
            <chakra.span color="black">Masuk disini</chakra.span>
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default Login;
