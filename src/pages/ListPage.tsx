import { Box, Flex, Heading, Container, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { useGetAdvertisementList } from "@/hooks/useGetAdvertisementList";
import { AdvertisementList } from "@/components/widgets/AdvertisementList/AdvertisementList";
import { Pagination } from "@/components/widgets/Pagination/Pagination";
import { SelectWrapper } from "@/components/ui/SelectWrapper/SelectWrapper";
import { ButtonLink } from "@/components/ui/ButtonLink/ButtonLink";

const ITEMS_PER_PAGE = 5;

const typeFilters = [
  { label: "Недвижимость", value: "Недвижимость" },
  { label: "Авто", value: "Авто" },
  { label: "Услуги", value: "Услуги" },
];

export function ListPage() {
  const [typeFilter, setTypeFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: advertisementList,
    isLoading,
    isError,
  } = useGetAdvertisementList();

  if (isLoading) {
    return (
      <Box w="full" h="full">
        <Flex alignItems="center" justifyContent="center">
          <Spinner />
        </Flex>
      </Box>
    );
  }

  if (isError) {
    return <div>Ошибка при загрузке объявлений</div>;
  }

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = advertisementList.slice(startIndex, endIndex);
  const totalPages = Math.ceil(advertisementList.length / ITEMS_PER_PAGE);

  return (
    <Container maxW="2xl" py={{ base: 4, md: 8 }}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size={{ base: "sm", md: "md" }}>Список объявлений</Heading>
        <ButtonLink to="/form" text="Разместить объявление" />
      </Flex>

      <Box mb={{ base: 4, md: 8 }}>
        <SelectWrapper
          placeholder="Выбрать фильтр"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          items={typeFilters}
        />
      </Box>

      <AdvertisementList items={currentItems} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </Container>
  );
}
