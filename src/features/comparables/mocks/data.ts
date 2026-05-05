import type { CompSet, Instrument } from "../types/index.js";

// ---------------------------------------------------------------------------
// Instrument pools
// ---------------------------------------------------------------------------

const eibChf: Instrument[] = [
  { currency: "CHF", isin: "CH0025896942", securityName: "EIB 3 1/8 06/30/36",    bondType: "Reg S",  issuer: "EIB" },
  { currency: "CHF", isin: "CH0033596476", securityName: "EIB 3 3/8 10/15/27",    bondType: "Global", issuer: "EIB" },
  { currency: "CHF", isin: "CH0112120503", securityName: "EIB 2 5/8 04/23/30",    bondType: "Reg S",  issuer: "EIB" },
  { currency: "CHF", isin: "CH0117576956", securityName: "EIB 2 10/06/31",         bondType: "Global", issuer: "EIB" },
  { currency: "CHF", isin: "CH0119542634", securityName: "EIB 2 11/30/35",         bondType: "Global", issuer: "EIB" },
  { currency: "CHF", isin: "CH0180006113", securityName: "EIB 1 5/8 04/02/26",    bondType: "Reg S",  issuer: "EIB" },
  { currency: "CHF", isin: "CH0184786124", securityName: "EIB 1 5/8 04/02/26",    bondType: "Global", issuer: "EIB" },
  { currency: "CHF", isin: "CH0204975426", securityName: "EIB 1 3/8 02/21/28",    bondType: "Reg S",  issuer: "EIB" },
  { currency: "CHF", isin: "CH0212687377", securityName: "EIB 1 3/8 02/21/28",    bondType: "Global", issuer: "EIB" },
  { currency: "CHF", isin: "CH1271360591", securityName: "EIB 1.46 07/18/33",      bondType: "Global", issuer: "EIB" },
  { currency: "CHF", isin: "CH1335850330", securityName: "EIB 0.6925 10/15/32",   bondType: "Global", issuer: "EIB" },
  { currency: "CHF", isin: "CH1376931627", securityName: "EIB 0.7625 02/11/37",   bondType: "Global", issuer: "EIB" },
  { currency: "CHF", isin: "CH1428867068", securityName: "EIB 0.94 04/11/34",     bondType: "Global", issuer: "EIB" },
  { currency: "CHF", isin: "CH1472906961", securityName: "EIB 0.8675 02/19/38",   bondType: "Global", issuer: "EIB" },
];

const eibEur: Instrument[] = [
  { currency: "EUR", isin: "XS0107247725", securityName: "EIB 1 3/4 09/15/45",    bondType: "Reg S",  issuer: "EIB" },
  { currency: "EUR", isin: "XS0107718279", securityName: "EIB 1 1/4 11/13/26",    bondType: "Reg S",  issuer: "EIB" },
  { currency: "EUR", isin: "XS1183208328", securityName: "EIB 1 03/14/31",         bondType: "Global", issuer: "EIB" },
  { currency: "EUR", isin: "XS1317148580", securityName: "EIB 0 05/18/29",         bondType: "Reg S",  issuer: "EIB" },
  { currency: "EUR", isin: "XS1361554584", securityName: "EIB 1 1/8 09/15/36",    bondType: "Reg S",  issuer: "EIB" },
  { currency: "EUR", isin: "XS1422953932", securityName: "EIB 1 04/14/32",         bondType: "Reg S",  issuer: "EIB" },
  { currency: "EUR", isin: "XS1500338618", securityName: "EIB 0 1/2 11/13/36",    bondType: "Global", issuer: "EIB" },
  { currency: "EUR", isin: "XS1501087131", securityName: "EIB 0 10/06/48",         bondType: "Global", issuer: "EIB" },
  { currency: "EUR", isin: "XS1503043694", securityName: "EIB 0 1/4 09/14/29",    bondType: "Reg S",  issuer: "EIB" },
  { currency: "EUR", isin: "XS1505567088", securityName: "EIB 0 7/8 09/13/47",    bondType: "Global", issuer: "EIB" },
  { currency: "EUR", isin: "XS1612977217", securityName: "EIB 1 1/8 04/13/33",    bondType: "Reg S",  issuer: "EIB" },
  { currency: "EUR", isin: "XS1641452277", securityName: "EIB 1 1/8 11/15/47",    bondType: "Reg S",  issuer: "EIB" },
  { currency: "EUR", isin: "XS2015227494", securityName: "EIB 0 1/8 06/20/29",    bondType: "Reg S",  issuer: "EIB" },
  { currency: "EUR", isin: "XS2075269089", securityName: "EIB 0.66 11/03/39",     bondType: "Reg S",  issuer: "EIB" },
  { currency: "EUR", isin: "XS2102495673", securityName: "EIB 0.05 01/16/30",     bondType: "Global", issuer: "EIB" },
];

