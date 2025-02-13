export interface Ad {
  id: number;
  name: string;
  description: string;
  location: string;
  type: "Недвижимость" | "Авто" | "Услуги";
  image?: string;
}

// Тип для недвижимости
export interface RealEstateAd extends Ad {
  type: "Недвижимость";
  propertyType: string;
  area: number;
  rooms: number;
  price: number;
}

// Тип для авто
export interface AutoAd extends Ad {
  type: "Авто";
  brand: string;
  model: string;
  year: number;
  mileage: number;
}

// Тип для услуг
export interface ServiceAd extends Ad {
  type: "Услуги";
  serviceType: string;
  experience: number;
  cost: number;
  workSchedule?: string;
}

// Общий тип для всех объявлений
export type AdType = RealEstateAd | AutoAd | ServiceAd;
