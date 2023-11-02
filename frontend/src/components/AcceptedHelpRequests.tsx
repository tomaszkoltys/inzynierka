import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineSearch } from "react-icons/ai";
import { HelpTypeProps, OfferProps, UserProps } from "./AllHelpRequests";
import { SingleAcceptedHelpRequest } from "./SingleAcceptedHelpRequest";

export type StatusProps = {
  id: number;
  name: string;
};

export const AcceptedHelpRequestsList = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState<string>("");
  const [myHelps, setMyHelps] = useState<OfferProps[]>([]);
  const [helpTypes, setHelpTypes] = useState<HelpTypeProps[]>([]);
  const [statuses, setStatuses] = useState<StatusProps[]>([]);
  const [users, setUsers] = useState<UserProps[]>([]);

  //pobierz oferty pomocy, ktore zaakceptowal user o id = 1(wolontariusz)
  const user_id = 1;

  useEffect(() => {
    axios
      .get<OfferProps[]>(
        `http://localhost:8080/acceptedhelprequests?currentUserId=${user_id}`
      )
      .then((response) => {
        setMyHelps(response.data);
      })
      .catch((error) => {
        console.error(
          `Error fetching acceptedhelprequests?currentUserId=${user_id}:`,
          error
        );
      });

    axios
      .get<HelpTypeProps[]>("http://localhost:8080/allhelptypes")
      .then((response) => setHelpTypes(response.data))
      .catch((error) => {
        console.error("Error fetching /allhelptypes:", error);
      });

    axios
      .get<HelpTypeProps[]>("http://localhost:8080/allhelpstatuses")
      .then((response) => {
        setStatuses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching /allhelptypes:", error);
      });

    axios
      .get<UserProps[]>("http://localhost:8080/allusers")
      .then((response) => setUsers(response.data))
      .catch((error) => {
        console.error("Error fetching /allusers:", error);
      });
  }, []);

  const searchOffers = myHelps.filter((offer) => {
    return (
      search.toLowerCase() === "" ||
      offer.description.toLowerCase().includes(search)
    );
  });

  return (
    <div className="flex items-center justify-center">
      <div className="w-full md:w-[70%] flex flex-col min-h-[800px] bg-[#fff]">
        <div className="relative border border-yellow-default my-12 mx-8 py-6 px-2">
          <div className="absolute text-2xl font-light px-4 bg-[#fff] top-[-1.5%]">
            {t("accepted-help-requests")}
          </div>
          <div className="flex flex-col mx-8 mt-10 mb-12">
            <div className="flex justify-center items-center text-[#000] w-60 h-10 border border-gray-300 rounded-md">
              <input
                autoFocus
                placeholder={t("search-help-request")}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border-none outline-none ml-2 text-sm"
              />
              <label className="border-l border-gray-300 h-full flex justify-center items-center w-16 rounded-md hover:cursor-pointer">
                <AiOutlineSearch />
              </label>
            </div>
          </div>
          <div className="border-t border-gray-300">
            <div className="grid grid-cols-1 gap-x-24 gap-y-12 lg:grid-cols-2 px-2 sm:px-8 mt-12">
              {searchOffers.length === 0 ? (
                <p className="text-center font-medium">{t("no-needs-found")}</p>
              ) : (
                searchOffers.map((offer: OfferProps) => (
                  <SingleAcceptedHelpRequest
                    key={offer.id}
                    {...offer}
                    users={users}
                    helpTypes={helpTypes}
                    statuses={statuses}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
