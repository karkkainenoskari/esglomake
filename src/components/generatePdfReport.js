import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

import { 
  savoniaLogo, 
  maitoyrittajatLogo, 
  valioLogo, 
  ysaoLogo, 
  euLogo 
} from './logos.js';

// Apufunktio, joka palauttaa monivuotisten tavoitteiden tekstin,
// jos vähintään yksi kenttä (vuosi-1, vuosi-2, vuosi-3) sisältää dataa.
function getGoalsText(goal1, goal2, goal3) {
  const t1 = (goal1 || "").trim();
  const t2 = (goal2 || "").trim();
  const t3 = (goal3 || "").trim();
  if (!t1 && !t2 && !t3) {
    return "";
  }
  return `Vuosi-1: ${t1}\nVuosi-2: ${t2}\nVuosi-3: ${t3}`;
}

const generatePdfReport = (initialData, environmentData, socialData, localFinanceData, financeData) => {
  const doc = new jsPDF();

  // Lisää logot
  doc.addImage(savoniaLogo, 'PNG', 14, 10, 30, 20);
  doc.addImage(maitoyrittajatLogo, 'PNG', 50, 10, 30, 20);
  doc.addImage(valioLogo, 'PNG', 86, 10, 30, 20);
  doc.addImage(ysaoLogo, 'PNG', 122, 10, 30, 20);
  doc.addImage(euLogo, 'PNG', 158, 10, 30, 20);

  let startY = 40;

  // PDF-raportin otsikko
  doc.setFontSize(16);
  doc.text("ESG Vastuullisuusraportti", 14, startY);
  startY += 10;

  // 1. Yrityksen perustiedot
  const initialRows = [
    ["Yrityksen nimi:", initialData.yrityksenNimi || ""],
    ["Yrittäjien nimet:", initialData.yrittajienNimet || ""],
    ["Yhtiömuoto:", initialData.yhtiomuoto || ""],
    ["Tilan kokonaistyövoima (hlö):", initialData.tilanKokonaistyovoima || ""],
    ["Lypsylehmien määrä (kpl):", initialData.lypsylehmienMaara || ""],
    ["Peltoala (ha):", initialData.peltoala || ""],
    ["Luomu vai tavanomainen:", initialData.tuotomanTavanomainen || ""],
    ["Navettatyyppi:", initialData.navettatyyppi || ""],
    ["Lypsyjärjestelmä:", initialData.lypsyjarjestelma || ""],
  ];
  const filteredInitialRows = initialRows.filter(([_, value]) => value.trim() !== "");
  if (filteredInitialRows.length > 0) {
    autoTable(doc, {
      startY,
      head: [["Yrityksen perustiedot", ""]],
      body: filteredInitialRows,
      theme: 'striped',
      margin: { left: 14, right: 14 },
      styles: { fontSize: 10 },
    });
    startY = doc.lastAutoTable.finalY + 10;
  }

  // 2. Ympäristö
  const rowsEnv = [
    [
      "Maidon hiilijalanjälki, Co2/kg maitoa",
      environmentData.envMaidonHiilijalanjalki || "",
      environmentData.envMaidonHiilijalanjalkiLisatiedot || "",
    ],
    [
      "Scope 1 päästö, tCO2e, %",
      environmentData.envScope1 || "",
      environmentData.envScope1Lisatiedot || "",
    ],
    [
      "Scope 2 päästö, tCO2e, %",
      environmentData.envScope2 || "",
      environmentData.envScope2Lisatiedot || "",
    ],
    [
      "Scope 3 päästö, tCO2e, %",
      environmentData.envScope3 || "",
      environmentData.envScope3Lisatiedot || "",
    ],
    [
      "Hiiliviljelykoulutus suoritettu",
      environmentData.envHiiliviljelykoulutus || "",
      environmentData.envHiiliviljelykoulutusLisatiedot || "",
    ],
    [
      "Hiiliviljelytoimenpiteet rehuntuotannossa, ha",
      environmentData.envHiiliviljelytoimenpiteet || "",
      environmentData.envHiiliviljelytoimenpiteetLisatiedot || "",
    ],
    [
      "Keskilehmäluku, kpl",
      environmentData.envKeskilehmaluku || "",
      environmentData.envKeskilehmalukuLisatiedot || "",
    ],
    [
      "Poikimaväli, vrk",
      environmentData.envPoikimavali || "",
      environmentData.envPoikimavaliLisatiedot || "",
    ],
    [
      "Hiehopoikimaikä, kk",
      environmentData.envHiehopoikimaika || "",
      environmentData.envHiehopoikimaikaLisatiedot || "",
    ],
    [
      "Keskituotos, EKM kg/lehmä",
      environmentData.envKeskituotos || "",
      environmentData.envKeskituotosLisatiedot || "",
    ],
    [
      "Tuotosseurannan rasva%, vuoden keskiarvo",
      environmentData.envTuotosRasva || "",
      environmentData.envTuotosRasvaLisatiedot || "",
    ],
    [
      "Tuotosseurannan valkuais%, vuoden keskiarvo",
      environmentData.envTuotosValkuainen || "",
      environmentData.envTuotosValkuainenLisatiedot || "",
    ],
    [
      "Maidon ureapitoisuus, mg/100 ml",
      environmentData.envMaidonUrea || "",
      environmentData.envMaidonUreaLisatiedot || "",
    ],
    [
      "Meijerimaidon osuus, %",
      environmentData.envMeijerimaidonOsuus || "",
      environmentData.envMeijerimaidonOsuusLisatiedot || "",
    ],
    [
      "Käytössä vähäpäästöinen kylmäaine tilasäililössä",
      environmentData.envKaytossaVahapaastoinenKylmainetilasaililossa || "",
      environmentData.envKaytossaVahapaastoinenKylmainetilasaililossaLisatiedot || "",
    ],
    [
      "Karkearehun osuus lypsylehmien ruokinnassa",
      environmentData.envKarkearehunOsuus || "",
      environmentData.envKarkearehunOsuusLisatiedot || "",
    ],
    [
      "Päästöjä vähentävät lisäravinteet lypsylehmillä käytössä",
      environmentData.envPaastojaVahentavatLisaravinteet || "",
      environmentData.envPaastojaVahentavatLisaravinteetLisatiedot || "",
    ],
    [
      "Ruokinnan seurantalaskelmia tehty",
      environmentData.envRuokinnanSeurantalaskelmiaTehty || "",
      environmentData.envRuokinnanSeurantalaskelmiaTehtyLisatiedot || "",
    ],
    [
      "Kuiva-ainekiloa rehua/EKM kg",
      environmentData.envKuivaAinekiloa || "",
      environmentData.envKuivaAinekiloaLisatiedot || "",
    ],
    [
      "Typen hyväksikäyttö % ruokinnassa",
      environmentData.envTypenHyvaksykaytto || "",
      environmentData.envTypenHyvaksykayttoLisatiedot || "",
    ],
    [
      "Rehun säästöindeksin huomioiminen jalostuksessa",
      environmentData.envRehunSaastoindeksi || "",
      environmentData.envRehunSaastoindeksiLisatiedot || "",
    ],
    [
      "Ruokinnan omavaraisuusaste %",
      environmentData.envRuokinnanOmavaraisuusaste || "",
      environmentData.envRuokinnanOmavaraisuusasteLisatiedot || "",
    ],
    [
      "Kuvaus muista mahdollisista toimenpiteistä",
      environmentData.envMuutToimenpiteet || "",
      environmentData.envMuutToimenpiteetLisatiedot || "",
    ],
  ];
  // Lisää ympäristön tavoitteet, jos kentät eivät ole tyhjiä
  const envGoals = getGoalsText(
    environmentData.envTavoitteetVuosi1,
    environmentData.envTavoitteetVuosi2,
    environmentData.envTavoitteetVuosi3
  );
  if (envGoals) {
    rowsEnv.push(["Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä", "", envGoals]);
  }
  const filteredRowsEnv = rowsEnv.filter(([_, col2, col3]) => {
    return (col2 || "").trim() !== "" || (col3 || "").trim() !== "";
  });
  if (filteredRowsEnv.length > 0) {
    doc.setFontSize(14);
    doc.text("Ympäristö", 14, startY);
    startY += 10;
    autoTable(doc, {
      startY,
      head: [["Hiilijalanjälki ja tuotannon tehokkuus", "Uusin tulos", "Kuvaus"]],
      body: filteredRowsEnv,
      theme: 'striped',
      headStyles: { fillColor: '#4CAF50' },
      margin: { left: 14, right: 14 },
      styles: { fontSize: 10, cellPadding: 3, overflow: 'linebreak' },
      showHead: 'firstPage',
      columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 30 }, 2: { cellWidth: 92 } }
    });
    startY = doc.lastAutoTable.finalY + 10;
  }

  // 3. Monimuotoisuus
  const rowsMono = [
    [
      "Maatalousluonnon ja maiseman -hoitosopimus",
      environmentData.divHoitosopimus || "", 
      environmentData.divHoitosopimusLisatiedot || ""
    ],
    [
      "Monimuotoisuutta edistävä pinta-ala yhteensä, ha",
      environmentData.divPintaAla || "",
      environmentData.divPintaAlaLisatiedot || ""
    ],
    [
      "Kosteikot, ha",
      environmentData.divKosteikot || "",
      environmentData.divKosteikotLisatiedot || ""
    ],
    [
      "Biodiversiteettikartoitus tehty",
      environmentData.divBiodiversiteetti || "",
      environmentData.divBiodiversiteettiLisatiedot || ""
    ],
    [
      "Suomenkarjan eläinten kasvattaminen",
      environmentData.divSuomenkarja || "",
      environmentData.divSuomenkarjaLisatiedot || ""
    ],
    [
      "Risteytyseläinten osuus lypsylehmistä, %",
      environmentData.divRisteytys || "",
      environmentData.divRisteytysLisatiedot || ""
    ],
    [
      "Soija ja GM -vapaus ruokinnassa",
      environmentData.divSoijaGM || "",
      environmentData.divSoijaGMLisatiedot || ""
    ],
    [
      "Palmuöljyttömyys ruokinnassa",
      environmentData.divPalmu || "",
      environmentData.divPalmuLisatiedot || ""
    ],
    [
      "Kuvaus muista mahdollisista toimenpiteistä",
      environmentData.divErityisetToimenpiteet || "",
      ""
    ],
  ];
  const monoGoals = getGoalsText(
    environmentData.divTavoitteetVuosi1,
    environmentData.divTavoitteetVuosi2,
    environmentData.divTavoitteetVuosi3
  );
  if (monoGoals) {
    rowsMono.push(["Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä", "", monoGoals]);
  }
  const filteredRowsMono = rowsMono.filter(([_, col2, col3]) => {
    return (col2 || "").trim() !== "" || (col3 || "").trim() !== "";
  });
  if (filteredRowsMono.length > 0) {
    autoTable(doc, {
      startY,
      head: [["Monimuotoisuus", "Uusin tulos", "Kuvaus"]],
      body: filteredRowsMono,
      theme: 'striped',
      headStyles: { fillColor: '#4CAF50' },
      margin: { left: 14, right: 14 },
      styles: { fontSize: 10, cellPadding: 3, overflow: 'linebreak' },
      columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 30 }, 2: { cellWidth: 92 } },
      showHead: 'firstPage'
    });
    startY = doc.lastAutoTable.finalY + 10;
  }

  // 4. Peltoviljely
  const rowsPelto = [
    [
      "Viljelykasvien kokonaispinta-ala, ha",
      environmentData.envPeltoviljelyKokonaispintaAla || "",
      environmentData.envPeltoviljelyKokonaispintaAlaLisatiedot || ""
    ],
    [
      "Viljelykasvien pinta-ala suhteessa eläinmäärään, ha/ey",
      environmentData.envPeltoviljelySuhdeElainmaara || "",
      environmentData.envPeltoviljelySuhdeElainmaaraLisatiedot || ""
    ],
    [
      "Turvemaiden osuus, %",
      environmentData.envTurvemaidenOsuus || "",
      environmentData.envTurvemaidenOsuusLisatiedot || ""
    ],
    [
      "Ravinnetaselaskelma tehty",
      environmentData.envRavinnelaskelma || "",
      environmentData.envRavinnelaskelmaLisatiedot || ""
    ],
    [
      "Säilörehun D-arvo, keskimäärin",
      environmentData.envSaileRehunDArvo || "",
      environmentData.envSaileRehunDArvoLisatiedot || ""
    ],
    [
      "Nurmisato keskimäärin, kg ka/ha",
      environmentData.envNurmisato || "",
      environmentData.envNurmisatoLisatiedot || ""
    ],
    [
      "Viljasato keskimäärin, kg/ha",
      environmentData.envViljasato || "",
      environmentData.envViljasatoLisatiedot || ""
    ],
    [
      "Kuvaus rehuntuotannon toimintatavoista/strategiasta",
      environmentData.envRehuntuotantoKuvaus || "",
      environmentData.envRehuntuotantoKuvausLisatiedot || ""
    ],
    [
      "Keskimääräinen lohkoetäisyys, km",
      environmentData.envLohkoetaisyys || "",
      environmentData.envLohkoetaisyysLisatiedot || ""
    ],
    [
      "Kuvaus peltoviljelyssä käytössä olevista toimenpiteistä",
      environmentData.envPeltoviljelyToimenpiteet || "",
      environmentData.envPeltoviljelyToimenpiteetLisatiedot || ""
    ],
    [
      "Kuvaus, miten peltojen vesitaloutta ylläpidetään ja kehitetään",
      environmentData.envVesitalousKuvaus || "",
      environmentData.envVesitalousKuvausLisatiedot || ""
    ],
    [
      "Kuvaus muista mahdollisista toimenpiteistä",
      environmentData.envPeltoviljelyErityisetToimenpiteet || "",
      ""
    ],
  ];
  const peltoGoals = getGoalsText(
    environmentData.envPeltoviljelyTavoitteetVuosi1,
    environmentData.envPeltoviljelyTavoitteetVuosi2,
    environmentData.envPeltoviljelyTavoitteetVuosi3
  );
  if (peltoGoals) {
    rowsPelto.push(["Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä", "", peltoGoals]);
  }
  const filteredRowsPelto = rowsPelto.filter(([_, col2, col3]) => {
    return (col2 || "").trim() !== "" || (col3 || "").trim() !== "";
  });
  if (filteredRowsPelto.length > 0) {
    autoTable(doc, {
      startY,
      head: [["Peltoviljely", "Uusin tulos", "Kuvaus"]],
      body: filteredRowsPelto,
      theme: 'striped',
      headStyles: { fillColor: '#4CAF50' },
      margin: { left: 14, right: 14 },
      styles: { fontSize: 10, cellPadding: 3, overflow: 'linebreak' },
      columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 30 }, 2: { cellWidth: 92 } },
      showHead: 'firstPage'
    });
    startY = doc.lastAutoTable.finalY + 10;
  }

  // 5. Lannan käsittely ja jätehuolto
  const rowsLanta = [
    [
      "Viimeisin ympäristölupa, pvm",
      environmentData.lantaYmparistolupa || "",
      environmentData.lantaYmparistolupaLisatiedot || ""
    ],
    [
      "Lietelannan osuus, %",
      environmentData.lantaLietelannanOsuus || "",
      environmentData.lantaLietelannanOsuusLisatiedot || ""
    ],
    [
      "Lannan levitysmenetelmä",
      environmentData.lantaLevitysmenetelma || "",
      environmentData.lantaLevitysmenetelmaLisatiedot || ""
    ],
    [
      "Pääasiallinen kuivikemateriaali",
      environmentData.lantaKuivikemateriaali || "",
      environmentData.lantaKuivikemateriaaliLisatiedot || ""
    ],
    [
      "Kuvaus jätemuovien varastoinnista ja hävittämisestä",
      environmentData.lantaJatemuovit || "",
      environmentData.lantaJatemuovitLisatiedot || ""
    ],
    [
      "Kuvaus vaarallisten aineiden ja kemikaalien varastoinnista ja hävittämisestä",
      environmentData.lantaVaarallisetAineet || "",
      environmentData.lantaVaarallisetAineetLisatiedot || ""
    ],
    [
      "Kuvaus jäteöljyn varastoinnista ja hävittämisestä",
      environmentData.lantaJateoljy || "",
      environmentData.lantaJateoljyLisatiedot || ""
    ],
    [
      "Kuvaus puristenesteiden käsittelytavasta",
      environmentData.lantaPuristeneste || "",
      environmentData.lantaPuristenesteLisatiedot || ""
    ],
    [
      "Kuvaus muista mahdollisista toimenpiteistä",
      environmentData.lantaMuutToimenpiteet || "",
      ""
    ],
  ];
  const lantaGoals = getGoalsText(
    environmentData.lantaTavoitteetVuosi1,
    environmentData.lantaTavoitteetVuosi2,
    environmentData.lantaTavoitteetVuosi3
  );
  if (lantaGoals) {
    rowsLanta.push(["Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä", "", lantaGoals]);
  }
  const filteredRowsLanta = rowsLanta.filter(([_, col2, col3]) => {
    return (col2 || "").trim() !== "" || (col3 || "").trim() !== "";
  });
  if (filteredRowsLanta.length > 0) {
    autoTable(doc, {
      startY,
      head: [["Lannan käsittely ja jätehuolto", "Uusin tulos", "Kuvaus"]],
      body: filteredRowsLanta,
      theme: 'striped',
      headStyles: { fillColor: '#4CAF50' },
      margin: { left: 14, right: 14 },
      styles: { fontSize: 10, cellPadding: 3, overflow: 'linebreak' },
      columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 30 }, 2: { cellWidth: 92 } },
      showHead: 'firstPage'
    });
    startY = doc.lastAutoTable.finalY + 10;
  }

  // 6. Energian käyttö
  const rowsEnergy = [
    [
      "Sähkön käyttömäärä, kWh/v",
      environmentData.energySahkonKayttomaara || "",
      environmentData.energySahkonKayttomaaraLisatiedot || "",
    ],
    [
      "Sähkön käyttömäärä suhteessa tuotantoon, kWh/kg maitoa/v",
      environmentData.energySahkonKayttomaaraSuhteessa || "",
      environmentData.energySahkonKayttomaaraSuhteessaLisatiedot || "",
    ],
    [
      "Oman sähkön tuotanto, kWh/v",
      environmentData.energyOmaSahkotuotanto || "",
      environmentData.energyOmaSahkotuotantoLisatiedot || "",
    ],
    [
      "Polttoaineiden kokonaiskäyttömäärä, l/v",
      environmentData.energyPolttoaineenKaytto || "",
      environmentData.energyPolttoaineenKayttoLisatiedot || "",
    ],
    [
      "Polttoaineiden käyttömäärä suhteessa tuotantoon, l/kg maitoa",
      environmentData.energyPolttoaineenKayttoSuhteessa || "",
      environmentData.energyPolttoaineenKayttoSuhteessaLisatiedot || "",
    ],
    [
      "Lanta käsitellään biokaasulaitoksessa",
      environmentData.energyBiokaasu || "",
      environmentData.energyBiokaasuLisatiedot || "",
    ],
    [
      "Maidon esijäähdytys",
      environmentData.energyEsijahdytys || "",
      environmentData.energyEsijahdytysLisatiedot || "",
    ],
    [
      "Lämmön talteenotto",
      environmentData.energyLampotalteenotto || "",
      environmentData.energyLampotalteenottoLisatiedot || "",
    ],
    [
      "Kuvaus muista mahdollisista toimenpiteistä",
      environmentData.energyErityisetToimenpiteet || "",
      ""
    ],
  ];
  const energyGoals = getGoalsText(
    environmentData.energyTavoitteetVuosi1,
    environmentData.energyTavoitteetVuosi2,
    environmentData.energyTavoitteetVuosi3
  );
  if (energyGoals) {
    rowsEnergy.push(["Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä", "", energyGoals]);
  }
  const filteredRowsEnergy = rowsEnergy.filter(([_, col2, col3]) => {
    return (col2 || "").trim() !== "" || (col3 || "").trim() !== "";
  });
  if (filteredRowsEnergy.length > 0) {
    autoTable(doc, {
      startY,
      head: [["Energian käyttö", "Uusin tulos", "Kuvaus"]],
      body: filteredRowsEnergy,
      theme: 'striped',
      margin: { left: 14, right: 14 },
      headStyles: { fillColor: '#4CAF50' },
      styles: { fontSize: 10, cellPadding: 3, overflow: 'linebreak' },
      columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 30 }, 2: { cellWidth: 92 } },
      showHead: 'firstPage'
    });
    startY = doc.lastAutoTable.finalY + 10;
  }

