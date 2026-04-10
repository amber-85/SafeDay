import { useEffect, useState } from "react";
import { getProfile, getLastCheckIn } from "../services/api";

// create elder header component that shows elder name and last check-in time
export const ElderHeader = () => {
  const [name, setName] = useState("");
  const [lastCheckIn, setLastCheckIn] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      const profile = await getProfile();
      const checkin = await getLastCheckIn();
      setName(profile.name);
      setLastCheckIn(checkin?.last_check_in);
    };
    fetchData();
  }, []);

  return (
    <div className="elder-header">
      <h1>{name ? `${name}'s Dashboard` : "Elder Dashboard"}</h1>
      <p>Last check-in: {lastCheckIn ? new Date(lastCheckIn).toLocaleString() : "Never"}</p>
    </div>
  );
};