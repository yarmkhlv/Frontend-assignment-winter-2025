import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdType } from "@/types/types";
const API_URL = import.meta.env.VITE_API_URL;

const updateAdvertisement = async ({
  id,
  data,
}: {
  id: string;
  data: AdType;
}) => {
  const response = await fetch(`${API_URL}/items/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Ошибка при обновлении объявления");
  }
  return response.json();
};

export const useUpdateAd = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAdvertisement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["advertisement", id] });
    },
  });
};