// 3. Sosiaalinen vastuu: Henkilöstö ja työolosuhteet
const rowsSocial = [
  // Ensimmäinen osa: peruskentät
  [
    "Kirjallinen henkilöstöstrategia tehty",
    socialData.henkilostoStrategia || "",
    socialData.henkilostoStrategiaLisatiedot || ""
  ],
  [
    "Kuvaus henkilöstöstrategian sisällöstä",
    socialData.HenkilostoStrategiaSisalto || "",
    socialData.HenkilostoStrategiaSisaltoLisatiedot || ""
  ],
  [
    "Työn tuottavuus, maitokg/navettatyöt h",
    socialData.tyotuottavuus || "",
    socialData.tyotuottavuusLisatiedot || ""
  ],
  [
    "Tasa-arvon huomiointi",
    socialData.tasaArvo || "",
    socialData.tasaArvoLisatiedot || ""
  ],
  [
    "Kuvaus töitä helpottavista ja keventävistä ratkaisuista",
    socialData.tyotaHelpottavatRatkaisut || "",
    socialData.tyotaHelpottavatRatkaisutLisatiedot || ""
  ],

  ["Yrittäjiin liittyvää", "", ""],
  [
    "Oman osaamisen kehittäminen ja lisäkouluttautuminen, pv/v",
    socialData.osaamisenKehittaminen || "",
    socialData.osaamisenKehittaminenLisatiedot || ""
  ],
  [
    "Oma työterveyshuolto",
    socialData.tyoterveyshuolto || "",
    socialData.tyoterveyshuoltoLisatiedot || ""
  ],
  [
    "Kuvaus oman hyvinvoinnin ja jaksamisen ylläpidosta",
    socialData.jaksaminen || "",
    socialData.jaksaminenLisatiedot || ""
  ],
  [
    "Mahdollisuus säännöllisiin vapaapäiviin",
    socialData.vapaapäivat || "",
    socialData.vapaapäivatLisatiedot || ""
  ],
  [
    "Vuosilomien pitäminen suunnitellusti",
    socialData.vuosilomat || "",
    socialData.vuosilomatLisatiedot || ""
  ],
 
  [
    "Työajan mittaaminen",
    socialData.tyoajanMittaaminen || "",
    socialData.tyoajanMittaaminenLisatiedot || ""
  ],
  // Ryhmittely: Työntekijöihin liittyvää
  ["Työntekijöihin liittyvää", "", ""],
  [
    "Kuvaus työntekijöiden palkkauksesta",
    socialData.palkkaus || "",
    socialData.palkkausLisatiedot || ""
  ],
  [
    "Työterveyshuolto",
    socialData.tyoterveyshuolto || "",
    socialData.tyoterveyshuolto2Lisatiedot || ""
  ],
  [
    "Sairauspoissaolot, pv/v",
    socialData.sairauspoissaolot || "",
    socialData.sairauspoissaolotLisatiedot || ""
  ],
  [
    "Hoitota vaativia tapaturmia keskimäärin, kpl/v",
    socialData.hoitotaVaativiaTapaturmia || "",
    socialData.hoitotaVaativiaTapaturmiaLisatiedot || ""
  ],
  [
    "Osaamisen kehittäminen ja lisäkouluttautuminen, pv/v",
    socialData.osaamisenKehittaminenJaLisakouluttautuminen || "",
    socialData.osaamisenKehittaminenJaLisakouluttautuminenLisatiedot || ""
  ],
  [
    "Kuvaus yrityksen tyhy -toiminnasta",
    socialData.tyhy || "",
    socialData.tyhyLisatiedot || ""
  ],
  [
    "Säännölliset kehityskeskuskustelut",
    socialData.kehityskeskustelut || "",
    socialData.kehityskeskustelutLisatiedot || ""
  ],
  [
    "Kuvaus säännöllisistä palaverikäytännöistä",
    socialData.palaverit || "",
    socialData.palaveritLisatiedot || ""
  ],
  [
    "Työsuhteiden kesto keskimäärin, työvuosia/hlö",
    socialData.tyosuhteidenKesto || "",
    socialData.tyosuhteidenKestoLisatiedot || ""
  ],
  [
    "Työtyytyväisyyden mittaaminen käytössä",
    socialData.tyotyotyot || "",
    socialData.tyotyotyotLisatiedot || ""
  ],
  [
    "Kuvaus muista mahdollisista toimenpiteistä",
    socialData.muutErityiset || "",
    ""
  ],
];

