export interface FormData {
  name: string;
  description: string;
  location: string;
  image?: string;
  type: "Недвижимость" | "Авто" | "Услуги";

  // Поля для недвижимости
  propertyType?: string;
  area?: number;
  price?: number;
  rooms?: number;

  // Поля для авто
  brand?: string;
  model?: string;
  year?: number;
  mileage?: number;

  // Поля для услуг
  serviceType?: string;
  experience?: number;
  cost?: number;
  workSchedule?: string;
}