const eibGbp: Instrument[] = [
  { currency: "GBP", isin: "XS0173945180", securityName: "EIB 5 1/4 04/01/38",    bondType: "Global", issuer: "EIB" },
  { currency: "GBP", isin: "XS0304671514", securityName: "EIB 4 3/4 03/11/33",    bondType: "Reg S",  issuer: "EIB" },
  { currency: "GBP", isin: "XS0471508529", securityName: "EIB 4 1/2 06/15/29",    bondType: "Global", issuer: "EIB" },
  { currency: "GBP", isin: "XS0839067539", securityName: "EIB 1 7/8 10/12/39",    bondType: "Reg S",  issuer: "EIB" },
  { currency: "GBP", isin: "XS1181561736", securityName: "EIB 1 1/4 02/06/33",    bondType: "Global", issuer: "EIB" },
  { currency: "GBP", isin: "XS1497991993", securityName: "EIB 1 5/8 03/10/36",    bondType: "Reg S",  issuer: "EIB" },
  { currency: "GBP", isin: "XS2186247793", securityName: "EIB 0 3/4 04/06/32",    bondType: "Global", issuer: "EIB" },
  { currency: "GBP", isin: "XS2466350712", securityName: "EIB 1 1/4 10/21/35",    bondType: "Reg S",  issuer: "EIB" },
];

const eibUsd: Instrument[] = [
  { currency: "USD", isin: "XS0203219473", securityName: "EIB 5 1/8 10/25/33",    bondType: "Global", issuer: "EIB" },
  { currency: "USD", isin: "XS0294928721", securityName: "EIB 5 1/2 07/15/26",    bondType: "Reg S",  issuer: "EIB" },
  { currency: "USD", isin: "XS0613624062", securityName: "EIB 2 7/8 09/22/27",    bondType: "Global", issuer: "EIB" },
  { currency: "USD", isin: "XS1087827395", securityName: "EIB 1 3/4 10/21/27",    bondType: "Global", issuer: "EIB" },
  { currency: "USD", isin: "XS1321010991", securityName: "EIB 2 1/4 09/22/30",    bondType: "Reg S",  issuer: "EIB" },
  { currency: "USD", isin: "XS1634716804", securityName: "EIB 0 3/4 02/13/28",    bondType: "Global", issuer: "EIB" },
  { currency: "USD", isin: "XS2175367839", securityName: "EIB 0.875 04/01/30",    bondType: "Reg S",  issuer: "EIB" },
  { currency: "USD", isin: "XS2453821047", securityName: "EIB 3 7/8 09/14/32",    bondType: "Global", issuer: "EIB" },
];

const kfwEur: Instrument[] = [
  { currency: "EUR", isin: "DE000A0E83A8", securityName: "KFW 2.38 09/24/30",      bondType: "Global", issuer: "KFW" },
  { currency: "EUR", isin: "DE000A0E83N1", securityName: "KFW 0 10/30/29",          bondType: "Global", issuer: "KFW" },
  { currency: "EUR", isin: "DE000A11QTF7", securityName: "KFW 0 3/8 04/23/30",     bondType: "Reg S",  issuer: "KFW" },
  { currency: "EUR", isin: "DE000A11QTI9", securityName: "KFW 2 08/06/35",          bondType: "Global", issuer: "KFW" },
  { currency: "EUR", isin: "DE000A11QTK7", securityName: "KFW 1 3/8 07/31/35",     bondType: "Reg S",  issuer: "KFW" },
  { currency: "EUR", isin: "DE000A168Y30", securityName: "KFW 0 01/29/46",          bondType: "Global", issuer: "KFW" },
  { currency: "EUR", isin: "DE000A168Y48", securityName: "KFW 1 1/4 07/04/36",     bondType: "Reg S",  issuer: "KFW" },
  { currency: "EUR", isin: "DE0002764578", securityName: "KFW 0 09/17/29",          bondType: "Global", issuer: "KFW" },
];

