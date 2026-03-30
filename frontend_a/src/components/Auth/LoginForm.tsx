// src/components/Auth/LoginForm.tsx
import { useState } from "react";
import { login } from "../../services/api";

type Props = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: Props) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ phone_number: phone, password });

      // store token
      localStorage.setItem("token", res.token);

      // optional: store user info
      localStorage.setItem("user", JSON.stringify(res.user));

      onSuccess();
    } catch (err: any) {
      alert(err?.error || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80">
      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="p-2 border rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border rounded"
      />

      <button type="submit" className="bg-green-500 text-white p-2 rounded">
        Login
      </button>
    </form>
  );
};