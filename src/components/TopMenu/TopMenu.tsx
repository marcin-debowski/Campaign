import type { Campaign } from "../../type";
import { INITIAL_BALANCE } from "../../data/mockData";
import { useEffect, useState } from "react";
interface TopMenuProps {
  campaigns: Campaign[];
}

const TopMenu = ({ campaigns }: TopMenuProps) => {
  const totalFunds = INITIAL_BALANCE;
  const [availableFunds, setAvailableFunds] = useState(totalFunds);
  useEffect(() => {
    const activeFunds = campaigns.filter((c) => c.status).reduce((sum, c) => sum + c.fund, 0);
    const availableFunds = totalFunds - activeFunds;
    setAvailableFunds(availableFunds);
  }, [campaigns]);

  return (
    <div className='top-menu'>
      <span>
        Available funds: <strong>{availableFunds}</strong>
      </span>
      <span>
        Total funds: <strong>{totalFunds}</strong>
      </span>
    </div>
  );
};

export default TopMenu;
