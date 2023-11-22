import { useState } from "react";
import { OfferProps, UserProps, HelpTypeProps } from "./Help";
import { StatusProps } from "./MyHelpOffers";
import { Dropdown } from "./Dropdown";
import { t } from "i18next";
import axios from "axios";

export const SingleMyHelpOffer = ({
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
  const [selectedStatusType, setSelectedStatusType] = useState<string | null>(
    null
  );
  const [selectedStatusTypeId, setSelectedStatusTypeId] = useState<
    number | null
  >(null);

  const authorUser = users.find((user) => {
    return user.id === author;
  });

  const helpType = helpTypes.find((helpType) => helpType.id === type);
  const typeName = helpType ? helpType.namePL : "Nieznany typ pomocy";

  const helpStat = statuses.find((helpStat) => helpStat.id === helpStatus);
  const statusName = helpStat ? helpStat.name : "Nieznany status";

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedStatusType(selected);
    const selectedStatusTypeId =
      statuses.find((helpStat) => helpStat.name === selected)?.id || null;
    setSelectedStatusTypeId(selectedStatusTypeId);
    axios({
      method: 'post',
      url: `http://localhost:8080/api/v1/help/updatehelpstatus?helpId=${id}&help_status=${selectedStatusTypeId}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('jwt-token')}`
      }
    })
      .then((response) => {
        console.log("Help status updated:", response.data);
      })
      .catch((error) => {
        console.error("Error updating help status:", error);
      });
  };

  const setStatusColor = (statusName: string) => {
    switch (statusName) {
      case "In progress":
        return "#fae96b";
      case "Completed":
        return "#22f526";
      case "Uncompleted":
        return "#f50a16";
      default:
        return "white";
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
      <div className="flex items-center justify-center bg-yellow-dark">
        {authorUser ? (
          <span className="text-[#fff] text-lg">
            {authorUser.name} {authorUser.surname}
          </span>
        ) : (
          <span className="text-[#fff] text-lg">Nieznany autor</span>
        )}
      </div>
      <div className="w-full flex items-center justify-center flex-col">
        <div className="flex w-full items-center justify-center mt-6">
          <h2 style={{ color: setStatusColor(statusName) }}>{statusName}</h2>
        </div>
        <div className="w-full flex items-center justify-center flex-col my-6 gap-6">
          <Dropdown
            label={t("choose-help-status")}
            options={statuses.map((helpStat) => ({ value: helpStat.name }))}
            onChange={handleStatusChange}
          />
        </div>
      </div>
    </div>
  );
};
