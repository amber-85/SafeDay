// src/components/CheckIn/ElderCheckIn.tsx
import { useState, useEffect } from "react";
import { checkIn, getElderLastCheckIn } from "../../services/api";
import "./ElderCheckIn.scss";

const timeSince = (timestamp?: string) => {
  if (!timestamp) return "Never";
  const diff = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m ago`;
};

export const ElderCheckIn = () => {
  const [lastCheckIn, setLastCheckIn] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLastCheckIn = async () => {
      const data = await getElderLastCheckIn(); // returns { last_check_in: string }
      setLastCheckIn(data?.last_check_in);
    };
    fetchLastCheckIn();
  }, []);

  const handleCheckIn = async () => {
    const now = new Date().toISOString();
    setLastCheckIn(now); // instant UI
    setLoading(true);
    try {
      await checkIn(); // call backend
    } catch (error) {
      alert("Check-in failed. Reverting...");
      const data = await getElderLastCheckIn();
      setLastCheckIn(data?.last_check_in);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="elder-checkin">
      <button
        onClick={handleCheckIn}
        disabled={loading}
        className="elder-checkin__button"
      >
        {loading ? "Checking in..." : "Check In"}
      </button>
      <p className="elder-checkin__last">
        Last check-in: {timeSince(lastCheckIn)}
      </p>
    </div>
  );
};