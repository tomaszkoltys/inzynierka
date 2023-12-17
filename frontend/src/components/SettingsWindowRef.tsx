import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import axios from "axios";

export type SettingProps = {
  accepted_help_offers: boolean;
  accepted_help_requests: boolean;
  new_help_offers: boolean;
  new_help_requests: boolean;
  user_id: number;
}
export const SettingsWindowRef = () => {
  const { t } = useTranslation();
 const [userSettings, setUserSettings] = useState<SettingProps>()
  const [helpOffersSettings, setHelpOffersSettings] = useState<boolean>(false)
  const [acceptedHelpRequestsSettings, setAcceptedHelpRequestsSettings] = useState<boolean>(false)

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:8080/api/v1/notificationsettings/getusersettings?user_id=${localStorage.getItem('user-id')}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`
      }
    })
    .then((response) => {
      setUserSettings(response.data);
      if (response.data) {
        setHelpOffersSettings(response.data.new_help_offers || false);
        setAcceptedHelpRequestsSettings(response.data.accepted_help_requests || false);
      }
    })
      .catch((error) => {
        console.error("Error fetching /getusersettings:", error);
      });
  }, []);

  const saveUserChoice = () => {
    axios({
      method: 'post',
      url: `http://localhost:8080/api/v1/notificationsettings/setusersettings?user_id=${localStorage.getItem('user-id')}&new_help_offers=${helpOffersSettings}&new_help_requests=false&accepted_help_offers=false&accepted_help_requests=${acceptedHelpRequestsSettings}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`
      }
    })
      .then((response) => {
        toast.success("Zapisano ustawienia powiadomień!", {
          position: toast.POSITION.TOP_CENTER,
        })
        console.log("Saved:", response.data);
        setUserSettings(response.data);
      })
      .catch((error) => {
        toast.error("Błąd!", {
          position: toast.POSITION.TOP_CENTER,
        })
        console.error("Error:", error);
      });
  }

  const handleLogout = () => {
    localStorage.removeItem('jwt-token');
    localStorage.removeItem('loggedInUser');
    window.location.href = '/login';
  };
  return (
    <div className="">
      <div className="flex items-center justify-center">
        <div className="w-full md:w-[50%] h-form flex flex-col min-h-[600px] bg-[#fff]">
          <div className="relative border border-yellow-default my-12 mx-8 py-6 px-2">
            <div className="absolute text-2xl font-light px-4 bg-[#fff] top-[-3%]">
            {t("settings")}
            </div>
            <div className="flex flex-col px-4 mt-4">
              <div className="text-xl">{t("notifications")}</div>
              <label className="flex mt-2">
                <input
                  type="checkbox"
                  className="settings-checkbox"
                  checked={userSettings?.new_help_offers}
                  onChange={() => setHelpOffersSettings(!helpOffersSettings)}
                />
                &nbsp;{t("about-new-offers")}
              </label>
              <label className="flex mt-4">
                <input
                  type="checkbox"
                  className="settings-checkbox"
                  checked={userSettings?.accepted_help_requests}
                  onChange={() => setAcceptedHelpRequestsSettings(!acceptedHelpRequestsSettings)}
                />
                &nbsp;{t("about-accepted-needs")}
              </label>
              <div
                className="flex items-center justify-center mt-4 mb-8 py-2 px-2 bg-yellow-default rounded-md text-[#fff] hover:cursor-pointer hover:bg-yellow-light"
                onClick={saveUserChoice}
              >
                <a className="text-xl text-[#fff]">{t("save-changes")}</a>
                <ToastContainer />
              </div>
            </div>
            <div className="flex flex-col mt-2 px-4">
              <div className="text-xl">{t("account")}</div>
              <div className="">
                <Link to="/change_password">
                  <div className="mt-4 mb-8 py-2 px-2 bg-yellow-default rounded-md text-xl text-[#fff] flex items-center justify-center hover:cursor-pointer hover:bg-yellow-light">
                  {t("change-password")}
                  </div>
                </Link>
                <Link to="/">
                  <div className="flex items-center justify-center py-2 px-2 bg-[#E07513] rounded-md text-xl text-[#fff] hover:cursor-pointer hover:bg-[#eb923e]" onClick={handleLogout}>
                  {t("log-out")}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