// Henkilöstö ja työolosuhteet: yhdistetään kolmen vuoden tavoitteet
const henkiloTavoitteet = getGoalsText(
  socialData.henkilostoTavoitteetVuosi1,
  socialData.henkilostoTavoitteetVuosi2,
  socialData.henkilostoTavoitteetVuosi3
);
if (henkiloTavoitteet) {
  rowsSocial.push(["Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä", "", henkiloTavoitteet]);
}

// Suodatetaan rivit, joista ainakin toinen kentistä ei ole tyhjä
// Oletetaan että rivisi on [otsikko, col2, col3]
const filteredRowsSocial = rowsSocial.filter(([_, col2, col3]) => {
  return (col2 || "").trim() !== "" || (col3 || "").trim() !== "";
});

if (filteredRowsSocial.length > 0) {
  doc.setFontSize(14);
doc.text("Sosiaalinen vastuu", 14, startY);
startY += 10;

  autoTable(doc, {
    
    startY,
    head: [["Henkilöstö ja työolosuhteet", "Uusin tulos", "Kuvaus"]],
    body: filteredRowsSocial,
    theme: 'striped',
    headStyles: { fillColor: '#FFA500' },
    margin: { left: 14, right: 14 },
    styles: { fontSize: 10, cellPadding: 3, overflow: 'linebreak' },
    showHead: 'firstPage',
    columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 30 }, 2: { cellWidth: 92 } }
  });
  startY = doc.lastAutoTable.finalY + 10;
}

