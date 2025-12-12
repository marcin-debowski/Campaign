import React from "react";
import type { CampaignFormProps } from "../type";
import { AVAILABLE_TOWNS } from "../data/mockData";

const CampaignForm = ({
  formData,
  setFormData,
  onSubmit,
  isEditMode,
  onCancel,
}: CampaignFormProps) => {
  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
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
          </div>
          <div>
            <label>Keywords:*</label>
            <input
              type='text'
              name='keywords'
              value={formData.keywords.join(", ")}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({
                  ...formData,
                  keywords: e.target.value
                    .split(",")
                    .map((keyword) => keyword.trim())
                    .filter((keyword) => keyword !== ""),
                })
              }
              required
            />
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
