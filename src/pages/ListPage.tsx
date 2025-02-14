import { Box, Flex, Heading, Container } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { useGetAdvertisementList } from "@/hooks/useGetAdvertisementList";
import { AdvertisementList } from "@/components/widgets/AdvertisementList/AdvertisementList";
import { Pagination } from "@/components/widgets/Pagination/Pagination";
import { SelectWrapper } from "@/components/ui/SelectWrapper/SelectWrapper";
import { ButtonLink } from "@/components/ui/ButtonLink/ButtonLink";
import { usePagination } from "@/hooks/usePagination";
import { AdType } from "@/types/types";
import { ErrorLoading } from "@/components/ui/ErrorLoading/ErrorLoading";
import { Loader } from "@/components/ui/Loader/Loader";

const ITEMS_PER_PAGE = 1;

const typeFilters = [
  { label: "Недвижимость", value: "Недвижимость" },
  { label: "Авто", value: "Авто" },
  { label: "Услуги", value: "Услуги" },
];

export function ListPage() {
  const [typeFilter, setTypeFilter] = useState("");

  const {
    data: advertisementList = [],
    isLoading,
    isError,
  } = useGetAdvertisementList();

  const filteredList = typeFilter
    ? advertisementList.filter((item: AdType) => item.type === typeFilter)
    : advertisementList;

  const { currentPage, totalPages, startIndex, endIndex, setCurrentPage } =
    usePagination(filteredList.length, ITEMS_PER_PAGE);

  const currentItems = filteredList.slice(startIndex, endIndex);

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setTypeFilter(e.target.value);
    setCurrentPage(1);
  };

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
