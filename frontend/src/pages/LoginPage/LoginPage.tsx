// src/pages/LoginPage.tsx
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { LoginForm } from "../../components/Auth/LoginForm";
import { getCurrentUser } from "../../services/api";
import "./LoginPage.scss";

export const LoginPage = () => {
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
    <div className="login">
      <h1 className="login__title">Login</h1>

      <LoginForm onSuccess={handleSuccess} />

      <p className="login__footer">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-blue-500">
          Sign up
        </Link>
      </p>
    </div>
  );
};