import { Link } from "react-router-dom";
import { Text, Collapse, useDisclosure, Box, Flex } from "@chakra-ui/react";

const SidebarContent = ({ handleLogout, ...rest }) => {
  const integrations = useDisclosure();

  const NavItem = ({ children, ...rest }) => {
    return (
      <Flex
        align="center"
        px="4"
        pl="4"
        py="3"
        cursor="pointer"
        color="inherit"
        _dark={{
          color: "gray.400",
        }}
        _hover={{
          bg: "gray.100",
          _dark: {
            bg: "gray.900",
          },
          color: "gray.900",
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        {children}
      </Flex>
    );
  };

  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="white"
      _dark={{
        bg: "gray.800",
      }}
      border
      color="inherit"
      borderRightWidth="1px"
      w="60"
      {...rest}
    >
      <Flex px="4" py="5" align="center">
        <Text
          as={Link}
          to="/dashboard"
          fontSize="2xl"
          ml="2"
          color="brand.500"
          _dark={{
            color: "white",
          }}
          fontWeight="semibold"
        >
          Dashboard
        </Text>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <NavItem as={Link} to="/dashboard/products">
          Daftart Produk
        </NavItem>

        <NavItem as={Link} to="/dashboard/users">
          Daftart User
        </NavItem>
        <NavItem onClick={integrations.onToggle}>Setting</NavItem>
        <Collapse in={integrations.isOpen}>
          <NavItem pl="12" py="2">
            <Text onClick={() => handleLogout()}>Logout</Text>
          </NavItem>
        </Collapse>
      </Flex>
    </Box>
  );
};

export default SidebarContent;
