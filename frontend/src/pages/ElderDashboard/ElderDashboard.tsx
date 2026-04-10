// src/pages/ElderDashboard.tsx

import { CheckInButton } from "../../components/CheckIn/CheckInButton";
import { ElderHeader } from "../../ElderHeader/ElderHeader";
import "./ElderDashboard.scss";
import { UserList } from "../../Users/userList";

export const ElderDashboard = () => {
  return (
    <div className="elder-dashboard">
      <ElderHeader/>

      {/*  Check-in button */}
      <div className="elder-dashboard__checkin">
        <CheckInButton />
      </div>
      {/* contacts section */}
      <div className="elder-dashboard__section">
        <h2 className="elder-dashboard__subtitle">Your Contacts</h2>
        <UserList role="elder" />
      </div>
    </div>
  );
};