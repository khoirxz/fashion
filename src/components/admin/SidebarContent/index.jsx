import { Link } from "react-router-dom";
import { Text, Collapse, useDisclosure, Box, Flex } from "@chakra-ui/react";

const SidebarContent = ({ role, id, handleLogout, ...rest }) => {
  const integrations = useDisclosure();

  const NavItem = ({ children, ...rest }) => {
    return (
      <Flex
        align="center"
        px="4"
        pl="4"
        py="3"
        mx={{ base: 0, lg: "10px" }}
        my={{ base: 0, lg: "5px" }}
        cursor="pointer"
        color="inherit"
        _hover={{
          bg: "#3a3333",
          color: "white",
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
      border
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
          fontWeight="semibold"
        >
          Dashboard
        </Text>
      </Flex>

      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        aria-label="Main Navigation"
      >
        <NavItem as={Link} to="/dashboard/products">
          Daftar Produk
        </NavItem>

        <NavItem as={Link} to="/dashboard/categories">
          Kategori
        </NavItem>
        <NavItem as={Link} to="/dashboard/products">
          Pembelian
        </NavItem>
        <NavItem as={Link} to="/dashboard/products">
          Diskon
        </NavItem>

        <NavItem as={Link} to="/dashboard/products">
          Customer
        </NavItem>

        {role === "admin" && (
          <NavItem as={Link} to="/dashboard/users">
            Daftar User
          </NavItem>
        )}

        <NavItem onClick={integrations.onToggle}>Setting</NavItem>

        <Collapse in={integrations.isOpen}>
          {role !== "admin" && (
            <NavItem pl="12" py="2">
              <Text as={Link} to={`/dashboard/user/edit/${id}`}>
                Account
              </Text>
            </NavItem>
          )}
          <NavItem pl="12" py="2">
            <Text onClick={() => handleLogout()}>Logout</Text>
          </NavItem>
        </Collapse>
      </Flex>
    </Box>
  );
};

export default SidebarContent;
