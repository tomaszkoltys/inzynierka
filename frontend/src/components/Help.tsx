export type StatusProps = {
  id: number;
  name: string;
};

export type OfferProps = {
  id: number;
  author: number;
  supporter: number;
  county: number;
  description: string;
  photo: Blob;
  side: number;
  helpStatus: number;
  type: number;
};

export type UserProps = {
  id: number;
  name: string;
  surname: string;
  password: string;
  email_address: string;
  role: number;
  identity_number: string;
  status: number;
  accepted: number;
};

export type HelpTypeProps = {
  id: number;
  name: string;
  namePL: string;
};

export type VoivodeshipsProps = {
  id: number;
  name: string;
};

export type CountiesProps = {
  id: number;
  name: string;
  city: string;
  voivodeship: number;
};