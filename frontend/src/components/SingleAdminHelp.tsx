import { OfferProps, UserProps, HelpTypeProps } from "./Help";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { TbPencilCancel, TbPencil } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlinePlus, AiOutlineSave } from "react-icons/ai";

export const SingleAdminHelp = ({
  author,
  type,
  description,
  photo,
  users,
  helpTypes,
  id,
  side,
}: OfferProps & { users: UserProps[] } & { helpTypes: HelpTypeProps[] }) => {
  const authorUser = users.find((user) => user.id === author);
  const { t } = useTranslation();

  const [isEditing, setEditing] = useState(false);
  const [updatedType, setUpdatedType] = useState(type);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [updatedPhoto, setUpdatedPhoto] = useState(photo);
  const [imageFile, setImageFile] = useState<Blob | string>(`data:image/png;base64,${photo}`);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    if(updatedDescription === ""){
      if(side === 1){
        toast.error("Błąd podczas aktualizacji oferty pomocy!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      else{
        toast.error("Błąd podczas aktualizacji prośby o pomoc!", {
          position: toast.POSITION.TOP_CENTER,
        });
      } 
    }
    else{
      const form = new FormData();
      form.append('id',id.toString());
      form.append('type', updatedType.toString());
      form.append('description', updatedDescription);
      form.append('photo', imageFile);

      axios.put('http://localhost:8080/api/v1/help/updatehelp', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`
        }
        
      })
    .then((response) => {
      if (response.status === 200) {
        if(side === 1){
          toast.success("Pomyślnie zaktualizowano ofertę pomocy!", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        else{
          toast.success("Pomyślnie zaktualizowano prośbę o pomoc!", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        setEditing(false);
      }
    })
    .catch((error) => {
      if(side === 1){
        toast.error("Błąd podczas aktualizacji oferty pomocy.", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      else{
        toast.error("Błąd podczas aktualizacji prośby o pomoc.", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      console.error(error);
    });
    }

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
        'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`
      }
    })
    .then((response) => {
      if (response.status === 200) {
        if(side === 1){
          toast.success("Pomyślnie usunięto ofertę pomocy!", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        else{
          toast.success("Pomyślnie usunięto prośbę o pomoc!", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      }
    })
    .catch((error) => {
      if(side === 1){
        toast.error("Błąd podczas usuwania oferty pomocy.", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      else{
        toast.error("Błąd podczas usuwania prośby o pomoc.", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      console.error(error);
    });
  };

  return (
    <div className="flex flex-col bg-yellow-light border border-yellow-light text-[#fff]">
      <div className="flex h-48">
        <div className="w-[50%]">
          {isEditing ? (
              <div className="flex items-center justify-center relative w-full h-full">
              <div className="flex items-center justify-center w-[140px] h-[140px] bg-gray-300 relative my-2">
                <input
                  type="file"
                  accept="image/*"
                  className="absolute opacity-0 left-0 w-full h-full"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                      const file = files[0];
                      setImageFile(file);
                    }
                  }}
                />
                <AiOutlinePlus color="#fff" size={25} />
              </div>
            </div>
          ):(
            <img src={`data:image/png;base64,${photo}`} alt="" className="w-full h-full object-cover" />
          )}
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
              <button onClick={handleSaveClick} className="bg-green-500 text-white px-4 py-2 mx-2">
                <AiOutlineSave /> 
              </button>
            ) :
            (
              <button onClick={handleEditClick} className="bg-[#8AA9C7] text-white px-4 py-2 mx-2">
                <TbPencil/>
              </button>
            )
          }
          {isEditing ?
            (
              <button onClick={handleCancelClick} className="bg-[#7F7F7F] text-white px-4 py-2 mx-2">
                <TbPencilCancel />
              </button>
            ) :
            (
              <button onClick={handleDeleteClick} className="bg-red-500 text-white px-4 py-2 mx-2">
                <MdDeleteOutline />
              </button>
            )
          }
        </div>
      </div>
    </div>
  );
};
