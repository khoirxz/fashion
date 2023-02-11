import { Box } from "@chakra-ui/react";
import { Footer, Navbar } from "../../components/public";

const Layout = ({ children }) => {
  return (
    <Box fontFamily="DM Sans">
      <Box maxW="1000px" mx="auto">
        <Navbar />
        {children}
      </Box>
      <Box borderTop="1px" borderColor="gray.300" mt="32">
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