const kfwUsd: Instrument[] = [
  { currency: "USD", isin: "DE000A0E5CL3", securityName: "KFW 2 1/2 09/22/26",    bondType: "Global", issuer: "KFW" },
  { currency: "USD", isin: "DE000A11QST2", securityName: "KFW 0 10/07/27",         bondType: "Global", issuer: "KFW" },
  { currency: "USD", isin: "DE000A2BPDF9", securityName: "KFW 2 3/4 07/22/30",    bondType: "Global", issuer: "KFW" },
  { currency: "USD", isin: "DE000A30V7X1", securityName: "KFW 3 1/2 09/14/32",    bondType: "Global", issuer: "KFW" },
  { currency: "USD", isin: "DE000A3H3DY0", securityName: "KFW 3 7/8 09/21/27",    bondType: "Reg S",  issuer: "KFW" },
  { currency: "USD", isin: "DE000A3MQMH5", securityName: "KFW 4 10/10/28",         bondType: "Global", issuer: "KFW" },
  { currency: "USD", isin: "DE000A3MQN39", securityName: "KFW 4 1/2 02/20/34",    bondType: "Global", issuer: "KFW" },
  { currency: "USD", isin: "DE000A3MQSP4", securityName: "KFW 4 7/8 09/18/29",    bondType: "Reg S",  issuer: "KFW" },
];

const ibrdUsd: Instrument[] = [
  { currency: "USD", isin: "US45905UP306", securityName: "IBRD 3 1/4 09/15/28",   bondType: "Global", issuer: "IBRD" },
  { currency: "USD", isin: "US45905UQ478", securityName: "IBRD 2 7/8 07/15/26",   bondType: "Global", issuer: "IBRD" },
  { currency: "USD", isin: "US45905UR204", securityName: "IBRD 3 1/2 03/08/27",   bondType: "Reg S",  issuer: "IBRD" },
  { currency: "USD", isin: "US45905US038", securityName: "IBRD 4 1/8 11/22/32",   bondType: "Global", issuer: "IBRD" },
  { currency: "USD", isin: "US45905UT861", securityName: "IBRD 3 7/8 04/27/35",   bondType: "Global", issuer: "IBRD" },
  { currency: "USD", isin: "US45905UU695", securityName: "IBRD 2 1/2 07/29/31",   bondType: "Reg S",  issuer: "IBRD" },
  { currency: "USD", isin: "US45905UV427", securityName: "IBRD 1 3/4 10/28/27",   bondType: "Global", issuer: "IBRD" },
  { currency: "USD", isin: "US45905UW250", securityName: "IBRD 3 5/8 01/20/30",   bondType: "Global", issuer: "IBRD" },
  { currency: "USD", isin: "US45905UX084", securityName: "IBRD 4 09/15/33",        bondType: "Reg S",  issuer: "IBRD" },
];

const ibrdEur: Instrument[] = [
  { currency: "EUR", isin: "XS1349344666", securityName: "IBRD 0.05 01/24/28",    bondType: "Reg S",  issuer: "IBRD" },
  { currency: "EUR", isin: "XS1555414530", securityName: "IBRD 0 09/14/29",        bondType: "Global", issuer: "IBRD" },
  { currency: "EUR", isin: "XS1826842316", securityName: "IBRD 0.5 10/24/27",     bondType: "Reg S",  issuer: "IBRD" },
  { currency: "EUR", isin: "XS2015213718", securityName: "IBRD 0.25 11/21/30",    bondType: "Global", issuer: "IBRD" },
  { currency: "EUR", isin: "XS2175337550", securityName: "IBRD 0.5 10/13/28",     bondType: "Reg S",  issuer: "IBRD" },
  { currency: "EUR", isin: "XS2365421843", securityName: "IBRD 0.375 04/27/31",   bondType: "Global", issuer: "IBRD" },
  { currency: "EUR", isin: "XS2476290834", securityName: "IBRD 1.375 10/26/32",   bondType: "Reg S",  issuer: "IBRD" },
  { currency: "EUR", isin: "XS2605723184", securityName: "IBRD 3.125 10/16/28",   bondType: "Global", issuer: "IBRD" },
];