// 4. Yhteistyö ja avoimuus
const rowsCoop = [
  [
    "Kuvaa yhteistyötä muiden yrittäjien kanssa",
    socialData.yhteistyoMuidenYrittajien || "",
    socialData.yhteistyoMuidenYrittajienLisatiedot || ""
  ],
  [
    "Kuvaus yhteistyöstä kyläyhteisön kanssa",
    socialData.yhteistyoKylayhteisyo || "",
    socialData.yhteistyoKylayhteisyoLisatiedot || ""
  ],
  [
    "Kuvaus merkittävimmistä yhteistyökumppaneista",
    socialData.yhteistyoMerkittavat || "",
    socialData.yhteistyoMerkittavatLisatiedot || ""
  ],
  [
    "Kuvaus yrittäjien luottamustoimista",
    socialData.yhteistyoLuottamustoimet || "",
    socialData.yhteistyoLuottamustoimetLisatiedot || ""
  ],
  [
    "Kuvaus yrityksen avoimuudesta ja imagon kehittämisestä",
    socialData.avoimuusImago || "",
    socialData.avoimuusImagoLisatiedot || ""
  ],
  [
    "Kuvaus muista mahdollisista toimenpiteistä",
    socialData.yhteistyoErityiset || "",
    ""
  ],
];

