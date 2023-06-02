import { Box, chakra, Image, Input, Stack, Text } from "@chakra-ui/react";
import { useLocation, Link } from "react-router-dom";

import bannerLogin from "../../assets/images/bannerLogin.jpg";

import { CustomButton, InputControl } from "../../components/global";

const Login = () => {
  const { pathname } = useLocation();

  console.log(pathname.split("/")[1]);
  return (
    <Box fontFamily="Inter">
      {pathname.split("/")[1] === "login" ? (
        <Box
          display="grid"
          gridTemplateColumns={{ base: "500px 1fr", xl: "700px 1fr" }}
        >
          <Box
            display="flex"
            flexDir="column"
            alignItems="center"
            h="100vh"
            justifyContent="center"
          >
            <FormLogin />
          </Box>
          <Box>
            <Image
              alt="banner"
              src={bannerLogin}
              w="full"
              h="100%"
              objectFit="cover"
            />
          </Box>
        </Box>
      ) : pathname.split("/")[1] === "signup" ? (
        <Box maxW="600px" mx="auto" my="20">
          <FormRegister />
        </Box>
      ) : null}
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
            <chakra.span color="black">
              <Link to="/signup">Daftar disini</Link>
            </chakra.span>
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
        <InputControl title="Username">
          <Input placeholder="Username" borderColor="gray.300" />
        </InputControl>
        <InputControl title="Nama awal">
          <Input placeholder="Nama awal" borderColor="gray.300" />
        </InputControl>
        <InputControl title="Nama akhir">
          <Input placeholder="Nama akhir" borderColor="gray.300" />
        </InputControl>
        <InputControl title="Email">
          <Input placeholder="Email" borderColor="gray.300" />
        </InputControl>
        <InputControl title="Telepon">
          <Input placeholder="Telepon" borderColor="gray.300" />
        </InputControl>
        <InputControl title="Password">
          <Input placeholder="Password" borderColor="gray.300" />
        </InputControl>
        <InputControl title="ConfirmPassword">
          <Input placeholder="ConfirmPassword" borderColor="gray.300" />
        </InputControl>

        <Text color="gray.500" fontSize="sm">
          Dengan menekan tombol daftar berarti anda setuju dengan persyaratan
          dan kebijakan yang sudah kami tentukan.
        </Text>
        <CustomButton title="DAFTAR" />
        <Box textAlign="center">
          <Text color="gray.500">
            Sudah punya akun ?{" "}
            <chakra.span color="black">
              <Link to="/login">Masuk disini</Link>
            </chakra.span>
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default Login;
