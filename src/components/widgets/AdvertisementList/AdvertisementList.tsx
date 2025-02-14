import { AdType } from "@/types/types";
import { CardHorizontal } from "./ui/CardHorizontal";
import { Flex } from "@chakra-ui/react";

export interface AdvertisementListProps {
  items: AdType[];
}

export function AdvertisementList({ items }: AdvertisementListProps) {
  return (
    <Flex gap={4} direction="column" mb={{ base: 4, md: 8 }}>
      {items.map((item) => (
        <CardHorizontal key={item.id} {...item} />
      ))}
    </Flex>
  );
}
