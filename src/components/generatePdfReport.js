import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

import {
  savoniaLogo,
  maitoyrittajatLogo,
  ysaoLogo,
  euLogo
} from './logos.js';

function getGoalsText(goal1, goal2, goal3) {
  const t1 = (goal1 || "").trim();
  const t2 = (goal2 || "").trim();
  const t3 = (goal3 || "").trim();
  if (!t1 && !t2 && !t3) return "";

  return `Vuosi 1:
${t1}

Vuosi 2:
${t2}

Vuosi 3:
${t3}`;
}



const generatePdfReport = (initialData, environmentData, socialData, localFinanceData, financeData) => {
  const doc = new jsPDF();

  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const dateStr = `${dd}-${mm}-${yyyy}`;


  doc.addImage(savoniaLogo, 'PNG', 20, 12, 30, 15);
  doc.addImage(maitoyrittajatLogo, 'PNG', 73, 10, 22, 18);
  doc.addImage(ysaoLogo, 'PNG', 115, 12, 30, 12);
  doc.addImage(euLogo, 'PNG', 170, 10, 20, 19);

  let startY = 40;
  doc.setFontSize(18);
  doc.text("ESG Vastuullisuusraportti", 14, startY);
  startY += 8;
  
  // päivämäärä vasempaan reunaan
  doc.setFontSize(11);
  doc.text(dateStr, 14, startY);
  startY += 12;

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

  const envGoals = getGoalsText(
    environmentData.envTavoitteetVuosi1,
    environmentData.envTavoitteetVuosi2,
    environmentData.envTavoitteetVuosi3
  );
  if (envGoals) {
    rowsEnv.push(["Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä", "", envGoals]);
  }
  const filteredRowsEnv = rowsEnv.filter(([_, col2, col3]) =>
    (col2 || "").trim() !== "" || (col3 || "").trim() !== ""
  );

  const bodyEnv = filteredRowsEnv.map(([label, col2, col3]) => {
    if (label === "Kuvaus muista mahdollisista toimenpiteistä") {

      return [
        { content: label, styles: { cellWidth: 60, overflow: 'linebreak', valign: 'top', cellPadding: 3 } },
        { content: col2, colSpan: 2, styles: { overflow: 'linebreak', valign: 'top', cellPadding: 3 } }
      ];
    }

    if (label === "Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä") {
      return [
        { content: label, styles:
           { cellWidth: 60, overflow: 'linebreak', valign: 'top',fontStyle: 'bold', cellPadding: { top: 10, right: 3, bottom: 3, left: 3  }}},
        { content: col3, colSpan: 2, styles: { overflow: 'linebreak', valign: 'top',cellPadding: { top: 10, right: 3, bottom: 3, left: 3 } }}
      ];
    }
    return [label, col2, col3];
  });

  if (bodyEnv.length > 0) {
    doc.setFontSize(14);
    doc.text("Ympäristö", 16, startY);
    startY += 10;

    autoTable(doc, {
      startY,
      head: [["Hiilijalanjälki ja tuotannon tehokkuus", "Uusin tulos", "Kuvaus"]],
      body: bodyEnv,
      theme: 'striped',
      headStyles: { fillColor: '#4CAF50' },
      margin: { left: 14, right: 14 },
      styles: {
        fontSize: 10,
        cellPadding: 3,
        overflow: 'linebreak',
        valign: 'top'
      },
      showHead: 'firstPage',
      columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 30 },
        2: { cellWidth: 92 }
      }
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
    rowsMono.push([
      "Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä",
      "",
      monoGoals
    ]);
  }

  const filteredRowsMono = rowsMono.filter(([_, col2, col3]) =>
    (col2 || "").trim() !== "" || (col3 || "").trim() !== ""
  );

  const bodyMono = filteredRowsMono.map(([label, col2, col3]) => {
    if (label === "Kuvaus muista mahdollisista toimenpiteistä") {
      return [
        { content: label, styles: { cellWidth: 60, overflow: 'linebreak', valign: 'top', cellPadding: 3 } },
        { content: col2, colSpan: 2, styles: { overflow: 'linebreak', valign: 'top', cellPadding: 3 } }
      ];
    }

    if (label === "Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä") {
      return [
        { content: label, styles: { cellWidth: 60, overflow: 'linebreak', valign: 'top', fontStyle: 'bold', cellPadding: { top: 10, right: 3, bottom: 3, left: 3  }} },
        { content: col3, colSpan: 2, styles: { overflow: 'linebreak', valign: 'top', cellPadding: { top: 10, right: 3, bottom: 3, left: 3  }} }
      ];
    }
    return [label, col2, col3];
  });

  if (bodyMono.length > 0) {
    autoTable(doc, {
      startY,
      head: [["Monimuotoisuus", "Uusin tulos", "Kuvaus"]],
      body: bodyMono,
      theme: 'striped',
      headStyles: { fillColor: '#4CAF50' },
      margin: { left: 14, right: 14 },
      styles: {
        fontSize: 10,
        cellPadding: 3,
        overflow: 'linebreak',
        valign: 'top'
      },
      showHead: 'firstPage',
      columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 30 },
        2: { cellWidth: 92 }
      }
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
    rowsPelto.push([
      "Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä",
      "",
      peltoGoals
    ]);
  }

  const filteredRowsPelto = rowsPelto.filter(([_, col2, col3]) =>
    (col2 || "").trim() !== "" || (col3 || "").trim() !== ""
  );

  const bodyPelto = filteredRowsPelto.map(([label, col2, col3]) => {
    if (label === "Kuvaus muista mahdollisista toimenpiteistä") {
      return [
        { content: label, styles: { cellWidth: 60, overflow: 'linebreak', valign: 'top', cellPadding: 3 } },
        { content: col2, colSpan: 2, styles: { overflow: 'linebreak', valign: 'top', cellPadding: 3 } }
      ];
    }

    if (label === "Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä") {
      return [
        { content: label, styles: { cellWidth: 60, overflow: 'linebreak', valign: 'top',fontStyle: 'bold', cellPadding: { top: 10, right: 3, bottom: 3, left: 3  }} },
        { content: col3, colSpan: 2, styles: { overflow: 'linebreak', valign: 'top', cellPadding: { top: 10, right: 3, bottom: 3, left: 3  }} }
      ];
    }
    return [label, col2, col3];
  });

  if (bodyPelto.length > 0) {
    autoTable(doc, {
      startY,
      head: [["Peltoviljely", "Uusin tulos", "Kuvaus"]],
      body: bodyPelto,
      theme: 'striped',
      headStyles: { fillColor: '#4CAF50' },
      margin: { left: 14, right: 14 },
      styles: { fontSize: 10, cellPadding: 3, overflow: 'linebreak', valign: 'top' },
      showHead: 'firstPage',
      columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 30 }, 2: { cellWidth: 92 } }
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
    rowsLanta.push([
      "Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä",
      "",
      lantaGoals
    ]);
  }

  const filteredRowsLanta = rowsLanta.filter(([_, col2, col3]) =>
    (col2 || "").trim() !== "" || (col3 || "").trim() !== ""
  );

  const bodyLanta = filteredRowsLanta.map(([label, col2, col3]) => {
    if (label === "Kuvaus muista mahdollisista toimenpiteistä") {
      return [
        { content: label, styles: { cellWidth: 60, overflow: 'linebreak', valign: 'top', cellPadding: 3 } },
        { content: col2, colSpan: 2, styles: { overflow: 'linebreak', valign: 'top', cellPadding: 3 } }
      ];
    }

    if (label === "Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä") {
      return [
        { content: label, styles: { cellWidth: 60, overflow: 'linebreak', valign: 'top',fontStyle: 'bold', cellPadding: { top: 10, right: 3, bottom: 3, left: 3  }} },
        { content: col3, colSpan: 2, styles: { overflow: 'linebreak', valign: 'top', cellPadding: { top: 10, right: 3, bottom: 3, left: 3  }} }
      ];
    }
    return [label, col2, col3];
  });

  if (bodyLanta.length > 0) {
    autoTable(doc, {
      startY,
      head: [["Lannan käsittely ja jätehuolto", "Uusin tulos", "Kuvaus"]],
      body: bodyLanta,
      theme: 'striped',
      headStyles: { fillColor: '#4CAF50' },
      margin: { left: 14, right: 14 },
      styles: { fontSize: 10, cellPadding: 3, overflow: 'linebreak', valign: 'top' },
      showHead: 'firstPage',
      columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 30 }, 2: { cellWidth: 92 } }
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
    rowsEnergy.push([
      "Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä",
      "",
      energyGoals
    ]);
  }

  const filteredRowsEnergy = rowsEnergy.filter(([_, col2, col3]) =>
    (col2 || "").trim() !== "" || (col3 || "").trim() !== ""
  );

  const bodyEnergy = filteredRowsEnergy.map(([label, col2, col3]) => {
    if (label === "Kuvaus muista mahdollisista toimenpiteistä") {
      return [
        { content: label, styles: { cellWidth: 60, overflow: 'linebreak', valign: 'top', cellPadding: 3 } },
        { content: col2, colSpan: 2, styles: { overflow: 'linebreak', valign: 'top', cellPadding: 3 } }
      ];
    }

    if (label === "Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä") {
      return [
        { content: label, styles: { cellWidth: 60, overflow: 'linebreak', valign: 'top',fontStyle: 'bold', cellPadding: { top: 10, right: 3, bottom: 3, left: 3  }} },
        { content: col3, colSpan: 2, styles: { overflow: 'linebreak', valign: 'top', cellPadding: { top: 10, right: 3, bottom: 3, left: 3  }} }
      ];
    }
    return [label, col2, col3];
  });

  if (bodyEnergy.length > 0) {
    autoTable(doc, {
      startY,
      head: [["Energian käyttö", "Uusin tulos", "Kuvaus"]],
      body: bodyEnergy,
      theme: 'striped',
      headStyles: { fillColor: '#4CAF50' },
      margin: { left: 14, right: 14 },
      styles: { fontSize: 10, cellPadding: 3, overflow: 'linebreak', valign: 'top' },
      showHead: 'firstPage',
      columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 30 }, 2: { cellWidth: 92 } }
    });
    startY = doc.lastAutoTable.finalY + 10;
  }

  doc.addPage();
  startY = 20;  // Aseta yläreuna haluamallasi etäisyydellä

  // 3. Sosiaalinen vastuu: Henkilöstö ja työolosuhteet
  const rowsSocial = [
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
      "Hoitoa vaativia tapaturmia keskimäärin, kpl/v",
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

  const henkiloTavoitteet = getGoalsText(
    socialData.henkilostoTavoitteetVuosi1,
    socialData.henkilostoTavoitteetVuosi2,
    socialData.henkilostoTavoitteetVuosi3
  );
  if (henkiloTavoitteet) {
    rowsSocial.push([
      "Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä",
      "",
      henkiloTavoitteet
    ]);
  }

  const filteredRowsSocial = rowsSocial.filter(([_, col2, col3]) =>
    (col2 || "").trim() !== "" || (col3 || "").trim() !== ""
  );

  const bodySocial = filteredRowsSocial.map(([label, col2, col3]) => {
    if (label === "Kuvaus muista mahdollisista toimenpiteistä") {
      return [
        { content: label, styles: { cellWidth: 60, overflow: 'linebreak', valign: 'top', cellPadding: 3 } },
        { content: col2, colSpan: 2, styles: { overflow: 'linebreak', valign: 'top', cellPadding: 3 } }
      ];
    }

    if (label === "Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä") {
      return [
        { content: label, styles: { cellWidth: 60, overflow: 'linebreak', valign: 'top',fontStyle: 'bold', cellPadding: { top: 10, right: 3, bottom: 3, left: 3  }}},
        { content: col3, colSpan: 2, styles: { overflow: 'linebreak', valign: 'top', cellPadding: { top: 10, right: 3, bottom: 3, left: 3  }} }
      ];
    }
    return [label, col2, col3];
  });

  if (bodySocial.length > 0) {
    doc.setFontSize(14);
    doc.text("Sosiaalinen vastuu", 16, startY);
    startY += 10;
    autoTable(doc, {
      startY,
      head: [["Henkilöstö ja työolosuhteet", "Uusin tulos", "Kuvaus"]],
      body: bodySocial,
      theme: 'striped',
      headStyles: { fillColor: '#FFA500' },
      margin: { left: 14, right: 14 },
      styles: { fontSize: 10, cellPadding: 3, overflow: 'linebreak', valign: 'top' },
      showHead: 'firstPage',
      columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 30 }, 2: { cellWidth: 92 } }
    });
    startY = doc.lastAutoTable.finalY + 10;
  }

  // 4. Yhteistyö ja avoimuus
  const rowsCoop = [
    [
      "Kuvaus yhteistyötä muiden yrittäjien kanssa",
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

  const coopTavoitteet = getGoalsText(
    socialData.yhteistyoErityisetVuosi1,
    socialData.yhteistyoErityisetVuosi2,
    socialData.yhteistyoErityisetVuosi3
  );
  if (coopTavoitteet) {
    rowsCoop.push([
      "Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä",
      "",
      coopTavoitteet
    ]);
  }

  const filteredRowsCoop = rowsCoop.filter(([_, col2, col3]) =>
    (col2 || "").trim() !== "" || (col3 || "").trim() !== ""
  );

  const bodyCoop = filteredRowsCoop.map(([label, col2, col3]) => {
    if (label === "Kuvaus muista mahdollisista toimenpiteistä") {
      return [
        { content: label, styles: { cellWidth: 60, overflow: 'linebreak', valign: 'top', cellPadding: 3 } },
        { content: col2, colSpan: 2, styles: { overflow: 'linebreak', valign: 'top', cellPadding: 3 } }
      ];
    }

    if (label === "Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä") {
      return [
        { content: label, styles: { cellWidth: 60, overflow: 'linebreak', valign: 'top',fontStyle: 'bold', cellPadding: { top: 10, right: 3, bottom: 3, left: 3  }} },
        { content: col3, colSpan: 2, styles: { overflow: 'linebreak', valign: 'top', cellPadding: { top: 10, right: 3, bottom: 3, left: 3  }} }
      ];
    }
    return [label, col2, col3];
  });

  if (bodyCoop.length > 0) {
    autoTable(doc, {
      startY,
      head: [["Yhteistyö ja avoimuus", "Uusin tulos", "Kuvaus"]],
      body: bodyCoop,
      theme: 'striped',
      headStyles: { fillColor: '#FFA500' },
      margin: { left: 14, right: 14 },
      styles: { fontSize: 10, cellPadding: 3, overflow: 'linebreak', valign: 'top' },
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
    socialData.nautojenTerveydenhuoltorekisteriErityiset,
    socialData.nautojenTerveydenhuoltorekisteriErityiset2,
    socialData.nautojenTerveydenhuoltorekisteriErityiset3
  );
  if (animalWelfareGoals) {
    rowsAnimalWelfare.push([
      "Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä",
      "",
      animalWelfareGoals
    ]);
  }

  const filteredRowsAnimalWelfare = rowsAnimalWelfare.filter(([_, col2, col3]) =>
    (col2 || "").trim() !== "" || (col3 || "").trim() !== ""
  );

  const bodyAnimalWelfare = filteredRowsAnimalWelfare.map(([label, col2, col3]) => {
    if (label === "Kuvaus muista mahdollisista toimenpiteistä") {
      return [
        { content: label, styles: { cellWidth: 60, overflow: 'linebreak', valign: 'top', cellPadding: 3 } },
        { content: col2, colSpan: 2, styles: { overflow: 'linebreak', valign: 'top', cellPadding: 3 } }
      ];
    }

    if (label === "Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä") {
      return [
        { content: label, styles: { cellWidth: 60, overflow: 'linebreak', valign: 'top',fontStyle: 'bold', cellPadding: { top: 10, right: 3, bottom: 3, left: 3  }} },
        { content: col3, colSpan: 2, styles: { overflow: 'linebreak', valign: 'top', cellPadding: { top: 10, right: 3, bottom: 3, left: 3  }} }
      ];
    }
    return [label, col2, col3];
  });

  if (bodyAnimalWelfare.length > 0) {
    autoTable(doc, {
      startY,
      head: [["Eläinten hyvinvointi", "Uusin tulos", "Kuvaus"]],
      body: bodyAnimalWelfare,
      theme: 'striped',
      headStyles: { fillColor: '#FFA500' },
      margin: { left: 14, right: 14 },
      styles: { fontSize: 10, cellPadding: 3, overflow: 'linebreak', valign: 'top' },
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

  const qualityTavoitteet = getGoalsText(
    socialData.maitoErityisetToimenpiteetVuosi1,
    socialData.maitoErityisetToimenpiteetVuosi2,
    socialData.maitoErityisetToimenpiteetVuosi3
  );
  if (qualityTavoitteet) {
    rowsQuality.push([
      "Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä",
      "",
      qualityTavoitteet
    ]);
  }

  const filteredRowsQuality = rowsQuality.filter(([_, col2, col3]) =>
    (col2 || "").trim() !== "" || (col3 || "").trim() !== ""
  );

  const bodyQuality = filteredRowsQuality.map(([label, col2, col3]) => {
    if (label === "Kuvaus muista mahdollisista toimenpiteistä") {
      return [
        { content: label, styles: { cellWidth: 60, overflow: 'linebreak', valign: 'top', cellPadding: 3 } },
        { content: col2, colSpan: 2, styles: { overflow: 'linebreak', valign: 'top', cellPadding: 3 } }
      ];
    }

    if (label === "Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä") {
      return [
        { content: label, styles: { cellWidth: 60, overflow: 'linebreak', valign: 'top',fontStyle: 'bold', cellPadding: { top: 10, right: 3, bottom: 3, left: 3  }} },
        { content: col3, colSpan: 2, styles: { overflow: 'linebreak', valign: 'top', cellPadding: { top: 10, right: 3, bottom: 3, left: 3  }} }
      ];
    }
    return [label, col2, col3];
  });

  if (bodyQuality.length > 0) {
    autoTable(doc, {
      startY,
      head: [["Tuotteen laatu", "Uusin tulos", "Kuvaus"]],
      body: bodyQuality,
      theme: 'striped',
      headStyles: { fillColor: '#FFA500' },
      margin: { left: 14, right: 14 },
      styles: { fontSize: 10, cellPadding: 3, overflow: 'linebreak', valign: 'top' },
      showHead: 'firstPage',
      columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 30 }, 2: { cellWidth: 92 } }
    });
    startY = doc.lastAutoTable.finalY + 10;
  }

  doc.addPage();
  startY = 20;  // Aseta yläreuna haluamallasi etäisyydellä

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

  const filteredRowsJohtaminen = rowsJohtaminen.filter(([_, col2, col3]) =>
    (col2 || "").trim() !== "" || (col3 || "").trim() !== ""
  );

  const bodyJohtaminen = filteredRowsJohtaminen.map(([label, col2, col3]) => {
    if (label === "Kuvaus muista mahdollisista toimenpiteistä") {
      return [
        { content: label, styles: { cellWidth: 60, overflow: 'linebreak', valign: 'top', cellPadding: 3 } },
        { content: col2, colSpan: 2, styles: { overflow: 'linebreak', valign: 'top', cellPadding: 3 } }
      ];
    }

    if (label === "Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä") {
      return [
        { content: label, styles: { cellWidth: 60, overflow: 'linebreak', valign: 'top',fontStyle: 'bold', cellPadding: { top: 10, right: 3, bottom: 3, left: 3  }} },
        { content: col3, colSpan: 2, styles: { overflow: 'linebreak', valign: 'top', cellPadding: { top: 10, right: 3, bottom: 3, left: 3  }} }
      ];
    }
    return [label, col2, col3];
  });

  if (bodyJohtaminen.length > 0) {
    doc.setFontSize(14);
    doc.text("Talous ja hallinto", 16, startY);
    startY += 10;
    autoTable(doc, {
      startY,
      head: [["Johtaminen", "Uusin tulos", "Kuvaus"]],
      body: bodyJohtaminen,
      theme: 'striped',
      headStyles: { fillColor: '#0345fa' },
      margin: { left: 14, right: 14 },
      styles: { fontSize: 10, cellPadding: 3, overflow: 'linebreak', valign: 'top' },
      showHead: 'firstPage',
      columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 30 }, 2: { cellWidth: 92 } }
    });
    startY = doc.lastAutoTable.finalY + 10;
  }

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
      localFinanceData.budjetointiKuvausLisatiedot || "",
    ],
    [
      "Kuvaus muista mahdollisista toimenpiteistä",
      localFinanceData.kilpailuErityisetToimenpiteet || "",
      localFinanceData.kilpailuErityisetToimenpiteetLisatiedot || ""
    ],
  ];

  const kilpailuGoals = getGoalsText(
    localFinanceData.kilpailuErityisetToimenpiteetVuosi1,
    localFinanceData.kilpailuErityisetToimenpiteetVuosi2,
    localFinanceData.kilpailuErityisetToimenpiteetVuosi3
  );
  if (kilpailuGoals) {
    rowsKilpailukykyTalous.push([
      "Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä",
      "",
      kilpailuGoals
    ]);
  }

  const filteredRowsKilpailukykyTalous = rowsKilpailukykyTalous.filter(([_, col2, col3]) =>
    (col2 || "").trim() !== "" || (col3 || "").trim() !== ""
  );

  const bodyKilpailukyky = filteredRowsKilpailukykyTalous.map(([label, col2, col3]) => {
    if (label === "Kuvaus muista mahdollisista toimenpiteistä") {
      return [
        { content: label, styles: { cellWidth: 60, overflow: 'linebreak', valign: 'top', cellPadding: 3 } },
        { content: col2, colSpan: 2, styles: { overflow: 'linebreak', valign: 'top', cellPadding: 3 } }
      ];
    }

    if (label === "Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä") {
      return [
        { content: label, styles: { cellWidth: 60, overflow: 'linebreak', valign: 'top',fontStyle: 'bold', cellPadding: { top: 10, right: 3, bottom: 3, left: 3  }} },
        { content: col3, colSpan: 2, styles: { overflow: 'linebreak', valign: 'top', cellPadding: { top: 10, right: 3, bottom: 3, left: 3  }} }
      ];
    }
    return [label, col2, col3];
  });

  if (bodyKilpailukyky.length > 0) {
    autoTable(doc, {
      startY,
      head: [["Kilpailukyky ja talous", "Uusin tulos", "Kuvaus"]],
      body: bodyKilpailukyky,
      theme: 'striped',
      headStyles: { fillColor: '#0345fa' },
      margin: { left: 14, right: 14 },
      styles: { fontSize: 10, cellPadding: 3, overflow: 'linebreak', valign: 'top' },
      showHead: 'firstPage',
      columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 30 }, 2: { cellWidth: 92 } }
    });
    startY = doc.lastAutoTable.finalY + 10;
  }

  const rowsRisk = [
    [
      "Varautumissuunnitelma poikkeustilanteisiin tehty",
      localFinanceData.riskVarautuminenSahko || "",
      localFinanceData.riskVarautuminenSahkoLisatiedot || ""
    ],
    [
      "Pelastautumissuunnitelma tehty",
      localFinanceData.riskPelastautumissuunnitelma || "",
      localFinanceData.riskPelastautumissuunnitelmaLisatiedot || ""
    ],
    [
      "Riskikartoitukset tehty",
      localFinanceData.riskRiskikartoitukset || "",
      localFinanceData.riskRiskikartoituksetLisatiedot || ""
    ],
    [
      "Kuvaus vakuutusturvasta",
      localFinanceData.riskVakuutus || "",
      localFinanceData.riskVakuutusLisatiedot || ""
    ],
    [
      "Kuvaus henkilöriskien hallinnasta ja dokumentaatiosta",
      localFinanceData.riskHenkiloriskit || "",
      localFinanceData.riskHenkiloriskitLisatiedot || ""
    ],
    [
      "Kuvaus rahoitusriskien hallinnasta",
      localFinanceData.riskRahoitus || "",
      localFinanceData.riskRahoitusLisatiedot || ""
    ],
    [
      "Kuvaus hintariskien hallinnasta",
      localFinanceData.riskHintariski || "",
      localFinanceData.riskHintariskiLisatiedot || ""
    ],

    [
      "Kuvaus varautumisesta sähkökatkoksiin",
      localFinanceData.riskVarautuminenSahko || "",
      localFinanceData.riskVarautuminenSahkoLisatiedot || ""
    ],
    [
      "Kuvaus vesihuollon varajärjestelmästä",
      localFinanceData.riskVesihuolto || "",
      localFinanceData.riskVesihuoltoLisatiedot || ""
    ],
    [
      "Kuvaus eläinriskien hallinnasta",
      localFinanceData.riskElainriskit || "",
      localFinanceData.riskElainriskitLisatiedot || ""
    ],
    [
      "Kuvaus peltoriskien hallinnasta",
      localFinanceData.riskPeltoriski || "",
      localFinanceData.riskPeltoriskiLisatiedot || ""
    ],
    [
      "Kuvaus tietoturvariskien hallinnasta",
      localFinanceData.riskTietoturva || "",
      localFinanceData.riskTietoturvaLisatiedot || ""
    ],
    [
      "Kuvaus muista mahdollisista toimenpiteistä",
      localFinanceData.riskiErityisetToimenpiteet || "",
      ""
    ],
  ];

  const riskTavoitteet = getGoalsText(
    localFinanceData.riskErityisetToimenpiteetVuosi1,
    localFinanceData.riskErityisetToimenpiteetVuosi2,
    localFinanceData.riskErityisetToimenpiteetVuosi3
  );
  if (riskTavoitteet) {
    rowsRisk.push([
      "Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä",
      "",
      riskTavoitteet
    ]);
  }

  const filteredRowsRisk = rowsRisk.filter(([_, col2, col3]) =>
    (col2 || "").trim() !== "" || (col3 || "").trim() !== ""
  );

  const bodyRisk = filteredRowsRisk.map(([label, col2, col3]) => {
    if (label === "Kuvaus muista mahdollisista toimenpiteistä") {
      return [
        { content: label, styles: { cellWidth: 60, overflow: 'linebreak', valign: 'top', cellPadding: 3 } },
        { content: col2, colSpan: 2, styles: { overflow: 'linebreak', valign: 'top', cellPadding: 3 } }
      ];
    }

    if (label === "Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä") {
      return [
        { content: label, styles: { cellWidth: 60, overflow: 'linebreak', valign: 'top',fontStyle: 'bold', cellPadding: { top: 10, right: 3, bottom: 3, left: 3  }} },
        { content: col3, colSpan: 2, styles: { overflow: 'linebreak', valign: 'top', cellPadding: { top: 10, right: 3, bottom: 3, left: 3  }} }
      ];
    }
    return [label, col2, col3];
  });

  if (bodyRisk.length > 0) {
    autoTable(doc, {
      startY,
      head: [["Riskien hallinta", "Uusin tulos", "Kuvaus"]],
      body: bodyRisk,
      theme: 'striped',
      headStyles: { fillColor: '#0345fa' },
      margin: { left: 14, right: 14 },
      styles: { fontSize: 10, cellPadding: 3, overflow: 'linebreak', valign: 'top' },
      showHead: 'firstPage',
      columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 30 }, 2: { cellWidth: 92 } }
    });
    startY = doc.lastAutoTable.finalY + 10;
  }
  const fileDate = dateStr;
  doc.save(`ESG_raportti_${fileDate}.pdf`);
};

export default generatePdfReport;
