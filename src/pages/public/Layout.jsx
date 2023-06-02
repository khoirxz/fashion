import { Box, useDisclosure } from "@chakra-ui/react";
import { Footer, Navbar, CartDrawer } from "../../components/public";

const Layout = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box fontFamily="Inter">
      <Navbar openChart={onOpen} />
      <CartDrawer isOpen={isOpen} onClose={onClose} />
      <Box maxW="1200px" mx={{ base: "1rem", xl: "auto" }}>
        {children}
      </Box>
      <Box borderTop="1px" borderColor="gray.300" mt="32">
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
