import { useState } from "react";
import { signup } from "../../services/api";

export const SignupForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await signup({ phone_number: phone, name, password });
      localStorage.setItem("token", res.token);
      onSuccess();
    } catch (err: any) {
      alert(err.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <input 
        placeholder="Phone" 
        value={phone} 
        onChange={(e) => setPhone(e.target.value)} 
        className="auth-form__input"/>
      <input 
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        className="auth-form__input"/>
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="auth-form__input"/>
      <button 
        type="submit" 
        className="auth-form__button auth-form__button--signup"
      >Sign Up</button>
    </form>
  );
};