// Yhteistyö ja avoimuus: yhdistetään kolmen vuoden tavoitteet
const coopTavoitteet = getGoalsText(
  socialData.yhteistyoErityisetVuosi1,
  socialData.yhteistyoErityisetVuosi2,
  socialData.yhteistyoErityisetVuosi3
);
if (coopTavoitteet) {
  rowsCoop.push(["Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä", "", coopTavoitteet]);
}

// Oletetaan että rivisi on [otsikko, col2, col3]
const filteredRowsCoop = rowsCoop.filter(([_, col2, col3]) => {
  return (col2 || "").trim() !== "" || (col3 || "").trim() !== "";
});

if (filteredRowsCoop.length > 0) {
  autoTable(doc, {
    startY,
    head: [["Yhteistyö ja avoimuus", "Uusin tulos", "Kuvaus"]],
    body: filteredRowsCoop,
    theme: 'striped',
    headStyles: { fillColor: '#FFA500' },
    margin: { left: 14, right: 14 },
    styles: { fontSize: 10, cellPadding: 3, overflow: 'linebreak' },
    showHead: 'firstPage',
    columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 30 }, 2: { cellWidth: 92 } }
  });
  startY = doc.lastAutoTable.finalY + 10;
}

// 7. Eläinten hyvinvointi
const rowsAnimalWelfare = [
  [
    "Nautojen terveydenhuoltorekisteri Naseva käytössä",
    socialData.nautojenTerveydenhuoltorekisteri || "",
    socialData.nautojenTerveydenhuoltorekisteriLisatiedot || ""
  ],
  [
    "Sorkkaterveyden seuranta ja hoito säännöllisesti, kyllä/ei",
    socialData.sorkkaterveys || "",
    socialData.sorkkaterveysLisatiedot || ""
  ],
  [
    "Lehmien poisto %",
    socialData.lehmienpoisto || "",
    socialData.lehminepoistoLisatiedot || ""
  ],
  [
    "Vasikkakuolleisuus %",
    socialData.vasikkakuolleisuus || "",
    socialData.vasikkakuolleisuusLisatiedot || ""
  ],
  [
    "Lehmien keskipoikimakerta",
    socialData.lehmienKeskipoikimakerta || "",
    socialData.lehmienKeskipoikimakertaLisatiedot || ""
  ],
  [
    "Poistettujen lehmien elinikäistuotos, kg",
    socialData.poistettujenLehmienElinikaiTuotos || "",
    socialData.poistettujenLehmienElinikaiTuotosLisatiedot || ""
  ],
  [
    "Poistettujen lehmien EKM kg/elinpäivä",
    socialData.ekmPerElinpiva || "",
    socialData.ekmPerElinpivaLisatiedot || ""
  ],
  [
    "Laiduntaminen käytössä",
    socialData.laiduntaminen || "",
    socialData.laiduntaminenLisatiedot || ""
  ],
  [
    "Jaloittelu käytössä",
    socialData.jaloittelu || "",
    socialData.jaloitteluLisatiedot || ""
  ],
  [
    "Ympärivuotinen jaloittelu käytössä",
    socialData.ymparivuotinenJaloittelu || "",
    socialData.ymparivuotinenJaloitteluLisatiedot || ""
  ],
  [
    "Kuvaus lehmien makuupaikasta",
    socialData.lehmienMakuupaikka || "",
    socialData.lehmienMakuupaikkaLisatiedot || ""
  ],
  [
    "Viilennys lypsynavetassa",
    socialData.viilennys || "",
    socialData.viilennysLisatiedot || ""
  ],
  [
    "Lehmillä käytävämatot",
    socialData.lehmillaKaytavat || "",
    socialData.lehmillaKaytavatLisatiedot || ""
  ],
  [
    "Pidennetty vierihoito tai imettäjälehmät käytäntönä",
    socialData.vierihoito || "",
    socialData.vierihoitoLisatiedot || ""
  ],
  [
    "WellFare Quality -koulutus ja sertifiointi suoritettu",
    socialData.wellfareQuality || "",
    socialData.wellfareQualityLisatiedot || ""
  ],
  [
    "ELVI -merkki -status voimassa",
    socialData.elviStatus || "",
    socialData.elviStatusLisatiedot || ""
  ],
  [
    "Kuvaus muista mahdollisista toimenpiteistä",
    socialData.erityisetToimenpiteet || "",
    ""
  ],
  
];

