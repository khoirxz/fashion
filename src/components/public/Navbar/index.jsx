import { Box, Text, chakra, Badge } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";

const Navbar = () => {
  return (
    <Box as="nav">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={{ base: "5", xl: "0" }}
        py="2"
      >
        <Box>
          <Text fontSize="2xl" fontWeight="bold" as={Link} to="/">
            E-Game
          </Text>
        </Box>

        <chakra.input
          border="1px"
          borderColor="gray.500"
          maxW="500px"
          w="full"
          p="2"
          placeholder="Cari produk"
        />

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap="20px"
        >
          <chakra.button
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap="5px"
          >
            <IoCartOutline size={24} />{" "}
            <Badge bgColor="blackAlpha.900" color="white">
              5
            </Badge>
          </chakra.button>
          <Text>Welcome User</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
