import { useState } from "react";
import { checkIn } from "../../services/api";
import "./CheckInButton.scss";

export const CheckInButton = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCheckIn = async () => {
    setLoading(true);
    try {
      await checkIn();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      alert("Check-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkin">
      <button onClick={handleCheckIn} disabled={loading} className="checkin__button">
        {loading ? "Checking..." : "Check In"}
      </button>
      {success && <span className="checkin__success">Check-in successful!</span>}
    </div>
  );
};