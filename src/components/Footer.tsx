import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center bg-[#fff] border-t border-gray-300 mt-8">
      <div className="text-[#000] p-4 xs:text-xs text-sm md:text-lg">
        {t("footer")}
      </div>
    </div>
  );
};
