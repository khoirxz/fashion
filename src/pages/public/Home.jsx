import { Box, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import { FetchAllProductPublic } from "../../features/publicSlice";
import { CardProduct, HeroBanner } from "../../components/public";

import Layout from "./Layout";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();

  const { data, isLoading } = useSelector((state) => state.public);

  useEffect(() => {
    dispatch(FetchAllProductPublic());
  }, [dispatch]);

  return (
    <Layout>
      <HeroBanner />
      <Box>
        <Box mt="1rem" mb="4rem">
          <Text fontWeight="bold" fontSize="2xl">
            Temukan gaming gearmu !
          </Text>
          <Box mt={3} display="flex" flexDir="row" gap={5} overflowX="auto">
            <Text bgColor="black" px="5" py="1" color="white" cursor="pointer">
              Keyboard
            </Text>
            <Text bgColor="black" px="5" py="1" color="white" cursor="pointer">
              Mouse
            </Text>
            <Text bgColor="black" px="5" py="1" color="white" cursor="pointer">
              Mousepad
            </Text>
            <Text bgColor="black" px="5" py="1" color="white" cursor="pointer">
              Laptop
            </Text>
          </Box>
        </Box>

        <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap="40px">
          {isLoading ? (
            <Stack>
              <Skeleton />
            </Stack>
          ) : data?.length >= 0 ? (
            data?.map((item) => <CardProduct key={item._id} data={item} />)
          ) : (
            <Text>Something wrong</Text>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default Home;
