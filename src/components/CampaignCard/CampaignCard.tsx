import type { Campaign } from "../../type";
const CampaignCard = (
  props: Campaign & {
    deleteCampaign: (id: number) => void;
    editCampaign: () => void;
  }
) => {
  return (
    <div className='campaign-card'>
      <h2>{props.name}</h2>
      <p>
        <strong>Keywords:</strong> {props.keywords.join(", ")}
      </p>
      <p>
        <strong>Bid Amount:</strong> ${props.bidAmount}
      </p>
      <p>
        <strong>Fund:</strong> ${props.fund}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        <span className={props.status ? "status-active" : "status-inactive"}>
          {props.status ? "Active" : "Inactive"}
        </span>
      </p>
      <p>
        <strong>Town:</strong> {props.town}
      </p>
      <p>
        <strong>Radius:</strong> {props.radius} km
      </p>
      <button onClick={props.editCampaign}>Edit</button>
      <button onClick={() => props.deleteCampaign(props.id)}>Delete</button>
    </div>
  );
};

export default CampaignCard;
