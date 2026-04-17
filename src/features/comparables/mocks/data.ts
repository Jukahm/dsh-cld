import type { CompSet, Instrument } from "../types/index.js";

const eibChf: Instrument[] = [
  { currency: "CHF", isin: "CH0025896942", securityName: "EIB 3 1/8 06/30/36", bondType: "Reg S", issuer: "EIB" },
  { currency: "CHF", isin: "CH0033596476", securityName: "EIB 3 3/8 10/15/27", bondType: "Global", issuer: "EIB" },
  { currency: "CHF", isin: "CH0112120503", securityName: "EIB 2 5/8 04/23/30", bondType: "Reg S", issuer: "EIB" },
  { currency: "CHF", isin: "CH0117576956", securityName: "EIB 2 10/06/31", bondType: "Global", issuer: "EIB" },
  { currency: "CHF", isin: "CH0119542634", securityName: "EIB 2 11/30/35", bondType: "Global", issuer: "EIB" },
  { currency: "CHF", isin: "CH0180006113", securityName: "EIB 1 5/8 04/02/26", bondType: "Reg S", issuer: "EIB" },
  { currency: "CHF", isin: "CH0184786124", securityName: "EIB 1 5/8 04/02/26", bondType: "Global", issuer: "EIB" },
  { currency: "CHF", isin: "CH0204975426", securityName: "EIB 1 3/8 02/21/28", bondType: "Reg S", issuer: "EIB" },
  { currency: "CHF", isin: "CH0212687377", securityName: "EIB 1 3/8 02/21/28", bondType: "Global", issuer: "EIB" },
  { currency: "CHF", isin: "CH1271360591", securityName: "EIB 1.46 07/18/33", bondType: "Global", issuer: "EIB" },
  { currency: "CHF", isin: "CH1335850330", securityName: "EIB 0.6925 10/15/32", bondType: "Global", issuer: "EIB" },
  { currency: "CHF", isin: "CH1376931627", securityName: "EIB 0.7625 02/11/37", bondType: "Global", issuer: "EIB" },
  { currency: "CHF", isin: "CH1428867068", securityName: "EIB 0.94 04/11/34", bondType: "Global", issuer: "EIB" },
  { currency: "CHF", isin: "CH1472906961", securityName: "EIB 0.8675 02/19/38", bondType: "Global", issuer: "EIB" },
];

const eibEur: Instrument[] = [
  { currency: "EUR", isin: "XS0107247725", securityName: "EIB 1 3/4 09/15/45", bondType: "Reg S", issuer: "EIB" },
  { currency: "EUR", isin: "XS0107718279", securityName: "EIB 1 1/4 11/13/26", bondType: "Reg S", issuer: "EIB" },
  { currency: "EUR", isin: "XS1183208328", securityName: "EIB 1 03/14/31", bondType: "Global", issuer: "EIB" },
  { currency: "EUR", isin: "XS1317148580", securityName: "EIB 0 05/18/29", bondType: "Reg S", issuer: "EIB" },
  { currency: "EUR", isin: "XS1361554584", securityName: "EIB 1 1/8 09/15/36", bondType: "Reg S", issuer: "EIB" },
  { currency: "EUR", isin: "XS1422953932", securityName: "EIB 1 04/14/32", bondType: "Reg S", issuer: "EIB" },
  { currency: "EUR", isin: "XS1500338618", securityName: "EIB 0 1/2 11/13/36", bondType: "Global", issuer: "EIB" },
  { currency: "EUR", isin: "XS1501087131", securityName: "EIB 0 10/06/48", bondType: "Global", issuer: "EIB" },
  { currency: "EUR", isin: "XS1503043694", securityName: "EIB 0 1/4 09/14/29", bondType: "Reg S", issuer: "EIB" },
  { currency: "EUR", isin: "XS1505567088", securityName: "EIB 0 7/8 09/13/47", bondType: "Global", issuer: "EIB" },
  { currency: "EUR", isin: "XS1612977217", securityName: "EIB 1 1/8 04/13/33", bondType: "Reg S", issuer: "EIB" },
  { currency: "EUR", isin: "XS1641452277", securityName: "EIB 1 1/8 11/15/47", bondType: "Reg S", issuer: "EIB" },
  { currency: "EUR", isin: "XS2015227494", securityName: "EIB 0 1/8 06/20/29", bondType: "Reg S", issuer: "EIB" },
  { currency: "EUR", isin: "XS2075269089", securityName: "EIB 0.66 11/3/39", bondType: "Reg S", issuer: "EIB" },
  { currency: "EUR", isin: "XS2102495673", securityName: "EIB 0.05 01/16/30", bondType: "Global", issuer: "EIB" },
];

