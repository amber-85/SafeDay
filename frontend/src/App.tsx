import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { SignupPage } from "./pages/SignupPage/SignupPage";
import { ElderDashboard } from "./pages/ElderDashboard/ElderDashboard";
import { ContactDashboard } from "./pages/ContactDashboard/ContactDashboard";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/elder" element={token ? <ElderDashboard /> : <Navigate to="/login" />} />
        <Route path="/contact" element={token ? <ContactDashboard /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;