const adbUsd: Instrument[] = [
  { currency: "USD", isin: "US045167EB93", securityName: "ADB 2 3/4 09/19/25",    bondType: "Global", issuer: "ADB" },
  { currency: "USD", isin: "US045167EC76", securityName: "ADB 1 7/8 01/22/27",    bondType: "Global", issuer: "ADB" },
  { currency: "USD", isin: "US045167ED59", securityName: "ADB 0 7/8 09/16/27",    bondType: "Reg S",  issuer: "ADB" },
  { currency: "USD", isin: "US045167EF08", securityName: "ADB 1 3/4 09/19/32",    bondType: "Global", issuer: "ADB" },
  { currency: "USD", isin: "US045167EG80", securityName: "ADB 2 1/4 09/20/29",    bondType: "Global", issuer: "ADB" },
  { currency: "USD", isin: "US045167EH63", securityName: "ADB 3 1/2 09/14/33",    bondType: "Reg S",  issuer: "ADB" },
  { currency: "USD", isin: "US045167EJ20", securityName: "ADB 4 01/26/34",         bondType: "Global", issuer: "ADB" },
];

const iadbUsd: Instrument[] = [
  { currency: "USD", isin: "US4581X0CQ61", securityName: "IADB 2 1/4 01/18/27",   bondType: "Global", issuer: "IADB" },
  { currency: "USD", isin: "US4581X0CR45", securityName: "IADB 1 3/4 09/14/26",   bondType: "Global", issuer: "IADB" },
  { currency: "USD", isin: "US4581X0CS28", securityName: "IADB 3 1/4 09/16/30",   bondType: "Reg S",  issuer: "IADB" },
  { currency: "USD", isin: "US4581X0CT01", securityName: "IADB 3 7/8 10/04/32",   bondType: "Global", issuer: "IADB" },
  { currency: "USD", isin: "US4581X0CU83", securityName: "IADB 4 1/8 07/20/33",   bondType: "Reg S",  issuer: "IADB" },
  { currency: "USD", isin: "US4581X0CV66", securityName: "IADB 0 7/8 09/17/27",   bondType: "Global", issuer: "IADB" },
  { currency: "USD", isin: "US4581X0CW40", securityName: "IADB 2 09/18/28",        bondType: "Global", issuer: "IADB" },
];

const ifcUsd: Instrument[] = [
  { currency: "USD", isin: "US45950VQD02", securityName: "IFC 2 1/2 05/22/28",    bondType: "Global", issuer: "IFC" },
  { currency: "USD", isin: "US45950VQE85", securityName: "IFC 1 7/8 07/17/29",    bondType: "Reg S",  issuer: "IFC" },
  { currency: "USD", isin: "US45950VQF68", securityName: "IFC 3 1/4 11/16/31",    bondType: "Global", issuer: "IFC" },
  { currency: "USD", isin: "US45950VQG42", securityName: "IFC 4 09/19/33",         bondType: "Reg S",  issuer: "IFC" },
  { currency: "USD", isin: "US45950VQH25", securityName: "IFC 4 3/4 01/12/35",    bondType: "Global", issuer: "IFC" },
  { currency: "USD", isin: "US45950VQI08", securityName: "IFC 0 10/22/28",         bondType: "Global", issuer: "IFC" },
];

const cadesEur: Instrument[] = [
  { currency: "EUR", isin: "FR0013468059", securityName: "CADES 0.5 07/15/29",     bondType: "Reg S",  issuer: "CADES" },
  { currency: "EUR", isin: "FR0013516361", securityName: "CADES 0.375 04/25/32",   bondType: "Global", issuer: "CADES" },
  { currency: "EUR", isin: "FR0014000U72", securityName: "CADES 0.125 10/25/31",   bondType: "Reg S",  issuer: "CADES" },
  { currency: "EUR", isin: "FR0014001K46", securityName: "CADES 1.375 07/25/31",   bondType: "Global", issuer: "CADES" },
  { currency: "EUR", isin: "FR0014003NB3", securityName: "CADES 2.125 04/25/35",   bondType: "Reg S",  issuer: "CADES" },
  { currency: "EUR", isin: "FR00140085Y7", securityName: "CADES 3.25 07/25/33",    bondType: "Global", issuer: "CADES" },
];

