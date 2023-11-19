import { OfferProps, UserProps, HelpTypeProps } from "./AllHelpRequests";
import { useState } from "react";
import { FaHandsHelping } from "react-icons/fa"; // Importujemy ikonę przy użyciu react-icons
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

console.clear();

export const SingleOffer = ({
  author,
  type,
  description,
  photo,
  users,
  helpTypes,
}: OfferProps & { users: UserProps[] } & { helpTypes: HelpTypeProps[] }) => {
  const [isAccepted, setIsAccepted] = useState(false);

  const handleAcceptClick = () => {
    // Czekamy aż Ola doda zapytanie /accepthelp
    setIsAccepted(true);
    notifyAcceptedHelp(); // Wyślij komunikat Toast po przyjęciu pomocy
  };

  const notifyAcceptedHelp = () => {
    toast.success(
      <>
        <b>Przyjęto pomoc!{" "}</b>
        <span
          className="toast-link"
          onClick={() => window.location.href = "http://localhost:5173/accepted_help_offers"}
        >
          <br/><u>Przejdź</u> do wszystkich przyjętych ofert pomocy.
        </span>
      </>,
      {
        position: toast.POSITION.TOP_CENTER,
      }
    );
  };

  const authorUser = users.find((user) => {
    return user.id === author;
  });

  const helpType = helpTypes.find((helpType) => helpType.id === type);
  const typeName = helpType ? helpType.namePL : "Nieznany typ pomocy";
  const currentUserRole = sessionStorage.getItem('user-role');

  const buttonText =
    currentUserRole === "ROLE_VOLUNTEER" ? "Udziel pomocy" :
    currentUserRole === "ROLE_REFUGEE" ? "Przyjmij pomoc" :
    "";

  return (
    <div className={`flex flex-col bg-${isAccepted ? "green" : "yellow"}-light border border-${isAccepted ? "green" : "yellow"}-light text-[#fff]`}>
      <div className="flex h-48">
        <div className="w-[50%]">
          <img src={photo} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="w-[50%] mx-2 mb-2 my-2">
          <h4 className="text-xl font-semibold mx-5">{typeName}</h4>
          <p className="mt-2">{description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between bg-yellow-dark p-4">
        <div>
          {authorUser ? (
            <span className="text-[#fff] text-lg">
              {authorUser.name} {authorUser.surname}
            </span>
          ) : (
            <span className="text-[#fff] text-lg">Nieznany autor</span>
          )}
        </div>
        {!isAccepted && (
          <button
            onClick={handleAcceptClick}
            className="px-4 py-2 text-white bg-green-500 rounded-md flex items-center"
          >
            <FaHandsHelping className="mr-2" />
            {buttonText}
          </button>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};
