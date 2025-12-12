import type { CampaignFormData } from "../type";

export interface ValidationErrors {
  [key: string]: string;
}

export const validateCampaignForm = (
  formData: CampaignFormData,
  keywordsInput: string,
  availableFunds: number
): { isValid: boolean; errors: ValidationErrors } => {
  const newErrors: ValidationErrors = {};

  // Campaign name validation
  if (formData.name.trim() === "") {
    newErrors.name = "Campaign name is required";
  } else if (formData.name.length < 3) {
    newErrors.name = "Campaign name must be at least 3 characters";
  }

  // Keywords validation
  const currentKeywords = keywordsInput
    .split(",")
    .map((keyword) => keyword.trim())
    .filter((keyword) => keyword !== "");

  if (currentKeywords.length === 0) {
    newErrors.keywords = "At least one keyword is required";
  }

  // Bid amount validation
  if (formData.bidAmount <= 0) {
    newErrors.bidAmount = "Bid amount must be greater than 0";
  }

  // Fund validation
  if (formData.fund <= 0) {
    newErrors.fund = "Fund must be greater than 0";
  } else if (formData.status && formData.fund > availableFunds) {
    newErrors.fund = `Insufficient funds. Available: ${availableFunds}`;
  }

  // Radius validation
  if (formData.radius <= 0) {
    newErrors.radius = "Radius must be greater than 0";
  }

  return {
    isValid: Object.keys(newErrors).length === 0,
    errors: newErrors,
  };
};
