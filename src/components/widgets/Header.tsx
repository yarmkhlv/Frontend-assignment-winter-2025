import { Box, Container, Flex, Image, Text } from "@chakra-ui/react";

export const Header = () => (
  <Container maxW="3xl">
    <Box as="header" py="4" width="100%">
      <Flex justify="space-between">
        <Image
          src="https://avatars.githubusercontent.com/u/13049122?s=200&v=4"
          alt="avito-tech logo"
          w="25px"
          h="25px"
        />
        <Text
          textStyle="lg"
          fontSize={{ base: "lg", md: "xl" }}
          fontWeight="semibold"
        >
          Сайт объявлений
        </Text>
      </Flex>
    </Box>
  </Container>
);
