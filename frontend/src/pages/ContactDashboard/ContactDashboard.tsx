// src/pages/ContactDashboard.tsx
import { ElderList } from "../../components/Elders/ElderList";
import "./ContactDashboard.scss";

export const ContactDashboard = () => {
  return (
    <div className="dashboard">
      <h1 className="dashboard__title">
        👨‍👩‍👧 Contact Dashboard
      </h1>

      <p className="dashboard__subtitle">
        Monitor your elders' check-ins
      </p>

      <ElderList />
    </div>
  );
};