import { CardHorizontal } from "@/components/widgets/CardHorizontal";
import {
  Box,
  Flex,
  Heading,
  Container,
  Button,
  Group,
  createListCollection,
} from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useGetAdvertisementList } from "@/hooks/useGetAdvertisementList";
import type { AdType } from "@/types/types";

const ITEMS_PER_PAGE = 5;

const typeFilters = createListCollection({
  items: [
    { label: "Недвижимость", value: "Недвижимость" },
    { label: "Авто", value: "Авто" },
    { label: "Услуги", value: "Услуги" },
    { label: "Без фильтра", value: "Без фильтра" },
  ],
});

export function ListPage() {
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: advertisementList,
    isLoading,
    isError,
  } = useGetAdvertisementList();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (isError) {
    return <div>Ошибка при загрузке объявлений</div>;
  }

  // Пагинация
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = advertisementList.slice(startIndex, endIndex);

  const totalPages = Math.ceil(advertisementList.length / ITEMS_PER_PAGE);

  const handlePageChange = (details: { page: number }) => {
    setCurrentPage(details.page);
  };

  return (
    <Container py={{ base: 4, md: 8 }}>
      <Box>
        <Flex justify="space-between" align="center" mb={4}>
          <Heading size={{ base: "sm", md: "2xl" }}>Список объявлений</Heading>
          <Button asChild size={{ base: "xs", md: "lg" }} colorPalette="blue">
            <Link to="/form"> Разместить объявление</Link>
          </Button>
        </Flex>

        {/* Фильтрация селектом */}
        <Box mb={{ base: 4, md: 8 }}>
          <SelectRoot
            collection={typeFilters}
            size={{ base: "sm", md: "md" }}
            width="full"
            maxW={{ base: "xs", md: "sm" }}
            value={typeFilter}
            onValueChange={(e) => setTypeFilter(e.value)}
          >
            <SelectLabel>Категории</SelectLabel>
            <SelectTrigger>
              <SelectValueText placeholder="Выбрать фильтр" />
            </SelectTrigger>
            <SelectContent>
              {typeFilters.items.map((filter) => (
                <SelectItem item={filter} key={filter.value}>
                  {filter.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </Box>

        {/* Список объявлений */}

        <Flex
          gap="4"
          direction="column"
          alignItems="center"
          mb={{ base: 4, md: 8 }}
        >
          {currentItems.map((item: AdType) => (
            <CardHorizontal key={item.id} {...item} />
          ))}
        </Flex>
        <Box display="flex" justifyContent="center">
          <PaginationRoot
            count={totalPages}
            pageSize={1}
            defaultPage={currentPage}
            variant="solid"
            onPageChange={handlePageChange}
          >
            <Group attached>
              <PaginationPrevTrigger />
              <PaginationItems />
              <PaginationNextTrigger />
            </Group>
          </PaginationRoot>
        </Box>
      </Box>
    </Container>
  );
}
