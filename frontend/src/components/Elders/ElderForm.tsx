// src/components/Elders/ElderForm.tsx
import { useState, useEffect } from "react";

type Props = {
  elder?: any;
  onSubmit: (data: any) => void;
  onClose: () => void;
};

export const ElderForm = ({ elder, onSubmit, onClose }: Props) => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("");

  useEffect(() => {
    if (elder) {
      setPhone(elder.phone_number || "");
      setName(elder.name || "");
      setRelationship(elder.relationship || "");
    }
  }, [elder]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      elder_id: elder?.id,
      elder_phone: phone,
      elder_name: name,
      relationship,
    });
  };

  return (
    <div className="elder__form-overlay">
      <form
        onSubmit={handleSubmit}
        className="elders__form"
      >
        <h2 className="elders__form-title">
          {elder ? "Edit Elder" : "Add Elder"}
        </h2>

        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="elders__form-input"
        />

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="elders__form-input"
        />

        <input
          placeholder="Relationship"
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
          className="elders__form-input"
        />

        <div className="elders__form-actions">
          <button
            type="submit"
            className="elders__form-actions__save"
          >
            Save
          </button>

          <button
            type="button"
            onClick={onClose}
            className="elders__form-actions__cancel"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};