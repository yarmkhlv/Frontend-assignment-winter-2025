import { useQuery } from "@tanstack/react-query";

const fetchAdvertisementList = async () => {
  const response = await fetch("http://localhost:3000/items");
  if (!response.ok) {
    throw new Error("Ошибка при загрузке объявлений");
  }
  return response.json();
};

export const useGetAdvertisementList = () => {
  return useQuery({
    queryKey: ["advertisementList"],
    queryFn: fetchAdvertisementList,
  });
};
