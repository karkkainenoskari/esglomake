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

const generatePdfReport = (initialData, environmentData) => {
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

  // Lopuksi lisätään päivämäärä ja tallennetaan PDF
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const dateStr = `${day}-${month}-${year}`;
  doc.save(`ESG_raportti_${dateStr}.pdf`);
};

export default generatePdfReport;
