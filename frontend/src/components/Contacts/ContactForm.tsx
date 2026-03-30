// src/components/Contacts/ContactForm.tsx
import { useState, useEffect } from "react";

type Props = {
  contact?: any;
  onSubmit: (data: any) => void;
  onClose: () => void;
};

export const ContactForm = ({ contact, onSubmit, onClose }: Props) => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("");

  useEffect(() => {
    if (contact) {
      setPhone(contact.phone_number || "");
      setName(contact.name || "");
      setRelationship(contact.relationship || "");
    }
  }, [contact]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      contact_id: contact?.id,
      contact_phone: phone,
      contact_name: name,
      relationship,
    });
  };

  return (
    <div className="contacts__form-overlay">
      <form
        onSubmit={handleSubmit}
        className="contacts__form"
      >
        <h2 className="contacts__form-title">
          {contact ? "Edit Contact" : "Add Contact"}
        </h2>

        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="contacts__form-input"
        />

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="contacts__form-input"
        />

        <input
          placeholder="Relationship"
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
          className="contacts__form-input"
        />

        <div className="contacts__form-actions">
          <button
            type="submit"
            className="contacts__form-actions__save"
          >
            Save
          </button>

          <button
            type="button"
            onClick={onClose}
            className="contacts__form-actions__cancel"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};