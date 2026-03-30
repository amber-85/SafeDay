// src/pages/LoginPage.tsx
import { useNavigate, Link } from "react-router-dom";
import { LoginForm } from "../../components/Auth/LoginForm";
import "./LoginPage.scss";


export const LoginPage = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    // decide where to go after login
    navigate("/elder"); 
    // later you can detect role (elder/contact) and route dynamically
  };

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