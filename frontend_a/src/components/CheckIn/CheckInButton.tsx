import { useState } from "react";
import { checkIn } from "../../services/api";

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
    <div className="flex flex-col items-center">
      <button onClick={handleCheckIn} disabled={loading} className="w-40 h-40 rounded-full bg-green-500 text-white text-xl font-bold flex items-center justify-center shadow-lg">
        {loading ? "Checking..." : "Check In"}
      </button>
      {success && <span className="mt-4 text-green-700">Check-in successful!</span>}
    </div>
  );
};