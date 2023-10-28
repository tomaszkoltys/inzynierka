import React, { useState } from "react";
import { UserProps } from "./AdminUser";
import "/dist/assets/index-d018f553.css";
import { useTranslation } from "react-i18next";
import axios from "axios";

type AdminSingleUserProps = {
  user: UserProps;
  onEdit: (userId: number, updatedUser: Partial<UserProps>) => void;
  onBlock: (userId: number) => void;
};

const AdminSingleUser: React.FC<AdminSingleUserProps> = ({ user, onEdit, onBlock }) => {
  const isEven = user.id % 2 === 0;
  const rowClass = isEven ? "even" : "odd";
  const { t } = useTranslation();

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleSave = () => {
    axios
    .put(`http://localhost:8080/edituser?userId=${user.id}&name=${editedUser.name}&surname=${editedUser.surname}&username=${editedUser.username}&email_address=${editedUser.email_address}&identity_number=${editedUser.identity_number}&status=${editedUser.status}&accepted=${editedUser.accepted}&role=${editedUser.role}`)
      .then((response) => {
        onEdit(user.id, editedUser);
        setIsEditing(false);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error saving user:", error);
        // Obsłuż błąd zapisu
        console.error(error);
      });
  };

  const handleCancel = () => {
    // Anuluj edycję i przywróć oryginalne dane użytkownika
    setEditedUser({ ...user });
    setIsEditing(false);
  };

  return (
    <tr className={rowClass}>
      <td>{user.id}</td>
      <td>
        {isEditing ? (
          <input
            type="text"
            className="w-full border-none outline-none ml-2 text-sm"
            value={editedUser.name}
            onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
          />
        ) : (
          user.name
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            className="w-full border-none outline-none ml-2 text-sm"
            value={editedUser.surname}
            onChange={(e) => setEditedUser({ ...editedUser, surname: e.target.value })}
          />
        ) : (
          user.surname
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            className="w-full border-none outline-none ml-2 text-sm"
            value={editedUser.username}
            onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
          />
        ) : (
          user.username
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            className="w-full border-none outline-none ml-2 text-sm"
            value={editedUser.email_address}
            onChange={(e) => setEditedUser({ ...editedUser, email_address: e.target.value })}
          />
        ) : (
          user.email_address
        )}
      </td>
      <td>
        {isEditing ? (
          <input
          type="text"
          className="w-full border-none outline-none ml-2 text-sm"
            value={editedUser.role}
            onChange={(e) => setEditedUser({ ...editedUser, role: Number(e.target.value) })}
          >
            {/* Tutaj możesz dodać opcje roli */}
          </input>
        ) : (
          user.role.toString()
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            className="w-full border-none outline-none ml-2 text-sm"
            value={editedUser.identity_number}
            onChange={(e) => setEditedUser({ ...editedUser, identity_number: e.target.value })}
          />
        ) : (
          user.identity_number
        )}
      </td>
      <td>
        {isEditing ? (
          <input
          type="text"
          className="w-full border-none outline-none ml-2 text-sm"
            value={editedUser.status}
            onChange={(e) => setEditedUser({ ...editedUser, status: Number(e.target.value) })}
          >
            {/* Tutaj możesz dodać opcje statusu */}
          </input>
        ) : (
          user.status.toString()
        )}
      </td>
      <td>
        {isEditing ? (
          <input
          type="text"
          className="w-full border-none outline-none ml-2 text-sm"
            value={editedUser.accepted}
            onChange={(e) => setEditedUser({ ...editedUser, accepted: Number(e.target.value) })}
          >
            {/* Tutaj możesz dodać opcje statusu */}
          </input>
        ) : (
          user.accepted
        )}
      </td>
      <td>
        {isEditing ? (
          <>
            <button
              className="bg-green-500 text-white px-4 py-2 mx-2"
              onClick={handleSave}
            >
              {t("save")}
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 mx-2"
              onClick={handleCancel}
            >
              {t("cancel")}
            </button>
          </>
        ) : (
          <>
            <button
              className="bg-yellow-default text-white px-4 py-2 mx-2"
              onClick={() => setIsEditing(true)}
            >
              {t("edit")}
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 mx-2"
              onClick={() => onBlock(user.id)}
            >
              {t("block")}
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default AdminSingleUser;
