import { useState } from "react";
import { Container, Stack } from "@chakra-ui/react";
import { useForm, FormProvider, FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useCreateAd } from "@/hooks/useCreateAd";
import { ROUTES } from "@/variables/routes";
import { StepOneForm, StepTwoForm } from "../components/widgets/Forms";

export function FormPage() {
  const [isStepTwo, setIsStepTwo] = useState(false);
  const formMethods = useForm<FieldValues>(); // Создаем formMethods один раз
  const navigate = useNavigate();
  const toast = useToast();
  const { mutate } = useCreateAd();

  const selectedType = formMethods.watch("type");

  const goToStepTwo = () => setIsStepTwo(true);

  const onSubmit = async (data: FieldValues) => {
    console.log("Submitted form data:", data);
    mutate(data, {
      onSuccess: () => {
        toast({
          title: "Объявление создано успешно",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate(ROUTES.AD_LIST);
      },
      onError: (error) => {
        toast({
          title: "Ошибка при создании объявления",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    });
  };

  return (
    <Container py={8}>
      <Stack spacing={4} maxW="lg" mx="auto">
        <FormProvider {...formMethods}>
          {!isStepTwo ? (
            <StepOneForm goToStepTwo={goToStepTwo} />
          ) : (
            <StepTwoForm onSubmit={onSubmit} selectedType={selectedType} />
          )}
        </FormProvider>
      </Stack>
    </Container>
  );
}
