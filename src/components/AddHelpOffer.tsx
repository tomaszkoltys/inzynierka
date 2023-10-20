import { Dropdown } from "./Dropdown.tsx";
import { AiOutlinePlus } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";
import { OfferProps, UserProps, HelpTypeProps, VoivodeshipsProps, CountiesProps } from "./AllHelpRequests.tsx";

export const AddOfferForm = () => {
  const { t } = useTranslation();
  const [location, setLocation] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [helps, setHelps] = useState<OfferProps[]>([]);
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
  const [description, setDescription] = useState(""); // Dodaj ten stan


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

  const handleVoivodeshipChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedVoivodeship(selected);
    const selectedVoivodeshipId = voivodeships.find((voivodeship) => voivodeship.name === selected)?.id || null;
    setSelectedVoivodeshipId(selectedVoivodeshipId);

    if (selectedVoivodeshipId !== null) {
      axios
        .get<CountiesProps[]>(`http://localhost:8080/countiesbyvoivodeship?currentVoivodeship=${selectedVoivodeshipId}`)
        .then((response) => setCounties(response.data))
        .catch((error) => {
          console.error("Error fetching counties:", error);
        });
    }
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedHelpType(selected);
    const selectedHelpTypeId = helpTypes.find((helpType) => helpType.namePL === selected)?.id || null;
    setSelectedHelpTypeId(selectedHelpTypeId);
  };

  const handleCountyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedCounty(selected);
    const selectedCountyId = counties.find((county) => county.name === selected)?.id || null;
    setSelectedCountyId(selectedCountyId);
  };

  const handleSubmit = () => {
    /*if (!selectedCountyId || !selectedHelpTypeId || !description || !photo) {
      alert("Wszystkie pola są wymagane.");
      return;
    }*/
    
    axios.post(`http://localhost:8080/addhelp?county=${selectedCountyId}&description=${description}&photo="photo.jpg"&side=1&author=1&type=${selectedHelpTypeId}`, {
    })
  .then((response) => {
    // Obsłuż odpowiedź od serwera, np. wyświetl informację o sukcesie
    console.log("Odpowiedź od serwera:", response.data);
  })
  .catch((error) => {
    // Obsłuż błąd, np. wyświetl komunikat o błędzie
    console.error("Błąd podczas wysyłania oferty:", error);
  });
  };
  

  return (
    <div className="flex items-center justify-center">
      <div className="w-full md:w-[70%] h-form flex flex-col min-h-[700px] bg-[#fff]">
        <div className="relative border border-yellow-default my-12 mx-8 py-6 px-2">
          <div className="absolute text-2xl font-light px-4 bg-[#fff] top-[-2.5%]">
          {t('add-offer')}
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col mt-8 mb-12 gap-6">
            <Dropdown
                    label={t("choose-voivodeship")}
                    options={voivodeships.map((voivodeship) => ({ value: voivodeship.name }))}
                    onChange={handleVoivodeshipChange}
                  />
              <Dropdown
                    label={t("choose-county")}
                    options={counties.map((county) => ({ value: county.name }))}
                    disabled={!selectedVoivodeship}
                    onChange={handleCountyChange}
                  />
              <Dropdown
                    label={t("choose-type-of-help")}
                    options={helpTypes.map((helpType) => ({ value: helpType.namePL }))}
                    onChange={handleTypeChange}
                  />
            </div>
            <div>
            <textarea
  placeholder={t("description")}
  className="w-full h-[150px] p-2 border border-gray-300 text-[#000] rounded-md text-sm resize-none outline-none md:w-[40%]"
  value={description} // Dodaj tę linię
  onChange={(e) => setDescription(e.target.value)} // Dodaj tę linię
/>
            </div>
            <div className="flex relative mb-10">
              <div className="flex items-center justify-center w-[80px] h-[80px] bg-gray-300 relative">
                <input
                  type="file"
                  accept="image/*"
                  className="absolute opacity-0 left-0 w-full h-full"
                />
                <AiOutlinePlus color="#fff" size={25} />
              </div>
              <div className="inline">
                <p className="mt-14 ml-4 text-gray-300">{t("add-photos")}</p>
              </div>
            </div>
            <input
              type="submit"
              className="flex items-center justify-center py-2 px-2 bg-yellow-default rounded-md text-xl text-[#fff] hover:cursor-pointer hover:bg-yellow-light addOffer__btn w-full md:w-[40%]"
              value={t('add-offer')}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
