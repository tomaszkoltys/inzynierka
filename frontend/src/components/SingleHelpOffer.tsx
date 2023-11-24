import axios from "axios";
import { OfferProps, UserProps, HelpTypeProps } from "./Help";
import { useState, useEffect } from "react";
import { FaHandsHelping } from "react-icons/fa";
import { AiFillLike, AiFillDislike, AiOutlinePercentage } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { t } from "i18next";

export const SingleHelpOffer = ({
  id,
  author,
  type,
  description,
  photo,
  users,
  helpTypes,
}: OfferProps & { users: UserProps[] } & { helpTypes: HelpTypeProps[] }) => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [recommendationPercentage, setRecommendationPercentage] = useState(0);
  const [positiveReviewCount, setPositiveReviewCount] = useState(0);
  const [negativeReviewCount, setNegativeReviewCount] = useState(0);

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8080/api/v1/review/percentageofrecommendations?user_id=${author}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
      },
    })
      .then((response) => {
        setRecommendationPercentage(response.data || 0);
      })
      .catch((error) => {
        console.error("Error fetching recommendation percentage:", error);
      });

    axios({
      method: "get",
      url: `http://localhost:8080/api/v1/review/findreview?help_id=${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
      },
    })
      .then((response) => {
        const review = response.data;
        if (review) {
          setLiked(review.review_value === 1);
          setDisliked(review.review_value === 0);
        }
      })
      .catch((error) => {
        console.error("Error fetching review:", error);
      });

    axios({
      method: "get",
      url: `http://localhost:8080/api/v1/review/positiveReviewCount?user_id=${author}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
      },
    })
      .then((response) => {
        setPositiveReviewCount(response.data || 0);
      })
      .catch((error) => {
        console.error("Error fetching positive review count:", error);
      });

    axios({
      method: "get",
      url: `http://localhost:8080/api/v1/review/negativeReviewCount?user_id=${author}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
      },
    })
      .then((response) => {
        setNegativeReviewCount(response.data || 0);
      })
      .catch((error) => {
        console.error("Error fetching negative review count:", error);
      });
  }, []);

  const handleAcceptClick = async () => {
    axios({
      method: 'put',
      url: `http://localhost:8080/api/v1/help/accepthelp?id=${id}&supporter=${localStorage.getItem('user-id')}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`
      }
    })
    .then((response) => {
      if (response.status === 200) {
        notifyAcceptedHelp();
        setIsAccepted(true);
      }
    })
    .catch((error) => {
      toast.error("Błąd podczas aktualizacji pomocy.", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.error(error);
    });
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
  const currentUserRole = localStorage.getItem('user-role');

  const buttonText =
    currentUserRole === "ROLE_VOLUNTEER" ? "Udziel pomocy" :
    currentUserRole === "ROLE_REFUGEE" ? <div>{t("accept-help")}</div> :
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
          <div className="flex items-center space-x-2 mt-2">
            <AiFillLike className="text-green-500" />
            <span>{positiveReviewCount}</span>
            <AiFillDislike className="text-red-500" />
            <span>{negativeReviewCount}</span>
            <AiOutlinePercentage className="text-gray-500" />
            <span>{recommendationPercentage}%</span>
          </div>
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
