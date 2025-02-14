import { ButtonLink } from "@/components/ui/ButtonLink/ButtonLink";
import { BTN_LINK_STYLES } from "@/components/ui/ButtonLink/styleVariables";
import { Box, Card, Image, Text } from "@chakra-ui/react";

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
  return (
    <Card
      display="flex"
      flexDirection="row"
      alignItems="center"
      overflow="hidden"
      maxW="3xl"
      w="full"
      p={{ base: 3, md: 6 }}
      gap={4}
      borderRadius="lg"
    >
      <Image
        objectFit={image ? "cover" : "contain"}
        maxW={{ base: "120px", md: "200px" }}
        minW={{ base: "120px", md: "200px" }}
        h={{ base: "90px", md: "140px" }}
        src={
          image ||
          "https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"
        }
        alt={image ? name : "not found image"}
        borderRadius="md"
      />

      <Box
        display="flex"
        flex={1}
        alignItems={{ base: "flex-start", sm: "center" }}
        justifyContent="space-between"
        flexDirection={{ base: "column", sm: "row" }}
        rowGap={{ base: "2", md: "6" }}
        overflow="hidden"
      >
        <Box
          display="flex"
          flexDirection="column"
          maxW="full"
          minW={0}
          rowGap={{ base: "2", md: "6" }}
        >
          <Text
            fontSize={{ base: "md", md: "xl" }}
            fontWeight="bold"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {name}
          </Text>
          <Text
            fontSize={{ base: "xs", md: "sm" }}
            color="gray.600"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {location}
          </Text>
          <Text
            fontSize={{ base: "xs", md: "sm" }}
            fontWeight="semibold"
            color="blue.500"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {type}
          </Text>
        </Box>
        <Box flexShrink={0}>
          <ButtonLink
            to={`/item/${id}`}
            text="Открыть"
            styles={BTN_LINK_STYLES["blackSmall"]}
          />
        </Box>
      </Box>
    </Card>
  );
};
