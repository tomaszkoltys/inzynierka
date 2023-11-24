import React, { useState } from "react";
import { UserProps, UserRolesProps } from "./AdminUser";
import "/dist/assets/index-d018f553.css";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineEdit, AiOutlineBlock, AiOutlineCheckCircle, AiOutlineDelete } from "react-icons/ai";
import { TbLock, TbLockOpen } from "react-icons/tb";

type AdminSingleUserProps = {
  user: UserProps;
  userRoles: UserRolesProps[];
  accountStatuses: UserRolesProps[];
  onEdit: (userId: number, updatedUser: Partial<UserProps>) => void;
  onBlock: (userId: number) => void;
};

const AdminSingleUser: React.FC<AdminSingleUserProps> = ({ user, userRoles, accountStatuses, onEdit, onBlock }) => {
  const isEven = user.id % 2 === 0;
  const rowClass = isEven ? "even" : "odd";
  const { t } = useTranslation();

  const [isEditing, setIsEditing] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleSave = () => {
    axios({
      method: 'put',
      url: `http://localhost:8080/api/v1/user/edituser?userId=${user.id}&name=${editedUser.name}&surname=${editedUser.surname}&username=${editedUser.username}&email_address=${editedUser.email_address}&identity_number=${editedUser.identity_number}&status=${editedUser.account_status}&accepted=${editedUser.accepted}&role=${editedUser.role}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`
      }
    })
      .then((response) => {
        onEdit(user.id, editedUser);
        setIsEditing(false);
        console.log(response);
        toast.success("Pomyślnie zaktualizowano użytkownika!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((error) => {
        console.error("Error saving user:", error);
        // Obsłuż błąd zapisu
        console.error(error);
        toast.error("Błąd podczas aktualizowania użytkownika!", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const handleCancel = () => {
    // Anuluj edycję i przywróć oryginalne dane użytkownika
    setEditedUser({ ...user });
    setIsEditing(false);
  };

  const handleBlock = () => {
    axios({
      method: 'put',
      url: `http://localhost:8080/api/v1/user/edituser?userId=${user.id}&name=${editedUser.name}&surname=${editedUser.surname}&username=${editedUser.username}&email_address=${editedUser.email_address}&identity_number=${editedUser.identity_number}&status=2&accepted=${editedUser.accepted}&role=${editedUser.role}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`
      }
    })
      .then((response) => {
        onBlock(user.id);
        setIsBlocked(true);
        console.log(response);
        toast.success("Pomyślnie zablokowano użytkownika!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((error) => {
        console.error("Error during blocking user:", error);
        console.error(error);
        toast.success("Błąd podczas próby zablokowania użytkownika!", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const handleUnblock = () => {
    axios({
      method: 'put',
      url: `http://localhost:8080/api/v1/user/edituser?userId=${user.id}&name=${editedUser.name}&surname=${editedUser.surname}&username=${editedUser.username}&email_address=${editedUser.email_address}&identity_number=${editedUser.identity_number}&status=1&accepted=${editedUser.accepted}&role=${editedUser.role}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`
      }
    })
      .then((response) => {
        onBlock(user.id);
        setIsBlocked(false);
        console.log(response);
        toast.success("Pomyślnie odblokowano użytkownika!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((error) => {
        console.error("Error during unblocking user:", error);
        console.error(error);
        toast.error("Błąd podczas próby odblokowania użytkownika.", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const deleteUser = () => {
    axios({
      method: 'post',
      url: `http://localhost:8080/api/v1/user/deleteuser?userId=${user.id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`
      }
    })
      .then((response) => {
        console.log("Odpowiedź od serwera:", response.data);
        toast.success("Pomyślnie usunięto użytkownika!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((error) => {
        console.error("Błąd podczas usuwania użytkownika:", error);
      });
  };

  return (
    <tr className={rowClass}>
      <td className={`${user.account_status === 1 ? "text-black" : "text-[#fc3d3d]"}`}>{user.id}</td>
      <td>
        {isEditing ? (
          <input
            type="text"
            className="w-full border-none outline-none ml-2 text-sm"
            value={editedUser.name}
            onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
          />
        ) : (
          <span className={`${user.account_status === 1 ? "text-black" : "text-[#fc3d3d]"}`}>{user.name}</span>
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
          <span className={`${user.account_status === 1 ? "text-black" : "text-[#fc3d3d]"}`}>{user.surname}</span>
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
          <span className={`${user.account_status === 1 ? "text-black" : "text-[#fc3d3d]"}`}>{user.username}</span>
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
          <span className={`${user.account_status === 1 ? "text-black" : "text-[#fc3d3d]"}`}>{user.email_address}</span>
        )}
      </td>
      <td>
        {isEditing ? (
          <select
            value={editedUser.role}
            onChange={(e) => setEditedUser({ ...editedUser, role: Number(e.target.value) })}
            className="p-2 border border-gray-300 rounded-md text-[#000] text-sm outline-none focus:border focus:border-[#000] md:w-[90%]"
          >
            {userRoles.map((userRole) => (
              <option key={userRole.id} value={userRole.id} style={{ color: "black" }}>
                {userRole.name}
              </option>
            ))}
          </select>
        ) : (
          userRoles.map((userRole) => (
            editedUser.role === userRole.id ? <span className={`${user.account_status === 1 ? "text-black" : "text-[#fc3d3d]"}`}>{userRole.name}</span> : ""
          ))
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
          <span className={`${user.account_status === 1 ? "text-black" : "text-[#fc3d3d]"}`}>{user.identity_number}</span>
        )}
      </td>
      <td>
        {isEditing ? (
          <select
            value={editedUser.account_status}
            onChange={(e) => setEditedUser({ ...editedUser, account_status: Number(e.target.value) })}
            className="p-2 border border-gray-300 rounded-md text-[#000] text-sm outline-none focus:border focus:border-[#000] md:w-[90%]"
          >
            {accountStatuses.map((accountStatus) => (
              <option key={accountStatus.id} value={accountStatus.id} style={{ color: "black" }}>
                {accountStatus.name}
              </option>
            ))}
          </select>
        ) : (
          accountStatuses.map((accountStatus) => (
            editedUser.account_status === accountStatus.id ? <span className={`${user.account_status === 1 ? "text-black" : "text-[#fc3d3d]"}`}>{accountStatus.name}</span> : ""
          ))
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
          <span className={`${user.account_status === 1 ? "text-black" : "text-[#fc3d3d]"}`}>{user.accepted}</span>
        )}
      </td>
      <td>
        {isEditing ? (
          <>
            <button
              className="bg-green-500 text-white px-4 py-2 mx-2"
              onClick={handleSave}
            >
              <AiOutlineCheckCircle />
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
              className="bg-yellow-default text-white px-4 py-1 mx-2"
              onClick={() => setIsEditing(true)}
            >
              <AiOutlineEdit />
            </button>
            <button
              className={`${user.account_status === 1 ? "bg-red-500 text-white" : "bg-green-500 text-white"} px-4 py-1 mx-2`}
              onClick={user.account_status === 1 ? handleBlock : handleUnblock}
            >
             {user.account_status === 1 ? <TbLock /> : <TbLockOpen />}


            </button>
            <button className="bg-red-600 text-white px-4 py-1 mx-2 mt-1" onClick={deleteUser}>
              <AiOutlineDelete />
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default AdminSingleUser;
