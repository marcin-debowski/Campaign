export interface Campaign {
  id: number;
  name: string;
  keywords: string[];
  bidAmount: number;
  fund: number;
  status: boolean;
  town: string;
  radius: number;
}

export type CampaignFormData = Omit<Campaign, "id">;

export interface FormErrors {
  name?: string;
  keywords?: string;
  bidAmount?: string;
  fund?: string;
  town?: string;
  radius?: string;
}

export interface CampaignFormProps {
  formData: CampaignFormData;
  setFormData: React.Dispatch<React.SetStateAction<CampaignFormData>>;
  onSubmit: (data: CampaignFormData) => void;
  isEditMode?: boolean;
  onCancel?: () => void;
}
