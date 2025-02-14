import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

const TYPES = ["Недвижимость", "Авто", "Услуги"];

interface StepOneFormProps {
  goToStepTwo: () => void;
}

export function StepOneForm({ goToStepTwo }: StepOneFormProps) {
  const { register, handleSubmit, formState } = useFormContext();

  return (
    <form onSubmit={handleSubmit(goToStepTwo)}>
      <Stack spacing={4}>
        <FormLabel fontSize="lg" fontWeight="bold">
          Размещение объявления
        </FormLabel>
        <FormLabel fontSize="sm" color="gray.500">
          Заполните форму, чтобы разместить объявление
        </FormLabel>

        <FormControl isInvalid={!!formState.errors.name}>
          <FormLabel>Название</FormLabel>
          <Input {...register("name", { required: "Обязательное поле" })} />
        </FormControl>

        <FormControl isInvalid={!!formState.errors.description}>
          <FormLabel>Описание</FormLabel>
          <Input
            {...register("description", { required: "Обязательное поле" })}
          />
        </FormControl>

        <FormControl isInvalid={!!formState.errors.location}>
          <FormLabel>Локация</FormLabel>
          <Input {...register("location", { required: "Обязательное поле" })} />
        </FormControl>

        <FormControl>
          <FormLabel>Фото</FormLabel>
          <Input {...register("image")} />
        </FormControl>

        <FormControl isInvalid={!!formState.errors.type}>
          <FormLabel>Тип объявления</FormLabel>
          <Select
            placeholder="Выберите тип"
            {...register("type", { required: "Обязательное поле" })}
          >
            {TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </FormControl>

        <Button type="submit">Продолжить</Button>
      </Stack>
    </form>
  );
}
