import { useEffect, useState } from "react";
import { CheckInButton } from "../components/CheckIn/CheckInButton";
import { ContactList } from "../components/Contacts/ContactList";

export const ElderDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Elder Dashboard</h1>
      <CheckInButton />
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Your Contacts</h2>
        <ContactList />
      </div>
    </div>
  );
};