import { OfferProps, UserProps, HelpTypeProps } from "./Help";
import { StatusProps } from "./MyHelpOffers";
import { t } from "i18next";
import axios from "axios";
import { useState, useEffect } from "react";
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
        Authorization: `Bearer ${sessionStorage.getItem("jwt-token")}`,
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
        Authorization: `Bearer ${sessionStorage.getItem("jwt-token")}`,
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
        Authorization: `Bearer ${sessionStorage.getItem("jwt-token")}`,
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
        Authorization: `Bearer ${sessionStorage.getItem("jwt-token")}`,
      },
    })
      .then((response) => {
        setNegativeReviewCount(response.data || 0);
      })
      .catch((error) => {
        console.error("Error fetching negative review count:", error);
      });
  }, []);

  const handleLike = () => {
    if (!liked) {
      axios({
        method: "post",
        url: `http://localhost:8080/api/v1/review/addreview?user_id=${author}&help_id=${id}&value=1`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt-token")}`,
        },
      })
        .then((response) => {
          setLikes((prevLikes) => prevLikes + 1);
          setLiked(true);

          if (disliked) {
            setDislikes((prevDislikes) => prevDislikes - 1);
            setDisliked(false);
          }
        })
        .catch((error) => {
          console.error("Error adding like:", error);
        });
    } else {
      setLikes((prevLikes) => prevLikes - 1);
      setLiked(false);
    }
  };

  const handleDislike = () => {
    if (!disliked) {
      axios({
        method: "post",
        url: `http://localhost:8080/api/v1/review/addreview?user_id=${author}&help_id=${id}&value=0`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt-token")}`,
        },
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
          <img
            src={photo}
            alt=""
            className="w-full h-full object-cover"
          />
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
            <span>{positiveReviewCount}</span>
            <button onClick={handleDislike} className="text-red-500">
              {disliked ? <AiFillDislike /> : <AiOutlineDislike />}
            </button>
            <span>{negativeReviewCount}</span>
            <AiOutlinePercentage className="text-gray-500" />
            <span>{recommendationPercentage}%</span>
          </div>
        </div>
        <div className="ml-4 border rounded-md py-1 px-2 text-[#fff] bg-gray-600">
          {statusName}
        </div>
      </div>
    </div>
  );
};
