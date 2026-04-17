export type Instrument = {
  currency: string;
  isin: string;
  securityName: string;
  bondType: "Global" | "Reg S";
  issuer: string;
};

export type CompSet = {
  id: string;
  name: string;
  instruments: Instrument[];
};

export type CompSetSummary = {
  id: string;
  name: string;
  instrumentCount: number;
};
