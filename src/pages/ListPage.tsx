import { CardHorizontal } from "@/components/CardHorizontal";
import { Box, Flex, Link, Heading } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const items = [
  { id: 1, name: "Товар 1" },
  { id: 2, name: "Товар 2" },
  { id: 3, name: "Товар 3" },
];

export function ListPage() {
  return (
    <Box>
      <Heading mb={4}>Список товаров</Heading>
      <Flex gap="4" direction="column">
        {items.map((item, id) => (
          <CardHorizontal key={id} />
        ))}
      </Flex>
    </Box>
  );
}
