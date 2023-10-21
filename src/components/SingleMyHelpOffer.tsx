import { useState } from "react";
import { OfferProps, UserProps, HelpTypeProps } from "./AllHelpRequests";
import { Dropdown } from "./Dropdown";
import { StatusProps } from "./MyHelpOffers";
import { t } from "i18next";
import axios from "axios";

export const SingleMyHelpOffer = ({
  id,
  author,
  type,
  description,
  photo,
  help_status,
  users,
  helpTypes,
  statuses,
}: OfferProps & { users: UserProps[] } & { helpTypes: HelpTypeProps[] } & {
  statuses: StatusProps[];
}) => {
  const [selectedStatusType, setSelectedStatusType] = useState<string | null>(
    null
  );
  const [selectedStatusTypeId, setSelectedStatusTypeId] = useState<
    number | null
  >(null);

  // Znajdź użytkownika na podstawie ID autora
  const authorUser = users.find((user) => {
    return user.id === author;
  });

  // Znajdź odpowiednią nazwę typu pomocy na podstawie identyfikatora "type"
  const helpType = helpTypes.find((helpType) => helpType.id === type);
  const typeName = helpType ? helpType.namePL : "Nieznany typ pomocy";

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedStatusType(selected);
    const selectedStatusTypeId =
      statuses.find((helpStatus) => helpStatus.name === selected)?.id || null;
    setSelectedStatusTypeId(selectedStatusTypeId);

    axios
      .post(
        `http://localhost:8080/updatehelpstatus?helpId=${id}&help_status=${selectedStatusTypeId}`
      )
      .then((response) => {
        console.log("Help status updated:", response.data);
      })
      .catch((error) => {
        console.error("Error updating help status:", error);
      });
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
      <div className="flex items-center justify-center bg-yellow-dark">
        {/* Sprawdź, czy znaleziono użytkownika, zanim dostaniesz się do jego właściwości */}
        {authorUser ? (
          <span className="text-[#fff] text-lg">
            {authorUser.name} {authorUser.surname}
          </span>
        ) : (
          <span className="text-[#fff] text-lg">Nieznany autor</span>
        )}
      </div>
      <div className="w-full">
        <div className="flex items-center justify-center flex-col mt-8 mb-12 gap-6">
          <Dropdown
            label={t("choose-status-of-help")}
            options={statuses.map((helpStatus) => ({ value: helpStatus.name }))}
            onChange={handleStatusChange}
          />
        </div>
      </div>
    </div>
  );
};
