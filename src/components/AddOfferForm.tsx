import { Dropdown } from "./Dropdown";
import { voivodeshipList, districtList, serviceList } from "../data/data.ts";
import { AiOutlinePlus } from "react-icons/ai";
import { useTranslation } from "react-i18next";

export const AddOfferForm = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center">
      <div className="w-full md:w-[70%] h-form flex flex-col min-h-[700px] bg-[#fff]">
        <div className="relative border border-yellow-default my-12 mx-8 py-6 px-2">
          <div className="absolute text-2xl font-light px-4 bg-[#fff] top-[-2.5%]">
          {t('add-offer')}
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col mt-8 mb-12 gap-6">
              <Dropdown label={t("choose-voivodeship")} options={voivodeshipList} />
              <Dropdown label={t("choose-county")} options={districtList} />
              <Dropdown label={t("choose-type-of-help")} options={serviceList} />
            </div>
            <div>
              <textarea
                placeholder={t("description")}
                className="w-full h-[150px] p-2 border border-gray-300 text-[#000] rounded-md text-sm resize-none outline-none md:w-[40%]"
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};
