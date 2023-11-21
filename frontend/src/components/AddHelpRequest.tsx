import { Dropdown } from "./Dropdown.tsx";
import { AiOutlinePlus } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";
import { OfferProps, UserProps, HelpTypeProps, VoivodeshipsProps, CountiesProps } from "./AllHelpRequests.tsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AddHelpRequestForm = () => {
  const { t } = useTranslation();
  const [helpTypes, setHelpTypes] = useState<HelpTypeProps[]>([]);
  const [users, setUsers] = useState<UserProps[]>([]);
  const [counties, setCounties] = useState<CountiesProps[]>([]);
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null);
  const [selectedCountyId, setSelectedCountyId] = useState<number | null>(null);
  const [voivodeships, setVoivodeships] = useState<VoivodeshipsProps[]>([]);
  const [selectedVoivodeship, setSelectedVoivodeship] = useState<string | null>(null);
  const [selectedVoivodeshipId, setSelectedVoivodeshipId] = useState<number | null>(null);
  const [selectedHelpType, setSelectedHelpType] = useState<string | null>(null);
  const [selectedHelpTypeId, setSelectedHelpTypeId] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageLink, setImageLink] = useState("");
  
  useEffect(() => {
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

  const handleVoivodeshipChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedVoivodeship(selected);
    const selectedVoivodeshipId = voivodeships.find((voivodeship) => voivodeship.name === selected)?.id || null;
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
    const selectedHelpTypeId = helpTypes.find((helpType) => helpType.namePL === selected)?.id || null;
    setSelectedHelpTypeId(selectedHelpTypeId);
  };

  const handleCountyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedCounty(selected);
    const selectedCountyId = counties.find((county) => county.name === selected)?.id || null;
    setSelectedCountyId(selectedCountyId);
  };

  const handleImageLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageLink(event.target.value);
  };

  const handleSubmit = () => {
    const currentUser_id = sessionStorage.getItem('user-id')
    axios({
      method: 'post',
      url: `http://localhost:8080/api/v1/help/addhelp?county=${selectedCountyId}&description=${description}&photo=${imageLink}&side=1&author=${currentUser_id}&type=${selectedHelpTypeId}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('jwt-token')}`
      }
    })
      .then((response) => {
        console.log("Odpowiedź od serwera:", response.data);
        toast.success("Pomyślnie dodano prośbę o pomoc!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((error) => {
        console.error("Błąd podczas wysyłania oferty:", error);
      });
  };

  return (
    <div className="flex items-center justify-center">
      <ToastContainer />
      <div className="w-full md:w-[70%] h-form flex flex-col min-h-[700px] bg-[#fff]">
        <div className="relative border border-yellow-default my-12 mx-8 py-6 px-2">
          <div className="absolute text-2xl font-light px-4 bg-[#fff] top-[-2.5%]">
            {t('add-help-request')}
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col mt-8 mb-6 gap-6">
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex relative mb-6">
              <div className="flex items-center justify-center w-[80px] h-[80px] bg-gray-300 relative">
              <input
                  type="file"
                  accept="image/*"
                  className="absolute opacity-0 left-0 w-full h-full"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                      const file = files[0];
                      setImageFile(file);
                    }
                  }}
                />
                <AiOutlinePlus color="#fff" size={25} />
              </div>
              <div className="inline py-2 px-2">
                <p className="text-gray-300">{t("add-photos")}</p>
              </div>
            </div>
            <div className="flex flex-col mb-8 md:w-[40%]">
              <input
                type="text"
                placeholder={t("image-link")}
                className="w-full h-full p-2 border border-gray-300 text-[#000] rounded-md text-sm resize-none outline-none"
                value={imageLink}
                onChange={handleImageLinkChange}
              />
            </div>
            <input
              type="submit"
              className="flex items-center justify-center py-2 px-2 bg-yellow-default rounded-md text-xl text-[#fff] hover:cursor-pointer hover:bg-yellow-light addOffer__btn w-full md:w-[40%]"
              value={t('add-help-request')}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