const renbkEur: Instrument[] = [
  { currency: "EUR", isin: "DE000A0DKVZ9", securityName: "RENTEN 0.5 12/15/28",   bondType: "Global", issuer: "RENTEN" },
  { currency: "EUR", isin: "DE000A1YPXN1", securityName: "RENTEN 0.01 09/30/29",  bondType: "Reg S",  issuer: "RENTEN" },
  { currency: "EUR", isin: "DE000A2LQUG4", securityName: "RENTEN 0.75 07/03/34",  bondType: "Global", issuer: "RENTEN" },
  { currency: "EUR", isin: "DE000A30SCB1", securityName: "RENTEN 0.75 04/01/31",  bondType: "Reg S",  issuer: "RENTEN" },
  { currency: "EUR", isin: "DE000A3H3J95", securityName: "RENTEN 1.75 09/29/31",  bondType: "Global", issuer: "RENTEN" },
  { currency: "EUR", isin: "DE000A3MQP33", securityName: "RENTEN 3.75 09/07/33",  bondType: "Reg S",  issuer: "RENTEN" },
];

const nrwEur: Instrument[] = [
  { currency: "EUR", isin: "DE000NRW0AF8", securityName: "NRW 0.625 07/06/36",    bondType: "Global", issuer: "NRW" },
  { currency: "EUR", isin: "DE000NRW0AG6", securityName: "NRW 0.01 04/14/32",     bondType: "Reg S",  issuer: "NRW" },
  { currency: "EUR", isin: "DE000NRW0AH4", securityName: "NRW 1.5 11/16/29",      bondType: "Global", issuer: "NRW" },
  { currency: "EUR", isin: "DE000NRW0AJ0", securityName: "NRW 0.125 09/03/31",    bondType: "Reg S",  issuer: "NRW" },
  { currency: "EUR", isin: "DE000NRW0AK8", securityName: "NRW 2.875 01/17/34",    bondType: "Global", issuer: "NRW" },
];

const bngEur: Instrument[] = [
  { currency: "EUR", isin: "XS0196047049", securityName: "BNG 3.625 04/12/33",     bondType: "Reg S",  issuer: "BNG" },
  { currency: "EUR", isin: "XS1067046897", securityName: "BNG 1.375 06/03/29",     bondType: "Global", issuer: "BNG" },
  { currency: "EUR", isin: "XS1489547133", securityName: "BNG 0.25 10/11/27",      bondType: "Reg S",  issuer: "BNG" },
  { currency: "EUR", isin: "XS2095819618", securityName: "BNG 0.125 10/28/30",     bondType: "Global", issuer: "BNG" },
  { currency: "EUR", isin: "XS2415718299", securityName: "BNG 1.75 09/09/30",      bondType: "Reg S",  issuer: "BNG" },
];

const aiibUsd: Instrument[] = [
  { currency: "USD", isin: "US00213MAA00", securityName: "AIIB 0.5 09/28/27",      bondType: "Global", issuer: "AIIB" },
  { currency: "USD", isin: "US00213MAB82", securityName: "AIIB 1 3/4 09/29/30",   bondType: "Reg S",  issuer: "AIIB" },
  { currency: "USD", isin: "US00213MAC65", securityName: "AIIB 3 1/4 09/27/32",   bondType: "Global", issuer: "AIIB" },
  { currency: "USD", isin: "US00213MAD49", securityName: "AIIB 4 1/4 09/11/28",   bondType: "Global", issuer: "AIIB" },
  { currency: "USD", isin: "US00213MAE22", securityName: "AIIB 4 7/8 09/10/33",   bondType: "Reg S",  issuer: "AIIB" },
];

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const mockAllInstruments: Instrument[] = [
  ...eibChf, ...eibEur, ...eibGbp, ...eibUsd,
  ...kfwEur, ...kfwUsd,
  ...ibrdUsd, ...ibrdEur,
  ...adbUsd, ...iadbUsd, ...ifcUsd,
  ...cadesEur, ...renbkEur, ...nrwEur, ...bngEur,
  ...aiibUsd,
];

