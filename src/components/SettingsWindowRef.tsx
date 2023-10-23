import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

export const SettingsWindowRef = () => {
  const { t } = useTranslation();
  const [isNewNotifications, setIsNewNotifications] = useState<boolean>(false);
  const [isAcceptedNotifications, setIsAcceptedNotifications] =
    useState<boolean>(false);

  const handleNewNotificationsChange = () => {
    const updatedValue = !isNewNotifications;
    setIsNewNotifications(updatedValue);
  };

  const handleAcceptedNotificationsChange = () => {
    const updatedValue = !isAcceptedNotifications;
    setIsAcceptedNotifications(updatedValue);
  };

  const handleSaveChanges = () => {
    localStorage.setItem(
      "newNotifications__vol",
      isNewNotifications.toString(),
    );
    localStorage.setItem(
      "acceptedNotifications__vol",
      isAcceptedNotifications.toString(),
    );

    toast.success("Zapisano ", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  useEffect(() => {
    const newNotificationsValue = localStorage.getItem("newNotifications__vol");
    const acceptedNotificationsValue = localStorage.getItem(
      "acceptedNotifications__vol",
    );

    if (newNotificationsValue !== null) {
      setIsNewNotifications(newNotificationsValue === "true");
    }

    if (acceptedNotificationsValue !== null) {
      setIsAcceptedNotifications(acceptedNotificationsValue === "true");
    }
  }, []);

  return (
    <div className="">
      <div className="flex items-center justify-center">
        <div className="w-full md:w-[50%] h-form flex flex-col min-h-[600px] bg-[#fff]">
          <div className="relative border border-yellow-default my-12 mx-8 py-6 px-2">
            <div className="absolute text-2xl font-light px-4 bg-[#fff] top-[-3%]">
              Ustawienia
            </div>
            <div className="flex flex-col px-4 mt-4">
              <div className="text-xl">Powiadomienia</div>
              <label className="flex mt-2">
                <input
                  type="checkbox"
                  className="settings-checkbox"
                  checked={isNewNotifications}
                  onChange={handleNewNotificationsChange}
                />
                &nbsp;O nowych ofertach pomocy
              </label>
              <label className="flex mt-4">
                <input
                  type="checkbox"
                  className="settings-checkbox"
                  checked={isAcceptedNotifications}
                  onChange={handleAcceptedNotificationsChange}
                />
                &nbsp;O przyjętych potrzebach
              </label>
              <div
                className="flex items-center justify-center mt-4 mb-8 py-2 px-2 bg-yellow-default rounded-md text-[#fff] hover:cursor-pointer hover:bg-yellow-light"
                onClick={handleSaveChanges}
              >
                <a className="text-xl text-[#fff]">Zapisz zmiany</a>
                <ToastContainer />
              </div>
            </div>
            <div className="flex flex-col mt-2 px-4">
              <div className="text-xl">Konto</div>
              <div className="">
                <Link to="/change_password">
                  <div className="mt-4 mb-8 py-2 px-2 bg-yellow-default rounded-md text-xl text-[#fff] flex items-center justify-center hover:cursor-pointer hover:bg-yellow-light">
                    Zmień hasło
                  </div>
                </Link>
                <Link to="/">
                  <div className="flex items-center justify-center py-2 px-2 bg-[#E07513] rounded-md text-xl text-[#fff] hover:cursor-pointer hover:bg-[#eb923e]">
                    Wyloguj się
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
