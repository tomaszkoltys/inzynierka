import { OfferProps, UserProps, HelpTypeProps } from "./AllHelpRequests";

console.clear()

export const SingleOffer = ({
  author,
  type,
  description,
  photo,
  users,
  helpTypes,
}: OfferProps & { users: UserProps[] } & { helpTypes: HelpTypeProps[] }) => {
  // Znajdź użytkownika na podstawie ID autora
  const authorUser = users.find((user) => {
    return user.id === author;
  });

  // Znajdź odpowiednią nazwę typu pomocy na podstawie identyfikatora "type"
  const helpType = helpTypes.find((helpType) => helpType.id === type);
  const typeName = helpType ? helpType.namePL : "Nieznany typ pomocy";

  return (
    <div className="flex flex-col bg-yellow-light border border-yellow-light text-[#fff]">
      <div className="flex h-48">
        <div className="w-[50%]">
          <img src={photo} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="w-[50%] mx-2 mb-2 my-2">
          <h4 className="text-xl font-semibold mx-5">{typeName}</h4>
          <p className="mt-2">{description}</p>
        </div>
      </div>
      <div className="flex items-center justify-center bg-yellow-dark">
        {/* Sprawdź, czy znaleziono użytkownika, zanim dostaniesz się do jego właściwości */}
        {authorUser ? (
          <span className="text-[#fff] text-lg">
            {authorUser.name} {authorUser.surname}
          </span>
        ) : (
          <span className="text-[#fff] text-lg">Nieznany autor</span>
        )}
      </div>
    </div>
  );
};
