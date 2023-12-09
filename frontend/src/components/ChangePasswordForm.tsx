import { Link } from "react-router-dom";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useTranslation } from "react-i18next";

type FormData = {
  oldPassword: string;
  newPassword: string;
  cpassword: string;
};
export const ChangePasswordForm = () => {
  const { t } = useTranslation();

  const schema: ZodType<FormData> = z
    .object({
      oldPassword: z
        .string()
        .min(5, t('password-5-characters'))
        .max(20),
      newPassword: z
        .string()
        .min(5, t('password-5-characters'))
        .max(20)
        .regex(
          /^[A-Za-z0-9!@#$]+$/,
          t('password-letters-numbers-characters'),
        ),
      cpassword: z
        .string()
        .min(5, t('password-5-characters'))
        .max(20)
        .regex(
          /^[A-Za-z0-9!@#$]+$/,
          t('password-letters-numbers-characters'),
        ),
    })
    .refine((data) => data.oldPassword !== data.newPassword, {
      message: t('another-new-password'),
      path: ["newPassword"],
    })
    .refine((data) => data.oldPassword === localStorage.getItem('loggedInUserPassword'), {
      message: t('incorrect-old-password'),
      path: ["oldPassword"],
    })
    .refine((data) => data.newPassword === data.cpassword, {
      message: t('passwords-same'),
      path: ["cpassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = async (data: FormData) => {
    axios({
      method: 'post',
      url: `http://localhost:8080/api/v1/user/editpassword?userId=${localStorage.getItem('user-id')}&oldPassword=${data.oldPassword}&newPassword=${data.newPassword}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`
      }
    })
      .then((response) => {
        console.log("Password changed:", response.data);
        toast.success(t('password-changed-successfully'), {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((error) => {
        console.log("Error", error)
        toast.error(t('password-change-failed'), {
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
            {t('change-password')}
          </div>
          <form className="flex flex-col" onSubmit={handleSubmit(submitData)}>
            <label className="mt-6">{t('old-password')}</label>
            <input
              type="text"
              className="text-base py-3 px-2 bg-[#E1E1E1]"
              maxLength={20}
              {...register("oldPassword")}
            />
            {errors.oldPassword && (
              <p className="text-[#e62727]"> {errors.oldPassword.message}</p>
            )}
            <label className="mt-6">{t(`new-password`)}</label>
            <input
              type="password"
              className="text-base py-3 px-2 bg-[#E1E1E1]"
              maxLength={20}
              {...register("newPassword")}
            />
            {errors.newPassword && (
              <p className="text-[#e62727]"> {errors.newPassword.message}</p>
            )}
            <label className="mt-6">{t(`confirm-new-password`)}</label>
            <input
              type="password"
              className="text-base py-3 px-2 bg-[#E1E1E1]"
              maxLength={20}
              {...register("cpassword")}
            />
            {errors.cpassword && (
              <p className="text-[#e62727]"> {errors.cpassword.message}</p>
            )}
            <input
              type="submit"
              className="w-full my-10 py-2 px-2 text-xl text-[#fff] bg-yellow-default rounded-md hover:cursor-pointer hover:bg-yellow-light"
              value={t('change-password')}
            />
          </form>
          <div className="flex flex-col gap-2">
            <div>
              <Link to="/register" className="border-b border-[#000] font-bold">
                {t('register')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
