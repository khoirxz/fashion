import { FormControl, FormLabel } from "@chakra-ui/react";

/**
 *
 * @param title Value for Label
 * @param space Margin Top and Bottom
 * @param children element input
 * @param rest if add some style
 */
const InputControl = ({ title, space = "md", children, ...rest }) => {
  const sizeSpace = (space) => {
    switch (space) {
      case "sm":
        return "2";
      case "md":
        return "12";
      case "lg":
        return "16";

      default:
        return "10";
    }
  };

  return (
    <FormControl my={sizeSpace(space)} {...rest}>
      <FormLabel textTransform="capitalize">{title}</FormLabel>
      {children}
    </FormControl>
  );
};

export default InputControl;
