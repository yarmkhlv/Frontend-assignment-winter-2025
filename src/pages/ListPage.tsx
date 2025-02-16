import { Box, Flex, Heading, Container, Input } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { useGetAdvertisementList } from "@/hooks/useGetAdvertisementList";
import { AdvertisementList } from "@/components/widgets/AdvertisementList/AdvertisementList";
import { Pagination } from "@/components/widgets/Pagination/Pagination";
import { SelectWrapper } from "@/components/ui/SelectWrapper/SelectWrapper";
import { ButtonLink } from "@/components/ui/ButtonLink/ButtonLink";
import { usePagination } from "@/hooks/usePagination";
import { AdType } from "@/types/types";
import { ErrorLoading } from "@/components/ui/ErrorLoading/ErrorLoading";
import { Loader } from "@/components/ui/Loader/Loader";
import { useDebounce } from "@/hooks/useDebounce";

const ITEMS_PER_PAGE = 1;

const typeFilters = [
  { label: "Недвижимость", value: "Недвижимость" },
  { label: "Авто", value: "Авто" },
  { label: "Услуги", value: "Услуги" },
];

export function ListPage() {
  const [typeFilter, setTypeFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);

  const {
    data: advertisementList = [],
    isLoading,
    isError,
  } = useGetAdvertisementList();

  const filteredList = typeFilter
    ? advertisementList.filter((item: AdType) => item.type === typeFilter)
    : advertisementList;

  const filteredListIncludeQueries = searchQuery
    ? filteredList.filter((item: AdType) =>
        item.name.includes(debouncedSearchQuery)
      )
    : filteredList;

  const { currentPage, totalPages, startIndex, endIndex, setCurrentPage } =
    usePagination(filteredListIncludeQueries.length, ITEMS_PER_PAGE);

  const currentItems = filteredListIncludeQueries.slice(startIndex, endIndex);

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setTypeFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorLoading />;
  }

  return (
    <Container maxW="2xl" py={{ base: 4, md: 8 }}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size={{ base: "sm", md: "md" }}>Список объявлений</Heading>
        <ButtonLink to="/form" text="Разместить объявление" />
      </Flex>

      <Box mb={{ base: 4, md: 8 }}>
        <Input
          placeholder="Поиск по названию"
          value={searchQuery}
          onChange={handleSearchChange}
          mb={4}
        />
        <SelectWrapper
          placeholder="Выбрать фильтр"
          value={typeFilter}
          onChange={handleChangeSelect}
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
