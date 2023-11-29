import { Link } from "react-router-dom";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { t } from "i18next";
import { useState } from "react";
import { RemindSecondStep } from "./RemindSecondStep";

type FormData = {
  email_address: string;
};

export const RemindFirstStep = () => {
  const [secondStep, setSecondStep] = useState<boolean>(false)

  const schema: ZodType<FormData> = z.object({
    email_address: z
      .string()
      .email(t('field-@'))
      .regex(
        /^[^ ]+@[^ ]+\.[a-z]{2,3}$/,
        t('field-xyz'),
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const sendCode = async (data: FormData) => {
    console.log(data.email_address)
    axios({
      method: 'post',
      url: `http://localhost:8080/api/v1/user/remindpassword?email_address=${data.email_address}`,
      headers: {
          'Content-Type': "application/json"
        }
    })
      .then((response) => {
        console.log(t('verification-code-success'), response.data);
        toast.success(t('verification-code-success'), {
          position: toast.POSITION.TOP_CENTER,
        });
        setSecondStep(true)
      })
      .catch((error) => {
        console.log("Error", error)
        toast.error(t('verification-code-failed'), {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  return (
    <div className="flex flex-row-reverse">
      <div className="w-full md:w-[50%] h-form flex flex-col relative min-h-[600px] bg-[#fff]">
        {secondStep ? (
          <RemindSecondStep />
        ):(
          <div className="relative border border-yellow-default my-12 mx-8 py-6 px-2">
          <div className="absolute text-2xl font-light px-4 bg-[#fff] top-[-4%]">
            {t('remind-password')}
          </div>
          <form className="flex flex-col" onSubmit={handleSubmit(sendCode)}>
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
            <input
              type="submit"
              className="w-full my-10 py-2 px-2 text-xl text-[#fff] bg-yellow-default rounded-md hover:cursor-pointer hover:bg-yellow-light"
              value={t('send-verification-code')}
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
        )}
      </div>
    </div>
  );
};