const kfwEur: Instrument[] = [
  { currency: "EUR", isin: "DE000A0E83A8", securityName: "KFW 2.38 09/24/30", bondType: "Global", issuer: "KFW" },
  { currency: "EUR", isin: "DE000A0E83N1", securityName: "KFW 0 10/30/29", bondType: "Global", issuer: "KFW" },
  { currency: "EUR", isin: "DE000A11QTF7", securityName: "KFW 0 3/8 04/23/30", bondType: "Reg S", issuer: "KFW" },
  { currency: "EUR", isin: "DE000A11QTI9", securityName: "KFW 2 08/06/35", bondType: "Global", issuer: "KFW" },
  { currency: "EUR", isin: "DE000A11QTK7", securityName: "KFW 1 3/8 07/31/35", bondType: "Reg S", issuer: "KFW" },
  { currency: "EUR", isin: "DE000A168Y30", securityName: "KFW 0 01/29/46", bondType: "Global", issuer: "KFW" },
  { currency: "EUR", isin: "DE000A168Y48", securityName: "KFW 1 1/4 07/04/36", bondType: "Reg S", issuer: "KFW" },
  { currency: "EUR", isin: "DE0002764578", securityName: "KFW 0 09/17/29", bondType: "Global", issuer: "KFW" },
];

const ibrdUsd: Instrument[] = [
  { currency: "USD", isin: "US45905UP30", securityName: "IBRD 3 1/4 09/15/28", bondType: "Global", issuer: "IBRD" },
  { currency: "USD", isin: "US45905UQ47", securityName: "IBRD 2 7/8 07/15/26", bondType: "Global", issuer: "IBRD" },
  { currency: "USD", isin: "US45905UR20", securityName: "IBRD 3 1/2 03/08/27", bondType: "Reg S", issuer: "IBRD" },
  { currency: "USD", isin: "US45905US03", securityName: "IBRD 4 1/8 11/22/32", bondType: "Global", issuer: "IBRD" },
  { currency: "USD", isin: "US45905UT86", securityName: "IBRD 3 7/8 04/27/35", bondType: "Global", issuer: "IBRD" },
  { currency: "USD", isin: "US45905UU69", securityName: "IBRD 2 1/2 07/29/31", bondType: "Reg S", issuer: "IBRD" },
  { currency: "USD", isin: "US45905UV42", securityName: "IBRD 1 3/4 10/28/27", bondType: "Global", issuer: "IBRD" },
  { currency: "USD", isin: "US45905UW25", securityName: "IBRD 3 5/8 01/20/30", bondType: "Global", issuer: "IBRD" },
  { currency: "USD", isin: "US45905UX08", securityName: "IBRD 4 09/15/33", bondType: "Reg S", issuer: "IBRD" },
];

export const mockAllInstruments: Instrument[] = [
  ...eibChf,
  ...eibEur,
  ...kfwEur,
  ...ibrdUsd,
];

export const mockCompSets: CompSet[] = [
  {
    id: "cs-1",
    name: "Juliano IBRD",
    instruments: ibrdUsd,
  },
  {
    id: "cs-2",
    name: "SSA Comps",
    instruments: [...eibChf.slice(0, 4), ...kfwEur.slice(0, 4), ...ibrdUsd.slice(0, 4)],
  },
  {
    id: "cs-3",
    name: "E2E-DCM-IBRD",
    instruments: ibrdUsd.slice(0, 6),
  },
  {
    id: "cs-4",
    name: "EJB",
    instruments: [...eibChf.slice(0, 9), ...eibEur.slice(0, 8)],
  },
];

export function searchInstruments(query: string): Instrument[] {
  if (!query.trim()) return [];
  const q = query.trim().toUpperCase();
  return mockAllInstruments.filter(
    (i) =>
      i.issuer.toUpperCase().includes(q) ||
      i.isin.toUpperCase().includes(q) ||
      i.securityName.toUpperCase().includes(q),
  );
}
