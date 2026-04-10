// src/components/Users/UserItem.tsx
type Props = {
  user: any;
  onEdit: (user: any) => void;
  onDelete: (id: string) => void;
};

export const UserItem = ({ user, onEdit, onDelete }: Props) => {
  return (
    <div className="user__item">
      <span>
        {user.name || user.phone_number}
        {user.relationship && ` (${user.relationship})`}
      </span>

      <div>
        <button onClick={() => onEdit(user)}>✏️</button>
        <button onClick={() => onDelete(user.id)}>🗑️</button>
      </div>
    </div>
  );
};