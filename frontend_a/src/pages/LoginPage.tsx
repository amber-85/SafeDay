// src/pages/LoginPage.tsx
import { useNavigate, Link } from "react-router-dom";
import { LoginForm } from "../components/Auth/LoginForm";


export const LoginPage = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    // decide where to go after login
    navigate("/elder"); 
    // later you can detect role (elder/contact) and route dynamically
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-6">Login</h1>

      <LoginForm onSuccess={handleSuccess} />

      <p className="mt-4">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-blue-500">
          Sign up
        </Link>
      </p>
    </div>
  );
};