type SingleOfferProps = {
  id: number;
  service: string;
  description: string;
  img: string;
};

export const SingleOffer = ({
  id,
  service,
  description,
  img,
}: SingleOfferProps) => {
  return (
    <div className="flex flex-col bg-yellow-light border border-yellow-light text-[#fff]">
      <div className="flex h-48">
        <div className="w-[50%]">
          <img src={img} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="w-[50%] mx-2 mb-2 my-2 ">
          <h4 className="text-xl font-semibold mx-5">{service}</h4>
          <p className="mt-2">{description}</p>
        </div>
      </div>
      <div className="flex items-center justify-center bg-yellow-dark">
        <span className="text-[#fff] text-lg">{id}</span>
      </div>
    </div>
  );
};
