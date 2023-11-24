import { Link } from "react-router-dom";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

type FormData = {
  oldPassword: string;
  newPassword: string;
};
export const ChangePasswordForm = () => {
  const [loggedInUserPassword, setLoggedInUserPassword] = useState<null | string>(null);

  useEffect(() => {
    const storedUserPassword = localStorage.getItem('loggedInUserPassword');
    if (storedUserPassword) {
      setLoggedInUserPassword(storedUserPassword)
    }
  }, []);

  const currentUser_id = localStorage.getItem('user-id')

  const schema: ZodType<FormData> = z
    .object({
      oldPassword: z
        .string()
        .min(5, "Hasło musi mieć co najmniej 5 znaków")
        .max(20)
        .nonempty("Pole nie może być puste"),
      newPassword: z
        .string()
        .min(5, "Hasło musi mieć co najmniej 5 znaków")
        .max(20)
        .regex(
          /^[A-Za-z0-9!@#$]+$/,
          "Pole może zawierać wyłącznie litery, cyfry lub znaki ! @ # $ ",
        )
        .nonempty("Pole nie może być puste"),
    })
    .refine((data) => data.oldPassword !== data.newPassword, {
      message: "Nowe hasło nie może być takie samo jak stare",
      path: ["newPassword"],
    })
    .refine((data) => data.oldPassword === loggedInUserPassword, {
      message: "Stare hasło nie jest poprawne",
      path: ["oldPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = async (data: FormData) => {
    axios({
      method: 'post',
      url: `http://localhost:8080/api/v1/user/editpassword?userId=${currentUser_id}&oldPassword=${data.oldPassword}&newPassword=${data.newPassword}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`
      }
    })
      .then((response) => {
        console.log("Password changed:", response.data);
        toast.success("Pomyślnie zmieniono hasło!", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((error) => {
        console.log("Error", error)
        toast.success("Zmiana hasła niepowiodła się!", {
          position: toast.POSITION.TOP_CENTER,
        });
      });


  
  };

  return (
    <div className="flex flex-row-reverse">
      <ToastContainer />
      <div className="w-full md:w-[50%] h-form flex flex-col min-h-[600px] bg-[#fff]">
        <div className="relative border border-yellow-default my-12 mx-8 py-6 px-2">
          <div className="absolute text-2xl font-light px-4 bg-[#fff] top-[-3%]">
            Zmień hasło
          </div>
          <form className="flex flex-col" onSubmit={handleSubmit(submitData)}>
            <label className="mt-6">Stare hasło*</label>
            <input
              type="text"
              className="text-base py-3 px-2 bg-[#E1E1E1]"
              maxLength={20}
              {...register("oldPassword")}
            />
            {errors.oldPassword && (
              <p className="text-[#e62727]"> {errors.oldPassword.message}</p>
            )}
            <label className="mt-6">Nowe hasło*</label>
            <input
              type="password"
              className="text-base py-3 px-2 bg-[#E1E1E1]"
              maxLength={20}
              {...register("newPassword")}
            />
            {errors.newPassword && (
              <p className="text-[#e62727]"> {errors.newPassword.message}</p>
            )}

            <input
              type="submit"
              className="w-full my-10 py-2 px-2 text-xl text-[#fff] bg-yellow-default rounded-md hover:cursor-pointer hover:bg-yellow-light"
              value="Zmień hasło"
            />
          </form>
          <div className="flex flex-col gap-2">
            <div>
              <Link to="/register" className="border-b border-[#000] font-bold">
                Zarejestruj się
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
