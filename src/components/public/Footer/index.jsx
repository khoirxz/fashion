import { Box, Button, Input, InputGroup, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box mt="8">
      <Box display="flex" justifyContent="space-between" alignContent="center">
        <Box>
          <Text
            as="h3"
            fontWeight="bold"
            fontSize="xl"
            my="1"
            textTransform="uppercase"
          >
            Customer service
          </Text>
          <Box color="gray.500">
            <Text>Contact Us</Text>
            <Text>Sell with Us</Text>
            <Text>Shipping</Text>
          </Box>
        </Box>
        <Box>
          <Text
            as="h3"
            fontWeight="bold"
            fontSize="xl"
            my="1"
            textTransform="uppercase"
          >
            Links
          </Text>
          <Box color="gray.500">
            <Text>Contact Us</Text>
            <Text>Sell with Us</Text>
            <Text>Shipping</Text>
          </Box>
        </Box>
        <Box>
          <Text
            as="h3"
            fontWeight="bold"
            fontSize="xl"
            my="1"
            textTransform="uppercase"
          >
            Newsletter
          </Text>
          <Box color="gray.500">
            <Text>Contact Us</Text>
            <InputGroup my={3}>
              <Input
                placeholder="Your Email"
                borderRadius="none"
                border="1px"
                borderColor="black"
              />
              <Button
                bgColor="black"
                color="white"
                borderRadius="none"
                _hover={{
                  color: "white",
                  bgColor: "black",
                }}
                _active={{
                  bgColor: "#4e4848",
                }}
              >
                Send
              </Button>
            </InputGroup>
          </Box>
        </Box>
      </Box>
      <Box textAlign="center" mb={4} mt={8}>
        <Text color="gray.800">&copy; 2023 Game Store</Text>
      </Box>
    </Box>
  );
};

export default Footer;
