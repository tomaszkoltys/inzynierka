import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineSearch } from "react-icons/ai";
import { StatusProps, HelpTypeProps, OfferProps, UserProps, VoivodeshipsProps, CountiesProps } from "./AllHelpOffers";
import { SingleMyHelpOffer } from "./SingleMyHelpOffer";
import { Dropdown } from "./Dropdown";

export const AcceptedHelpRequestsList = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState<string>("");
  const [myHelps, setMyHelps] = useState<OfferProps[]>([]);
  const [statuses, setStatuses] = useState<StatusProps[]>([]);
  const [helpTypes, setHelpTypes] = useState<HelpTypeProps[]>([]);
  const [users, setUsers] = useState<UserProps[]>([]);
  const [voivodeships, setVoivodeships] = useState<VoivodeshipsProps[]>([]);
  const [counties, setCounties] = useState<CountiesProps[]>([]);
  const [selectedVoivodeship, setSelectedVoivodeship] = useState<string | null>(null);
  const [selectedVoivodeshipId, setSelectedVoivodeshipId] = useState<number | null>(null);
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null);
  const [selectedCountyId, setSelectedCountyId] = useState<number | null>(null);
  const [selectedHelpType, setSelectedHelpType] = useState<string | null>(null);
  const [selectedHelpTypeId, setSelectedHelpTypeId] = useState<number | null>(null);
  const [inprogressOption, setInprogressOption] = useState<boolean>(false);
  const [uncompletedOption, setUncompletedOption] = useState<boolean>(false);
  const [completedOption, setCompletedOption] = useState<boolean>(false);

  const currentUser_id = sessionStorage.getItem('user-id')

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:8080/api/v1/help/acceptedhelprequests?currentUserId=${currentUser_id}`,
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
          `Error fetching /myhelpoffers?currentUserId=${currentUser_id}:`,
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

    axios({
      method: 'get',
      url: 'http://localhost:8080/api/v1/help-status/allhelpstatuses',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('jwt-token')}`
      }
    })
      .then((response) => setStatuses(response.data))
      .catch((error) => {
        console.error("Error fetching /allhelptypes:", error);
      });

    axios({
      method: 'get',
      url: 'http://localhost:8080/api/v1/voivodeship/allvoivodeships',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('jwt-token')}`
      }
    })
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
      axios({
        method: 'get',
        url: `http://localhost:8080/api/v1/county/countiesbyvoivodeship?currentVoivodeship=${selectedVoivodeshipId}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('jwt-token')}`
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


  const searchOffers = myHelps.filter((offer) => {
    return (
      (search.toLowerCase() === "" ||
        offer.description.toLowerCase().includes(search)) &&
      (selectedHelpType === null || offer.type === selectedHelpTypeId) &&
      (selectedCounty === null || offer.county === selectedCountyId) &&
      (inprogressOption === false ||
        uncompletedOption === true ||
        completedOption === true ||
        offer.helpStatus === 1) &&
      (uncompletedOption === false ||
        inprogressOption === true ||
        completedOption === true ||
        offer.helpStatus === 2) &&
        (completedOption === false ||
          inprogressOption === true ||
          uncompletedOption === true ||
          offer.helpStatus === 3)
    );
  });

  return (
    <div className="flex items-center justify-center">
      <div className="w-full md:w-[70%] flex flex-col min-h-[800px] bg-[#fff]">
        <div className="relative border border-yellow-default my-12 mx-8 py-6 px-2">
          <div className="absolute text-2xl font-light px-4 bg-[#fff] top-[-0.5%]">
            {t("accepted-help-requests")}
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
              </div>
              <div className="flex mt-4 justify-between sm:justify-start">
                <label
                  className="flex items-center justify-center"
                  onClick={() => setInprogressOption(!inprogressOption)}
                >
                  <input
                    type="checkbox"
                    className="register-radiobutton"
                    value="inprogress"
                    checked={inprogressOption}
                  />
                  &nbsp;{t("in-progress")}{" "}
                </label>
                <label
                  className="flex items-center justify-center mx-16"
                  onClick={() => setCompletedOption(!completedOption)}
                >
                  <input
                    type="checkbox"
                    className="register-radiobutton"
                    value="completed"
                    checked={completedOption}
                  />
                  &nbsp;{t("completed")}{" "}
                </label>
                <label
                  className="flex items-center justify-cente"
                  onClick={() => setUncompletedOption(!uncompletedOption)}
                >
                  <input
                    type="checkbox"
                    className="register-radiobutton"
                    value="uncompleted"
                    checked={uncompletedOption}
                  />
                  &nbsp;{t("uncompleted")}{" "}
                </label>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-300">
            <div className="grid grid-cols-1 gap-x-24 gap-y-12 lg:grid-cols-2 px-2 sm:px-8 mt-12">
              {searchOffers.length === 0 ? (
                <p className="text-center font-medium">{t("no-needs-found")}</p>
              ) : (
                searchOffers.map((offer: OfferProps) => (
                  <SingleMyHelpOffer
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
