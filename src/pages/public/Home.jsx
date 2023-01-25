import { Box, Text } from "@chakra-ui/react";

import { CardProduct, HeroBanner } from "../../components/public";

import Layout from "./Layout";

const Home = () => {
  return (
    <Layout>
      <HeroBanner />
      <Box>
        <Text fontWeight="bold" fontSize="2xl" mt="12" mb="5">
          Temukan gaming gearmu !
        </Text>

        <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap="40px">
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
        </Box>
      </Box>
    </Layout>
  );
};

export default Home;
