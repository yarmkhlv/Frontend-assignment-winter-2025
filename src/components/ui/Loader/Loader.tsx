import { Flex, Spinner, useColorModeValue } from "@chakra-ui/react";

export const Loader = () => {
  const spinnerColor = useColorModeValue("blue.500", "blue.300");

  return (
    <Flex align="center" justify="center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color={spinnerColor}
        size="xl"
      />
    </Flex>
  );
};
