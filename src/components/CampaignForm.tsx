import React, { useEffect, useState } from "react";
import type { CampaignFormProps } from "../type";
import { AVAILABLE_TOWNS, SUGGESTED_KEYWORDS } from "../data/mockData";

const CampaignForm = ({
  formData,
  setFormData,
  onSubmit,
  isEditMode,
  onCancel,
  availableFunds,
}: CampaignFormProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [keywordsInput, setKeywordsInput] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (formData.keywords.length > 0) {
      setKeywordsInput(formData.keywords.join(", "));
    }
  }, [formData.keywords]);

  const getLastKeyword = (): string => {
    const keywords = keywordsInput.split(",");
    return keywords[keywords.length - 1].trim();
  };

  const suggestions = SUGGESTED_KEYWORDS.filter((word) => {
    const lastWord = getLastKeyword();

    const currentKeywords = keywordsInput
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k !== "");

    const alreadyAdded = currentKeywords.some((kw) => kw.toLowerCase() === word.toLowerCase());

    return (
      !alreadyAdded && lastWord.length > 0 && word.toLowerCase().includes(lastWord.toLowerCase())
    );
  });

  const handleKeywordsChange = (value: string) => {
    setKeywordsInput(value);
    setShowSuggestions(value.length > 0);
  };

  const addSuggestion = (suggestion: string) => {
    const parts = keywordsInput.split(",").map((k) => k.trim());
    parts[parts.length - 1] = suggestion;
    const newValue = parts.join(", ");
    setKeywordsInput(newValue + ", ");
    setShowSuggestions(false);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (formData.name.trim() === "") {
      newErrors.name = "Campaign name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Campaign name must be at least 3 characters";
    }

    const currentKeywords = keywordsInput
      .split(",")
      .map((keyword) => keyword.trim())
      .filter((keyword) => keyword !== "");

    if (currentKeywords.length === 0) {
      newErrors.keywords = "At least one keyword is required";
    }

    if (formData.bidAmount <= 0) {
      newErrors.bidAmount = "Bid amount must be greater than 0";
    }

    if (formData.fund <= 0) {
      newErrors.fund = "Fund must be greater than 0";
    } else if (formData.status && formData.fund > availableFunds) {
      newErrors.fund = `Insufficient funds. Available: ${availableFunds}`;
    }

    if (formData.radius <= 0) {
      newErrors.radius = "Radius must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const keywords = keywordsInput
      .split(",")
      .map((keyword) => keyword.trim())
      .filter((keyword) => keyword !== "");

    const updatedFormData = { ...formData, keywords };

    if (!validateForm()) {
      return;
    }

    onSubmit(updatedFormData);
    setErrors({});

    if (!isEditMode) {
      setFormData({
        name: "",
        keywords: [],
        bidAmount: 0,
        fund: 0,
        town: "",
        status: false,
        radius: 0,
      });
      setKeywordsInput("");
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onCancel?.();
    }
  };

  return (
    <div className='modal-backdrop' onClick={handleBackdropClick}>
      <div className='modal-content'>
        <h2>{isEditMode ? "Edit Campaign" : "Create New Campaign"}</h2>
        <form onSubmit={onSubmitHandler}>
          <div>
            <label>Campaign Name:*</label>
            <input
              type='text'
              name='campaignName'
              value={formData.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            {errors.name && <p className='error-text'>{errors.name}</p>}
          </div>
          <div style={{ position: "relative" }}>
            <label>Keywords:*</label>
            <input
              type='text'
              name='keywords'
              value={keywordsInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleKeywordsChange(e.target.value)
              }
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder='Start typing... (e.g., fashion, sale)'
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className='suggestions-dropdown'>
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion}
                    className='suggestion-item'
                    onClick={() => addSuggestion(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
            {errors.keywords && <p className='error-text'>{errors.keywords}</p>}
          </div>
          <div>
            <label>Bid Amount:*</label>
            <input
              type='number'
              name='bidAmount'
              value={formData.bidAmount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, bidAmount: Number(e.target.value) })
              }
              required
            />
            {errors.bidAmount && <p className='error-text'>{errors.bidAmount}</p>}
          </div>
          <div>
            <label>Fund:*</label>
            <input
              type='number'
              name='fund'
              value={formData.fund}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, fund: Number(e.target.value) })
              }
              required
            />
            {errors.fund && <p className='error-text'>{errors.fund}</p>}
          </div>
          <div>
            <label>Status:*</label>
            <select
              name='status'
              value={formData.status ? "active" : "inactive"}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setFormData({ ...formData, status: e.target.value === "active" })
              }
              required
            >
              <option value='active'>Active</option>
              <option value='inactive'>Inactive</option>
            </select>
            {errors.status && <p className='error-text'>{errors.status}</p>}
          </div>
          <div>
            <label>Town:</label>
            <select
              name='town'
              value={formData.town}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setFormData({ ...formData, town: e.target.value })
              }
            >
              <option value=''>Select a town</option>
              {AVAILABLE_TOWNS.map((town) => (
                <option key={town} value={town}>
                  {town}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Radius (km):*</label>
            <input
              type='number'
              name='radius'
              value={formData.radius}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, radius: Number(e.target.value) })
              }
              required
            />
            {errors.radius && <p className='error-text'>{errors.radius}</p>}
          </div>
          <p className='required-field-text'>* Required fields</p>
          <button type='submit'>{isEditMode ? "Update Campaign" : "Create Campaign"}</button>

          <button type='button' onClick={onCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CampaignForm;
