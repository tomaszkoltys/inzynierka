import { Link } from "react-router-dom";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FormData = {
  email: string;
  code: number;
};

export const RemindSecondStep = () => {
  const schema: ZodType<FormData> = z.object({
    email: z
      .string()
      .email("Pole musi zawierać znak @")
      .regex(
        /^[^ ]+@[^ ]+\.[a-z]{2,3}$/,
        "Pole musi być w formacie xyz@xyz.xyz",
      ),
    code: z.number().min(5, "Kod musi mieć 5 cyfr").max(5),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = (data: FormData) => {
    console.log("Wyslano", data);

    toast.success("Weryfikacja przebiegła pomyślnie", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <div className="flex flex-row-reverse">
      <div className="w-full md:w-[50%] h-form flex flex-col min-h-[600px] bg-[#fff]">
        <div className="relative border border-yellow-default my-12 mx-8 py-6 px-2">
          <div className="absolute text-2xl font-light px-4 bg-[#fff] top-[-4%]">
            Przypomnij hasło
          </div>
          <form className="flex flex-col" onSubmit={handleSubmit(submitData)}>
            <label className="mt-6">Email*</label>
            <input
              type="email"
              className="text-base py-3 px-2 bg-[#E1E1E1]"
              maxLength={20}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-[#e62727]"> {errors.email.message}</p>
            )}
            <label className="mt-6">Podaj kod weryfikacyjny*</label>
            <input
              type="tel"
              className="text-base py-3 px-2 bg-[#E1E1E1]"
              maxLength={5}
              {...register("code", { valueAsNumber: true })}
            />
            {errors.code && (
              <p className="text-[#e62727]"> {errors.code.message}</p>
            )}
            <input
              type="submit"
              className="w-full my-10 py-2 px-2 text-xl text-[#fff] bg-yellow-default rounded-md hover:cursor-pointer hover:bg-yellow-light"
              value="Sprawdź kod"
            />
          </form>
          <div className="flex flex-col gap-4">
            <div>
              <Link to="/register" className="border-b border-[#000] font-bold">
                Zarejestruj się
              </Link>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
