type SingleOfferProps = {
  id: number;
  author: number;
  supporter: number;
  country: number;
  type: number;
  description: string;
  photo: string;
  side: string;
  help_status: number;
};

export const SingleOffer = ({
  author,
  type,
  description,
  photo,
}: SingleOfferProps) => {
  return (
    <div className="flex flex-col bg-yellow-light border border-yellow-light text-[#fff]">
      <div className="flex h-48">
        <div className="w-[50%]">
          <img src={photo} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="w-[50%] mx-2 mb-2 my-2 ">
          <h4 className="text-xl font-semibold mx-5">{type}</h4>
          <p className="mt-2">{description}</p>
        </div>
      </div>
      <div className="flex items-center justify-center bg-yellow-dark">
        <span className="text-[#fff] text-lg">{author}</span>
      </div>
    </div>
  );
};
