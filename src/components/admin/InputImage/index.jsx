import React from "react";
import {
  chakra,
  Icon,
  VisuallyHidden,
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react";

const InputImage = ({ setThumbnail }) => {
  const uploadImage = async (file) => {
    const base64 = await convertBase64(file.target.files[0]);
    setThumbnail(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <Flex
      w="52"
      h="52"
      rounded="md"
      borderWidth="2px"
      borderColor="gray.500"
      borderStyle="dashed"
      justify="center"
    >
      <Stack spacing={1} textAlign="center" id="Flex" justifyContent="center">
        <Icon
          mx="auto"
          boxSize={12}
          color="gray.400"
          _dark={{
            color: "gray.500",
          }}
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Icon>
        <Flex
          fontSize="sm"
          color="gray.600"
          _dark={{
            color: "gray.400",
          }}
          alignItems="center"
          flexDir="column"
        >
          <chakra.label
            htmlFor="file-upload"
            cursor="pointer"
            rounded="md"
            fontSize="md"
            color="brand.600"
            _dark={{
              color: "brand.200",
            }}
            pos="relative"
            _hover={{
              color: "brand.400",
              _dark: {
                color: "brand.300",
              },
            }}
          >
            <span>Upload a file</span>
            <VisuallyHidden>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                onChange={(e) => uploadImage(e)}
              />
            </VisuallyHidden>
          </chakra.label>
        </Flex>
        <Text
          fontSize="xs"
          color="gray.500"
          _dark={{
            color: "gray.50",
          }}
        >
          PNG, JPG, GIF up to 10MB
        </Text>
      </Stack>
    </Flex>
  );
};

export default InputImage;
