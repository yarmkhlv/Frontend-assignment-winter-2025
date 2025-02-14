import { useFormContext } from "react-hook-form";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Stack,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FormData } from "./types";

const REAL_ESTATE_TYPES = ["Квартира", "Дом", "Коттедж"];
const CAR_BRANDS = ["Toyota", "BMW", "Mercedes"];
const SERVICE_TYPES = ["Ремонт", "Клининг", "Обучение"];

interface StepTwoFormProps {
  onSubmit: (data: FormData) => void;
  selectedType: "Недвижимость" | "Авто" | "Услуги";
}

export function StepTwoForm({ onSubmit, selectedType }: StepTwoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<FormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={6} p={4} borderWidth={1} borderRadius="lg" boxShadow="md">
        {selectedType === "Недвижимость" && (
          <>
            <FormControl isInvalid={Boolean(errors.propertyType)} isRequired>
              <FormLabel>Тип недвижимости</FormLabel>
              <Select
                placeholder="Выберите"
                {...register("propertyType", { required: "Обязательное поле" })}
              >
                {REAL_ESTATE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors.propertyType?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.area)} isRequired>
              <FormLabel>Площадь (кв. м)</FormLabel>
              <NumberInput min={1}>
                <NumberInputField
                  {...register("area", {
                    required: "Обязательное поле",
                    valueAsNumber: true,
                  })}
                />
              </NumberInput>
              <FormErrorMessage>{errors.area?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.rooms)} isRequired>
              <FormLabel>Количество комнат</FormLabel>
              <NumberInput min={1}>
                <NumberInputField
                  {...register("rooms", {
                    required: "Обязательное поле",
                    valueAsNumber: true,
                  })}
                />
              </NumberInput>
              <FormErrorMessage>{errors.rooms?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.price)} isRequired>
              <FormLabel>Цена</FormLabel>
              <NumberInput min={0}>
                <NumberInputField
                  {...register("price", {
                    required: "Обязательное поле",
                    valueAsNumber: true,
                  })}
                />
              </NumberInput>
              <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
            </FormControl>
          </>
        )}

        {selectedType === "Авто" && (
          <>
            <FormControl isInvalid={Boolean(errors.brand)} isRequired>
              <FormLabel>Марка</FormLabel>
              <Select
                placeholder="Выберите"
                {...register("brand", { required: "Обязательное поле" })}
              >
                {CAR_BRANDS.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors.brand?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.model)} isRequired>
              <FormLabel>Модель</FormLabel>
              <Input
                {...register("model", { required: "Обязательное поле" })}
              />
              <FormErrorMessage>{errors.model?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.year)} isRequired>
              <FormLabel>Год выпуска</FormLabel>
              <NumberInput min={1900} max={new Date().getFullYear()}>
                <NumberInputField
                  {...register("year", {
                    required: "Обязательное поле",
                    valueAsNumber: true,
                  })}
                />
              </NumberInput>
              <FormErrorMessage>{errors.year?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.mileage)} isRequired>
              <FormLabel>Пробег (км)</FormLabel>
              <NumberInput min={0}>
                <NumberInputField
                  {...register("mileage", {
                    required: "Обязательное поле",
                    valueAsNumber: true,
                  })}
                />
              </NumberInput>
              <FormErrorMessage>{errors.mileage?.message}</FormErrorMessage>
            </FormControl>
          </>
        )}

        {selectedType === "Услуги" && (
          <>
            <FormControl isInvalid={Boolean(errors.serviceType)} isRequired>
              <FormLabel>Тип услуги</FormLabel>
              <Select
                placeholder="Выберите"
                {...register("serviceType", { required: "Обязательное поле" })}
              >
                {SERVICE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors.serviceType?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.experience)} isRequired>
              <FormLabel>Опыт (лет)</FormLabel>
              <NumberInput min={0}>
                <NumberInputField
                  {...register("experience", {
                    required: "Обязательное поле",
                    valueAsNumber: true,
                  })}
                />
              </NumberInput>
              <FormErrorMessage>{errors.experience?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.cost)} isRequired>
              <FormLabel>Стоимость услуги</FormLabel>
              <NumberInput min={0}>
                <NumberInputField
                  {...register("cost", {
                    required: "Обязательное поле",
                    valueAsNumber: true,
                  })}
                />
              </NumberInput>
              <FormErrorMessage>{errors.cost?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.workSchedule)}>
              <FormLabel>График работы</FormLabel>
              <Input
                {...register("workSchedule")}
                placeholder="10:00 - 18:00"
              />
              <FormErrorMessage>
                {errors.workSchedule?.message}
              </FormErrorMessage>
            </FormControl>
          </>
        )}

        <Button colorScheme="blue" type="submit" width="full">
          Создать объявление
        </Button>
      </Stack>
    </form>
  );
}
