import { useTranslation } from "react-i18next";

export const ContactPage = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center">
      <div className="w-full md:w-[70%] h-form-short flex flex-col min-h-[700px] bg-[#fff]">
        <div className="relative border border-yellow-default my-12 mx-8 py-6 px-2">
          <div className="absolute text-2xl font-light px-4 bg-[#fff] top-[-2.5%]">
          {t("contact")}
          </div>
          <br />
          <p><h1>Adres</h1> 20-000 Lublin <br/> Długa 20/24</p>
          <p><h1>Numer telefonu</h1> +48 555 555 555</p>
          <p><h1>Adres e-mail</h1> s95605@pollub.edu.pl</p>

          <p><h1>Media społecznościowe</h1></p>
          <p>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </p>
          <p>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
          </p>
          <p>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
