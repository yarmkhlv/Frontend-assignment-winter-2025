import { Box, Button, Card, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export interface CardHorizontalProps {
  id: number;
  name: string;
  location: string;
  type: "Авто" | "Недвижимость" | "Услуги";
  image?: string;
}

export const CardHorizontal = ({
  id,
  name,
  location,
  type,
  image,
}: CardHorizontalProps) => {
  const placeholder = "https://via.placeholder.com/200?text=No+Image";

  return (
    <Card.Root
      display="flex"
      flexDirection="row"
      alignItems="center"
      overflow="hidden"
      maxW="2xl"
      w="full"
      p="4"
      gap="4"
    >
      {/* Фото с заглушкой */}
      {image ? (
        <Image
          objectFit="cover"
          maxW={{ base: "150px", md: "250px" }}
          minW={{ base: "150px", md: "250px" }}
          h={{ base: "100px", md: "150px" }}
          src={image || placeholder}
          alt={name}
          borderRadius="md"
        />
      ) : (
        <Image
          objectFit="contain"
          maxW={{ base: "150px", md: "250px" }}
          minW={{ base: "150px", md: "250px" }}
          h={{ base: "100px", md: "150px" }}
          src="https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"
          alt="not found image"
          borderRadius="md"
        />
      )}

      {/* Контент карточки */}
      <Box
        display="flex"
        alignItems={{ base: "flex-start", sm: "center" }}
        w="full"
        justifyContent="space-around"
        flexDirection={{ base: "column", sm: "row" }}
      >
        <Box
          display="flex"
          flexDirection="column"
          rowGap={{ base: "2", md: "6" }}
        >
          <Text fontSize="xl" fontWeight="bold">
            {name}
          </Text>
          <Text fontSize="sm" color="gray.600">
            {location}
          </Text>
          <Text fontSize="sm" fontWeight="semibold" color="blue.500">
            {type}
          </Text>
        </Box>
        {/* Кнопка "Открыть" */}
        <Box>
          <Button asChild size={{ base: "sm", md: "lg" }}>
            <Link to={`/item/${id}`}>Открыть</Link>
          </Button>
        </Box>
      </Box>
    </Card.Root>
  );
};
