import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardBody,
  Image,
  Text,
  VStack,
  Spinner,
  Divider,
  Container,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useGetAdvertisement } from "../hooks/useGetAdvertisement";
import { AdDetails } from "@/components/widgets/AdDetails/AdDetails";

export const AdPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: ad, isLoading, isError, error } = useGetAdvertisement(id!);

  if (isLoading) {
    return (
      <Box textAlign="center" mt={8}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box textAlign="center" mt={8}>
        <Text color="red.500">Ошибка: {error.message}</Text>
      </Box>
    );
  }

  if (!ad) {
    return (
      <Box textAlign="center" mt={8}>
        <Text>Объявление не найдено</Text>
      </Box>
    );
  }

  return (
    <Container>
      <Card
        maxW="3xl"
        w="full"
        p={{ base: 4, md: 6 }}
        borderRadius="lg"
        boxShadow="xl"
        overflow="hidden"
        bg="white"
      >
        <CardHeader pb={0}>
          <Flex flexDirection="column">
            <Button
              as={Link}
              to={`/edit/${ad.id}`}
              colorScheme="blue"
              size="md"
              boxShadow="md"
              _hover={{ bg: "blue.600" }}
              alignSelf="flex-end"
            >
              ✏️ Редактировать
            </Button>
            <Text
              fontSize="2xl"
              fontWeight="bold"
              whiteSpace="normal"
              wordBreak="break-word"
              flex="1"
            >
              {ad.name}
            </Text>
          </Flex>
        </CardHeader>

        <CardBody>
          <VStack align="start" spacing={4} w="full">
            <Image
              src={
                ad.image ||
                "https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"
              }
              alt={ad.name}
              w={{ base: "300px", md: "400px" }}
              h={{ base: "250px", md: "300px" }}
              objectFit="contain"
              mx="auto"
            />

            <AdDetails ad={ad} />

            <Divider />

            <Text fontSize="md" color="gray.600" alignSelf="stretch">
              {ad.description}
            </Text>
          </VStack>
        </CardBody>
      </Card>
    </Container>
  );
};
