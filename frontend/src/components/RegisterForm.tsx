import "react-toastify/dist/ReactToastify.css";
import { AddUserForm } from "./AddUserForm";
import { t } from "i18next";

export const RegisterForm = () => {
  return (
    <div className="flex flex-row-reverse">
      <div className="w-full md:w-[50%] h-form flex flex-col min-h-[1200px] bg-[#fff]">
        <div className="relative border border-yellow-default my-12 mx-8 py-6 px-2">
          <div className="absolute text-2xl font-light px-4 bg-[#fff] top-[-1.5%]">
            {t("registration")}
          </div>
            <AddUserForm />
        </div>
      </div>
    </div>
  );
};