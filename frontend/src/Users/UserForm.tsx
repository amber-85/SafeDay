// src/components/Users/UserForm.tsx
import { useState, useEffect } from "react";

type Props = {
  user?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
};

export const UserForm = ({ user, onSubmit, onCancel }: Props) => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("");

  useEffect(() => {
    if (user) {
      setPhone(user.phone_number || "");
      setName(user.name || "");
      setRelationship(user.relationship || "");
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      id: user?.id,
      phone_number: phone,
      name,
      relationship,
    });
  };

  return (
    <form className="user__form-inline" onSubmit={handleSubmit}>
      <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input value={relationship} onChange={(e) => setRelationship(e.target.value)} placeholder="Relationship" />

      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};