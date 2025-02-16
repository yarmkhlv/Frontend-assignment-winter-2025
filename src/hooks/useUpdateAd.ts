// useUpdateAd.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdType } from "@/types/types";

const updateAdvertisement = async ({
  id,
  data,
}: {
  id: string;
  data: AdType;
}) => {
  const response = await fetch(`http://localhost:3000/items/${id}`, {
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
