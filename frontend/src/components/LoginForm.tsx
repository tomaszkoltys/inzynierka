import { Link, Router } from "react-router-dom";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

type FormData = {
  username: string;
  password: string;
};

export const LoginForm = () => {

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    const storedUserRole = localStorage.getItem('loggedInUserRole');
    if (storedUser) {
      setLoggedInUser(storedUser);
      setLoggedInUserRole(storedUserRole);
    }
  }, []);

  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState<null | string>(null);
  const [loggedInUserRole, setLoggedInUserRole] = useState<null | string>(null);
  const { t } = useTranslation();

  const schema: ZodType<FormData> = z.object({
    username: z
      .string()
      .min(3, "Nazwa użytkownika musi mieć co najmniej 3 znaki")
      .max(30)
      .regex(
        /^[A-Za-z0-9_]+$/,
        "Pole może zawierać wyłącznie litery, cyfry lub znak '_' "
      ),
    password: z.string().min(5, "Hasło musi mieć co najmniej 5 znaków").max(20),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = async (data: FormData) => {
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:8080/api/v1/auth/authenticate',
        data: JSON.stringify(data),
        headers: {
          'Content-Type': "application/json"
        }
      })
      setLoggedInUser(data.username); // Ustawia zalogowanego użytkownika
      setLoggedInUserRole("ref"); // Ustawia rolę zalogowanego użytkownika
      sessionStorage.setItem('jwt-token', response.data['jwt-token'])
      localStorage.setItem('loggedInUser', data.username);
      localStorage.setItem('loggedInUserRole', "ref"); // Zapisuje rolę zalogowanego użytkownika w localStorage
      toast.success("Pomyślnie zalogowano!", {
        position: toast.POSITION.TOP_CENTER,
      })
      // Zapisz informacje o zalogowanym użytkowniku w localStorage

      // Przekieruj użytkownika na odpowiednią stronę po zalogowaniu
      
      navigate('/all_help_requests');
      window.location.reload();
      
    } catch (error) {
      console.error("Error while sending data:", error);
    }    
  };

  return (
    <div className="flex flex-row-reverse">
      <ToastContainer />
      <div className="w-full md:w-[50%] h-form flex flex-col min-h-[600px] bg-[#fff]">
        <div className="relative border border-yellow-default my-12 mx-8 py-6 px-2">
          <div className="absolute text-2xl font-light px-4 bg-[#fff] top-[-3%]">
            {t("Log in")}
          </div>
          <form className="flex flex-col" onSubmit={handleSubmit(submitData)}>
            <label className="mt-6">{t("username")}*</label>
            <input
              type="text"
              className="text-base py-3 px-2 bg-[#E1E1E1]"
              maxLength={30}
              {...register("username")}
            />
            {errors.username && (
              <p className="text-[#e62727]"> {errors.username.message}</p>
            )}
            <label className="mt-6">{t("password")}*</label>
            <input
              type="password"
              className="text-base py-3 px-2 bg-[#E1E1E1]"
              maxLength={20}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-[#e62727]"> {errors.password.message}</p>
            )}
            
            <input
              type="submit"
              className="w-full my-10 py-2 px-2 text-xl text-[#fff] bg-yellow-default rounded-md hover:cursor-pointer hover:bg-yellow-light"
              value={t("log-in")}
            />
          </form>
          <div className="flex flex-col gap-2">
            <div>
              <Link to="/remind" className="border-b border-[#000] font-medium">
                
                {t("forgot-password")}
              </Link>
            </div>
            <div>
              <Link to="/register" className="border-b border-[#000] font-bold">
                {t("register")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
