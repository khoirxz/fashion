import { FormControl, FormLabel } from "@chakra-ui/react";

/**
 *
 * @param title Value for Label
 * @param children element input
 * @param rest if add some style
 */
const InputControl = ({ title, children, ...rest }) => {
  return (
    <FormControl {...rest}>
      <FormLabel textTransform="capitalize">{title}</FormLabel>
      {children}
    </FormControl>
  );
};

export default InputControl;
