import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type FormData = {
  firstName: string;
  lastName: string;
  name: string;
  password: string;
  email: string;
  pesel?: string;
  document?: string;
  selectedOption: string;
};

export const RegisterForm = () => {
  const { t } = useTranslation();
  const schema: ZodType<FormData> = z.object({
    firstName: z
      .string()
      .min(2, "Imię musi mieć co najmniej 2 litery")
      .max(30)
      .regex(/^[A-Za-z]+$/, "Pole może zawierać wyłącznie litery"),
    lastName: z
      .string()
      .min(2, "Nazwisko musi mieć co najmniej 2 litery")
      .max(30)
      .regex(/^[A-Za-z]+$/, "Pole może zawierać wyłącznie litery"),
    name: z
      .string()
      .min(3, "Nazwa użytkownika musi mieć co najmniej 3 znaki")
      .max(30)
      .regex(
        /^[A-Za-z0-9_]+$/,
        "Pole może zawierać wyłącznie litery, cyfry lub znak '_' "
      ),
    password: z
      .string()
      .min(5, "Hasło musi mieć co najmniej 5 znaków")
      .max(20)
      .regex(
        /^[A-Za-z0-9!@#$]+$/,
        "Pole może zawierać wyłącznie litery, cyfry lub znaki ! @ # $ "
      ),
    email: z
      .string()
      .email("Pole musi zawierać znak @")
      .regex(
        /^[^ ]+@[^ ]+\.[a-z]{2,3}$/,
        "Pole musi być w formacie xyz@xyz.xyz"
      ),
    pesel: z
      .string()
      .min(11, "Pole musi zawierac dokładnie 11 cyfr")
      .max(11)
      .regex(/^\d{11}$/, "Pole mooże zawierać wyłącznie cyfry")
      .optional()
      .or(z.literal("")),
    document: z
      .string()
      .min(9, "Pole musi zawierać dokładnie 9 znaków")
      .max(9)
      .regex(
        /^(?:[A-Z]{3}[0-9]{6}|[A-Z]{2}[0-9]{7})$/,
        "Pole musi być w formacie XYZ000000 lub XY0000000"
      )
      .optional()
      .or(z.literal("")),
    selectedOption: z
      .string()
      .refine((value) => ["volunteer", "refugee"].includes(value)),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [selectedOption, setSelectedOption] = useState<boolean>(false);

  const submitData = (data: FormData) => {
    console.log("Wyslano", data);
  };

  return (
    <div className="flex flex-row-reverse">
      <div className="w-full md:w-[50%] h-form flex flex-col min-h-[1200px] bg-[#fff]">
        <div className="relative border border-yellow-default my-12 mx-8 py-6 px-2">
          <div className="absolute text-2xl font-light px-4 bg-[#fff] top-[-1.5%]">
            {t("registration")}
          </div>
          <form className="flex flex-col" onSubmit={handleSubmit(submitData)}>
            <label className="mt-6">{t("name")}*</label>
            <input
              type="text"
              className="text-base py-3 px-2 bg-[#E1E1E1]"
              maxLength={20}
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-[#e62727]"> {errors.firstName.message}</p>
            )}
            <label className="mt-6">{t("surname")}*</label>
            <input
              type="text"
              className="text-base py-3 px-2 bg-[#E1E1E1]"
              maxLength={20}
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-[#e62727]"> {errors.lastName.message}</p>
            )}
            <label className="mt-6">{t("username")}*</label>
            <input
              type="text"
              className="text-base py-3 px-2 bg-[#E1E1E1]"
              maxLength={30}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-[#e62727]"> {errors.name.message}</p>
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
            <label className="mt-6">{t("e-mail")}*</label>
            <input
              type="email"
              className="text-base py-3 px-2 bg-[#E1E1E1]"
              maxLength={20}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-[#e62727]"> {errors.email.message}</p>
            )}
            <div className="mt-16 mb-4 gap-24 lg:gap-36 flex flex-row items-center justify-center mx-auto xs:flex-col xs:gap-6 xs:items-start">
              <label
                className="flex items-center justify-center"
                onClick={() => setSelectedOption(false)}
              >
                <input
                  type="radio"
                  className="register-radiobutton"
                  value="volunteer"
                  checked={selectedOption === false}
                  {...register("selectedOption")}
                />
                &nbsp;{t("volunteer")}{" "}
              </label>
              <label
                className="flex items-center justify-center"
                onClick={() => setSelectedOption(true)}
              >
                <input
                  type="radio"
                  className="register-radiobutton"
                  value="refugee"
                  checked={selectedOption === true}
                  {...register("selectedOption")}
                />
                &nbsp;{t("refugee")}{" "}
              </label>{" "}
              {errors.selectedOption && (
                <p className="text-[#e62727]">
                  {" "}
                  {errors.selectedOption.message}{" "}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <div className={`flex flex-col ${selectedOption && "order-2"}`}>
                <label className="mt-6">{t("pesel-number")}</label>
                <input
                  type="text"
                  className="text-base py-3 px-2 bg-[#E1E1E1]"
                  maxLength={11}
                  {...register("pesel")}
                  onKeyPress={(e) => {
                    const charCode = e.charCode || e.keyCode;
                    if (charCode < 48 || charCode > 57) {
                      e.preventDefault();
                    }
                  }}
                />
                {errors.pesel && (
                  <p className="text-[#e62727]"> {errors.pesel.message}</p>
                )}{" "}
              </div>
              <div className={`flex flex-col ${selectedOption && "order-1"}`}>
                <label className="mt-6">
                  {" "}
                  {t("identity-card/passport-number")}{" "}
                </label>
                <input
                  type="text"
                  className="text-base py-3 px-2 bg-[#E1E1E1]"
                  maxLength={9}
                  {...register("document")}
                />
                {errors.document && (
                  <p className="text-[#e62727]"> {errors.document.message}</p>
                )}{" "}
              </div>
            </div>
            <input
              type="submit"
              className="w-full my-10 py-2 px-2 text-xl text-[#fff] bg-yellow-default rounded-md hover:cursor-pointer hover:bg-yellow-light"
              value={t("register")}
            />
          </form>
        </div>
      </div>
    </div>
  );
};
