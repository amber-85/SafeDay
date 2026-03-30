// src/components/Elders/ElderList.tsx
import { useEffect, useState } from "react";
import {
  getElders,
  addElder,
  updateElder,
  deleteElder,
} from "../../services/api";
import { ElderItem } from "./ElderItem";
import { ElderForm } from "./ElderForm";

export const ElderList = () => {
  const [elders, setElders] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const fetchElders = async () => {
    const data = await getElders();

    // 🔥 Sort by oldest check-in (most urgent first)
    const sorted = (data || []).sort((a: any, b: any) => {
      const aTime = a.last_check_in ? new Date(a.last_check_in).getTime() : 0;
      const bTime = b.last_check_in ? new Date(b.last_check_in).getTime() : 0;
      return aTime - bTime;
    });

    setElders(sorted);
  };

  useEffect(() => {
    fetchElders();

    // 🔄 auto refresh every 30 sec
    const interval = setInterval(fetchElders, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = (elder: any) => {
    setEditing(elder);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this elder?")) return;
    await deleteElder(id);
    fetchElders();
  };

  const handleSubmit = async (data: any) => {
    if (data.elder_id) {
      await updateElder(data);
    } else {
      await addElder(data);
    }

    setShowForm(false);
    fetchElders();
  };

  return (
    <div>
      <button
        onClick={handleAdd}
        className="mb-4 bg-green-500 text-white p-2 rounded"
      >
        + Add Elder
      </button>

      {elders.length === 0 && (
        <p className="text-gray-500">No elders connected</p>
      )}

      {elders.map((e) => (
        <ElderItem
          key={e.id}
          elder={e}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}

      {showForm && (
        <ElderForm
          elder={editing}
          onSubmit={handleSubmit}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};