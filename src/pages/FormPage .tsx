import { useEffect, useState } from "react";
import { Container, Heading, Stack } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useCreateAd } from "@/hooks/useCreateAd";
import { ROUTES } from "@/variables/routes";
import { StepOneForm, StepTwoForm } from "../components/widgets/Forms";
import { Loader } from "@/components/ui/Loader/Loader";
import { useGetAdvertisement } from "@/hooks/useGetAdvertisement";
import { useUpdateAd } from "@/hooks/useUpdateAd";
import { useBeforeUnload } from "@/hooks/useBeforeUnload";

const DRAFT_KEY = "advertisement_draft";

export function FormPage() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [isStepTwo, setIsStepTwo] = useState(false);
  const formMethods = useForm();
  const navigate = useNavigate();
  const toast = useToast();

  const { data: adData, isLoading, isError } = useGetAdvertisement(id);
  const { mutate: createMutate } = useCreateAd();
  const { mutate: updateMutate } = useUpdateAd(id!);

  useBeforeUnload(() => {
    if (!isEditMode) {
      const formData = formMethods.watch();
      localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
    }
  });

  useEffect(() => {
    if (isEditMode) {
      if (adData) formMethods.reset(adData);
    } else {
      const draft = localStorage.getItem(DRAFT_KEY);
      if (draft) formMethods.reset(JSON.parse(draft));
    }
  }, [isEditMode, adData, formMethods]);

  useEffect(() => {
    return () => {
      localStorage.removeItem(DRAFT_KEY);
    };
  }, []);

  const handleSuccess = () => {
    toast({
      title: isEditMode
        ? "Объявление успешно обновлено"
        : "Объявление успешно создано",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    navigate(ROUTES.AD_LIST);
  };

  const handleError = (error: Error) => {
    toast({
      title: isEditMode ? "Ошибка обновления" : "Ошибка создания",
      description: error.message,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  const onSubmit = (data: any) => {
    const mutationConfig = {
      onSuccess: handleSuccess,
      onError: handleError,
    };

    return isEditMode
      ? updateMutate({ id: id!, data }, mutationConfig)
      : createMutate(data, mutationConfig);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    toast({
      description: "Объявление с данным id не найдено",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    navigate(ROUTES.AD_LIST);
  }

  const handleClickBack = () => setIsStepTwo(false);

  return (
    <Container py={8}>
      <Stack spacing={4} maxW="lg" mx="auto">
        <Heading textAlign="center">
          {isEditMode ? "Редактирование объявления" : "Новое объявление"}
        </Heading>

        <FormProvider {...formMethods}>
          {!isStepTwo ? (
            <StepOneForm
              goToStepTwo={() => setIsStepTwo(true)}
              isEditMode={isEditMode}
            />
          ) : (
            <StepTwoForm
              onSubmit={onSubmit}
              selectedType={formMethods.watch("type")}
              isEditMode={isEditMode}
              handleClickBack={handleClickBack}
            />
          )}
        </FormProvider>
      </Stack>
    </Container>
  );
}
