import { useMutation, useQueryClient } from "@tanstack/react-query";
const API_URL = import.meta.env.VITE_API_URL;

const createAd = async (data: any) => {
  const response = await fetch(`${API_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Ошибка при создании объявления");
  }

  return response.json();
};

export const useCreateAd = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAd,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["advertisementList"] });
    },
  });
};
