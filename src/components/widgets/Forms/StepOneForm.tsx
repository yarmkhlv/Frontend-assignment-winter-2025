import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { validateImageUrl } from "./helpers";
import { ButtonLink } from "@/components/ui/ButtonLink/ButtonLink";
import { useParams } from "react-router-dom";
import { useRef } from "react";

const TYPES = ["Недвижимость", "Авто", "Услуги"];

const PRESERVED_FIELDS = ["name", "description", "location", "image"];

interface StepOneFormProps {
  goToStepTwo: () => void;
  isEditMode: boolean;
}

export function StepOneForm({ goToStepTwo, isEditMode }: StepOneFormProps) {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useFormContext();
  const { id } = useParams();

  const previousTypeRef = useRef(getValues().type);

  const handleSelectTypeChange = (e) => {
    const newType = e.target.value;
    const previousType = previousTypeRef.current;
    if (newType !== previousType.type) {
      const preservedValues = PRESERVED_FIELDS.reduce<Record<string, string>>(
        (acc, field) => {
          acc[field] = getValues()[field];
          return acc;
        },
        {}
      );
      reset({
        ...preservedValues,
        type: newType,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(goToStepTwo)}>
      <Stack spacing={4}>
        <FormLabel fontSize="lg" fontWeight="bold">
          Размещение объявления
        </FormLabel>
        <FormLabel fontSize="sm" color="gray.500">
          Заполните форму, чтобы разместить объявление
        </FormLabel>

        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Название</FormLabel>
          <Input
            {...register("name", {
              required: "Обязательное поле",
              maxLength: {
                value: 50,
                message: "Максимум 50 символов",
              },
            })}
          />
          <FormErrorMessage>
            {errors.name?.message?.toString() || ""}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.description}>
          <FormLabel>Описание</FormLabel>
          <Input
            {...register("description", {
              required: "Обязательное поле",
              maxLength: {
                value: 200,
                message: "Максимум 200 символов",
              },
            })}
          />
          <FormErrorMessage>
            {errors.description?.message?.toString() || ""}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.location}>
          <FormLabel>Локация</FormLabel>
          <Input
            {...register("location", {
              required: "Обязательное поле",
              maxLength: {
                value: 70,
                message: "Максимум 70 символов",
              },
            })}
          />
          <FormErrorMessage>
            {errors.location?.message?.toString() || ""}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.image}>
          <FormLabel>Фото</FormLabel>
          <Input
            {...register("image", {
              validate: (value) => {
                if (value && !validateImageUrl(value)) {
                  return "Введите корректный URL изображения (jpg, png, gif, webp)";
                }
                return true;
              },
            })}
            placeholder="https://example.com/image.jpg"
          />
          <FormErrorMessage>
            {errors.image?.message?.toString() || ""}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.type}>
          <FormLabel>Тип объявления</FormLabel>
          <Select
            placeholder="Выберите тип"
            {...register("type", {
              required: "Обязательное поле",
              onChange: handleSelectTypeChange,
            })}
          >
            {TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            {errors.type?.message?.toString() || ""}
          </FormErrorMessage>
        </FormControl>

        <ButtonLink
          to={isEditMode ? `/item/${id}` : "/list"}
          text={isEditMode ? "К объявлению" : "К списку"}
        />
        <Button type="submit" isLoading={isSubmitting} colorScheme="green">
          {isEditMode ? "Продолжить редактирование" : "Продолжить"}
        </Button>
      </Stack>
    </form>
  );
}