export const mockCompSets: CompSet[] = [
  // ── Existing sets (kept for backwards compat) ───────────────────────────
  { id: "cs-1",  name: "Juliano IBRD",          instruments: ibrdUsd },
  { id: "cs-2",  name: "SSA Comps",             instruments: [...eibChf.slice(0,4), ...kfwEur.slice(0,4), ...ibrdUsd.slice(0,4)] },
  { id: "cs-3",  name: "E2E-DCM-IBRD",          instruments: ibrdUsd.slice(0,6) },
  { id: "cs-4",  name: "EJB",                   instruments: [...eibChf.slice(0,9), ...eibEur.slice(0,8)] },

  // ── By issuer ───────────────────────────────────────────────────────────
  { id: "cs-5",  name: "EIB EUR Core",          instruments: eibEur },
  { id: "cs-6",  name: "EIB CHF Shorts",        instruments: eibChf.slice(0,7) },
  { id: "cs-7",  name: "EIB GBP",               instruments: eibGbp },
  { id: "cs-8",  name: "EIB USD Benchmark",     instruments: eibUsd },
  { id: "cs-9",  name: "KFW EUR All",           instruments: kfwEur },
  { id: "cs-10", name: "KFW USD",               instruments: kfwUsd },
  { id: "cs-11", name: "IBRD EUR",              instruments: ibrdEur },
  { id: "cs-12", name: "IBRD All CCY",          instruments: [...ibrdUsd, ...ibrdEur] },
  { id: "cs-13", name: "ADB USD",               instruments: adbUsd },
  { id: "cs-14", name: "IADB USD",              instruments: iadbUsd },
  { id: "cs-15", name: "IFC USD",               instruments: ifcUsd },
  { id: "cs-16", name: "CADES EUR",             instruments: cadesEur },
  { id: "cs-17", name: "Rentenbank EUR",        instruments: renbkEur },
  { id: "cs-18", name: "NRW EUR",               instruments: nrwEur },
  { id: "cs-19", name: "BNG EUR",               instruments: bngEur },
  { id: "cs-20", name: "AIIB USD",              instruments: aiibUsd },

  // ── By currency ─────────────────────────────────────────────────────────
  { id: "cs-21", name: "EUR Aggregate",         instruments: [...eibEur, ...kfwEur, ...ibrdEur, ...cadesEur, ...renbkEur, ...nrwEur, ...bngEur] },
  { id: "cs-22", name: "USD SSA Benchmark",     instruments: [...ibrdUsd, ...adbUsd, ...iadbUsd, ...ifcUsd, ...aiibUsd] },
  { id: "cs-23", name: "CHF SSA",               instruments: eibChf },
  { id: "cs-24", name: "GBP SSA",               instruments: eibGbp },
  { id: "cs-25", name: "Multi-CCY EIB",         instruments: [...eibChf.slice(0,4), ...eibEur.slice(0,4), ...eibGbp.slice(0,4), ...eibUsd.slice(0,4)] },

  // ── By tenor (approximate by position in array, shorter = earlier maturity) ─
  { id: "cs-26", name: "Short End EUR 1-3y",    instruments: [...eibEur.slice(1,4), ...kfwEur.slice(0,3), ...ibrdEur.slice(0,3)] },
  { id: "cs-27", name: "Belly EUR 5-7y",        instruments: [...eibEur.slice(3,7), ...kfwEur.slice(2,5), ...cadesEur.slice(0,3)] },
  { id: "cs-28", name: "Long End EUR 10y+",     instruments: [...eibEur.slice(9,15), ...kfwEur.slice(5,8), ...renbkEur.slice(3,6)] },
  { id: "cs-29", name: "Ultra Long 20y+",       instruments: [...eibEur.slice(0,1), ...eibEur.slice(7,9), ...eibGbp.slice(0,2), ...kfwEur.slice(5,6)] },
  { id: "cs-30", name: "Short USD 2-4y",        instruments: [...ibrdUsd.slice(0,3), ...adbUsd.slice(0,2), ...iadbUsd.slice(0,2), ...kfwUsd.slice(0,2)] },

  // ── DCM team ────────────────────────────────────────────────────────────
  { id: "cs-31", name: "DCM-EIB-Q1-2026",      instruments: [...eibEur.slice(0,6), ...eibChf.slice(0,5)] },
  { id: "cs-32", name: "DCM-KFW-Q1-2026",      instruments: [...kfwEur.slice(0,5), ...kfwUsd.slice(0,4)] },
  { id: "cs-33", name: "DCM-IBRD-Q2-2026",     instruments: [...ibrdUsd.slice(0,6), ...ibrdEur.slice(0,4)] },
  { id: "cs-34", name: "DCM-ADB-Q2-2026",      instruments: [...adbUsd, ...aiibUsd.slice(0,3)] },
  { id: "cs-35", name: "DCM-SSA-Q3-2026",      instruments: [...eibEur.slice(0,5), ...kfwEur.slice(0,4), ...ibrdUsd.slice(0,4), ...adbUsd.slice(0,3)] },

  // ── Syndicate ────────────────────────────────────────────────────────────
  { id: "cs-36", name: "Syndicate Desk A",      instruments: [...ibrdUsd, ...ibrdEur.slice(0,4), ...adbUsd.slice(0,4)] },
  { id: "cs-37", name: "Syndicate Desk B",      instruments: [...eibEur.slice(0,8), ...kfwEur, ...renbkEur] },
  { id: "cs-38", name: "New Issue Benchmarks",  instruments: [...eibUsd, ...kfwUsd.slice(0,5), ...ibrdUsd.slice(0,5), ...adbUsd.slice(0,4)] },

  // ── Client-specific ──────────────────────────────────────────────────────
  { id: "cs-39", name: "Client Nordea SSA",     instruments: [...eibEur.slice(0,6), ...kfwEur.slice(0,5), ...ibrdEur.slice(0,4)] },
  { id: "cs-40", name: "Client BlackRock",      instruments: [...ibrdUsd, ...adbUsd, ...iadbUsd.slice(0,5), ...ifcUsd.slice(0,4)] },
  { id: "cs-41", name: "Client PIMCO USD",      instruments: [...ibrdUsd, ...kfwUsd, ...adbUsd, ...iadbUsd.slice(0,4)] },
  { id: "cs-42", name: "Client Allianz EUR",    instruments: [...eibEur, ...kfwEur, ...ibrdEur, ...cadesEur.slice(0,4)] },
  { id: "cs-43", name: "Client Vanguard",       instruments: [...ibrdUsd.slice(0,6), ...adbUsd.slice(0,4), ...aiibUsd] },

  // ── Research / analysis ──────────────────────────────────────────────────
  { id: "cs-44", name: "RV Screen EUR",         instruments: [...eibEur.slice(0,8), ...kfwEur, ...ibrdEur.slice(0,5), ...cadesEur, ...renbkEur.slice(0,4)] },
  { id: "cs-45", name: "RV Screen USD",         instruments: [...ibrdUsd, ...kfwUsd.slice(0,5), ...adbUsd, ...iadbUsd.slice(0,5), ...ifcUsd] },
  { id: "cs-46", name: "Research Top Picks",    instruments: [...eibEur.slice(3,9), ...ibrdUsd.slice(2,7), ...adbUsd.slice(0,5), ...kfwEur.slice(2,6)] },

  // ── Thematic ─────────────────────────────────────────────────────────────
  { id: "cs-47", name: "Supranationals EUR",    instruments: [...eibEur, ...ibrdEur, ...adbUsd.slice(0,4).map(i => ({...i})), ...aiibUsd.slice(0,3)] },
  { id: "cs-48", name: "Agencies EUR",          instruments: [...kfwEur, ...cadesEur, ...renbkEur, ...nrwEur, ...bngEur] },
  { id: "cs-49", name: "Green Bond Comps",      instruments: [...eibEur.slice(0,5), ...kfwEur.slice(0,4), ...ibrdEur.slice(0,4), ...ibrdUsd.slice(0,3)] },
  { id: "cs-50", name: "Q2 2026 Review",        instruments: [...eibEur.slice(0,7), ...kfwEur.slice(0,5), ...ibrdUsd.slice(0,5), ...adbUsd.slice(0,4), ...renbkEur.slice(0,3)] },
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
