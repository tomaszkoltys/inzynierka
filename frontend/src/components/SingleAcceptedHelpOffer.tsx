import { OfferProps, UserProps, HelpTypeProps } from "./Help";
import { StatusProps } from "./MyHelpOffers";
import { t } from "i18next";
import axios from "axios";
import { useState } from "react";
import { AiOutlineLike, AiFillLike, AiOutlineDislike, AiFillDislike, AiOutlinePercentage } from "react-icons/ai";

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
  const authorUser = users.find((user) => user.id === author);
  const helpType = helpTypes.find((helpType) => helpType.id === type);
  const typeName = helpType ? helpType.namePL : "Nieznany typ pomocy";
  const helpStat = statuses.find((helpStat) => helpStat.id === helpStatus);
  const statusName = helpStat ? helpStat.name : "Nieznany status";

  // Stan dla przycisków like'a i dislike'a oraz liczników
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = () => {
    if (!liked) {
      // Dodaj like'a do bazy danych
      axios({
        method: 'post',
        url: `http://localhost:8080/api/v1/review/addreview?user_id=${sessionStorage.getItem('user-id')}&help_id=${id}&value=1`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('jwt-token')}`
        }
      })
        .then((response) => {
          setLikes((prevLikes) => prevLikes + 1);
          setLiked(true);

          // Jeśli wcześniej użytkownik kliknął dislike'a, to cofnij dislike'a
          if (disliked) {
            setDislikes((prevDislikes) => prevDislikes - 1);
            setDisliked(false);
          }
        })
        .catch((error) => {
          console.error("Error adding like:", error);
        });
    } else {
      // Jeśli użytkownik wcześniej kliknął like'a, to cofnij like'a
      // (opcjonalnie: dodać obsługę cofania like'a z bazy danych)
      setLikes((prevLikes) => prevLikes - 1);
      setLiked(false);
    }
  };

  const handleDislike = () => {
    if (!disliked) {
      axios({
        method: 'post',
        url: `http://localhost:8080/api/v1/review/addreview?user_id=${sessionStorage.getItem('user-id')}&help_id=${id}&value=0`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('jwt-token')}`
        }
      })
        .then((response) => {
          setDislikes((prevDislikes) => prevDislikes + 1);
          setDisliked(true);

          if (liked) {
            setLikes((prevLikes) => prevLikes - 1);
            setLiked(false);
          }
        })
        .catch((error) => {
          console.error("Error adding dislike:", error);
        });
    } else {
      setDislikes((prevDislikes) => prevDislikes - 1);
      setDisliked(false);
    }
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
              {liked ? <AiFillLike /> : <AiOutlineLike />}
            </button>
            <span>{likes}</span>
            <button onClick={handleDislike} className="text-red-500">
              {disliked ? <AiFillDislike /> : <AiOutlineDislike />}
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
