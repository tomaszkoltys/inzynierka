import { Dropdown } from "./Dropdown";
import { AiOutlineSearch } from "react-icons/ai";
import { SingleOffer } from "./SingleOffer.tsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

export type OfferProps = {
  id: number;
  author: number;
  supporter: number;
  county: number;
  description: string;
  photo: string;
  side: number;
  helpStatus: number;
  type: number;
};

export type UserProps = {
  id: number;
  name: string;
  surname: string;
  password: string;
  email_address: string;
  role: number;
  identity_number: string;
  status: number;
  accepted: number;
};

export type HelpTypeProps = {
  id: number;
  name: string;
  namePL: string;
};

export type VoivodeshipsProps = {
  id: number;
  name: string;
};

export type CountiesProps = {
  id: number;
  name: string;
  voivodeship: number;
};

export const CurrentNeeds = () => {
  const { t } = useTranslation();
  const [location, setLocation] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [helps, setHelps] = useState<OfferProps[]>([]);
  const [helpTypes, setHelpTypes] = useState<HelpTypeProps[]>([]);
  const [users, setUsers] = useState<UserProps[]>([]);
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
          const result = response.data;
          console.log(result);
          setLocation(result.city);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    axios
      .get<OfferProps[]>("http://localhost:8080/allhelps")
      .then((response) => setHelps(response.data))
      .catch((error) => {
        console.error("Error fetching /allhelps:", error);
      });

    axios
      .get<HelpTypeProps[]>("http://localhost:8080/allhelptypes")
      .then((response) => setHelpTypes(response.data))
      .catch((error) => {
        console.error("Error fetching /allhelptypes:", error);
      });

    axios
      .get<UserProps[]>("http://localhost:8080/allusers")
      .then((response) => setUsers(response.data))
      .catch((error) => {
        console.error("Error fetching /allusers:", error);
      });

    axios
      .get<VoivodeshipsProps[]>("http://localhost:8080/allvoivodeships")
      .then((response) => setVoivodeships(response.data))
      .catch((error) => {
        console.error("Error fetching /allvoivodeships:", error);
      });
  }, []);

  const handleVoivodeshipChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selected = event.target.value;
    setSelectedVoivodeship(selected);
    const selectedVoivodeshipId =
      voivodeships.find((voivodeship) => voivodeship.name === selected)?.id ||
      null;
    setSelectedVoivodeshipId(selectedVoivodeshipId);

    if (selectedVoivodeshipId !== null) {
      axios
        .get<CountiesProps[]>(
          `http://localhost:8080/countiesbyvoivodeship?currentVoivodeship=${selectedVoivodeshipId}`
        )
        .then((response) => setCounties(response.data))
        .catch((error) => {
          console.error("Error fetching counties:", error);
        });
    }
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedHelpType(selected);
    const selectedHelpTypeId =
      helpTypes.find((helpType) => helpType.namePL === selected)?.id || null;
    setSelectedHelpTypeId(selectedHelpTypeId);
  };

  const handleCountyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedCounty(selected);
    const selectedCountyId =
      counties.find((county) => county.name === selected)?.id || null;
    setSelectedCountyId(selectedCountyId);
  };

  const searchOffers = helps.filter((offer) => {
    return (
      (search.toLowerCase() === "" ||
        offer.description.toLowerCase().includes(search)) &&
      (selectedHelpType === null || offer.type === selectedHelpTypeId) &&
      (selectedCounty === null || offer.county === selectedCountyId)
    );
  });

  return (
    <div className="flex items-center justify-center">
      <div className="w-full md:w-[70%] flex flex-col min-h-[800px] bg-[#fff]">
        <div className="relative border border-yellow-default my-12 mx-8 py-6 px-2">
          <div className="absolute text-2xl font-light px-4 bg-[#fff] top-[-1.5%]">
            {t("all-help-requests")}
          </div>
          <div className="mx-2 my-2">
            <span className="border-b border-gray-300">{t("filters")}</span>
          </div>
          <div className="flex flex-col mx-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 mt-3 mb-12">
              <div>
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
                <div className="mt-3">
                  <Dropdown
                    label={t("choose-type-of-help")}
                    options={helpTypes.map((helpType) => ({
                      value: helpType.namePL,
                    }))}
                    onChange={handleTypeChange}
                  />
                </div>
              </div>
              <div>
                <div>
                  <Dropdown
                    label={t("choose-voivodeship")}
                    options={voivodeships.map((voivodeship) => ({
                      value: voivodeship.name,
                    }))}
                    onChange={handleVoivodeshipChange}
                  />
                </div>
                <div className="mt-3">
                  <Dropdown
                    label={t("choose-county")}
                    options={counties.map((county) => ({ value: county.name }))}
                    disabled={!selectedVoivodeship}
                    onChange={handleCountyChange}
                  />
                </div>
                <div className="flex items-center text-[#000] mt-3">
                  <div className="flex items-center w-60 h-10 border border-gray-300 rounded-md outline-none pl-2">
                    {location}
                  </div>
                  <div
                    className="bg-gray-200 text-sm px-2 h-[80%] flex justify-center items-center ml-6 font-medium rounded-sm hover:cursor-pointer"
                    onClick={() => userCoordinates()}
                  >
                    {t("get-location")}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-300">
            <div className="grid grid-cols-1 gap-x-24 gap-y-12 lg:grid-cols-2 px-2 sm:px-8 mt-12">
              {searchOffers.length === 0 ? (
                <p className="text-center font-medium">{t("no-needs-found")}</p>
              ) : (
                searchOffers.map((offer: OfferProps) => (
                  <SingleOffer
                    key={offer.id}
                    {...offer}
                    users={users}
                    helpTypes={helpTypes}
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
