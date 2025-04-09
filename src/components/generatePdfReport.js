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

  const vuosiTextMap = {
    "1": "1-vuosi",
    "2": "2-vuotta",
    "3": "3-vuotta"
  };
  // Käytetään muunnettua arvoa, jos se löytyy, muuten säilytetään alkuperäinen arvo.
  const convertedVuodet = vuosiTextMap[environmentData.envToimenpiteetVuodet] || environmentData.envToimenpiteetVuodet || "";



  const rows21 = [
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
      "Poikimaväli, vrk ",
      environmentData.envPoikimavali || "",
      environmentData.envPoikimavaliLisatiedot || "",
    
    ],
    [
      "Hiehopoikimaikä, kk ",
      environmentData.envHiehopoikimaika || "",
      environmentData.envHiehopoikimaikaLisatiedot || "",

    ],
    [
      "Keskituotos, EKM kg/lehmä ",
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
    [
      "Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä",
      convertedVuodet,
      environmentData.envToimenpiteetTavoiteTeksti || ""
    ]
   
  ];

  const filteredRows21 = rows21.filter(row => row.some(cell => cell && cell.toString().trim() !== ""));
  
  autoTable(doc, {
    startY,
    head: [["Hiilijalanjälki ja tuotannon tehokkuus", "Uusin tulos", "Kuvaus"]],
    body: filteredRows21,
    theme: 'striped',
    headStyles: { fillColor: '#4CAF50' },
    margin: { left: 14, right: 14 },
    styles: { fontSize: 10 },
    showHead: 'firstPage' // Näytetään header vain ensimmäisellä sivulla
  });
  startY = doc.lastAutoTable.finalY + 10;

  const convertedDivVuodet = vuosiTextMap[environmentData.divErityisetVuodet] || environmentData.divErityisetVuodet || "";
  
  const rows22 = [
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
      "" // Tässä rivissä ei välttämättä ole erillistä lisätietokenttää
    ],
    [
      "Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä",
      convertedDivVuodet,
      environmentData.divErityisetTavoiteTeksti || ""
    ]
  ];
   
  
  const filteredRows22 = rows22.filter(row => row.some(cell => cell && cell.toString().trim() !== ""));
  
  autoTable(doc, {
    startY,
    head: [["Monimuotoisuus", "Uusin tulos", "Kuvaus"]],
    body: filteredRows22,
    theme: 'striped',
    margin: { left: 14, right: 14 },
    headStyles: { fillColor: '#4CAF50' },
    styles: { fontSize: 10 },
    showHead: 'firstPage'
  });
  startY = doc.lastAutoTable.finalY + 10;

  const convertedPeltoviljelyVuodet = vuosiTextMap[environmentData.envPeltoviljelyErityisetToimenpiteetVuodet] ||
  environmentData.envPeltoviljelyErityisetToimenpiteetVuodet || "";
  
const rows23Pelto = [

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
  [
    "Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä",
    convertedPeltoviljelyVuodet,
    environmentData.envPeltoviljelyErityisetToimenpiteetTavoiteTeksti || ""
  ]
];
 

const filteredRows23Pelto = rows23Pelto.filter(row => {
  const [ , col2, col3 ] = row;
  return (col2.trim() !== "" || col3.trim() !== "");
});
if (filteredRows23Pelto.length > 0) {
  autoTable(doc, {
    startY,
    head: [["Peltoviljely", "Uusin tulos", "Kuvaus"]],
    body: filteredRows23Pelto,
    theme: 'striped',
    headStyles: { fillColor: '#4CAF50' },
    margin: { left: 14, right: 14 },
    styles: { fontSize: 10 },
    // Jos haluat, ettei otsikko toistu jokaisella sivulla, lisää:
    // showHead: 'firstPage'
  });
  startY = doc.lastAutoTable.finalY + 10;
}

const convertedLantaVuodet = vuosiTextMap[environmentData.lantaMuutToimenpiteetVuodet] ||
environmentData.lantaMuutToimenpiteetVuodet || "";


const rows23 = [
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
  [
    "Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä",
    convertedLantaVuodet,
    environmentData.lantaMuutToimenpiteetTavoiteTeksti || ""
  ]
];

const filteredRows23 = rows23.filter(row => row.some(cell => cell && cell.toString().trim() !== ""));

autoTable(doc, {
  startY,
  head: [["Lannan käsittely ja jätehuolto", "Uusin tulos", "Kuvaus"]],
  body: filteredRows23,
  theme: 'striped',
  margin: { left: 14, right: 14 },
  headStyles: { fillColor: '#4CAF50' },
  styles: { fontSize: 10 },
  showHead: 'firstPage'
});
startY = doc.lastAutoTable.finalY + 10;

const convertedEnergyVuodet = vuosiTextMap[environmentData.energyErityisetToimenpiteetVuodet] ||
environmentData.energyErityisetToimenpiteetVuodet || "";

  
  const rows24 = [
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
    [
      "Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä",
      convertedEnergyVuodet,
      environmentData.energyErityisetToimenpiteetTavoiteTeksti || "",
      ""
    ]
  ];
  
  const filteredRows24 = rows24.filter(row => row.some(cell => cell && cell.toString().trim() !== ""));
  
  autoTable(doc, {
    startY,
    head: [["Energian käyttö", "Uusin tulos", "Kuvaus"]],
    body: filteredRows24,
    theme: 'striped',
    margin: { left: 14, right: 14 },
    headStyles: { fillColor: '#4CAF50' },
    styles: { fontSize: 10 },
    showHead: 'firstPage'
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
