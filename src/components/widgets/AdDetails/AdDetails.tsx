import { VStack, Text } from "@chakra-ui/react";

import { AdType } from "../../../types/types";

export const AdDetails = ({ ad }: { ad: AdType }) => {
  switch (ad.type) {
    case "Недвижимость":
      return (
        <VStack align="start" spacing={2}>
          <Text fontSize="md" fontWeight="semibold">
            🏠 Тип недвижимости: {ad.propertyType}
          </Text>
          <Text fontSize="md">📏 Площадь: {ad.area} кв. м</Text>
          <Text fontSize="md">🚪 Комнат: {ad.rooms}</Text>
          <Text fontSize="md" color="blue.500" fontWeight="bold">
            💰 Цена: {ad.price.toLocaleString()} ₽
          </Text>
        </VStack>
      );

    case "Авто":
      return (
        <VStack align="start" spacing={2}>
          <Text fontSize="md" fontWeight="semibold">
            🚗 Марка: {ad.brand}
          </Text>
          <Text fontSize="md">📌 Модель: {ad.model}</Text>
          <Text fontSize="md">📅 Год выпуска: {ad.year}</Text>
          <Text fontSize="md">🛣️ Пробег: {ad.mileage} км</Text>
        </VStack>
      );

    case "Услуги":
      return (
        <VStack align="start" spacing={2}>
          <Text fontSize="md" fontWeight="semibold">
            🛠️ Тип услуги: {ad.serviceType}
          </Text>
          <Text fontSize="md">📅 Опыт работы: {ad.experience} лет</Text>
          <Text fontSize="md">💵 Стоимость: {ad.cost.toLocaleString()} ₽</Text>
          {ad.workSchedule && (
            <Text fontSize="md">⌚ График работы: {ad.workSchedule}</Text>
          )}
        </VStack>
      );

    default:
      return null;
  }
};
