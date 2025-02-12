import {
  CardHorizontal,
  CardHorizontalProps,
} from "@/components/CardHorizontal";
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

const items: CardHorizontalProps[] = [
  {
    id: 1,
    title: "Товар 1",
    location: "Москва",
    type: "Авто",
    image:
      "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 2,
    title: "Товар 2",
    location: "Москва",
    type: "Авто",
  },
  {
    id: 3,
    title: "Товар 3",
    location: "Москва",
    type: "Авто",
    image:
      "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    title: "Товар 4",
    location: "Москва",
    type: "Авто",
    image:
      "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    title: "Товар 5",
    location: "Москва",
    type: "Авто",
    image:
      "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 6,
    title: "Товар 6",
    location: "Москва",
    type: "Авто",
    image:
      "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 7,
    title: "Товар 7",
    location: "Москва",
    type: "Авто",
    image:
      "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 8,
    title: "Товар 8",
    location: "Москва",
    type: "Авто",
    image:
      "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
  },
];

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
  return (
    <Container py={{ base: 4, md: 8 }}>
      <Box>
        <Flex justify="space-between" align="center" mb={4}>
          <Heading size={{ base: "sm", md: "2xl" }}>Список объявлений</Heading>
          <Button size={{ base: "xs", md: "lg" }} colorPalette="blue">
            <Link to="/form"></Link>
            Разместить объявление
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
          {items.map((item) => (
            <CardHorizontal key={item.id} {...item} />
          ))}
        </Flex>
        <Box display="flex" justifyContent="center">
          <PaginationRoot
            count={items.length}
            pageSize={ITEMS_PER_PAGE}
            defaultPage={1}
            variant="solid"
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
