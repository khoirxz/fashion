import { Box, Text } from "@chakra-ui/react";

const categoryProduct = ["Keyboard", "Mouse", "Mousepad", "Laptop"];

const CategorySlider = () => {
  return (
    <Box mt={3} display="flex" flexDir="row" gap={5} overflowX="auto">
      {categoryProduct.map((item, i) => (
        <Text key={i} border="2px" px="4" py="1" rounded="lg">
          {item}
        </Text>
      ))}
    </Box>
  );
};

export default CategorySlider;
