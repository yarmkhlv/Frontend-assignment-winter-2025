import { useState } from "react";
import { Container, Button, Fieldset, Input, Stack } from "@chakra-ui/react";
import {
  NumberInputField,
  NumberInputRoot,
} from "@/components/ui/number-input";
import { Field } from "@/components/ui/field";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select";
import { toaster } from "@/components/ui/toaster";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateAd } from "@/hooks/useCreateAd";

const TYPES = ["Недвижимость", "Авто", "Услуги"];

const REAL_ESTATE_TYPES = ["Квартира", "Дом", "Коттедж"];
const CAR_BRANDS = ["Toyota", "BMW", "Mercedes"];
const SERVICE_TYPES = ["Ремонт", "Уборка", "Доставка"];

interface RealEstate {
  propertyType: string;
  area: number;
  rooms: number;
  price: number;
}

interface Auto {
  brand: string;
  model: string;
  year: number;
  mileage?: number;
}

interface Service {
  serviceType: string;
  experience: number;
  cost: number;
  schedule?: string;
}

interface FormValues {
  name: string;
  description: string;
  location: string;
  image?: string;
  type: string;
  realEstate?: RealEstate;
  auto?: Auto;
  service?: Service;
}

export function FormPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const [isStepTwo, setIsStepTwo] = useState(false);
  const selectedType = watch("type");

  const navigate = useNavigate();

  const { mutate } = useCreateAd();

  const changeStep = () => {
    setIsStepTwo(true);
  };

  const onSubmit = async (data: Partial<FormValues>) => {
    const {
      name,
      description,
      location,
      type,
      image,
      realEstate,
      auto,
      service,
    } = data;
    const additionalFields =
      type === "Недвижимость"
        ? realEstate
        : type === "Авто"
        ? auto
        : type === "Услуги"
        ? service
        : {};
    const requestBody = {
      name,
      description,
      location,
      type,
      image,
      ...additionalFields,
    };
    mutate(requestBody, {
      onSuccess: () => {
        toaster.create({
          title: `Объявление создано успешно.`,
          type: "success",
        });
        navigate("/list");
      },
      onError: (error) => {
        toaster.create({
          title: `Произошла ошибка при создании объявления. ${error}`,
          type: "error",
        });
      },
    });
  };

  return (
    <Container py={{ base: 4, md: 8 }}>
      {!isStepTwo ? (
        <form onSubmit={handleSubmit(changeStep)}>
          <Fieldset.Root size="lg" maxW="lg" mx="auto">
            <Stack>
              <Fieldset.Legend>Размещение объявлений</Fieldset.Legend>
              <Fieldset.HelperText>
                Заполните форму, чтобы разместить объявление
              </Fieldset.HelperText>
            </Stack>

            <Fieldset.Content>
              <Field
                invalid={!!errors.name}
                errorText={errors.name?.message}
                label="Название"
              >
                <Input
                  {...register("name", { required: "Обязательное поле" })}
                />
              </Field>

              <Field
                invalid={!!errors.description}
                errorText={errors.description?.message}
                label="Описание"
              >
                <Input
                  {...register("description", {
                    required: "Обязательное поле",
                  })}
                />
              </Field>

              <Field
                invalid={!!errors.location}
                errorText={errors.location?.message}
                label="Локация"
              >
                <Input
                  {...register("location", { required: "Обязательное поле" })}
                />
              </Field>

              <Field label="Фото">
                <Input {...register("image")} />
              </Field>

              <Field
                invalid={!!errors.type}
                errorText={errors.type?.message}
                label="Тип объявления"
              >
                <NativeSelectRoot>
                  <NativeSelectField
                    placeholder="Выберите тип объявления"
                    {...register("type", { required: "Обязательное поле" })}
                    items={TYPES}
                  />
                </NativeSelectRoot>
              </Field>
            </Fieldset.Content>

            <Button type="submit" alignSelf="flex-start">
              Продолжить
            </Button>
          </Fieldset.Root>
        </form>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Fieldset.Root size="lg" maxW="lg" mx="auto">
            <Fieldset.Content>
              {selectedType === "Недвижимость" && (
                <>
                  <Field
                    invalid={!!errors.realEstate?.propertyType}
                    errorText={errors.realEstate?.propertyType?.message}
                    label="Тип недвижимости"
                  >
                    <NativeSelectRoot>
                      <NativeSelectField
                        placeholder="Выберите тип недвижимости"
                        {...register("realEstate.propertyType", {
                          required: "Обязательное поле",
                        })}
                        items={REAL_ESTATE_TYPES.map((type) => ({
                          value: type,
                          label: type,
                        }))}
                      />
                    </NativeSelectRoot>
                  </Field>
                  <Field
                    invalid={!!errors.realEstate?.area}
                    errorText={errors.realEstate?.area?.message}
                    label="Площадь (кв. м)"
                  >
                    <NumberInputRoot w="100%" min={1} clampValueOnBlur>
                      <NumberInputField
                        {...register("realEstate.area", {
                          required: "Обязательное поле",
                          valueAsNumber: true,
                        })}
                      />
                    </NumberInputRoot>
                  </Field>
                  <Field
                    invalid={!!errors.realEstate?.rooms}
                    errorText={errors.realEstate?.rooms?.message}
                    label="Количество комнат"
                  >
                    <NumberInputRoot w="100%" min={1} clampValueOnBlur>
                      <NumberInputField
                        {...register("realEstate.rooms", {
                          required: "Обязательное поле",
                          valueAsNumber: true,
                        })}
                      />
                    </NumberInputRoot>
                  </Field>
                  <Field
                    invalid={!!errors.realEstate?.price}
                    errorText={errors.realEstate?.price?.message}
                    label="Цена"
                  >
                    <NumberInputRoot w="100%" min={0} clampValueOnBlur>
                      <NumberInputField
                        {...register("realEstate.price", {
                          required: "Обязательное поле",
                          valueAsNumber: true,
                        })}
                      />
                    </NumberInputRoot>
                  </Field>
                </>
              )}

              {selectedType === "Авто" && (
                <>
                  <Field
                    invalid={!!errors.auto?.brand}
                    errorText={errors.auto?.brand?.message}
                    label="Марка"
                  >
                    <NativeSelectRoot>
                      <NativeSelectField
                        placeholder="Выберите марку"
                        {...register("auto.brand", {
                          required: "Обязательное поле",
                        })}
                        items={CAR_BRANDS.map((brand) => ({
                          value: brand,
                          label: brand,
                        }))}
                      />
                    </NativeSelectRoot>
                  </Field>
                  <Field
                    invalid={!!errors.auto?.model}
                    errorText={errors.auto?.model?.message}
                    label="Модель"
                  >
                    <Input
                      {...register("auto.model", {
                        required: "Обязательное поле",
                      })}
                    />
                  </Field>
                  <Field
                    invalid={!!errors.auto?.year}
                    errorText={errors.auto?.year?.message}
                    label="Год выпуска"
                  >
                    <NumberInputRoot w="100%" min={1} clampValueOnBlur>
                      <NumberInputField
                        {...register("auto.year", {
                          required: "Обязательное поле",
                          valueAsNumber: true,
                        })}
                      />
                    </NumberInputRoot>
                  </Field>
                  <Field
                    invalid={!!errors.auto?.mileage}
                    errorText={errors.auto?.mileage?.message}
                    label="Пробег (км)"
                  >
                    <NumberInputRoot w="100%" min={1} clampValueOnBlur>
                      <NumberInputField
                        {...register("auto.mileage", {
                          required: "Обязательное поле",
                          valueAsNumber: true,
                        })}
                      />
                    </NumberInputRoot>
                  </Field>
                </>
              )}

              {selectedType === "Услуги" && (
                <>
                  <Field
                    invalid={!!errors.service?.serviceType}
                    errorText={errors.service?.serviceType?.message}
                    label="Тип услуги"
                  >
                    <NativeSelectRoot>
                      <NativeSelectField
                        placeholder="Выберите тип услуги"
                        {...register("service.serviceType", {
                          required: "Обязательное поле",
                        })}
                        items={SERVICE_TYPES.map((service) => ({
                          value: service,
                          label: service,
                        }))}
                      />
                    </NativeSelectRoot>
                  </Field>
                  <Field
                    invalid={!!errors.service?.experience}
                    errorText={errors.service?.experience?.message}
                    label="Опыт работы (лет)"
                  >
                    <NumberInputRoot w="100%" min={1} clampValueOnBlur>
                      <NumberInputField
                        {...register("service.experience", {
                          required: "Обязательное поле",
                          valueAsNumber: true,
                        })}
                      />
                    </NumberInputRoot>
                  </Field>
                  <Field
                    invalid={!!errors.service?.cost}
                    errorText={errors.service?.cost?.message}
                    label="Стоимость"
                  >
                    <NumberInputRoot w="100%" min={1} clampValueOnBlur>
                      <NumberInputField
                        {...register("service.cost", {
                          required: "Обязательное поле",
                          valueAsNumber: true,
                        })}
                      />
                    </NumberInputRoot>
                  </Field>
                  <Field
                    invalid={!!errors.service?.schedule}
                    errorText={errors.service?.schedule?.message}
                    label="График работы"
                  >
                    <Input {...register("service.schedule")} />
                  </Field>
                </>
              )}
            </Fieldset.Content>

            <Button type="submit" alignSelf="flex-start">
              Создать
            </Button>
          </Fieldset.Root>
        </form>
      )}
    </Container>
  );
}
