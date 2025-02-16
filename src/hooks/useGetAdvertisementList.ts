import { useQuery } from "@tanstack/react-query";
const API_URL = import.meta.env.VITE_API_URL;

const fetchAdvertisementList = async () => {
  const response = await fetch(`${API_URL}/items`);
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
