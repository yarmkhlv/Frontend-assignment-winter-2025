import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

export const ErrorLoading = () => {
  const errorColor = useColorModeValue("red.500", "red.300");

  return (
    <Flex align="center" justify="center" px={4}>
      <Text
        fontSize="xl"
        fontWeight="bold"
        color={errorColor}
        textAlign="center"
        p={4}
        borderRadius="md"
        borderWidth="2px"
        borderColor={errorColor}
      >
        ⚠️ Произошла ошибка , попробуйте обновить страницу
      </Text>
    </Flex>
  );
};