const animalWelfareGoals = getGoalsText(
  socialData.animalTavoitteetVuosi1,
  socialData.animalTavoitteetVuosi2,
  socialData.animalTavoitteetVuosi3
);
if (animalWelfareGoals) {
  // Lisätään uusi rivi, jossa yhdistetään kolmen vuoden tavoitteet
  rowsAnimalWelfare.push([
    "Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä",
    "",
    animalWelfareGoals
  ]);
}


// Oletetaan että rivisi on [otsikko, col2, col3]
const filteredRowsAnimalWelfare = rowsAnimalWelfare.filter(([_, col2, col3]) => {
  return (col2 || "").trim() !== "" || (col3 || "").trim() !== "";
});


if (filteredRowsAnimalWelfare.length > 0) {
  autoTable(doc, {
    startY,
    head: [["Eläinten hyvinvointi", "Uusin tulos", "Kuvaus"]],
    body: filteredRowsAnimalWelfare,
    theme: 'striped',
    headStyles: { fillColor: '#FFA500' },
    margin: { left: 14, right: 14 },
    styles: { fontSize: 10, cellPadding: 3, overflow: 'linebreak' },
    showHead: 'firstPage',
    columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 30 }, 2: { cellWidth: 92 } }
  });
  startY = doc.lastAutoTable.finalY + 10;
}

