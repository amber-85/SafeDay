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
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded w-80 flex flex-col gap-3"
      >
        <h2 className="text-lg font-bold">
          {elder ? "Edit Elder" : "Add Elder"}
        </h2>

        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="p-2 border rounded"
        />

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded"
        />

        <input
          placeholder="Relationship"
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
          className="p-2 border rounded"
        />

        <div className="flex justify-between mt-2">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
          >
            Save
          </button>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};