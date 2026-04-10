// src/components/Users/UserList.tsx
import { useEffect, useState } from "react";
import {
  getContacts,
  getElders,
  addContact,
  updateContact,
  deleteContact,
  addElder,
  updateElder,
  deleteElder,
} from "../services/api";
import { UserItem } from "./userItem";
import { UserForm } from "./userForm";

type Props = {
  role: "elder" | "contact";
};

export const UserList = ({ role }: Props) => {
  const [users, setUsers] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<any>(null);

  const fetchUsers = async () => {
    const data = role === "elder" ? await getContacts() : await getElders();
    setUsers(data || []);
  };

  useEffect(() => {
    fetchUsers();
  }, [role]);

  const handleEdit = (user: any) => {
    setEditingId(user.id);
    setEditingUser(user);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this item?")) return;

    if (role === "elder") await deleteContact(id);
    else await deleteElder(id);

    fetchUsers();
  };

  // 🔥 mapping layer
  const mapToContact = (data: any) => ({
    contact_id: data.id,
    contact_name: data.name,
    contact_phone: data.phone_number,
    relationship: data.relationship,
  });

  const mapToElder = (data: any) => ({
    elder_id: data.id,
    elder_name: data.name,
    elder_phone: data.phone_number,
    relationship: data.relationship,
  });

  const handleSubmit = async (data: any) => {
    if (data.id) {
      if (role === "elder") await updateContact(mapToContact(data));
      else await updateElder(mapToElder(data));
    } else {
      if (role === "elder")
        await addContact({
          contact_name: data.name,
          contact_phone: data.phone_number,
          relationship: data.relationship,
        });
      else
        await addElder({
          elder_name: data.name,
          elder_phone: data.phone_number,
          relationship: data.relationship,
        });
    }

    setEditingId(null);
    setEditingUser(null);
    fetchUsers();
  };

  return (
    <div className="user__list">
      {users.map((user) => (
        <div key={user.id}>
          {editingId === user.id ? (
            <UserForm
              user={editingUser}
              onSubmit={handleSubmit}
              onCancel={() => {
                setEditingId(null);
                setEditingUser(null);
              }}
            />
          ) : (
            <UserItem
              user={user}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      ))}

      {/* Add new */}
      {!editingId && (
        <button onClick={() => setEditingUser({})}>
          + Add {role === "elder" ? "Contact" : "Elder"}
        </button>
      )}
    </div>
  );
};