// 4. Tuotteen laatu
const rowsQuality = [
  [
    "Sähköinen lääkekirjanpito käytössä",
    socialData.laakekirjanpito || "",
    socialData.laakekirjanpitoLisatiedot || ""
  ],
  [
    "Tankkimaidon testaaminen antibioottihoitojen yhteydessä",
    socialData.tankkimaidonTestaus || "",
    socialData.tankkimaidonTestausLisatiedot || ""
  ],
  [
    "Montako vuotta tuotettu E-luokan maitoa",
    socialData.eLuokanOsuus || "",
    socialData.eLuokanOsuusLisatiedot || ""
  ],
  [
    "Maidon solupitoisuus",
    socialData.maidonSolupitoisuus || "",
    socialData.maidonSolupitoisuusLisatiedot || ""
  ],
  [
    "Kuvaus muista mahdollisista toimenpiteistä",
    socialData.maitoErityisetToimenpiteet || "",
    ""
  ],
];

// Tuotteen laatu: yhdistetään kolmen vuoden tavoitteet
const qualityTavoitteet = getGoalsText(
  socialData.maitoErityisetToimenpiteetVuosi1,
  socialData.maitoErityisetToimenpiteetVuosi2,
  socialData.maitoErityisetToimenpiteetVuosi3
);
if (qualityTavoitteet) {
  rowsQuality.push(["Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä", "", qualityTavoitteet]);
}


// Oletetaan että rivisi on [otsikko, col2, col3]
const filteredRowsQuality = rowsQuality.filter(([_, col2, col3]) => {
  return (col2 || "").trim() !== "" || (col3 || "").trim() !== "";
});


if (filteredRowsQuality.length > 0) {
  autoTable(doc, {
    startY,
    head: [["Tuotteen laatu", "Uusin tulos", "Kuvaus"]],
    body: filteredRowsQuality,
    theme: 'striped',
    headStyles: { fillColor: '#FFA500' },
    margin: { left: 14, right: 14 },
    styles: { fontSize: 10, cellPadding: 3, overflow: 'linebreak' },
    showHead: 'firstPage',
    columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 30 }, 2: { cellWidth: 92 } }
  });
  startY = doc.lastAutoTable.finalY + 10;
}
  
// 1. Johtaminen - taulukko (talous ja hallinto -osio)
const rowsJohtaminen = [
  [
    "Yrityksen arvot on määritetty",
    localFinanceData.yrityksenArvot || "",
    localFinanceData.yrityksenArvotLisatiedot || ""
  ],
  [
    "Visio on määritetty",
    localFinanceData.visioMaare || "",
    localFinanceData.visioMaareLisatiedot || ""
  ],
  [
    "Strategia on laadittu ja sitä päivitetään",
    localFinanceData.strategiaLaadittu || "",
    localFinanceData.strategiaLaadittuLisatiedot || ""
  ],
  [
    "Liiketoimintasuunnitelma ja/tai investointisuunnitelma on tehty",
    localFinanceData.liiketoimintasuunnitelma || "",
    localFinanceData.liiketoimintasuunnitelmaLisatiedot || ""
  ],
  [
    "Organisaatio, omistajat ja vastuualueet on kuvattu",
    localFinanceData.organisaatioKuvattu || "",
    localFinanceData.organisaatioKuvattuLisatiedot || ""
  ],
  [
    "Kuvaus asiantuntijapalveluiden hyödyntämisestä",
    localFinanceData.johtaminenAsiantuntijat || "",
    localFinanceData.johtaminenAsiantuntijatLisatiedot || ""
  ],
  [
    "Kuvaus vertailutiedon hyödyntämisestä",
    localFinanceData.johtaminenVertailutieto || "",
    localFinanceData.johtaminenVertailutietoLisatiedot || ""
  ],
  [
    "Kuvaus muista mahdollisista toimenpiteistä",
    localFinanceData.johtaminenErityisetToimenpiteet || "",
    ""
  ]
];

