// src/components/Contacts/ContactItem.tsx
type Props = {
  contact: any;
  onEdit: (contact: any) => void;
  onDelete: (id: string) => void;
};

export const ContactItem = ({ contact, onEdit, onDelete }: Props) => {
  return (
    <div className="contacts__item">
      <div className="contacts__item__info">
        <p className="contacts__item__info__name">
          {contact.name || contact.phone_number}
        </p>
      </div>

      <div className="contacts__item__actions">
        <button
          onClick={() => onEdit(contact)}
          className="contacts__item__actions--edit"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(contact.id)}
          className="contacts__item__actions--delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
};