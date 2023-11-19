import { OfferProps, UserProps, HelpTypeProps } from "./AllHelpOffers";
import { StatusProps } from "./MyHelpOffers";
import { t } from "i18next";
import axios from "axios";
import { useState } from "react";
import { AiOutlineLike, AiOutlineDislike, AiOutlinePercentage } from "react-icons/ai";

export const SingleAcceptedHelpOffer = ({
  id,
  author,
  type,
  description,
  photo,
  helpStatus,
  users,
  helpTypes,
  statuses,
}: OfferProps & { users: UserProps[] } & { helpTypes: HelpTypeProps[] } & {
  statuses: StatusProps[];
}) => {
  // Znajdź użytkownika na podstawie ID autora
  const authorUser = users.find((user) => user.id === author);

  // Znajdź odpowiednią nazwę typu pomocy na podstawie identyfikatora "type"
  const helpType = helpTypes.find((helpType) => helpType.id === type);
  const typeName = helpType ? helpType.namePL : "Nieznany typ pomocy";

  // Znajdź nazwę statusu
  const helpStat = statuses.find((helpStat) => helpStat.id === helpStatus);
  const statusName = helpStat ? helpStat.name : "Nieznany status";

  // Stan dla przycisków like'a i dislike'a oraz liczników
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  // Funkcje obsługujące kliknięcia przycisków
  const handleLike = () => {
    setLikes((prevLikes) => prevLikes + 1);
  };

  const handleDislike = () => {
    setDislikes((prevDislikes) => prevDislikes + 1);
  };

  return (
    <div className="flex flex-col bg-yellow-light border border-yellow-light text-[#fff]">
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
        <div className="flex items-center">
          {authorUser ? (
            <span className="text-[#fff] text-lg">
              {authorUser.name} {authorUser.surname}
            </span>
          ) : (
            <span className="text-[#fff] text-lg">Nieznany autor</span>
          )}
          <div className="flex items-center mx-4 space-x-2">
          <button onClick={handleLike} className="text-green-500">
            <AiOutlineLike />
          </button>
          <span>{likes}</span>
          <button onClick={handleDislike} className="text-red-500">
            <AiOutlineDislike />
          </button>
          <span>{dislikes}</span>
          <AiOutlinePercentage className="text-gray-500" />
          <span>{likes > 0 || dislikes > 0 ? ((likes / (likes + dislikes)) * 100).toFixed(0) : 0}%</span>
        </div>
        </div>
        
        
        <div className="ml-4 border rounded-md py-1 px-2 text-[#fff] bg-gray-600">
            {statusName}
          </div>
      </div>
    </div>
  );
};
