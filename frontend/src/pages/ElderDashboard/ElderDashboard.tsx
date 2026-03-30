
import { CheckInButton } from "../../components/CheckIn/CheckInButton";
import { ContactList } from "../../components/Contacts/ContactList";
import "./ElderDashboard.scss";

export const ElderDashboard = () => {
  return (
    <div className="elder-dashboard">
      <h1 className="elder-dashboard__title">Elder Dashboard</h1>
      <CheckInButton />
      <div className="elder-dashboard__section">
        <h2 className="elder-dashboard__subtitle">Your Contacts</h2>
        <ContactList />
      </div>
    </div>
  );
};