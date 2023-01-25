import { Box, Text } from "@chakra-ui/react";

import Layout from "./Layout";

const Dashboard = () => {
  return (
    <Layout>
      <Box>
        <Text as="h1" fontSize="3xl" fontWeight="bold">
          Welcome
        </Text>
      </Box>
    </Layout>
  );
};

export default Dashboard;
