import { Link } from "react-router-dom";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { t } from "i18next";
import axios from "axios";

type FormData = {
  email_address: string;
  randomCode: number;
  password: string;
};

export const RemindSecondStep = () => {
  const schema: ZodType<FormData> = z.object({
    email_address: z
      .string()
      .email(t('field-@'))
      .regex(
        /^[^ ]+@[^ ]+\.[a-z]{2,3}$/,
        t('field-xyz'),
      ),
    randomCode: z.number(),
    password: z
    .string()
    .min(5, t('password-5-characters'))
    .max(20)
    .regex(
      /^[A-Za-z0-9!@#$]+$/,
      t('password-letters-numbers-characters'),
    ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const changePassword = async (data: FormData) => {
    axios({
      method: 'post',
      url: `http://localhost:8080/api/v1/user/resetpassword?email_address=${data.email_address}&randomCode=${data.randomCode}&password=${data.password}`,
      headers: {
          'Content-Type': "application/json"
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
      <div className="w-full md:w-[100%] h-form flex flex-col min-h-[600px] bg-[#fff]">
        <div className="relative border border-yellow-default my-12 mx-8 py-6 px-2">
          <div className="absolute text-2xl font-light px-4 bg-[#fff] top-[-4%]">
          {t('remind-password')}
          </div>
          <form className="flex flex-col" onSubmit={handleSubmit(changePassword)}>
            <label className="mt-6">Email*</label>
            <input
              type="email"
              className="text-base py-3 px-2 bg-[#E1E1E1]"
              maxLength={20}
              {...register("email_address")}
            />
            {errors.email_address && (
              <p className="text-[#e62727]"> {errors.email_address.message}</p>
            )}
            <label className="mt-6">{t('verification-code')}</label>
            <input
              type="tel"
              className="text-base py-3 px-2 bg-[#E1E1E1]"
              maxLength={6}
              {...register("randomCode", { valueAsNumber: true })}
            />
            {errors.randomCode && (
              <p className="text-[#e62727]"> {errors.randomCode.message}</p>
            )}
             <label className="mt-6">{t(`new-password`)}</label>
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
              value={t('change-password')}
            />
          </form>
          <div className="flex flex-col gap-4">
            <div>
              <Link to="/register" className="border-b border-[#000] font-bold">
                {t('register')}
              </Link>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
