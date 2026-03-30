// src/components/Elders/ElderItem.tsx

type Props = {
  elder: any;
  onEdit: (elder: any) => void;
  onDelete: (id: string) => void;
};

const timeSince = (timestamp?: string) => {
  if (!timestamp) return "Never";

  const diff = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.floor(diff / 60000);

  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m ago`;
};

export const ElderItem = ({ elder, onEdit, onDelete }: Props) => {
  return (
    <div className="flex justify-between items-center p-3 border rounded mb-2">
      <div>
        <p className="font-bold">
          {elder.name || elder.phone_number}
        </p>

        <p className="text-sm text-gray-500">
          Last check-in: {timeSince(elder.last_check_in)}
        </p>

        <p className="text-xs text-gray-400">
          {elder.relationship}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(elder)}
          className="text-blue-500"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(elder.id)}
          className="text-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
};