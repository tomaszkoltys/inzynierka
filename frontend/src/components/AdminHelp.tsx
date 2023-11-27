import { Dropdown } from "./Dropdown.tsx";
import { AiOutlineSearch } from "react-icons/ai";
import { SingleAdminHelp } from "./SingleAdminHelp.tsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import { HelpTypeProps, OfferProps, UserProps, VoivodeshipsProps, CountiesProps } from "./Help";
import "react-toastify/dist/ReactToastify.css";
import { AllCountiesProps } from "./AllHelpRequests.tsx";

export const AdminHelpList = () => {
  const { t } = useTranslation();
  const [location, setLocation] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [helps, setHelps] = useState<OfferProps[]>([]);
  const [helpTypes, setHelpTypes] = useState<HelpTypeProps[]>([]);
  const [users, setUsers] = useState<UserProps[]>([]);
  const [voivodeships, setVoivodeships] = useState<VoivodeshipsProps[]>([]);
  const [counties, setCounties] = useState<CountiesProps[]>([]);
  const [allCounties, setAllCounties] = useState<AllCountiesProps[]>([]);
  const [selectedVoivodeship, setSelectedVoivodeship] = useState<string | null>(null);
  const [selectedVoivodeshipId, setSelectedVoivodeshipId] = useState<number | null>(null);
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null);
  const [selectedCountyId, setSelectedCountyId] = useState<number | null>(null);
  const [selectedCountyIdByLocation, setSelectedCountyIdByLocation] = useState<number | null>(null);
  const [selectedHelpType, setSelectedHelpType] = useState<string | null>(null);
  const [selectedHelpTypeId, setSelectedHelpTypeId] = useState<number | null>(null);


  useEffect(() => {
    if (location !== "") {
      handleCountyChangeByLocation();
    }
    axios({
      method: 'get',
      url: 'http://localhost:8080/api/v1/help/allhelps',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`
      }
    })
      .then((response) => setHelps(response.data))
      .catch((error) => {
        console.error("Error fetching /allhelps:", error);
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

    axios({
      method: 'get',
      url: 'http://localhost:8080/api/v1/voivodeship/allvoivodeships',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`
      }
    })
      .then((response) => setVoivodeships(response.data))
      .catch((error) => {
        console.error("Error fetching /allvoivodeships:", error);
      });

    axios({
      method: 'get',
      url: 'http://localhost:8080/api/v1/county/allcounties',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`
      }
    })
      .then((response) => setAllCounties(response.data))
      .catch((error) => {
        console.error("Error fetching /allcounties:", error);
      });
  }, [location]);

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
      axios({
        method: 'get',
        url: `http://localhost:8080/api/v1/county/countiesbyvoivodeship?currentVoivodeship=${selectedVoivodeshipId}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`
        }
      })
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

  const handleCountyChangeByLocation = () => {
    const countyIdByLocation = allCounties.find((county: AllCountiesProps) => county.name === location)?.id || null;
    setSelectedCountyIdByLocation(countyIdByLocation);
  }

  const searchOffers = helps.filter((offer) => {
    return (
      (search.toLowerCase() === "" ||
        offer.description.toLowerCase().includes(search)) &&
      (selectedHelpType === null || offer.type === selectedHelpTypeId) &&
      (selectedCounty === null || offer.county === selectedCountyId) &&
      (selectedCountyIdByLocation === null || offer.county === selectedCountyIdByLocation)
    );
  }
  );

  return (
    <div className="flex items-center justify-center bg-[#8AA9C7]">
      <div className="w-full md:w-[70%] flex flex-col min-h-[800px] bg-[#fff]">
        <div className="relative border border-blue-default my-12 mx-8 py-6 px-2">
          <div className="absolute text-2xl font-light px-4 bg-[#fff] top-[-1%]">
            {t("admin-help")}
          </div>
          <div className="mx-2 my-2">
            <span className="border-b border-gray-300">{t("filters")}</span>
          </div>
          <div className="flex flex-col mx-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 mt-3 mb-12">
              <div>
                <div className="flex justify-center items-center text-[#000] w-[50%] h-10 border border-gray-300 rounded-md">
                  <input
                    autoFocus
                    placeholder={t("search")}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border-none outline-none ml-2 text-sm"
                  />
                  <label className="border-l border-gray-300 h-full flex justify-center items-center w-16 rounded-md hover:cursor-pointer">
                    <AiOutlineSearch />
                  </label>
                </div>
                <div className="mt-3 w-[125%]">
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
                <div className="mt-3 w-[125%]">
                  <Dropdown
                    label={t("choose-voivodeship")}
                    options={voivodeships.map((voivodeship) => ({
                      value: voivodeship.name,
                    }))}
                    onChange={handleVoivodeshipChange}
                  />
                </div>
                <div className="mt-3 w-[125%]">
                  <Dropdown
                    label={t("choose-county")}
                    options={counties.map((county) => ({ value: county.name }))}
                    disabled={!selectedVoivodeship}
                    onChange={handleCountyChange}
                  />
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
                  <SingleAdminHelp
                    key={offer.id}
                    {...offer}
                    users={users}
                    helpTypes={helpTypes}
                  />
                ))
              )}
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHelpList;