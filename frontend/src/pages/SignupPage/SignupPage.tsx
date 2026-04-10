// src/pages/SignupPage.tsx
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { SignupForm } from "../../components/Auth/SignupForm";
import { getCurrentUser } from "../../services/api";
import "./SignupPage.scss";

export const SignupPage = () => {
  const navigate = useNavigate();

  const redirectByRole = () => {
    const user = getCurrentUser();

    if (!user) return;

    if (user.role === "elder") {
      navigate("/elder");
    } else if (user.role === "contact") {
      navigate("/contact");
    } else {
      navigate("/");
    }
  };

  const handleSuccess = () => {
    redirectByRole();
  };

  // ✅ Auto-redirect if already logged in
  useEffect(() => {
    redirectByRole();
  }, []);

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