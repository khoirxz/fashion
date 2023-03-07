import { Box, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import { FetchAllProductPublic } from "../../features/publicSlice";
import {
  CardProduct,
  CategorySlider,
  HeroBanner,
} from "../../components/public";

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

          <CategorySlider />
        </Box>

        <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap="20px">
          {isLoading ? (
            <>
              <Skeleton w="250px" h="300px" />
              <Skeleton w="250px" h="300px" />
              <Skeleton w="250px" h="300px" />
              <Skeleton w="250px" h="300px" />
            </>
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
