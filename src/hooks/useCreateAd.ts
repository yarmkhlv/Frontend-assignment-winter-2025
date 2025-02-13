import { useMutation, useQueryClient } from "@tanstack/react-query";

const createAd = async (data: any) => {
  const response = await fetch("http://localhost:3000/items", {
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
