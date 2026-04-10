// src/components/Contacts/ContactList.tsx
import { useEffect, useState } from "react";
import { getContacts, addContact, updateContact, deleteContact } from "../../services/api";
import { ContactItem } from "./ContactItem";
import { ContactForm } from "./ContactForm";

export const ContactList = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const fetchContacts = async () => {
    const data = await getContacts();
    setContacts(data || []);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = (contact: any) => {
    setEditing(contact);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this contact?")) return;
    await deleteContact(id);
    fetchContacts();
  };

  const handleSubmit = async (data: any) => {
    if (data.contact_id) {
      await updateContact(data);
    } else {
      await addContact(data);
    }
    setShowForm(false);
    fetchContacts();
  };

  return (
    <div>
      <button
        onClick={handleAdd}
        className="contacts__button contacts__button--add"
      >
        + Add Contact
      </button>

      {contacts.map((c) => (
        <ContactItem
          key={c.id}
          contact={c}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}

      {showForm && (
        <ContactForm
          contact={editing}
          onSubmit={handleSubmit}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};