// Yhdistetään johtamisen tavoitteet vuositason kentistä
const johtaminenTavoitteet = getGoalsText(
  localFinanceData.johtaminenErityisetToimenpiteetVuosi1,
  localFinanceData.johtaminenErityisetToimenpiteetVuosi2,
  localFinanceData.johtaminenErityisetToimenpiteetVuosi3
);
if (johtaminenTavoitteet) {
  rowsJohtaminen.push([
    "Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä",
    "",
    johtaminenTavoitteet
  ]);
}

// Suodatetaan vain ne rivit, joissa toisen tai kolmannen solun sisältö ei ole tyhjä
const filteredRowsJohtaminen = rowsJohtaminen.filter(([_, col2, col3]) => {
  return (col2 || "").trim() !== "" || (col3 || "").trim() !== "";
});

// Jos rivejä löytyy, lisätään taulukko PDF:ään
if (filteredRowsJohtaminen.length > 0) {
  autoTable(doc, {
    startY,
    head: [["Johtaminen", "Uusin tulos", "Kuvaus"]],
    body: filteredRowsJohtaminen,
    theme: 'striped',
    headStyles: { fillColor: '#0345fa' },
    margin: { left: 14, right: 14 },
    styles: { fontSize: 10, cellPadding: 3, overflow: 'linebreak' },
    showHead: 'firstPage',
    columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 30 }, 2: { cellWidth: 92 } }
  });
  startY = doc.lastAutoTable.finalY + 10;
}

// Kilpailukyky ja talous -taulukko
const rowsKilpailukykyTalous = [
  [
    "Toiminnan tavoitteet ja mittarit on määritetty",
    localFinanceData.toiminnanMittarit || "",
    localFinanceData.toiminnanMittaritLisatiedot || ""
  ],
  [
    "Velan määrä suhteessa liikevaihtoon, %",
    localFinanceData.velkaLiikevaihto || "",
    localFinanceData.velkaLiikevaihtoLisatiedot || ""
  ],
  [
    "Velan määrä suhteessa käyttökatteeseen, %",
    localFinanceData.velkaKayttokate || "",
    localFinanceData.velkaKayttokateLisatiedot || ""
  ],
  [
    "Koko tilan tulos- tai kannattavuuslaskelman teko säännöllisesti",
    localFinanceData.kannattavuusLaskenta || "",
    localFinanceData.kannattavuusLaskentaLisatiedot || ""
  ],
  [
    "Yrittäjän voitto, snt/maito kg",
    localFinanceData.yrittajanVoitto || "",
    localFinanceData.yrittajanVoittoLisatiedot || ""
  ],
  [
    "Tuotantokustannuslaskelman teko säännöllisesti",
    localFinanceData.tuotantokustannusLaskenta || "",
    localFinanceData.tuotantokustannusLaskentaLisatiedot || ""
  ],
  [
    "Maidon tuotantokustannus, snt/maitokg",
    localFinanceData.maidonTuotantokustannus || "",
    localFinanceData.maidonTuotantokustannusLisatiedot || ""
  ],
  [
    "Kuvaus maksuvalmiuden ylläpidosta",
    localFinanceData.maksuvalmiusKuvaus || "",
    localFinanceData.maksuvalmiusKuvausLisatiedot || ""
  ],
  [
    "Kuvaus budjetointikäytännöistä",
    localFinanceData.budjetointiKuvaus || "",
    localFinanceData.budjetointiKuvausLisatiedot || ""
  ]
];

// Suodatetaan ne rivit, joissa joko toinen tai kolmas solu sisältää dataa
const filteredRowsKilpailukykyTalous = rowsKilpailukykyTalous.filter(([_, col2, col3]) => {
  return (col2 || "").trim() !== "" || (col3 || "").trim() !== "";
});

// Jos rivejä löytyy, tulostetaan taulukko PDF:ään
if (filteredRowsKilpailukykyTalous.length > 0) {
  autoTable(doc, {
    startY,
    head: [["Kilpailukyky ja talous", "Uusin tulos", "Kuvaus"]],
    body: filteredRowsKilpailukykyTalous,
    theme: 'striped',
    headStyles: { fillColor: '#0345fa' },
    margin: { left: 14, right: 14 },
    styles: { fontSize: 10, cellPadding: 3, overflow: 'linebreak' },
    columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 30 }, 2: { cellWidth: 92 } },
    showHead: 'firstPage'
  });
  startY = doc.lastAutoTable.finalY + 10;
}

  // Lopuksi lisätään päivämäärä ja tallennetaan PDF
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const dateStr = `${day}-${month}-${year}`;
  doc.save(`ESG_raportti_${dateStr}.pdf`);
};

export default generatePdfReport;
