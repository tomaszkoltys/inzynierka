import { OfferProps, UserProps, HelpTypeProps } from "./AllHelpRequests";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export const SingleAdminHelp = ({
  author,
  type,
  description,
  photo,
  users,
  helpTypes,
  id,
}: OfferProps & { users: UserProps[] } & { helpTypes: HelpTypeProps[] }) => {
  const authorUser = users.find((user) => user.id === author);
  const { t } = useTranslation();

  const [isEditing, setEditing] = useState(false);
  const [updatedType, setUpdatedType] = useState(type);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [updatedPhoto, setUpdatedPhoto] = useState(photo);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    axios({
      method: 'put',
      url: `http://localhost:8080/api/v1/help/updatehelp?id=${id}&type=${updatedType}&description=${updatedDescription}&photo=${updatedPhoto}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('jwt-token')}`
      }
    })
    .then((response) => {
      if (response.status === 200) {
        toast.success("Pomyślnie zaktualizowano pomoc!", {
          position: toast.POSITION.TOP_CENTER,
        });
        setEditing(false);
      }
    })
    .catch((error) => {
      toast.error("Błąd podczas aktualizacji pomocy.", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.error(error);
    });
  };

  const handleCancelClick = () => {
    setUpdatedType(type);
    setUpdatedDescription(description);
    setUpdatedPhoto(photo);
    setEditing(false);
  };

  const handleDeleteClick = () => {
    axios({
      method: 'delete',
      url: `http://localhost:8080/api/v1/help/deletehelp?id=${id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('jwt-token')}`
      }
    })
    .then((response) => {
      if (response.status === 200) {
        toast.success("Pomyślnie usunięto pomoc!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    })
    .catch((error) => {
      toast.error("Błąd podczas usuwania pomocy.", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.error(error);
    });
  };

  return (
    <div className="flex flex-col bg-yellow-light border border-yellow-light text-[#fff]">
      <div className="flex h-48">
        <div className="w-[50%]">
          <img src={photo} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="w-[50%] mx-2 mb-2 my-2">
          {isEditing ? (
            <div>
              <select
                value={updatedType}
                onChange={(e) => setUpdatedType(parseInt(e.target.value, 10))}
                className="p-2 border border-gray-300 rounded-md text-[#000] text-sm outline-none focus:border focus:border-[#000] md:w-[90%]"
              >
                {helpTypes.map((helpType) => (
                  <option key={helpType.id} value={helpType.id} style={{ color: "black" }}>
                    {helpType.namePL}
                  </option>
                ))}
              </select>

              <br />
              <br />
              <textarea
                placeholder={t("description")}
                className="w-full h-[60px] p-2 border border-gray-300 text-[#000] rounded-md text-sm resize-none outline-none md:w-[90%]"
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              />
              <br />
              <input
                type="text"
                className="w-full h-[40px] p-2 border border-gray-300 text-[#000] rounded-md text-sm resize-none outline-none md:w-[90%]"
                placeholder={t("photo")}
                value={updatedPhoto}
                onChange={(e) => setUpdatedPhoto(e.target.value)}
              />
              <br />

            </div>
          ) : (
            <div>
              <h4 className="text-xl font-semibold mx-5">
                {helpTypes.find((helpType) => helpType.id === updatedType)?.namePL || "Nieznany typ pomocy"}
              </h4>
              <p className="mt-2">{description}</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between bg-yellow-dark p-2">
        {authorUser ? (
          <span className="text-[#fff] text-lg">
            {authorUser.name} {authorUser.surname}
          </span>
        ) : (
          <span className="text-[#fff] text-lg">Nieznany autor</span>
        )}
        <div>
          {isEditing ?
            (
              <button onClick={handleSaveClick} className="bg-[#8AA9C7] text-white px-4 py-2 mx-2">
                {t("save")}
              </button>
            ) :
            (
              <button onClick={handleEditClick} className="bg-[#8AA9C7] text-white px-4 py-2 mx-2">
                {t("edit")}
              </button>
            )
          }
          {isEditing ?
            (
              <button onClick={handleCancelClick} className="bg-[#7F7F7F] text-white px-4 py-2 mx-2">
                {t("cancel")}
              </button>
            ) :
            (
              <button onClick={handleDeleteClick} className="bg-red-500 text-white px-4 py-2 mx-2">
                {t("delete")}
              </button>
            )
          }
        </div>
      </div>
    </div>
  );
};
