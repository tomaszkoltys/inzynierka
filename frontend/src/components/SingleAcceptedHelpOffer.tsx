import { OfferProps, UserProps, HelpTypeProps } from "./AllHelpOffers";
import { StatusProps } from "./MyHelpOffers";
import { t } from "i18next";
import axios from "axios";

export const SingleAcceptedHelpOffer = ({
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
  console.log(helpStatus);
  // Znajdź użytkownika na podstawie ID autora
  const authorUser = users.find((user) => {
    return user.id === author;
  });

  // Znajdź odpowiednią nazwę typu pomocy na podstawie identyfikatora "type"
  const helpType = helpTypes.find((helpType) => helpType.id === type);
  const typeName = helpType ? helpType.namePL : "Nieznany typ pomocy";

  //znajdz nazwe statusu
  const helpStat = statuses.find((helpStat) => helpStat.id === helpStatus);
  console.log(helpStat);
  const statusName = helpStat ? helpStat.name : "Nieznany status";

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
      <div className="flex items-center justify-center bg-yellow-dark">
        {authorUser ? (
          <span className="text-[#fff] text-lg">
            {authorUser.name} {authorUser.surname}
          </span>
        ) : (
          <span className="text-[#fff] text-lg">Nieznany autor</span>
        )}
      </div>
      <div className="w-full flex items-center justify-center py-2">
        <div>{statusName}</div>
      </div>
    </div>
  );
};
