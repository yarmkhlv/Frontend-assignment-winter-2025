import { Flex, Button, Text } from "@chakra-ui/react";

interface IPropsPagination {
  setCurrentPage: (value: number | ((prev: number) => number)) => void;
  currentPage: number;
  totalPages: number;
}

export function Pagination({
  setCurrentPage,
  currentPage,
  totalPages,
}: IPropsPagination) {
  if (totalPages < 2) return null;

  return (
    <Flex justify="center" alignItems="center" gap={2}>
      <Button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        isDisabled={currentPage === 1}
        size={{ base: "sm", md: "md" }}
        bg="gray.700"
        color="white"
        _hover={{ bg: "gray.800" }}
      >
        Назад
      </Button>
      <Text fontSize={{ base: "sm", md: "md" }}>
        Страница {currentPage} из {totalPages}
      </Text>
      <Button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        size={{ base: "sm", md: "md" }}
        isDisabled={currentPage === totalPages}
        bg="gray.700"
        color="white"
        _hover={{ bg: "gray.800" }}
      >
        Вперёд
      </Button>
    </Flex>
  );
}
