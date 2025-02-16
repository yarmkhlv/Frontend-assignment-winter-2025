import { useQuery } from "@tanstack/react-query";
import { AdType } from "@/types/types";

const fetchAdvertisement = async (id: string): Promise<AdType> => {
  const response = await fetch(`http://localhost:3000/items/${id}`);
  if (!response.ok) {
    throw new Error("Ошибка при загрузке объявления");
  }
  return response.json();
};

export const useGetAdvertisement = (id: string | undefined) => {
  return useQuery<AdType, Error>({
    queryKey: ["advertisement", id],
    queryFn: () => {
      if (!id) {
        throw new Error("ID is required for fetching advertisement");
      }
      return fetchAdvertisement(id);
    },
    enabled: !!id,
  });
};
