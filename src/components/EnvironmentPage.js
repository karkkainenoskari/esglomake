import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const EnvironmentPage = ({ onNext, onPrevious, companyData }) => {
  // Ympäristön lomakkeen 23 kenttää
  const [envData, setEnvData] = useState({
    // 1. Maidon hiilijalanjälki
    maidonHiilijalanjalki: '',
    maidonHiilijalanjalkiLisatiedot: '',
    maidonHiilijalanjalkiTavoitteet: '',
    // 2. Scope 1
    scope1: '',
    scope1Lisatiedot: '',
    scope1Tavoitteet: '',
    // 3. Scope 2
    scope2: '',
    scope2Lisatiedot: '',
    scope2Tavoitteet: '',
    // 4. Scope 3
    scope3: '',
    scope3Lisatiedot: '',
    scope3Tavoitteet: '',
    // 5. Hiiliviljelykoulutus
    hiiliviljelykoulutus: '',
    hiiliviljelykoulutusLisatiedot: '',
    hiiliviljelykoulutusTavoitteet: '',
    // 6. Hiiliviljelytoimenpiteet
    hiiliviljelytoimenpiteet: '',
    hiiliviljelytoimenpiteetLisatiedot: '',
    hiiliviljelytoimenpiteetTavoitteet: '',
    // 7. Keskilehmäluku
    keskilehmaluku: '',
    keskilehmalukuLisatiedot: '',
    keskilehmalukuTavoitteet: '',
    // 8. Poikimaväli
    poikimavali: '',
    poikimavaliLisatiedot: '',
    poikimavaliTavoitteet: '',
    // 9. Hiehopoikimaikä
    hiehopoikimaika: '',
    hiehopoikimaikaLisatiedot: '',
    hiehopoikimaikaTavoitteet: '',
    // 10. Keskituotos
    keskituotos: '',
    keskituotosLisatiedot: '',
    keskituotosTavoitteet: '',
    // 11. Tuotosseurannan rasva%
    tuotosRasva: '',
    tuotosRasvaLisatiedot: '',
    tuotosRasvaTavoitteet: '',
    // 12. Tuotosseurannan valkuais%
    tuotosValkuainen: '',
    tuotosValkuainenLisatiedot: '',
    tuotosValkuainenTavoitteet: '',
    // 13. Maidon ureapitoisuus
    maidonUrea: '',
    maidonUreaLisatiedot: '',
    maidonUreaTavoitteet: '',
    // 14. Meijerimaidon osuus
    meijerimaidonOsuus: '',
    meijerimaidonOsuusLisatiedot: '',
    meijerimaidonOsuusTavoitteet: '',
    // 15. Käytössä vähäpäästöinen kylmäaine tilasäililössä
    kaytossaVahapaastoinenKylmainetilasaililossa: '',
    kaytossaVahapaastoinenKylmainetilasaililossaLisatiedot: '',
    kaytossaVahapaastoinenKylmainetilasaililossaTavoitteet: '',
    // 16. Karkearehun osuus
    karkearehunOsuus: '',
    karkearehunOsuusLisatiedot: '',
    karkearehunOsuusTavoitteet: '',
    // 17. Päästöjä vähentävät lisäravinteet
    paastojaVahentavatLisaravinteet: '',
    paastojaVahentavatLisaravinteetLisatiedot: '',
    paastojaVahentavatLisaravinteetTavoitteet: '',
    // 18. Ruokinnan seurantalaskelmia tehty
    ruokinnanSeurantalaskelmiaTehty: '',
    ruokinnanSeurantalaskelmiaTehtyLisatiedot: '',
    ruokinnanSeurantalaskelmiaTehtyTavoitteet: '',
    // 19. Kuiva-ainekiloa rehua/EKM kg
    kuivaAinekiloa: '',
    kuivaAinekiloaLisatiedot: '',
    kuivaAinekiloaTavoitteet: '',
    // 20. Typen hyväksikäyttö
    typenHyvaksykaytto: '',
    typenHyvaksykayttoLisatiedot: '',
    typenHyvaksykayttoTavoitteet: '',
    // 21. Rehun säästöindeksi
    rehunSaastoindeksi: '',
    rehunSaastoindeksiLisatiedot: '',
    rehunSaastoindeksiTavoitteet: '',
    // 22. Ruokinnan omavaraisuusaste
    ruokinnanOmavaraisuusaste: '',
    ruokinnanOmavaraisuusasteLisatiedot: '',
    ruokinnanOmavaraisuusasteTavoitteet: '',
    // 23. Muut mahdolliset toimenpiteet
    muutToimenpiteet: '',
    muutToimenpiteetLisatiedot: '',
    muutToimenpiteetTavoitteet: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEnvData({ ...envData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onNext) {
      onNext(envData);
    }
  };

  // Fallback, jos companyDataa ei ole annettu
  const safeCompanyData = companyData || {
    yrityksenNimi: '',
    yrittajienNimet: '',
    yhtiomuoto: '',
    tilanKokonaistyovoima: '',
    karjakoko: '',
    peltoala: '',
    tuotomanTavanomainen: '',
    navettatyyppi: '',
    lypsyjärjestelmä: ''
  };

  // Muodostetaan yrityksen perustiedot taulukkoon (Kenttä, Arvo)
  const makeCompanyRows = () => {
    const rows = [];
    if (safeCompanyData.yrityksenNimi.trim() !== '') {
      rows.push(['Yrityksen nimi', safeCompanyData.yrityksenNimi]);
    }
    if (safeCompanyData.yrittajienNimet.trim() !== '') {
      rows.push(['Yrittäjien nimet', safeCompanyData.yrittajienNimet]);
    }
    if (safeCompanyData.yhtiomuoto.trim() !== '') {
      rows.push(['Yhtiömuoto', safeCompanyData.yhtiomuoto]);
    }
    if (safeCompanyData.tilanKokonaistyovoima.trim() !== '') {
      rows.push(['Tilan kokonaistyövoima', safeCompanyData.tilanKokonaistyovoima]);
    }
    if (safeCompanyData.karjakoko.trim() !== '') {
      rows.push(['Karjakoko', safeCompanyData.karjakoko]);
    }
    if (safeCompanyData.peltoala.trim() !== '') {
      rows.push(['Peltoala', safeCompanyData.peltoala]);
    }
    if (safeCompanyData.tuotomanTavanomainen.trim() !== '') {
      rows.push(['Luomu vai tavanomainen', safeCompanyData.tuotomanTavanomainen]);
    }
    if (safeCompanyData.navettatyyppi.trim() !== '') {
      rows.push(['Navettatyyppi', safeCompanyData.navettatyyppi]);
    }
    if (safeCompanyData.lypsyjärjestelmä.trim() !== '') {
      rows.push(['Lypsyjärjestelmä', safeCompanyData.lypsyjärjestelmä]);
    }
    return rows;
  };

  // Muodostetaan ympäristö-lomakkeen rivit (Kaikki 23 riviä)
  const makeEnvironmentRows = () => {
    const rows = [];
    const addRow = (header, result, additional, goals) => {
      if (
        result.trim() !== '' ||
        additional.trim() !== '' ||
        goals.trim() !== ''
      ) {
        rows.push([header, result, additional, goals]);
      }
    };

    addRow(
      "Maidon hiilijalanjälki, Co2/kg maitoa",
      envData.maidonHiilijalanjalki,
      envData.maidonHiilijalanjalkiLisatiedot,
      envData.maidonHiilijalanjalkiTavoitteet
    );
    addRow(
      "Scope 1 päästö, tCO2e, %",
      envData.scope1,
      envData.scope1Lisatiedot,
      envData.scope1Tavoitteet
    );
    addRow(
      "Scope 2 päästö, tCO2e, %",
      envData.scope2,
      envData.scope2Lisatiedot,
      envData.scope2Tavoitteet
    );
    addRow(
      "Scope 3 päästö, tCO2e, %",
      envData.scope3,
      envData.scope3Lisatiedot,
      envData.scope3Tavoitteet
    );
    addRow(
      "Hiiliviljelykoulutus suoritettu, kyllä/ei",
      envData.hiiliviljelykoulutus,
      envData.hiiliviljelykoulutusLisatiedot,
      envData.hiiliviljelykoulutusTavoitteet
    );
    addRow(
      "Hiiliviljelytoimenpiteet rehuntuotannossa, ha",
      envData.hiiliviljelytoimenpiteet,
      envData.hiiliviljelytoimenpiteetLisatiedot,
      envData.hiiliviljelytoimenpiteetTavoitteet
    );
    addRow(
      "Keskilehmäluku, kpl",
      envData.keskilehmaluku,
      envData.keskilehmalukuLisatiedot,
      envData.keskilehmalukuTavoitteet
    );
    addRow(
      "Poikimaväli, vrk",
      envData.poikimavali,
      envData.poikimavaliLisatiedot,
      envData.poikimavaliTavoitteet
    );
    addRow(
      "Hiehopoikimaikä, kk",
      envData.hiehopoikimaika,
      envData.hiehopoikimaikaLisatiedot,
      envData.hiehopoikimaikaTavoitteet
    );
    addRow(
      "Keskituotos, EKM kg/lehmä",
      envData.keskituotos,
      envData.keskituotosLisatiedot,
      envData.keskituotosTavoitteet
    );
    addRow(
      "Tuotosseurannan rasva%, vuoden keskiarvo",
      envData.tuotosRasva,
      envData.tuotosRasvaLisatiedot,
      envData.tuotosRasvaTavoitteet
    );
    addRow(
      "Tuotosseurannan valkuais%, vuoden keskiarvo",
      envData.tuotosValkuainen,
      envData.tuotosValkuainenLisatiedot,
      envData.tuotosValkuainenTavoitteet
    );
    addRow(
      "Maidon ureapitoisuus, mg/100 ml",
      envData.maidonUrea,
      envData.maidonUreaLisatiedot,
      envData.maidonUreaTavoitteet
    );
    addRow(
      "Meijerimaidon osuus, %",
      envData.meijerimaidonOsuus,
      envData.meijerimaidonOsuusLisatiedot,
      envData.meijerimaidonOsuusTavoitteet
    );
    addRow(
      "Käytössä vähäpäästöinen kylmäaine tilasäililössä, kyllä/ei",
      envData.kaytossaVahapaastoinenKylmainetilasaililossa,
      envData.kaytossaVahapaastoinenKylmainetilasaililossaLisatiedot,
      envData.kaytossaVahapaastoinenKylmainetilasaililossaTavoitteet
    );
    addRow(
      "Karkearehun osuus lypsylehmien ruokinnassa, %",
      envData.karkearehunOsuus,
      envData.karkearehunOsuusLisatiedot,
      envData.karkearehunOsuusTavoitteet
    );
    addRow(
      "Päästöjä vähentävät lisäravinteet lypsylehmillä käytössä, kyllä/ei",
      envData.paastojaVahentavatLisaravinteet,
      envData.paastojaVahentavatLisaravinteetLisatiedot,
      envData.paastojaVahentavatLisaravinteetTavoitteet
    );
    addRow(
      "Ruokinnan seurantalaskelmia tehty, kyllä/ei",
      envData.ruokinnanSeurantalaskelmiaTehty,
      envData.ruokinnanSeurantalaskelmiaTehtyLisatiedot,
      envData.ruokinnanSeurantalaskelmiaTehtyTavoitteet
    );
    addRow(
      "Kuiva-ainekiloa rehua/EKM kg (kaikki rehut yhteensä)",
      envData.kuivaAinekiloa,
      envData.kuivaAinekiloaLisatiedot,
      envData.kuivaAinekiloaTavoitteet
    );
    addRow(
      "Typen hyväksikäyttö % ruokinnassa",
      envData.typenHyvaksykaytto,
      envData.typenHyvaksykayttoLisatiedot,
      envData.typenHyvaksykayttoTavoitteet
    );
    addRow(
      "Rehun säästöindeksin huomioiminen jalostuksessa, kyllä/ei",
      envData.rehunSaastoindeksi,
      envData.rehunSaastoindeksiLisatiedot,
      envData.rehunSaastoindeksiTavoitteet
    );
    addRow(
      "Ruokinnan omavaraisuusaste % (kaikki rehut yhteensä)",
      envData.ruokinnanOmavaraisuusaste,
      envData.ruokinnanOmavaraisuusasteLisatiedot,
      envData.ruokinnanOmavaraisuusasteTavoitteet
    );
    addRow(
      "Muut mahdolliset toimenpiteet",
      envData.muutToimenpiteet,
      envData.muutToimenpiteetLisatiedot,
      envData.muutToimenpiteetTavoitteet
    );
    return rows;
  };

  // PDF-tallennusfunktio
  const handlePDFSave = () => {
    const doc = new jsPDF();
    let currentY = 20;

    // 1) Lisää PDF:ään otsikko
    doc.setFontSize(16);
    doc.text('Maitotilan ESG -vastuullisuusraportti', 20, currentY);
    currentY += 20;

    // 2) Lisää johdantoteksti
    doc.setFontSize(10);
    const introText = `ESG on lyhenne englannin kielen sanoista Environmental, Social ja Governance. 
Termillä tarkoitetaan ympäristöön, yhteiskuntavastuuseen ja hallintotapaan liittyvien tekijöiden tunnistamista, 
toimintatapoja ja niistä raportointia. Tulevaisuudessa maidontuotannon vastuullisuuskäsite laajenee ja sen 
osoittaminen ja raportointi korostuvat yhteiskunnan, asiakkaiden, rahoituslaitosten ja kuluttajien vaatimuksista. 
Vastuullisuusraportointi tulee nousemaan talousraportoinnin rinnalle osaksi lainoitus- ja rahoitusprosesseja.`;
    const splittedText = doc.splitTextToSize(introText, 170);
    doc.text(splittedText, 20, currentY);
    currentY += splittedText.length * 5 + 20;

    // 3) Yrityksen perustiedot
    const compRows = makeCompanyRows();
    if (compRows.length > 0) {
      doc.setFontSize(12);
      doc.text('Yrityksen perustiedot', 20, currentY);
      currentY += 10;
      autoTable(doc, {
        startY: currentY,
        head: [['Kenttä', 'Arvo']],
        body: compRows,
        margin: { left: 20, right: 20 },
        styles: { fontSize: 10 }
      });
      currentY = doc.lastAutoTable.finalY + 20;
    }

    // 4) Ympäristö-osuus
    doc.setFontSize(12);
    doc.text('1. Hiilijalanjälki ja tuotannon tehokkuus', 20, currentY);
    currentY += 10;

    const envRows = makeEnvironmentRows();
    if (envRows.length > 0) {
      autoTable(doc, {
        startY: currentY,
        head: [['Kenttä', 'Uusin tulos / Arvo', 'Lisätiedot', 'Tavoitteet ja aikataulut']],
        body: envRows,
        margin: { left: 20, right: 20 },
        styles: { fontSize: 10 }
      });
    }

    // 5) Tallennetaan PDF
    doc.save('Maitotilan_ESG_raportti.pdf');
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Info-boksi */}
      <div
        style={{
          border: '1px solid #ccc',
          backgroundColor: '#f9f9f9',
          padding: '1rem',
          marginBottom: '1rem'
        }}
      >
        <p style={{ margin: 0 }}>
          <strong>
            Ohjeistuslaatikkoon/kysymysmerkin taakse ao. tieto tai suluissa oleva lisätieto:
          </strong>
        </p>
        <ul style={{ marginTop: '0.5rem' }}>
          <li style={{ color: 'green' }}>
            Tieto löytyy tuotosseurannasta tai meijerin tiedoista
          </li>
          <li style={{ color: 'blue' }}>
            Tieto löytyy hiilijalanjälkilaskurista
          </li>
        </ul>
      </div>

      <h2>Ympäristö</h2>
      <h3>1. Hiilijalanjälki ja tuotannon tehokkuus</h3>

      <form onSubmit={handleSubmit}>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={styles.th}>Hiilijalanjälki ja tuotannon tehokkuus</th>
              <th style={styles.th}>Uusin tulos</th>
              <th style={styles.th}>Lisätiedot</th>
              <th style={styles.th}>Tavoitteet ja aikataulut</th>
            </tr>
          </thead>
          <tbody>
            {/* 1. Maidon hiilijalanjälki (sininen) */}
            <tr style={{ color: 'blue' }}>
              <td style={styles.td}>Maidon hiilijalanjälki, Co2/kg maitoa</td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="maidonHiilijalanjalki"
                  value={envData.maidonHiilijalanjalki}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="maidonHiilijalanjalkiLisatiedot"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="maidonHiilijalanjalkiTavoitteet"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            {/* 2. Scope 1 (sininen) */}
            <tr style={{ color: 'blue' }}>
              <td style={styles.td}>Scope 1 päästö, tCO2e, %</td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="scope1"
                  value={envData.scope1}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="scope1Lisatiedot"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="scope1Tavoitteet"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            {/* 3. Scope 2 (sininen) */}
            <tr style={{ color: 'blue' }}>
              <td style={styles.td}>Scope 2 päästö, tCO2e, %</td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="scope2"
                  value={envData.scope2}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="scope2Lisatiedot"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="scope2Tavoitteet"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            {/* 4. Scope 3 (sininen) */}
            <tr style={{ color: 'blue' }}>
              <td style={styles.td}>Scope 3 päästö, tCO2e, %</td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="scope3"
                  value={envData.scope3}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="scope3Lisatiedot"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="scope3Tavoitteet"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            {/* 5. Hiiliviljelykoulutus (mustana) */}
            <tr>
              <td style={styles.td}>Hiiliviljelykoulutus suoritettu, kyllä/ei</td>
              <td style={styles.td}>
                <select
                  name="hiiliviljelykoulutus"
                  value={envData.hiiliviljelykoulutus}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                >
                  <option value="">Valitse</option>
                  <option value="kylla">Kyllä</option>
                  <option value="ei">Ei</option>
                </select>
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="hiiliviljelykoulutusLisatiedot"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="hiiliviljelykoulutusTavoitteet"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            {/* 6. Hiiliviljelytoimenpiteet (mustana) */}
            <tr>
              <td style={styles.td}>Hiiliviljelytoimenpiteet rehuntuotannossa, ha</td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="hiiliviljelytoimenpiteet"
                  value={envData.hiiliviljelytoimenpiteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="hiiliviljelytoimenpiteetLisatiedot"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="hiiliviljelytoimenpiteetTavoitteet"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            {/* 7. Keskilehmäluku (vihreä) */}
            <tr style={{ color: 'green' }}>
              <td style={styles.td}>Keskilehmäluku, kpl</td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="keskilehmaluku"
                  value={envData.keskilehmaluku}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="keskilehmalukuLisatiedot"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="keskilehmalukuTavoitteet"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            {/* 8. Poikimaväli (vihreä) */}
            <tr style={{ color: 'green' }}>
              <td style={styles.td}>Poikimaväli, vrk</td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="poikimavali"
                  value={envData.poikimavali}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="poikimavaliLisatiedot"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="poikimavaliTavoitteet"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            {/* 9. Hiehopoikimaikä (vihreä) */}
            <tr style={{ color: 'green' }}>
              <td style={styles.td}>Hiehopoikimaikä, kk</td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="hiehopoikimaika"
                  value={envData.hiehopoikimaika}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="hiehopoikimaikaLisatiedot"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="hiehopoikimaikaTavoitteet"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            {/* 10. Keskituotos (vihreä) */}
            <tr style={{ color: 'green' }}>
              <td style={styles.td}>Keskituotos, EKM kg/lehmä</td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="keskituotos"
                  value={envData.keskituotos}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="keskituotosLisatiedot"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="keskituotosTavoitteet"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            {/* 11. Tuotosseurannan rasva% (mustana) */}
            <tr>
              <td style={styles.td}>Tuotosseurannan rasva%, vuoden keskiarvo</td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="tuotosRasva"
                  value={envData.tuotosRasva}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="tuotosRasvaLisatiedot"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="tuotosRasvaTavoitteet"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            {/* 12. Tuotosseurannan valkuais% (mustana) */}
            <tr>
              <td style={styles.td}>Tuotosseurannan valkuais%, vuoden keskiarvo</td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="tuotosValkuainen"
                  value={envData.tuotosValkuainen}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="tuotosValkuainenLisatiedot"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="tuotosValkuainenTavoitteet"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            {/* 13. Maidon ureapitoisuus (vihreä) */}
            <tr style={{ color: 'green' }}>
              <td style={styles.td}>Maidon ureapitoisuus, mg/100 ml</td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="maidonUrea"
                  value={envData.maidonUrea}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="maidonUreaLisatiedot"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="maidonUreaTavoitteet"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            {/* 14. Meijerimaidon osuus (vihreä) */}
            <tr style={{ color: 'green' }}>
              <td style={styles.td}>Meijerimaidon osuus, %</td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="meijerimaidonOsuus"
                  value={envData.meijerimaidonOsuus}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="meijerimaidonOsuusLisatiedot"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="meijerimaidonOsuusTavoitteet"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            {/* 15. Käytössä vähäpäästöinen kylmäaine (sininen) */}
            <tr style={{ color: 'blue' }}>
              <td style={styles.td}>
                Käytössä vähäpäästöinen kylmäaine tilasäililössä, kyllä/ei
              </td>
              <td style={styles.td}>
                <select
                  name="kaytossaVahapaastoinenKylmainetilasaililossa"
                  value={envData.kaytossaVahapaastoinenKylmainetilasaililossa}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                >
                  <option value="">Valitse</option>
                  <option value="kylla">Kyllä</option>
                  <option value="ei">Ei</option>
                </select>
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="kaytossaVahapaastoinenKylmainetilasaililossaLisatiedot"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="kaytossaVahapaastoinenKylmainetilasaililossaTavoitteet"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            {/* 16. Karkearehun osuus (vihreä) */}
            <tr style={{ color: 'green' }}>
              <td style={styles.td}>
                Karkearehun osuus lypsylehmien ruokinnassa, %
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="karkearehunOsuus"
                  value={envData.karkearehunOsuus}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="karkearehunOsuusLisatiedot"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="karkearehunOsuusTavoitteet"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            {/* 17. Päästöjä vähentävät lisäravinteet (sininen) */}
            <tr style={{ color: 'blue' }}>
              <td style={styles.td}>
                Päästöjä vähentävät lisäravinteet lypsylehmillä käytössä, kyllä/ei
              </td>
              <td style={styles.td}>
                <select
                  name="paastojaVahentavatLisaravinteet"
                  value={envData.paastojaVahentavatLisaravinteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                >
                  <option value="">Valitse</option>
                  <option value="kylla">Kyllä</option>
                  <option value="ei">Ei</option>
                </select>
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="paastojaVahentavatLisaravinteetLisatiedot"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="paastojaVahentavatLisaravinteetTavoitteet"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            {/* 18. Ruokinnan seurantalaskelmia tehty (mustana) */}
            <tr>
              <td style={styles.td}>Ruokinnan seurantalaskelmia tehty, kyllä/ei</td>
              <td style={styles.td}>
                <select
                  name="ruokinnanSeurantalaskelmiaTehty"
                  value={envData.ruokinnanSeurantalaskelmiaTehty}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                >
                  <option value="">Valitse</option>
                  <option value="kylla">Kyllä</option>
                  <option value="ei">Ei</option>
                </select>
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="ruokinnanSeurantalaskelmiaTehtyLisatiedot"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="ruokinnanSeurantalaskelmiaTehtyTavoitteet"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            {/* 19. Kuiva-ainekiloa rehua/EKM kg (mustana) */}
            <tr>
              <td style={styles.td}>
                Kuiva-ainekiloa rehua/EKM kg (kaikki rehut yhteensä)
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="kuivaAinekiloa"
                  value={envData.kuivaAinekiloa}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="kuivaAinekiloaLisatiedot"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="kuivaAinekiloaTavoitteet"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            {/* 20. Typen hyväksikäyttö (mustana) */}
            <tr>
              <td style={styles.td}>Typen hyväksikäyttö % ruokinnassa</td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="typenHyvaksykaytto"
                  value={envData.typenHyvaksykaytto}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="typenHyvaksykayttoLisatiedot"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="typenHyvaksykayttoTavoitteet"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            {/* 21. Rehun säästöindeksi (mustana) */}
            <tr>
              <td style={styles.td}>
                Rehun säästöindeksin huomioiminen jalostuksessa, kyllä/ei
              </td>
              <td style={styles.td}>
                <select
                  name="rehunSaastoindeksi"
                  value={envData.rehunSaastoindeksi}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                >
                  <option value="">Valitse</option>
                  <option value="kylla">Kyllä</option>
                  <option value="ei">Ei</option>
                </select>
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="rehunSaastoindeksiLisatiedot"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="rehunSaastoindeksiTavoitteet"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            {/* 22. Ruokinnan omavaraisuusaste (mustana) */}
            <tr>
              <td style={styles.td}>
                Ruokinnan omavaraisuusaste % (kaikki rehut yhteensä)
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="ruokinnanOmavaraisuusaste"
                  value={envData.ruokinnanOmavaraisuusaste}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="ruokinnanOmavaraisuusasteLisatiedot"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="ruokinnanOmavaraisuusasteTavoitteet"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            {/* 23. Muut mahdolliset toimenpiteet (mustana) */}
            <tr>
              <td style={styles.td}>Muut mahdolliset toimenpiteet</td>
              <td style={styles.td}>
                <textarea
                  name="muutToimenpiteet"
                  value={envData.muutToimenpiteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                  rows={2}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="muutToimenpiteetLisatiedot"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="muutToimenpiteetTavoitteet"
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* Navigointi- ja PDF-painikkeet */}
        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center' }}>
          <button type="button" onClick={onPrevious} style={{ marginRight: '1rem' }}>
            Edellinen
          </button>
          <button type="submit" style={{ marginRight: '1rem' }}>
            Seuraava
          </button>
          <button type="button" onClick={handlePDFSave}>
            Tallenna PDF
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  th: {
    border: '1px solid #ccc',
    padding: '8px',
    backgroundColor: '#f0f0f0',
    textAlign: 'left'
  },
  td: {
    border: '1px solid #ccc',
    padding: '8px'
  }
};

export default EnvironmentPage;

