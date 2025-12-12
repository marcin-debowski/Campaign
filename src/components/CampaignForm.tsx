import React from "react";
import type { CampaignFormProps } from "../type";
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
  return (
    <div>
      <h2>{isEditMode ? "Edit Campaign" : "Create New Campaign"}</h2>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label>Campaign Name:</label>
          <input
            type='text'
            name='campaignName'
            value={formData.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
        </div>
        <div>
          <label>Keywords:</label>
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
          />
        </div>
        <div>
          <label>Bid Amount:</label>
          <input
            type='number'
            name='bidAmount'
            value={formData.bidAmount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, bidAmount: Number(e.target.value) })
            }
          />
        </div>
        <div>
          <label>Fund:</label>
          <input
            type='number'
            name='fund'
            value={formData.fund}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, fund: Number(e.target.value) })
            }
          />
        </div>
        <div>
          <label>Town:</label>
          <input
            type='text'
            name='town'
            value={formData.town}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, town: e.target.value })
            }
          />
        </div>
        <div>
          <label>Radius (km):</label>
          <input
            type='number'
            name='radius'
            value={formData.radius}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, radius: Number(e.target.value) })
            }
          />
        </div>
        <button type='submit'>{isEditMode ? "Update Campaign" : "Create Campaign"}</button>
        {isEditMode && (
          <button type='button' onClick={onCancel}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default CampaignForm;
