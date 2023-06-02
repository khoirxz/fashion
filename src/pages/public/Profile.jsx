import { Box, Image, Text } from "@chakra-ui/react";

import profileImg from "../../assets/images/profile/profile.png";

import Layout from "./Layout";

const Profile = () => {
  return (
    <Layout>
      <Box my="20" display="flex" gap="10px">
        <Box
          maxW="150px"
          width="full"
          border="1px"
          borderRadius="md"
          borderColor="gray.300"
          shadow="md"
          padding="2"
        >
          <Box display="flex" flexDir="column" padding="2" gap="10px">
            <Text>Biodata diri</Text>
            <Text>Alamat</Text>
            <Text>Riwayat</Text>
          </Box>
        </Box>
        <Box
          width="full"
          border="1px"
          borderRadius="md"
          borderColor="gray.300"
          shadow="md"
          padding="2"
        >
          <Box maxW="200px">
            <Image alt="profile" src={profileImg} w="100%" h="auto" />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Profile;
