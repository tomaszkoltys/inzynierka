import { Dropdown } from "./Dropdown.tsx";
import { AiOutlinePlus } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";
import { HelpTypeProps, VoivodeshipsProps, CountiesProps } from "./Help";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AddOfferForm = () => {
  const { t } = useTranslation();
  const [helpTypes, setHelpTypes] = useState<HelpTypeProps[]>([]);
  const [voivodeships, setVoivodeships] = useState<VoivodeshipsProps[]>([]);
  const [counties, setCounties] = useState<CountiesProps[]>([]);
  const [selectedVoivodeship, setSelectedVoivodeship] = useState<string | null>(null);
  const [selectedVoivodeshipId, setSelectedVoivodeshipId] = useState<number | null>(null);
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null);
  const [selectedCountyId, setSelectedCountyId] = useState<number | null>(null);
  const [selectedHelpType, setSelectedHelpType] = useState<string | null>(null);
  const [selectedHelpTypeId, setSelectedHelpTypeId] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<Blob | string>("");
  const [formErrors, setFormErrors] = useState({
    voivodeship: false,
    county: false,
    helpType: false,
    description: false,
  });

  useEffect(() => {
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
    if (!selectedVoivodeshipId || !selectedCountyId || !selectedHelpTypeId || !description) {
      setFormErrors({
        voivodeship: !selectedVoivodeshipId,
        county: !selectedCountyId,
        helpType: !selectedHelpTypeId,
        description: !description
      })
      toast.error(t('complete-necessary-fields'));
      return;
    }
    else {
      const form = new FormData();
      form.append('county',selectedCountyId.toString());
      form.append('description', description);
      form.append('photo', imageFile);
      form.append('side', "1");
      form.append('author', localStorage.getItem('user-id')!.toString())
      form.append('type', selectedHelpTypeId.toString());

      axios.post('http://localhost:8080/api/v1/help/addhelp', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`
        }
        
      })
        .then((response) => {
          console.log("Odpowiedź od serwera:", response.data);
          toast.success(t('help-offer-successfully-added'), {
            position: toast.POSITION.TOP_CENTER,
          });

          setFormErrors({
            voivodeship: false,
            county: false,
            helpType: false,
            description: false,
          })
        })
        .catch((error) => {
          toast.error(t('img-size'), {
            position: toast.POSITION.TOP_CENTER,
          });
          console.error("Błąd podczas wysyłania oferty:", error);
        });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <ToastContainer />
      <div className="w-full md:w-[70%] h-form flex flex-col min-h-[800px] bg-[#fff]">
        <div className="relative border border-yellow-default my-12 mx-8 py-6 px-2">
          <div className="absolute text-2xl font-light px-4 bg-[#fff] top-[-2%]">
            {t('add-help-offer')}
          </div>
          <div className="flex flex-col mb-6">
            <div className="flex flex-col mt-8 mb-6 gap-6">
              <div className="flex">
                <Dropdown
                  label={t("choose-voivodeship")}
                  options={voivodeships.map((voivodeship) => ({ value: voivodeship.name }))}
                  onChange={handleVoivodeshipChange}
                  isError={formErrors.voivodeship}
                />
                {formErrors.voivodeship && <p className="text-red-500">{t('select-voivodeship')}</p>}
              </div>
              <div className="flex">
                <Dropdown
                  label={t("choose-county")}
                  options={counties.map((county) => ({ value: county.name }))}
                  disabled={!selectedVoivodeship}
                  onChange={handleCountyChange}
                  isError={formErrors.county}
                />
                {formErrors.county && <p className="text-red-500">{t('select-county')}</p>}
              </div>
              <div className="flex">
                <Dropdown
                  label={t("choose-type-of-help")}
                  options={helpTypes.map((helpType) => ({ value: helpType.namePL }))}
                  onChange={handleTypeChange}
                  isError={formErrors.helpType}
                />
                {formErrors.helpType && <p className="text-red-500">{t('select-type-help')}</p>}
              </div>
            </div>
            <div className="flex">
              <textarea
                placeholder={t("description")}
                className={`w-full h-[150px] p-2 border ${formErrors.description ? 'border-red-500' : 'border-gray-300'} text-[#000] rounded-md text-sm resize-none outline-none md:w-[40%]`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {formErrors.description && <p className="text-red-500 mt-1">{t('enter-description')}</p>}
            </div>
            <div className="flex relative">
              <div className="flex items-center justify-center w-[80px] h-[80px] bg-gray-300 relative my-6">
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
              <div className="inline py-2 px-2 my-6">
                <p className="text-gray-300">{t("add-photos")}</p>
              </div>
            </div>
            <div className="flex items-center justify-center my-6 py-2 px-2 bg-yellow-default rounded-md text-xl text-[#fff] hover:cursor-pointer hover:bg-yellow-light addOffer__btn w-full md:w-[40%]">
              <input
                type="submit"
                value={t('add-help-offer')}
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};