import { useState } from "react";
import CampaignCard from "../components/CampaignCard";
import CampaignForm from "../components/CampaignForm";
import { INITIAL_CAMPAIGNS } from "../data/mockData";
import type { Campaign, CampaignFormData } from "../type";
import TopMenu from "../components/TopMenu";
const Home = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formData, setFormData] = useState<CampaignFormData>({
    name: "",
    keywords: [],
    bidAmount: 0,
    fund: 0,
    town: "",
    status: false,
    radius: 0,
  });
  const handleSubmit = (data: CampaignFormData) => {
    if (editingId !== null) {
      editCampaign(editingId, data);
      setEditingId(null);
    } else {
      const campaignWithId: Campaign = {
        id: campaigns.length > 0 ? Math.max(...campaigns.map((c) => c.id)) + 1 : 1,
        ...data,
      };
      setCampaigns([...campaigns, campaignWithId]);
    }
    setFormData({
      name: "",
      keywords: [],
      bidAmount: 0,
      fund: 0,
      town: "",
      status: false,
      radius: 0,
    });
    setShowForm(false);
  };

  const startEdit = (campaign: Campaign) => {
    setFormData({
      name: campaign.name,
      keywords: campaign.keywords,
      bidAmount: campaign.bidAmount,
      fund: campaign.fund,
      town: campaign.town,
      status: campaign.status,
      radius: campaign.radius,
    });
    setEditingId(campaign.id);
    setShowForm(true);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setShowForm(false);
    setFormData({
      name: "",
      keywords: [],
      bidAmount: 0,
      fund: 0,
      town: "",
      status: false,
      radius: 0,
    });
  };
  const delerteCampaign = (id: number) => {
    setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
  };
  const editCampaign = (id: number, updatedCampaign: CampaignFormData) => {
    setCampaigns(
      campaigns.map((campaign) => (campaign.id === id ? { id, ...updatedCampaign } : campaign))
    );
  };
  return (
    <div className='main'>
      <div>
        <TopMenu campaigns={campaigns} />
        <button onClick={() => setShowForm(!showForm)}>Add Campaign</button>
        {showForm && (
          <CampaignForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            isEditMode={editingId !== null}
            onCancel={cancelEdit}
          />
        )}
      </div>
      <div className='campaigns-grid'>
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            {...campaign}
            deleteCampaign={delerteCampaign}
            editCampaign={() => startEdit(campaign)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
