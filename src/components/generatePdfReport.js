import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

import { 
    savoniaLogo, 
    maitoyrittajatLogo, 
    valioLogo, 
    ysaoLogo, 
    euLogo 
  } from './logos.js';

const generatePdfReport = (initialData,environmentData) => {
  const doc = new jsPDF();
 
  doc.addImage(savoniaLogo, 'PNG', 14, 10, 30, 20);         // x=14, y=10, leveys=30, korkeus=20
  doc.addImage(maitoyrittajatLogo, 'PNG', 50, 10, 30, 20);  // säädä arvoja tarpeen mukaan
  doc.addImage(valioLogo, 'PNG', 86, 10, 30, 20);
  doc.addImage(ysaoLogo, 'PNG', 122, 10, 30, 20);
  doc.addImage(euLogo, 'PNG', 158, 10, 30, 20);

  // Nostetaan startY:tä sen verran, etteivät otsikot mene logojen päälle
  let startY = 40;
  

  // Otsikko
  doc.setFontSize(16);
  doc.text("ESG Vastuullisuusraportti", 14, startY);
  startY += 10;

  

  // Kahden sarakkeen taulukko: [Kenttä, Arvo]
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
  

  // Suodatetaan pois ne rivit, joissa Arvo on tyhjä
  const filteredInitialRows = initialRows.filter(([label, value]) => value.trim() !== "");

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

  // --- 2. Ympäristö ---
  doc.text("Ympäristö", 14, startY);
  startY += 10;



  const rows21 = [
    [
      "Maidon hiilijalanjälki, Co2/kg maitoa",
      environmentData.envMaidonHiilijalanjalki || "",
      environmentData.envMaidonHiilijalanjalkiLisatiedot || "",
      environmentData.envMaidonHiilijalanjalkiTavoitteet || ""
    ],
    [
      "Scope 1 päästö, tCO2e, %",
      environmentData.envScope1 || "",
      environmentData.envScope1Lisatiedot || "",
      environmentData.envScope1Tavoitteet || ""
    ],
    [
      "Scope 2 päästö, tCO2e, %",
      environmentData.envScope2 || "",
      environmentData.envScope2Lisatiedot || "",
      environmentData.envScope2Tavoitteet || ""
    ],
    [
      "Scope 3 päästö, tCO2e, %",
      environmentData.envScope3 || "",
      environmentData.envScope3Lisatiedot || "",
      environmentData.envScope3Tavoitteet || ""
    ],
    [
      "Hiiliviljelykoulutus suoritettu",
      environmentData.envHiiliviljelykoulutus || "",
      environmentData.envHiiliviljelykoulutusLisatiedot || "",
      environmentData.envHiiliviljelykoulutusTavoitteet || ""
    ],
    [
      "Hiiliviljelytoimenpiteet rehuntuotannossa, ha",
      environmentData.envHiiliviljelytoimenpiteet || "",
      environmentData.envHiiliviljelytoimenpiteetLisatiedot || "",
      environmentData.envHiiliviljelytoimenpiteetTavoitteet || ""
    ],
    [
      "Keskilehmäluku, kpl",
      environmentData.envKeskilehmaluku || "",
      environmentData.envKeskilehmalukuLisatiedot || "",
      environmentData.envKeskilehmalukuTavoitteet || ""
    ],
    [
      "Poikimaväli, vrk ",
      environmentData.envPoikimavali || "",
      environmentData.envPoikimavaliLisatiedot || "",
      environmentData.envPoikimavaliTavoitteet || ""
    ],
    [
      "Hiehopoikimaikä, kk ",
      environmentData.envHiehopoikimaika || "",
      environmentData.envHiehopoikimaikaLisatiedot || "",
      environmentData.envHiehopoikimaikaTavoitteet || ""
    ],
    [
      "Keskituotos, EKM kg/lehmä ",
      environmentData.envKeskituotos || "",
      environmentData.envKeskituotosLisatiedot || "",
      environmentData.envKeskituotosTavoitteet || ""
    ],
    [
      "Tuotosseurannan rasva%, vuoden keskiarvo",
      environmentData.envTuotosRasva || "",
      environmentData.envTuotosRasvaLisatiedot || "",
      environmentData.envTuotosRasvaTavoitteet || ""
    ],
    [
      "Tuotosseurannan valkuais%, vuoden keskiarvo",
      environmentData.envTuotosValkuainen || "",
      environmentData.envTuotosValkuainenLisatiedot || "",
      environmentData.envTuotosValkuainenTavoitteet || ""
    ],
    [
      "Maidon ureapitoisuus, mg/100 ml",
      environmentData.envMaidonUrea || "",
      environmentData.envMaidonUreaLisatiedot || "",
      environmentData.envMaidonUreaTavoitteet || ""
    ],
    [
      "Meijerimaidon osuus, %",
      environmentData.envMeijerimaidonOsuus || "",
      environmentData.envMeijerimaidonOsuusLisatiedot || "",
      environmentData.envMeijerimaidonOsuusTavoitteet || ""
    ],
    [
      "Käytössä vähäpäästöinen kylmäaine tilasäililössä",
      environmentData.envKaytossaVahapaastoinenKylmainetilasaililossa || "",
      environmentData.envKaytossaVahapaastoinenKylmainetilasaililossaLisatiedot || "",
      environmentData.envKaytossaVahapaastoinenKylmainetilasaililossaTavoitteet || ""
    ],
    [
      "Karkearehun osuus lypsylehmien ruokinnassa",
      environmentData.envKarkearehunOsuus || "",
      environmentData.envKarkearehunOsuusLisatiedot || "",
      environmentData.envKarkearehunOsuusTavoitteet || ""
    ],
    [
      "Päästöjä vähentävät lisäravinteet lypsylehmillä käytössä",
      environmentData.envPaastojaVahentavatLisaravinteet || "",
      environmentData.envPaastojaVahentavatLisaravinteetLisatiedot || "",
      environmentData.envPaastojaVahentavatLisaravinteetTavoitteet || ""
    ],
    [
      "Ruokinnan seurantalaskelmia tehty",
      environmentData.envRuokinnanSeurantalaskelmiaTehty || "",
      environmentData.envRuokinnanSeurantalaskelmiaTehtyLisatiedot || "",
      environmentData.envRuokinnanSeurantalaskelmiaTehtyTavoitteet || ""
    ],
    [
      "Kuiva-ainekiloa rehua/EKM kg",
      environmentData.envKuivaAinekiloa || "",
      environmentData.envKuivaAinekiloaLisatiedot || "",
      environmentData.envKuivaAinekiloaTavoitteet || ""
    ],
    [
      "Typen hyväksikäyttö % ruokinnassa",
      environmentData.envTypenHyvaksykaytto || "",
      environmentData.envTypenHyvaksykayttoLisatiedot || "",
      environmentData.envTypenHyvaksykayttoTavoitteet || ""
    ],
    [
      "Rehun säästöindeksin huomioiminen jalostuksessa",
      environmentData.envRehunSaastoindeksi || "",
      environmentData.envRehunSaastoindeksiLisatiedot || "",
      environmentData.envRehunSaastoindeksiTavoitteet || ""
    ],
    [
      "Ruokinnan omavaraisuusaste %",
      environmentData.envRuokinnanOmavaraisuusaste || "",
      environmentData.envRuokinnanOmavaraisuusasteLisatiedot || "",
      environmentData.envRuokinnanOmavaraisuusasteTavoitteet || ""
    ],
    [
      "Muut mahdolliset toimenpiteet",
      environmentData.envMuutToimenpiteet || "",
      environmentData.envMuutToimenpiteetLisatiedot || "",
      environmentData.envMuutToimenpiteetTavoitteet || ""
    ]
  ];

  const filteredRows21 = rows21.filter(row => {
    // Oletetaan, että row on [kentän kuvaus, uusin tulos, lisätiedot, tavoitteet]
    const [ , result, details, targets ] = row;
    return (result.trim() !== "" || details.trim() !== "" || targets.trim() !== "");
  });
  

  autoTable(doc, {
    startY,
    head: [["Hiilijalanjälki ja tuotannon tehokkuus", "Uusin tulos","Kuvaus"]],
    body: filteredRows21,
    theme: 'striped',
    headStyles: { fillColor: '#4CAF50' },
    margin: { left: 14, right: 14 },
    styles: { fontSize: 10 }
  });
  startY = doc.lastAutoTable.finalY + 10;
  

  
  const rows22 = [
    [
      "Maatalousluonnon ja maiseman -hoitosopimus",
      environmentData.divHoitosopimus || "",
      environmentData.divHoitosopimusLisatiedot || "",
      environmentData.divHoitosopimusTavoitteet || ""
    ],
    [
      "Monimuotoisuutta edistävä pinta-ala yhteensä, ha",
      environmentData.divPintaAla || "",
      environmentData.divPintaAlaLisatiedot || "",
      environmentData.divPintaAlaTavoitteet || ""
    ],
    [
      "Kosteikot, ha",
      environmentData.divKosteikot || "",
      environmentData.divKosteikotLisatiedot || "",
      environmentData.divKosteikotTavoitteet || ""
    ],
    [
      "Biodiversiteettikartoitus tehty",
      environmentData.divBiodiversiteetti || "",
      environmentData.divBiodiversiteettiLisatiedot || "",
      environmentData.divBiodiversiteettiTavoitteet || ""
    ],
    [
      "Suomenkarjan eläinten kasvattaminen",
      environmentData.divSuomenkarja || "",
      environmentData.divSuomenkarjaLisatiedot || "",
      environmentData.divSuomenkarjaTavoitteet || ""
    ],
    [
      "Risteytyseläinten osuus lypsylehmistä, %",
      environmentData.divRisteytys || "",
      environmentData.divRisteytysLisatiedot || "",
      environmentData.divRisteytysTavoitteet || ""
    ],
    [
      "Soija ja GM -vapaus ruokinnassa",
      environmentData.divSoijaGM || "",
      environmentData.divSoijaGMLisatiedot || "",
      environmentData.divSoijaGMTavoitteet || ""
    ],
    [
      "Palmuöljyttömyys ruokinnassa",
      environmentData.divPalmu || "",
      environmentData.divPalmuLisatiedot || "",
      environmentData.divPalmuTavoitteet || ""
    ],
    [
      "Erityiset toimenpiteet",
      environmentData.divErityisetToimenpiteet || "",
      environmentData.divErityisetToimenpiteetLisatiedot || "",
      environmentData.divErityisetToimenpiteetTavoitteet || ""
    ],
   
    [
      "Erityiset toimenpiteet",
      environmentData.divErityisetToimenpiteet2 || "",
      environmentData.divErityisetToimenpiteet2Lisatiedot || "",
      environmentData.divErityisetToimenpiteet2Tavoitteet || ""
    ]
  ];
  
  const filteredRows22 = rows22.filter(row => {
    const [, result, details, targets] = row;
    return (result.trim() !== "" || details.trim() !== "" || targets.trim() !== "");
  });
  
  autoTable(doc, {
    startY,
    head: [["Monimuotoisuus", "Uusin tulos", "Kuvaus"]],
    body: filteredRows22,
    theme: 'striped',
    margin: { left: 14, right: 14 },
    headStyles: { fillColor: '#4CAF50' },
    styles: { fontSize: 10 }
  });
  startY = doc.lastAutoTable.finalY + 10;
  
const rows23Pelto = [
  [
    "Viljelykasvien kokonaispinta-ala, ha",
    environmentData.envPeltoviljelyKokonaispintaAla || "",
    environmentData.envPeltoviljelyKokonaispintaAlaLisatiedot || "",
    environmentData.envPeltoviljelyKokonaispintaAlaTavoitteet || ""
  ],
  [
    "Viljelykasvien pinta-ala suhteessa eläinmäärään, ha/ey",
    environmentData.envPeltoviljelySuhdeElainmaara || "",
    environmentData.envPeltoviljelySuhdeElainmaaraLisatiedot || "",
    environmentData.envPeltoviljelySuhdeElainmaaraTavoitteet || ""
  ],
  [
    "Turvemaiden osuus, %",
    environmentData.envTurvemaidenOsuus || "",
    environmentData.envTurvemaidenOsuusLisatiedot || "",
    environmentData.envTurvemaidenOsuusTavoitteet || ""
  ],
  [
    "Säilörehun D-arvo, keskimäärin",
    environmentData.envSaileRehunDArvo || "",
    environmentData.envSaileRehunDArvoLisatiedot || "",
    environmentData.envSaileRehunDArvoTavoitteet || ""
  ],
  [
    "Nurmisato, kg/ha",
    environmentData.envNurmisato || "",
    environmentData.envNurmisatoLisatiedot || "",
    environmentData.envNurmisatoTavoitteet || ""
  ],
  [
    "Viljasato, kg/ha",
    environmentData.envViljasato || "",
    environmentData.envViljasatoLisatiedot || "",
    environmentData.envViljasatoTavoitteet || ""
  ],
  [
    "Kuvaus rehuntuotannon toimintatavoista/strategiasta",
    environmentData.envRehuntuotantoKuvaus || "",
    environmentData.envRehuntuotantoKuvausLisatiedot || "",
    environmentData.envRehuntuotantoKuvausTavoitteet || ""
  ],
  [
    "Keskimääräinen lohkoetäisyys, km",
    environmentData.envLohkoetaisyys || "",
    environmentData.envLohkoetaisyysLisatiedot || "",
    environmentData.envLohkoetaisyysTavoitteet || ""
  ],
  [
    "Kuvaus peltoviljelyssä käytössä olevista toimenpiteistä",
    environmentData.envPeltoviljelyToimenpiteet || "",
    environmentData.envPeltoviljelyToimenpiteetLisatiedot || "",
    environmentData.envPeltoviljelyToimenpiteetTavoitteet || ""
  ],
  [
    "Kuvaus peltojen vesitalouden ylläpidosta ja kehittämisestä",
    environmentData.envVesitalousKuvaus || "",
    environmentData.envVesitalousKuvausLisatiedot || "",
    environmentData.envVesitalousKuvausTavoitteet || ""
  ],
  [
    "Erityiset toimenpiteet",
    environmentData.envPeltoviljelyErityisetToimenpiteet || "",
    environmentData.envPeltoviljelyErityisetToimenpiteetLisatiedot || "",
    environmentData.envPeltoviljelyErityisetToimenpiteetTavoitteet || ""
  ]
];

const filteredRows23Pelto = rows23Pelto.filter(row => {
  const [label, result, details, targets] = row;
  return (result.trim() !== "" || details.trim() !== "" || targets.trim() !== "");
});

autoTable(doc, {
  startY,
  head: [["Peltoviljely", "Uusin tulos", "Kuvaus"]],
  body: filteredRows23Pelto,
  theme: 'striped',
  margin: { left: 14, right: 14 },
  headStyles: { fillColor: '#4CAF50' },
  styles: { fontSize: 10 }
});
startY = doc.lastAutoTable.finalY + 10;


const rows23 = [
  [
    "Viimeisin ympäristölupa, pvm",
    environmentData.lantaYmparistolupa || "",
    "", // Lisätiedot
    ""  // Tavoitteet
  ],
  [
    "Lietelannan osuus, %",
    environmentData.lantaLietelannanOsuus || "",
    "",
    ""
  ],
  [
    "Lannan levitysmenetelmä",
    environmentData.lantaLevitysmenetelma || "",
    "",
    ""
  ],
  [
    "Pääasiallinen kuivikemateriaali",
    environmentData.lantaKuivikemateriaali || "",
    "",
    ""
  ],
  [
    "Kuvaus jätemuovien varastoinnista ja hävittämisestä",
    environmentData.lantaJatemuovit || "",
    "",
    ""
  ],
  [
    "Kuvaus vaarallisten aineiden ja kemikaalien varastoinnista ja hävittämisestä",
    environmentData.lantaVaarallisetAineet || "",
    "",
    ""
  ],
  [
    "Kuvaus jäteöljyn varastoinnista ja hävittämisestä",
    environmentData.lantaJateoljy || "",
    "",
    ""
  ],
  [
    "Kuvaus puristenesteiden käsittelytavasta",
    environmentData.lantaPuristeneste || "",
    "",
    ""
  ],
  [
    "Muut mahdolliset toimenpiteet",
    environmentData.lantaMuutToimenpiteet || "",
    "",
    ""
  ]
];

const filteredRows23 = rows23.filter(row => {
  // Jos kaikki sarakkeet 2-4 ovat tyhjiä, poistetaan rivi
  const [, col2, col3, col4] = row;
  return (col2.trim() !== "" || col3.trim() !== "" || col4.trim() !== "");
});

autoTable(doc, {
  startY,
  head: [["Lannan käsittely ja jätehuolto", "Uusin tulos", "Kuvaus"]],
  body: filteredRows23,
  theme: 'striped',
  margin: { left: 14, right: 14 },
  headStyles: { fillColor: '#4CAF50' },
  styles: { fontSize: 10 }
});
startY = doc.lastAutoTable.finalY + 10;

  
  const rows24 = [
    [
      "Sähkön käyttömäärä, kWh/v",
      environmentData.energySahkonKayttomaara || "",
      environmentData.energySahkonKayttomaaraLisatiedot || "",
      environmentData.energySahkonKayttomaaraTavoitteet || ""
    ],
    [
      "Sähkön käyttömäärä suhteessa tuotantoon, kWh/kg maitoa/v",
      environmentData.energySahkonKayttomaaraSuhteessa || "",
      environmentData.energySahkonKayttomaaraSuhteessaLisatiedot || "",
      environmentData.energySahkonKayttomaaraSuhteessaTavoitteet || ""
    ],
    [
      "Oman sähkön tuotanto, kWh/v",
      environmentData.energyOmaSahkotuotanto || "",
      environmentData.energyOmaSahkotuotantoLisatiedot || "",
      environmentData.energyOmaSahkotuotantoTavoitteet || ""
    ],
    [
      "Polttoaineiden kokonaiskäyttömäärä, l/v",
      environmentData.energyPolttoaineenKaytto || "",
      environmentData.energyPolttoaineenKayttoLisatiedot || "",
      environmentData.energyPolttoaineenKayttoTavoitteet || ""
    ],
    [
      "Polttoaineiden käyttömäärä suhteessa tuotantoon, l/kg maitoa",
      environmentData.energyPolttoaineenKayttoSuhteessa || "",
      environmentData.energyPolttoaineenKayttoSuhteessaLisatiedot || "",
      environmentData.energyPolttoaineenKayttoSuhteessaTavoitteet || ""
    ],
    [
      "Lanta käsitellään biokaasulaitoksessa",
      environmentData.energyBiokaasu || "",
      environmentData.energyBiokaasuLisatiedot || "",
      environmentData.energyBiokaasuTavoitteet || ""
    ],
    [
      "Maidon esijäähdytys",
      environmentData.energyEsijahdytys || "",
      environmentData.energyEsijahdytysLisatiedot || "",
      environmentData.energyEsijahdytysTavoitteet || ""
    ],
    [
      "Lämmön talteenotto",
      environmentData.energyLampotalteenotto || "",
      environmentData.energyLampotalteenottoLisatiedot || "",
      environmentData.energyLampotalteenottoTavoitteet || ""
    ],
    [
      "Erityiset toimenpiteet",
      environmentData.energyErityisetToimenpiteet || "",
      environmentData.energyErityisetToimenpiteetLisatiedot || "",
      environmentData.energyErityisetToimenpiteetTavoitteet || ""
    ]
  ];
  
  const filteredRows24 = rows24.filter(row => {
    const [, col2, col3, col4] = row;
    return (col2.trim() !== "" || col3.trim() !== "" || col4.trim() !== "");
  });
  
  autoTable(doc, {
    startY,
    head: [["Energian käyttö", "Uusin tulos", "Kuvaus"]],
    body: filteredRows24,
    theme: 'striped',
    margin: { left: 14, right: 14 },
    headStyles: { fillColor: '#4CAF50' },
    styles: { fontSize: 10 }
  });
  startY = doc.lastAutoTable.finalY + 10;
  

  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  
  // Muotoile päivämäärä muodossa MM-DD-YYYY
  const dateStr = `${day}-${month}-${year}`;
  
  doc.save(`ESG_raportti_${dateStr}.pdf`);
  

};

export default generatePdfReport;
