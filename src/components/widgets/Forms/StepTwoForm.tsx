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
  isEditMode: boolean;
  handleClickBack: () => void;
}

export function StepTwoForm({
  onSubmit,
  selectedType,
  isEditMode,
  handleClickBack,
}: StepTwoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormContext<FormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={6} p={4} borderWidth={1} borderRadius="lg" boxShadow="md">
        {selectedType === "Недвижимость" && (
          <>
            <FormControl isInvalid={!!errors.propertyType} isRequired>
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

            <FormControl isInvalid={!!errors.area} isRequired>
              <FormLabel>
                Площадь м<sup>2</sup>
              </FormLabel>
              <NumberInput min={1} max={999_999}>
                <NumberInputField
                  {...register("area", {
                    required: "Обязательное поле",
                    valueAsNumber: true,
                  })}
                />
              </NumberInput>
              <FormErrorMessage>{errors.area?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.rooms} isRequired>
              <FormLabel>Количество комнат</FormLabel>
              <NumberInput min={1} max={999}>
                <NumberInputField
                  {...register("rooms", {
                    required: "Обязательное поле",
                    valueAsNumber: true,
                  })}
                />
              </NumberInput>
              <FormErrorMessage>{errors.rooms?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.price} isRequired>
              <FormLabel>Цена</FormLabel>
              <NumberInput min={0} max={1_000_000_000}>
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
            <FormControl isInvalid={!!errors.brand} isRequired>
              <FormLabel>Марка</FormLabel>
              <Select
                placeholder="Выберите"
                {...register("brand", {
                  required: "Обязательное поле",
                  maxLength: {
                    value: 30,
                    message: "Максимум 30 символов",
                  },
                })}
              >
                {CAR_BRANDS.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors.brand?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.model} isRequired>
              <FormLabel>Модель</FormLabel>
              <Input
                {...register("model", {
                  required: "Обязательное поле",
                  maxLength: {
                    value: 30,
                    message: "Максимум 30 символов",
                  },
                })}
              />
              <FormErrorMessage>{errors.model?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.year} isRequired>
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

            <FormControl isInvalid={!!errors.mileage} isRequired>
              <FormLabel>Пробег (км)</FormLabel>
              <NumberInput min={0} max={10_000_000}>
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
            <FormControl isInvalid={!!errors.serviceType} isRequired>
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

            <FormControl isInvalid={!!errors.experience} isRequired>
              <FormLabel>Опыт (лет)</FormLabel>
              <NumberInput min={0} max={120}>
                <NumberInputField
                  {...register("experience", {
                    required: "Обязательное поле",
                    valueAsNumber: true,
                  })}
                />
              </NumberInput>
              <FormErrorMessage>{errors.experience?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.cost} isRequired>
              <FormLabel>Стоимость услуги</FormLabel>
              <NumberInput min={0} max={1_000_000_000}>
                <NumberInputField
                  {...register("cost", {
                    required: "Обязательное поле",
                    valueAsNumber: true,
                  })}
                />
              </NumberInput>
              <FormErrorMessage>{errors.cost?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.workSchedule}>
              <FormLabel>График работы</FormLabel>
              <Input
                {...register("workSchedule", {
                  maxLength: {
                    value: 100,
                    message: "Максимум 100 символов",
                  },
                })}
                placeholder="10:00 - 18:00"
              />
              <FormErrorMessage>
                {errors.workSchedule?.message}
              </FormErrorMessage>
            </FormControl>
          </>
        )}

        <Button type="button" onClick={handleClickBack} colorScheme="blue">
          Вернуться назад
        </Button>
        <Button
          type="submit"
          isLoading={isSubmitting}
          width="full"
          colorScheme="green"
        >
          {isEditMode ? "Сохранить изменения" : "Создать объявление"}
        </Button>
      </Stack>
    </form>
  );
}
