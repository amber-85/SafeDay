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
    <div className="elders__item">
      <div className="elders__item__info">
        <p className="elders__item__info__name">
          {elder.name || elder.phone_number}
        </p>

        <p className="elders__item__info__checkin">
          Last check-in: {timeSince(elder.last_check_in)}
        </p>

        <p className="elders__item__info__relationship">
          {elder.relationship}
        </p>
      </div>

      <div className="elders__item__actions">
        <button
          onClick={() => onEdit(elder)}
          className="elders__item__actions__edit"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(elder.id)}
          className="elders__item__actions--delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
};