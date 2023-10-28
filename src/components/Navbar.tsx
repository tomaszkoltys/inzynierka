import { VscTriangleDown } from "react-icons/vsc";
import { SlArrowDown } from "react-icons/sl";
import { TfiWorld, TfiMenu, TfiClose } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import i18n from "../services/i18next";

export const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const { t } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  // Tymczasowy sposob na zmiane wyswietlanych zakladek
  const userType: string = "adm";
  
  //const userType = 'ref';
  //const userType = 'adm';

  return (
    <div className="flex justify-between items-center h-24 w-full px-2 sm:px-8 text-black bg-[#fff] border-b border-gray-300 fixed z-30">
      <div className="group relative">
        <div
          className="flex justify-center items-center text-base hover:cursor-pointer border-b"
          onClick={() => setToggleMenu(!toggleMenu)}
        >
          <TfiWorld className="mr-2" size={15} />
          &nbsp;Language&nbsp;
          <SlArrowDown
            className={`ml-2 group-hover:rotate-180 group-hover:transition duration-100 ${
              toggleMenu ? "rotate-180" : ""
            }`}
            size={15}
          />
        </div>
        <ul
          className={`${
            toggleMenu ? "block" : "hidden"
          } group-hover:block bg-yellow-light absolute w-full text-[#fff] text-sm`}
        >
          <li
            className="p-2 hover:bg-yellow-dark hover:cursor-pointer"
            onClick={() => changeLanguage("pl")}
          >
            <a className="m-4">Polski</a>
          </li>
          <li
            className="p-2 hover:bg-yellow-dark hover:cursor-pointer"
            onClick={() => changeLanguage("en")}
          >
            <a className="m-4">English</a>
          </li>
        </ul>
      </div>
      <div className="flex justify-between items-center gap-52">
        <ul className="hidden lg:flex">
          <li>
            <div className="group relative">
              <div className="border-b hover:cursor-pointer">
                <Link
                  to="/"
                  className="cursor-pointer flex justify-center items-center"
                >
                  {t("main-page")}&nbsp;
                  <SlArrowDown
                    className="ml-14 group-hover:rotate-180 group-hover:transition duration-100"
                    size={15}
                  />
                </Link>
              </div>
              <ul
                className={`hidden group-hover:block bg-yellow-light absolute w-full text-[#fff] text-sm z-10`}
              >
                {userType === "vol" && (
                  <li className="hover:bg-yellow-dark hover:cursor-pointer">
                    <Link to="/add_help_offer">
                      <div className="px-2 py-4">{t("add-help-offer")}</div>
                    </Link>
                  </li>
                )}
                {userType === "vol" && (
                  <li className="hover:bg-yellow-dark hover:cursor-pointer">
                    <Link to="/all_help_requests">
                      <div className="px-2 py-4">{t("all-help-requests")}</div>
                    </Link>
                  </li>
                )}
                {userType === "vol" && (
                  <li className="hover:bg-yellow-dark hover:cursor-pointer">
                    <Link to="/accepted_help_requests">
                      <div className="px-2 py-4">{t("accepted-help-requests")}</div>
                    </Link>
                  </li>
                )}
                {userType === "vol" && (
                  <li className="hover:bg-yellow-dark hover:cursor-pointer">
                    <Link to="/my_help_offers">
                      <div className="px-2 py-4">{t("my-help-offers")}</div>
                    </Link>
                  </li>
                )}
                {userType === "ref" && (
                  <li className="hover:bg-yellow-dark hover:cursor-pointer">
                    <Link to="/add_help_request">
                      <div className="px-2 py-4">{t("add-request")}</div>
                    </Link>
                  </li>
                )}
                {userType === "ref" && (
                  <li className="hover:bg-yellow-dark hover:cursor-pointer">
                    <Link to="/all_help_offers">
                      <div className="px-2 py-4">{t("all-help-offers")}</div>
                    </Link>
                  </li>
                )}
                {userType === "ref" && (
                  <li className="hover-bg-yellow-dark hover:cursor-pointer">
                    <Link to="/accepted_help_offers">
                      <div className="px-2 py-4">
                        {t("accepted-help-offers")}
                      </div>
                    </Link>
                  </li>
                )}
                {userType === "ref" && (
                  <li className="hover:bg-yellow-dark hover:cursor-pointer">
                    <Link to="/my_help_requests">
                      <div className="px-2 py-4">{t("my-help-requests")}</div>
                    </Link>
                  </li>
                )}
                {(userType === "ref" || userType === "vol" || userType === "adm") && (
                  <li className="hover:bg-yellow-dark hover:cursor-pointer">
                    <Link to="/admin_help">
                      <div className="px-2 py-4">{t("admin-help")}</div>
                    </Link>
                  </li>
                )}
                {(userType === "ref" || userType === "vol" || userType === "adm") && (
                  <li className="hover:bg-yellow-dark hover:cursor-pointer">
                    <Link to="/admin_user">
                      <div className="px-2 py-4">{t("admin-user")}</div>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </li>
          <li>
            <Link to="/about" className="mx-8 hover:cursor-pointer">
              {t("about-us")}
            </Link>
          </li>
          <li>
            <Link to="/contact" className="mx-8 hover:cursor-pointer">
              {t("contact")}
            </Link>
          </li>
        </ul>
        <div className="flex">
          <div className="text-[#fff] hidden justify-center items-center mr-4 sm:flex">
            {userType === "vol" && (
              <Link to="add_help_offer">
                <a className="px-4 py-1 rounded-lg bg-yellow-default hover:bg-yellow-light">
                  {t("add-help-offer")}
                </a>
              </Link>
            )}
            {userType === "ref" && (
              <Link to="add_help_request">
                <a className="px-4 py-1 rounded-lg bg-yellow-default hover:bg-yellow-light">
                  {t("add-request")}
                </a>
              </Link>
            )}
            {userType === "adm" && (
              <Link to="admin_help">
                <a className="px-4 py-1 rounded-lg bg-yellow-default hover:bg-yellow-light">
                  {t("admin-help")}
                </a>
              </Link>
            )}
          </div>
          <div className="group relative">
            <div className="flex hover:cursor-pointer">
              {t("my-account")}&nbsp;
              <VscTriangleDown
                className="group-hover:rotate-180 group-hover:transition duration-100"
                size={15}
              />
            </div>
            <ul className="hidden group-hover:block bg-yellow-light absolute w-full text-[#fff] text-sm z-20">
              <li className="hover:bg-yellow-dark hover:cursor-pointer">
                <Link to="/login">
                  <div className="px-2 py-4">{t("log-in")}</div>
                </Link>
              </li>
              <li className="hover:bg-yellow-dark hover:cursor-pointer">
                <Link to="/register">
                  <div className="px-2 py-4">{t("register")}</div>
                </Link>
              </li>
              <li className="hover:bg-yellow-dark hover:cursor-pointer">
                <Link to="/settings">
                  <div className="px-2 py-4">{t("settings")}</div>
                </Link>
              </li>
            </ul>
          </div>
          <div
            className={`flex lg:hidden ml-6 ${toggleMenu && "switch"}`}
            onClick={() => setToggleMenu(!toggleMenu)}
          >
            {toggleMenu ? (
              <TfiClose className="hover:cursor-pointer" size={25} />
            ) : (
              <TfiMenu className="hover:cursor-pointer" size={25} />
            )}
          </div>
          <ul
            className={
              toggleMenu
                ? "lg:hidden block fixed right-0 top-24 w-[60%] sm:w-[40%] h-full bg-[#fff] ease-out duration-500 z-10 border-l border-gray-200 shadow-xl"
                : "ease-in duration-500 fixed right-[-100%] w-[40%] h-full top-24"
            }
          >
            <li>
              <div className="group relative">
                <div className="py-4 hover:cursor-pointer">
                  <Link
                    to="/"
                    className="cursor-pointer flex items-center pl-2"
                  >
                    {t("main-page")}&nbsp;
                    <SlArrowDown
                      className="ml-14 group-hover:rotate-180 group-hover:transition duration-100"
                      size={15}
                    />
                  </Link>
                </div>
              </div>
            </li>
            <li className="py-4">
              <Link to="/about" className="pl-2 y-2 hover:cursor-pointer">
                {t("about-us")}
              </Link>
            </li>
            <li className="py-4">
              <Link to="/contact" className="pl-2 hover:cursor-pointer">
                {t("contact")}
              </Link>
            </li>

            <div className="text-[#fff] flex items-center mt-6 ml-2">
              {userType === "vol" && (
                <Link to="add_help_offer">
                  <a className="px-4 py-1 rounded-lg bg-yellow-default hover:bg-yellow-light">
                    {t("add-help-offer")}
                  </a>
                </Link>
              )}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};
