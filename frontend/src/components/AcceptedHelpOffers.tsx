import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineSearch } from "react-icons/ai";
import { StatusProps, HelpTypeProps, OfferProps, UserProps, VoivodeshipsProps, CountiesProps, CurrentHelps } from "./AllHelpOffers";
import { SingleAcceptedHelpOffer } from "./SingleAcceptedHelpOffer";

export const AcceptedHelpOffersList = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState<string>("");
  const [myHelps, setMyHelps] = useState<OfferProps[]>([]);
  const [helpTypes, setHelpTypes] = useState<HelpTypeProps[]>([]);
  const [statuses, setStatuses] = useState<StatusProps[]>([]);
  const [users, setUsers] = useState<UserProps[]>([]);
  const [location, setLocation] = useState<string>("");
  const [helps, setHelps] = useState<OfferProps[]>([]);
  const [voivodeships, setVoivodeships] = useState<VoivodeshipsProps[]>([]);
  const [counties, setCounties] = useState<CountiesProps[]>([]);
  const [selectedVoivodeship, setSelectedVoivodeship] = useState<string | null>(
    null
  );
  const [selectedVoivodeshipId, setSelectedVoivodeshipId] = useState<
    number | null
  >(null);
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null);
  const [selectedCountyId, setSelectedCountyId] = useState<number | null>(null);
  const [selectedHelpType, setSelectedHelpType] = useState<string | null>(null);
  const [selectedHelpTypeId, setSelectedHelpTypeId] = useState<number | null>(
    null
  );

  const userCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const bdcAPI = `https://api-bdc.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`;
          getAPI(bdcAPI);
        },
        (err) => {
          alert(err.message);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser");
    }
  };

  const getAPI = (bdcAPI: string) => {
    axios
      .get(bdcAPI)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          const result = response.data;
          console.log(response);
          setLocation(result.city);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:8080/api/v1/help/acceptedhelpoffers?currentUserId=${sessionStorage.getItem('user-id')}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('jwt-token')}`
      }
    })
      .then((response) => {
        setMyHelps(response.data);
      })
      .catch((error) => {
        console.error(
          `Error fetching acceptedhelpoffers?currentUserId=${sessionStorage.getItem('user-id')}:`,
          error
        );
      });

      axios({
        method: 'get',
        url: 'http://localhost:8080/api/v1/help-type/allhelptypes',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('jwt-token')}`
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
          'Authorization': `Bearer ${sessionStorage.getItem('jwt-token')}`
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
          'Authorization': `Bearer ${sessionStorage.getItem('jwt-token')}`
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
          <div className="absolute text-2xl font-light px-4 bg-[#fff] top-[-1.5%]">
            {t("accepted-help-offers")}
          </div>
          <div className="flex flex-col mx-8 mt-10 mb-12">
            <div className="flex justify-center items-center text-[#000] w-60 h-10 border border-gray-300 rounded-md">
              <input
                autoFocus
                placeholder={t("search-help-offer")}
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
                  <SingleAcceptedHelpOffer
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
