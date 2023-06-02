import {
  Box,
  Text,
  chakra,
  Badge,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

const Navbar = ({ openChart }) => {
  return (
    <Box as="nav" borderBottom="1px" borderColor="gray.300" py={2} shadow="sm">
      <Box
        maxW="1200px"
        mx="auto"
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

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap="20px"
        >
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<IoSearchOutline color="#636363" />}
            />
            <Input placeholder="Cari produk" minW="350px" />
          </InputGroup>

          <chakra.button
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap="5px"
            onClick={openChart}
          >
            <IoCartOutline size={24} />{" "}
            <Badge bgColor="blackAlpha.900" color="white">
              5
            </Badge>
          </chakra.button>
          <chakra.div>
            <Text>
              <Link to="/login">Login</Link>
            </Text>
          </chakra.div>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
