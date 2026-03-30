// src/pages/SignupPage.tsx
import { useNavigate, Link } from "react-router-dom";
import { SignupForm } from "../components/Auth/SignupForm";

export const SignupPage = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/elder");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-6">Sign Up</h1>

      <SignupForm onSuccess={handleSuccess} />

      <p className="mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500">
          Login
        </Link>
      </p>
    </div>
  );
};