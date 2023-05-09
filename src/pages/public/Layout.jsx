import { Box } from "@chakra-ui/react";
import { Footer, Navbar } from "../../components/public";

const Layout = ({ children }) => {
  return (
    <Box fontFamily="Inter">
      <Navbar />
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
