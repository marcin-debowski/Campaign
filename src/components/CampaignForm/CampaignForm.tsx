import React, { useState } from "react";
import type { CampaignFormProps } from "../../type";
import { AVAILABLE_TOWNS, SUGGESTED_KEYWORDS } from "../../data/mockData";
import { useKeywordsTypeahead } from "../../hooks/useKeywordsTypeahead";
import { validateCampaignForm, type ValidationErrors } from "../../utils/validation";

const CampaignForm = ({
  formData,
  setFormData,
  onSubmit,
  isEditMode,
  onCancel,
  availableFunds,
}: CampaignFormProps) => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const {
    keywordsInput,
    setKeywordsInput,
    showSuggestions,
    setShowSuggestions,
    suggestions,
    handleKeywordsChange,
    addSuggestion,
    getKeywordsArray,
  } = useKeywordsTypeahead({
    keywords: formData.keywords,
    suggestedKeywords: SUGGESTED_KEYWORDS,
  });

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const keywords = getKeywordsArray();
    const updatedFormData = { ...formData, keywords };

    const validation = validateCampaignForm(updatedFormData, keywordsInput, availableFunds);

    if (!validation.isValid) {
      setErrors(validation.errors);
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
