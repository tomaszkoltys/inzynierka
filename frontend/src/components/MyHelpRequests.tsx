import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineSearch } from "react-icons/ai";
import { StatusProps, HelpTypeProps, OfferProps, UserProps } from "./Help";
import { SingleMyHelpRequest } from "./SingleMyHelpRequest";

export const MyHelpRequestsList = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState<string>("");
  const [myHelps, setMyHelps] = useState<OfferProps[]>([]);
  const [helpTypes, setHelpTypes] = useState<HelpTypeProps[]>([]);
  const [statuses, setStatuses] = useState<StatusProps[]>([]);
  const [users, setUsers] = useState<UserProps[]>([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:8080/api/v1/help/myrequests?currentUserId=${localStorage.getItem('user-id')}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`
      }
    })
      .then((response) => {
        setMyHelps(response.data);
      })
      .catch((error) => {
        console.error(
          `Error fetching myrequests?currentUserId=${localStorage.getItem('user-id')}:`,
          error
        );
      });

      axios({
        method: 'get',
        url: 'http://localhost:8080/api/v1/help-type/allhelptypes',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`
        }
      })
      .then((response) => setHelpTypes(response.data))
      .catch((error) => {
        console.error("Error fetching /allhelptypes:", error);
      });

      axios({
        method: 'get',
        url: 'http://localhost:8080/api/v1/help-status/allhelpstatuses',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`
        }
      })
      .then((response) => {
        setStatuses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching /allhelptypes:", error);
      });

      axios({
        method: 'get',
        url: 'http://localhost:8080/api/v1/user/allusers',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`
        }
      })
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
          <div className="absolute text-2xl font-light px-4 bg-[#fff] top-[-3%]">
            {t("my-help-requests")}
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
                  <SingleMyHelpRequest
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
