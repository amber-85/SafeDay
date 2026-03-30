// src/pages/ContactDashboard.tsx
import { ElderList } from "../components/Elders/ElderList";

export const ContactDashboard = () => {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        👨‍👩‍👧 Contact Dashboard
      </h1>

      <p className="text-gray-600 mb-6">
        Monitor your elders' check-ins
      </p>

      <ElderList />
    </div>
  );
};