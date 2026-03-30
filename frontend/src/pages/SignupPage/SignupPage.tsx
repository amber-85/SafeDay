// src/pages/SignupPage.tsx
import { useNavigate, Link } from "react-router-dom";
import { SignupForm } from "../../components/Auth/SignupForm";
import "./SignupPage.scss";

export const SignupPage = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/elder");
  };

  return (
    <div className="signup">
      <div className="signup__container">
        <h1 className="signup__title">Sign Up</h1>

        <SignupForm onSuccess={handleSuccess} />

        <p className="signup__footer">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};