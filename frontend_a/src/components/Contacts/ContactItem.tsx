// src/components/Contacts/ContactItem.tsx

type Props = {
  contact: any;
  onEdit: (contact: any) => void;
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

export const ContactItem = ({ contact, onEdit, onDelete }: Props) => {
  return (
    <div className="flex justify-between items-center p-3 border rounded mb-2">
      <div>
        <p className="font-bold">
          {contact.name || contact.phone_number}
        </p>
        <p className="text-sm text-gray-500">
          Last check-in: {timeSince(contact.last_check_in)}
        </p>
        <p className="text-xs text-gray-400">
          {contact.relationship}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(contact)}
          className="text-blue-500"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(contact.id)}
          className="text-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
};