export interface GarmentType {
  garment_id: string;
  garment_name: string;
}

export interface CreateGarmentRequestType {
  garment_name: string;
  description?: string;
}

export interface UpdateGarmentRequestType {
  garment_name: string;
  description?: string;
}
