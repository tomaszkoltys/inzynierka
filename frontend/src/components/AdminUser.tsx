import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { AiOutlineSearch } from "react-icons/ai";
import AdminSingleUser from "./AdminSingleUser";
import { Dropdown } from "./Dropdown.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddUserForm } from "./AddUserForm.tsx";

export type UserProps = {
  id: number;
  name: string;
  surname: string;
  username: string;
  password: string;
  email_address: string;
  role: number;
  identity_number: string;
  account_status: number;
  accepted: number;
};

export type UserRolesProps = {
  id: number;
  name: string;
};

const AdminUser = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState<string>("");
  const [userRoles, setUserRoles] = useState<UserRolesProps[]>([]);
  const [userRolesId, setUserRolesId] = useState<number | null>(null);
  const [users, setUsers] = useState<UserProps[]>([]);
  const [accountStatuses, setAccountStatuses] = useState<UserRolesProps[]>([])
  const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false)

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:8080/api/v1/user/allusers',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`
      }
    })
      .then((response) => setUsers(response.data))
      .catch((error) => {
        console.error("Error fetching /allusers:", error);
      });

    axios({
      method: 'get',
      url: 'http://localhost:8080/api/v1/role/alluserroles',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`
      }
    })
      .then((response) => setUserRoles(response.data))
      .catch((error) => {
        console.error("Error fetching /allusers:", error);
      });

    axios({
      method: 'get',
      url: 'http://localhost:8080/api/v1/role/allaccountstatuses',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`
      }
    })
      .then((response) => setAccountStatuses(response.data))
      .catch((error) => {
        console.error("Error fetching /allaccountstatuses:", error);
      });


  }, []);


  const handleUserRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    const userRoleId =
      userRoles.find((userRole) => userRole.name === selected)?.id || null;
    setUserRolesId(userRoleId);
  };

  const filteredUsers = users.filter((user) => {
    return (
      (search.toLowerCase() === "" ||
        user.username.toLowerCase().includes(search.toLowerCase())) &&
      (userRolesId === null || user.role === userRolesId)
    );
  });

  const handleEditUser = (userId: number) => {
    console.log("Edit user with ID:", userId);
  };

  const handleBlockUser = (userId: number) => {
    console.log("Block user with ID:", userId);
  };

  return (
    <div className="flex items-center justify-center bg-[#8AA9C7]">
      <div className="w-full md:w-[70%] flex flex-col min-h-[800px] bg-[#fff]">
        <div className="relative border border-blue-default my-12 mx-8 py-16 px-2">
          <div className="relative text-2xl font-light px-4 bg-[#fff] top-[-1%]">
            {t("admin-user")}
          </div>
          <div className="mx-2 my-2">
            <span className="border-b border-gray-300">{t("filters")}</span>
          </div>
          <div className="flex flex-row lg:flex-col mx-2">
            <div className="flex items-center justify-between flex-col lg:flex-row mt-3 mb-12">
              <div className="flex justify-center items-center text-[#000] w-60 h-10 border border-gray-300 rounded-md">
                <input
                  autoFocus
                  placeholder={t("search")}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border-none outline-none ml-2 text-sm"
                />
                <label className="border-l border-gray-300 h-full flex justify-center items-center w-16 rounded-md hover:cursor-pointer">
                  <AiOutlineSearch />
                </label>
              </div>
              <div className="ml-0 lg:ml-6 w-60">
                <Dropdown
                  label={t("role")}
                  options={userRoles.map((userRole) => ({
                    value: userRole.name,
                  }))}
                  onChange={handleUserRoleChange}
                />
              </div>
              <div className="w-full lg:w-80"><button className="px-4 py-2 rounded-lg bg-yellow-default hover:bg-yellow-light text-white" onClick={() => setShowRegisterForm(true)}>{t("add-new-user")}</button></div>
            </div>
          </div>
          {showRegisterForm && (
            <div className="transition duration-700">
              <button className="px-4 py-2 rounded-lg bg-yellow-default hover:bg-yellow-light text-white" onClick={() => setShowRegisterForm(false)}>{t("hide")}</button>
              <AddUserForm />
            </div>
          )}
          <div className="border-t border-gray-300">
            <table className="w-full">
              <thead>
                <tr>
                  <th>{t("id")}</th>
                  <th>{t("name")}</th>
                  <th>{t("surname")}</th>
                  <th>{t("username")}</th>
                  <th>{t("e-mail")}</th>
                  <th>{t("role")}</th>
                  <th>{t("identity-number")}</th>
                  <th>{t("status")}</th>
                  <th>{t("accepted")}</th>
                  <th>{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <AdminSingleUser
                    key={user.id}
                    user={user}
                    userRoles={userRoles}
                    accountStatuses={accountStatuses}
                    onEdit={() => handleEditUser(user.id)}
                    onBlock={() => handleBlockUser(user.id)}
                  />
                ))}
                <ToastContainer />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUser;
