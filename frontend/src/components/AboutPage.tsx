import { useTranslation } from "react-i18next";

export const AboutPage = () => {
    const { t } = useTranslation();
    return (
        <div className="flex items-center justify-center">
            <div className="w-full md:w-[70%] h-form-short flex flex-col min-h-[700px] bg-[#fff]">
                <div className="relative border border-yellow-default my-12 mx-8 py-6 px-2">
                    <div className="absolute text-2xl font-light px-4 bg-[#fff] top-[-2.5%]">
                        {t("about-us")}
                    </div>
                    <br /><p>
                        <h1>Nasza misja</h1><br />
                        Jesteśmy organizacją charytatywną dedykowaną pomocy uchodźcom. Nasza misja to zapewnienie wsparcia, schronienia i nadziei tym, którzy zostali zmuszeni do opuszczenia swojego domu w obliczu konfliktów i prześladowań.
                    </p>
                    <p>
                        <h1>Nasza praca</h1><br />
                        Działamy na wielu płaszczyznach, aby pomóc uchodźcom w odbudowie swojego życia. Na naszej stronie możesz zapewnić wsparcie medyczne, żywienie, odzież oraz zakwaterowanie potrzebującym.
                    </p>
                    <p>
                        <h1>Jak możesz pomóc?</h1><br />
                        Twoja pomoc jest nieoceniona. Możesz wesprzeć naszą organizację, dodając ofertę pomocy. Razem możemy tworzyć lepsze jutro.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;