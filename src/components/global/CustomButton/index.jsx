import { Button } from "@chakra-ui/react";

const CustomButton = ({ title, ...rest }) => {
  return (
    <Button
      bgColor="#191916"
      {...rest}
      color="white"
      _hover={{
        bgColor: "#444442",
      }}
    >
      {title}
    </Button>
  );
};

export default CustomButton;
