import { Box, Container, Flex, Image, Text, Link } from "@chakra-ui/react";
import { Link as RouterLink, useMatch } from "react-router-dom";

export const Header = () => {
  const isFormPage = useMatch("/list");

  return (
    <Container maxW="3xl">
      <Box as="header" py="4" width="100%">
        <Flex justify="space-between" align="center">
          <Flex align="center" gap={8}>
            <Image
              src="https://avatars.githubusercontent.com/u/13049122?s=200&v=4"
              alt="avito-tech logo"
              w="25px"
              h="25px"
              borderRadius="8px"
            />

            {!isFormPage && (
              <Flex as="nav" gap={6}>
                <Link
                  as={RouterLink}
                  to="/list"
                  fontSize="md"
                  fontWeight="medium"
                  _hover={{ color: "blue.500" }}
                >
                  К объявлениям
                </Link>
              </Flex>
            )}
          </Flex>

          <Text
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="semibold"
            ml="auto"
          >
            Сайт объявлений
          </Text>
        </Flex>
      </Box>
    </Container>
  );
};
