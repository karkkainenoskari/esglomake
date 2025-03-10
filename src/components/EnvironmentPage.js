import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const EnvironmentPage = ({ onNext, onPrevious, companyData }) => {
  const [envData, setEnvData] = useState({
    // === 2.1 Hiilijalanjälki ja tuotannon tehokkuus (environment) ===
    envMaidonHiilijalanjalki: '',
    envMaidonHiilijalanjalkiLisatiedot: '',
    envMaidonHiilijalanjalkiTavoitteet: '',

    envScope1: '',
    envScope1Lisatiedot: '',
    envScope1Tavoitteet: '',

    envScope2: '',
    envScope2Lisatiedot: '',
    envScope2Tavoitteet: '',

    envScope3: '',
    envScope3Lisatiedot: '',
    envScope3Tavoitteet: '',

    envHiiliviljelykoulutus: '',
    envHiiliviljelykoulutusLisatiedot: '',
    envHiiliviljelykoulutusTavoitteet: '',

    envHiiliviljelytoimenpiteet: '',
    envHiiliviljelytoimenpiteetLisatiedot: '',
    envHiiliviljelytoimenpiteetTavoitteet: '',

    envKeskilehmaluku: '',
    envKeskilehmalukuLisatiedot: '',
    envKeskilehmalukuTavoitteet: '',

    envPoikimavali: '',
    envPoikimavaliLisatiedot: '',
    envPoikimavaliTavoitteet: '',

    envHiehopoikimaika: '',
    envHiehopoikimaikaLisatiedot: '',
    envHiehopoikimaikaTavoitteet: '',

    envKeskituotos: '',
    envKeskituotosLisatiedot: '',
    envKeskituotosTavoitteet: '',

    envTuotosRasva: '',
    envTuotosRasvaLisatiedot: '',
    envTuotosRasvaTavoitteet: '',

    envTuotosValkuainen: '',
    envTuotosValkuainenLisatiedot: '',
    envTuotosValkuainenTavoitteet: '',

    envMaidonUrea: '',
    envMaidonUreaLisatiedot: '',
    envMaidonUreaTavoitteet: '',

    envMeijerimaidonOsuus: '',
    envMeijerimaidonOsuusLisatiedot: '',
    envMeijerimaidonOsuusTavoitteet: '',

    envKaytossaVahapaastoinenKylmainetilasaililossa: '',
    envKaytossaVahapaastoinenKylmainetilasaililossaLisatiedot: '',
    envKaytossaVahapaastoinenKylmainetilasaililossaTavoitteet: '',

    envKarkearehunOsuus: '',
    envKarkearehunOsuusLisatiedot: '',
    envKarkearehunOsuusTavoitteet: '',

    envPaastojaVahentavatLisaravinteet: '',
    envPaastojaVahentavatLisaravinteetLisatiedot: '',
    envPaastojaVahentavatLisaravinteetTavoitteet: '',

    envRuokinnanSeurantalaskelmiaTehty: '',
    envRuokinnanSeurantalaskelmiaTehtyLisatiedot: '',
    envRuokinnanSeurantalaskelmiaTehtyTavoitteet: '',

    envKuivaAinekiloa: '',
    envKuivaAinekiloaLisatiedot: '',
    envKuivaAinekiloaTavoitteet: '',

    envTypenHyvaksykaytto: '',
    envTypenHyvaksykayttoLisatiedot: '',
    envTypenHyvaksykayttoTavoitteet: '',

    envRehunSaastoindeksi: '',
    envRehunSaastoindeksiLisatiedot: '',
    envRehunSaastoindeksiTavoitteet: '',

    envRuokinnanOmavaraisuusaste: '',
    envRuokinnanOmavaraisuusasteLisatiedot: '',
    envRuokinnanOmavaraisuusasteTavoitteet: '',

    envMuutToimenpiteet: '',
    envMuutToimenpiteetLisatiedot: '',
    envMuutToimenpiteetTavoitteet: '',

    // === 2.2 Monimuotoisuus (diversity) ===
    divHoitosopimus: '',
    divHoitosopimusLisatiedot: '',
    divHoitosopimusTavoitteet: '',

    divPintaAla: '',
    divPintaAlaLisatiedot: '',
    divPintaAlaTavoitteet: '',

    divKosteikot: '',
    divKosteikotLisatiedot: '',
    divKosteikotTavoitteet: '',

    divBiodiversiteetti: '',
    divBiodiversiteettiLisatiedot: '',
    divBiodiversiteettiTavoitteet: '',

    divSuomenkarja: '',
    divSuomenkarjaLisatiedot: '',
    divSuomenkarjaTavoitteet: '',

    divRisteytys: '',
    divRisteytysLisatiedot: '',
    divRisteytysTavoitteet: '',

    divSoijaGM: '',
    divSoijaGMLisatiedot: '',
    divSoijaGMTavoitteet: '',

    divPalmu: '',
    divPalmuLisatiedot: '',
    divPalmuTavoitteet: '',

    divErityisetToimenpiteet: '',
    divErityisetToimenpiteetLisatiedot: '',
    divErityisetToimenpiteetTavoitteet: '',

    divLohkokoko: '',
    divLohkokokoLisatiedot: '',
    divLohkokokoTavoitteet: '',

    divLohkoetaisyys: '',
    divLohkoetaisyysLisatiedot: '',
    divLohkoetaisyysTavoitteet: '',

    divPeltoviljely: '',
    divPeltoviljelyLisatiedot: '',
    divPeltoviljelyTavoitteet: '',

    divVesitalous: '',
    divVesitalousLisatiedot: '',
    divVesitalousTavoitteet: '',

    divErityisetToimenpiteet2: '',
    divErityisetToimenpiteet2Lisatiedot: '',
    divErityisetToimenpiteet2Tavoitteet: '',

    // === 2.3 Lannan käsittely ja jätehuolto (Lanta) ===
    lantaYmparistolupa: '',
    lantaLietelannanOsuus: '',
    lantaLevitysmenetelma: '',
    lantaKuivikemateriaali: '',
    lantaJatemuovit: '',
    lantaVaarallisetAineet: '',
    lantaJateoljy: '',
    lantaPuristeneste: '',
    lantaMuutToimenpiteet: ''
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

  // PDF-tallennus (esimerkkinä; toteuta haluamallasi tavalla)
  const handlePDFSave = () => {
    alert("PDF-tallennus - toteuta jsPDF-logiikalla.");
  };

  // Taulukkorakenteiden tyylit
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

  return (
    <div style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>Ympäristö</h2>
      
      {/* 2.1 Hiilijalanjälki ja tuotannon tehokkuus */}
      <h3>2.1 Hiilijalanjälki ja tuotannon tehokkuus</h3>
      <table style={{ borderCollapse: 'collapse', width: '100%', marginBottom: '2rem' }}>
        <thead>
          <tr>
            <th style={styles.th}>Hiilijalanjälki ja tuotannon tehokkuus</th>
            <th style={styles.th}>Uusin tulos</th>
            <th style={styles.th}>Lisätiedot</th>
            <th style={styles.th}>Tavoitteet ja aikataulut</th>
          </tr>
        </thead>
        <tbody>
          {/* Maidon hiilijalanjälki */}
          <tr style={{ color: 'blue' }}>
            <td style={styles.td}>Maidon hiilijalanjälki, Co2/kg maitoa</td>
            <td style={styles.td}>
              <input
                type="text"
                name="envMaidonHiilijalanjalki"
                value={envData.envMaidonHiilijalanjalki}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envMaidonHiilijalanjalkiLisatiedot"
                value={envData.envMaidonHiilijalanjalkiLisatiedot}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envMaidonHiilijalanjalkiTavoitteet"
                value={envData.envMaidonHiilijalanjalkiTavoitteet}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          {/* Scope 1 */}
          <tr style={{ color: 'blue' }}>
            <td style={styles.td}>Scope 1 päästö, tCO2e, %</td>
            <td style={styles.td}>
              <input
                type="text"
                name="envScope1"
                value={envData.envScope1}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envScope1Lisatiedot"
                value={envData.envScope1Lisatiedot}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envScope1Tavoitteet"
                value={envData.envScope1Tavoitteet}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          {/* Scope 2 */}
          <tr style={{ color: 'blue' }}>
            <td style={styles.td}>Scope 2 päästö, tCO2e, %</td>
            <td style={styles.td}>
              <input
                type="text"
                name="envScope2"
                value={envData.envScope2}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envScope2Lisatiedot"
                value={envData.envScope2Lisatiedot}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envScope2Tavoitteet"
                value={envData.envScope2Tavoitteet}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          {/* Scope 3 */}
          <tr style={{ color: 'blue' }}>
            <td style={styles.td}>Scope 3 päästö, tCO2e, %</td>
            <td style={styles.td}>
              <input
                type="text"
                name="envScope3"
                value={envData.envScope3}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envScope3Lisatiedot"
                value={envData.envScope3Lisatiedot}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envScope3Tavoitteet"
                value={envData.envScope3Tavoitteet}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          {/* Hiiliviljelykoulutus */}
          <tr>
            <td style={styles.td}>Hiiliviljelykoulutus suoritettu, kyllä/ei</td>
            <td style={styles.td}>
              <select
                name="envHiiliviljelykoulutus"
                value={envData.envHiiliviljelykoulutus}
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
                name="envHiiliviljelykoulutusLisatiedot"
                value={envData.envHiiliviljelykoulutusLisatiedot}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envHiiliviljelykoulutusTavoitteet"
                value={envData.envHiiliviljelykoulutusTavoitteet}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          {/* Hiiliviljelytoimenpiteet */}
          <tr>
            <td style={styles.td}>Hiiliviljelytoimenpiteet rehuntuotannossa, ha</td>
            <td style={styles.td}>
              <input
                type="text"
                name="envHiiliviljelytoimenpiteet"
                value={envData.envHiiliviljelytoimenpiteet}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envHiiliviljelytoimenpiteetLisatiedot"
                value={envData.envHiiliviljelytoimenpiteetLisatiedot}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envHiiliviljelytoimenpiteetTavoitteet"
                value={envData.envHiiliviljelytoimenpiteetTavoitteet}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          {/* Keskilehmäluku */}
          <tr style={{ color: 'green' }}>
            <td style={styles.td}>Keskilehmäluku, kpl</td>
            <td style={styles.td}>
              <input
                type="text"
                name="envKeskilehmaluku"
                value={envData.envKeskilehmaluku}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envKeskilehmalukuLisatiedot"
                value={envData.envKeskilehmalukuLisatiedot}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envKeskilehmalukuTavoitteet"
                value={envData.envKeskilehmalukuTavoitteet}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          {/* Poikimaväli */}
          <tr style={{ color: 'green' }}>
            <td style={styles.td}>Poikimaväli, vrk</td>
            <td style={styles.td}>
              <input
                type="text"
                name="envPoikimavali"
                value={envData.envPoikimavali}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envPoikimavaliLisatiedot"
                value={envData.envPoikimavaliLisatiedot}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envPoikimavaliTavoitteet"
                value={envData.envPoikimavaliTavoitteet}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          {/* Hiehopoikimaikä */}
          <tr style={{ color: 'green' }}>
            <td style={styles.td}>Hiehopoikimaikä, kk</td>
            <td style={styles.td}>
              <input
                type="text"
                name="envHiehopoikimaika"
                value={envData.envHiehopoikimaika}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envHiehopoikimaikaLisatiedot"
                value={envData.envHiehopoikimaikaLisatiedot}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envHiehopoikimaikaTavoitteet"
                value={envData.envHiehopoikimaikaTavoitteet}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          {/* Keskituotos */}
          <tr style={{ color: 'green' }}>
            <td style={styles.td}>Keskituotos, EKM kg/lehmä</td>
            <td style={styles.td}>
              <input
                type="text"
                name="envKeskituotos"
                value={envData.envKeskituotos}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envKeskituotosLisatiedot"
                value={envData.envKeskituotosLisatiedot}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envKeskituotosTavoitteet"
                value={envData.envKeskituotosTavoitteet}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          {/* Tuotosseurannan rasva% */}
          <tr>
            <td style={styles.td}>Tuotosseurannan rasva%, vuoden keskiarvo</td>
            <td style={styles.td}>
              <input
                type="text"
                name="envTuotosRasva"
                value={envData.envTuotosRasva}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envTuotosRasvaLisatiedot"
                value={envData.envTuotosRasvaLisatiedot}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envTuotosRasvaTavoitteet"
                value={envData.envTuotosRasvaTavoitteet}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          {/* Tuotosseurannan valkuais% */}
          <tr>
            <td style={styles.td}>Tuotosseurannan valkuais%, vuoden keskiarvo</td>
            <td style={styles.td}>
              <input
                type="text"
                name="envTuotosValkuainen"
                value={envData.envTuotosValkuainen}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envTuotosValkuainenLisatiedot"
                value={envData.envTuotosValkuainenLisatiedot}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envTuotosValkuainenTavoitteet"
                value={envData.envTuotosValkuainenTavoitteet}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          {/* Maidon ureapitoisuus */}
          <tr style={{ color: 'green' }}>
            <td style={styles.td}>Maidon ureapitoisuus, mg/100 ml</td>
            <td style={styles.td}>
              <input
                type="text"
                name="envMaidonUrea"
                value={envData.envMaidonUrea}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envMaidonUreaLisatiedot"
                value={envData.envMaidonUreaLisatiedot}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envMaidonUreaTavoitteet"
                value={envData.envMaidonUreaTavoitteet}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          {/* Meijerimaidon osuus */}
          <tr style={{ color: 'green' }}>
            <td style={styles.td}>Meijerimaidon osuus, %</td>
            <td style={styles.td}>
              <input
                type="text"
                name="envMeijerimaidonOsuus"
                value={envData.envMeijerimaidonOsuus}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envMeijerimaidonOsuusLisatiedot"
                value={envData.envMeijerimaidonOsuusLisatiedot}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envMeijerimaidonOsuusTavoitteet"
                value={envData.envMeijerimaidonOsuusTavoitteet}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          {/* Käytössä vähäpäästöinen kylmäaine */}
          <tr style={{ color: 'blue' }}>
            <td style={styles.td}>Käytössä vähäpäästöinen kylmäaine tilasäililössä, kyllä/ei</td>
            <td style={styles.td}>
              <select
                name="envKaytossaVahapaastoinenKylmainetilasaililossa"
                value={envData.envKaytossaVahapaastoinenKylmainetilasaililossa}
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
                name="envKaytossaVahapaastoinenKylmainetilasaililossaLisatiedot"
                value={envData.envKaytossaVahapaastoinenKylmainetilasaililossaLisatiedot}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envKaytossaVahapaastoinenKylmainetilasaililossaTavoitteet"
                value={envData.envKaytossaVahapaastoinenKylmainetilasaililossaTavoitteet}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          {/* Karkearehun osuus */}
          <tr style={{ color: 'green' }}>
            <td style={styles.td}>Karkearehun osuus lypsylehmien ruokinnassa, %</td>
            <td style={styles.td}>
              <input
                type="text"
                name="envKarkearehunOsuus"
                value={envData.envKarkearehunOsuus}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envKarkearehunOsuusLisatiedot"
                value={envData.envKarkearehunOsuusLisatiedot}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envKarkearehunOsuusTavoitteet"
                value={envData.envKarkearehunOsuusTavoitteet}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          {/* Paastoja vähentävät lisäravinteet */}
          <tr style={{ color: 'blue' }}>
            <td style={styles.td}>Päästöjä vähentävät lisäravinteet lypsylehmillä käytössä, kyllä/ei</td>
            <td style={styles.td}>
              <select
                name="envPaastojaVahentavatLisaravinteet"
                value={envData.envPaastojaVahentavatLisaravinteet}
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
                name="envPaastojaVahentavatLisaravinteetLisatiedot"
                value={envData.envPaastojaVahentavatLisaravinteetLisatiedot}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envPaastojaVahentavatLisaravinteetTavoitteet"
                value={envData.envPaastojaVahentavatLisaravinteetTavoitteet}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          {/* Ruokinnan seurantalaskelmia tehty */}
          <tr>
            <td style={styles.td}>Ruokinnan seurantalaskelmia tehty, kyllä/ei</td>
            <td style={styles.td}>
              <select
                name="envRuokinnanSeurantalaskelmiaTehty"
                value={envData.envRuokinnanSeurantalaskelmiaTehty}
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
                name="envRuokinnanSeurantalaskelmiaTehtyLisatiedot"
                value={envData.envRuokinnanSeurantalaskelmiaTehtyLisatiedot}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envRuokinnanSeurantalaskelmiaTehtyTavoitteet"
                value={envData.envRuokinnanSeurantalaskelmiaTehtyTavoitteet}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          {/* Kuiva-ainekiloa rehua/EKM kg */}
          <tr>
            <td style={styles.td}>
              Kuiva-ainekiloa rehua/EKM kg (kaikki rehut yhteensä)
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envKuivaAinekiloa"
                value={envData.envKuivaAinekiloa}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envKuivaAinekiloaLisatiedot"
                value={envData.envKuivaAinekiloaLisatiedot}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envKuivaAinekiloaTavoitteet"
                value={envData.envKuivaAinekiloaTavoitteet}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          {/* Typen hyväksikäyttö */}
          <tr>
            <td style={styles.td}>Typen hyväksikäyttö % ruokinnassa</td>
            <td style={styles.td}>
              <input
                type="text"
                name="envTypenHyvaksykaytto"
                value={envData.envTypenHyvaksykaytto}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envTypenHyvaksykayttoLisatiedot"
                value={envData.envTypenHyvaksykayttoLisatiedot}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envTypenHyvaksykayttoTavoitteet"
                value={envData.envTypenHyvaksykayttoTavoitteet}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          {/* Rehun säästöindeksi */}
          <tr>
            <td style={styles.td}>
              Rehun säästöindeksin huomioiminen jalostuksessa, kyllä/ei
            </td>
            <td style={styles.td}>
              <select
                name="envRehunSaastoindeksi"
                value={envData.envRehunSaastoindeksi}
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
                name="envRehunSaastoindeksiLisatiedot"
                value={envData.envRehunSaastoindeksiLisatiedot}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envRehunSaastoindeksiTavoitteet"
                value={envData.envRehunSaastoindeksiTavoitteet}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          {/* Ruokinnan omavaraisuusaste */}
          <tr>
            <td style={styles.td}>
              Ruokinnan omavaraisuusaste % (kaikki rehut yhteensä)
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envRuokinnanOmavaraisuusaste"
                value={envData.envRuokinnanOmavaraisuusaste}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envRuokinnanOmavaraisuusasteLisatiedot"
                value={envData.envRuokinnanOmavaraisuusasteLisatiedot}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envRuokinnanOmavaraisuusasteTavoitteet"
                value={envData.envRuokinnanOmavaraisuusasteTavoitteet}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          {/* Muut mahdolliset toimenpiteet */}
          <tr>
            <td style={styles.td}>Muut mahdolliset toimenpiteet</td>
            <td style={styles.td}>
              <textarea
                name="envMuutToimenpiteet"
                value={envData.envMuutToimenpiteet}
                onChange={handleChange}
                rows={2}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envMuutToimenpiteetLisatiedot"
                value={envData.envMuutToimenpiteetLisatiedot}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="envMuutToimenpiteetTavoitteet"
                value={envData.envMuutToimenpiteetTavoitteet}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
        </tbody>
      </table>

      {/* Väliotsikko 2.2 Monimuotoisuus */}
      <h3>2.2 Monimuotoisuus</h3>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={styles.th}>Monimuotoisuus</th>
            <th style={styles.th}>Uusin tulos</th>
            <th style={styles.th}>Lisätiedot</th>
            <th style={styles.th}>Tavoitteet ja aikataulut</th>
          </tr>
        </thead>
        <tbody>
          {/* 1. Maatalousluonnon ja maiseman -hoitosopimus */}
          <tr>
            <td style={styles.td}>Maatalousluonnon ja maiseman -hoitosopimus, kyllä/ei</td>
            <td style={styles.td}>
              <select
                name="divHoitosopimus"
                value={envData.divHoitosopimus}
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
                name="divHoitosopimusLisatiedot"
                value={envData.divHoitosopimusLisatiedot}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="divHoitosopimusTavoitteet"
                value={envData.divHoitosopimusTavoitteet}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          {/* 2. Monimuotoisuutta edistävä pinta-ala */}
          <tr>
            <td style={styles.td}>Monimuotoisuutta edistävä pinta-ala yhteensä, ha</td>
            <td style={styles.td}>
              <input
                type="text"
                name="divPintaAla"
                value={envData.divPintaAla}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="divPintaAlaLisatiedot"
                value={envData.divPintaAlaLisatiedot}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="divPintaAlaTavoitteet"
                value={envData.divPintaAlaTavoitteet}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          {/* 3. Kosteikot */}
          <tr>
            <td style={styles.td}>Kosteikot, ha</td>
            <td style={styles.td}>
              <input
                type="text"
                name="divKosteikot"
                value={envData.divKosteikot}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="divKosteikotLisatiedot"
                value={envData.divKosteikotLisatiedot}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="divKosteikotTavoitteet"
                value={envData.divKosteikotTavoitteet}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          {/* 4. Biodiversiteettikartoitus tehty */}
          <tr>
            <td style={styles.td}>Biodiversiteettikartoitus tehty, kyllä/ei</td>
            <td style={styles.td}>
              <select
                name="divBiodiversiteetti"
                value={envData.divBiodiversiteetti}
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
                name="divBiodiversiteettiLisatiedot"
                value={envData.divBiodiversiteettiLisatiedot}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="divBiodiversiteettiTavoitteet"
                value={envData.divBiodiversiteettiTavoitteet}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          {/* 5. Suomenkarjan eläinten kasvattaminen */}
          <tr>
            <td style={styles.td}>Suomenkarjan eläinten kasvattaminen, kyllä/ei</td>
            <td style={styles.td}>
              <select
                name="divSuomenkarja"
                value={envData.divSuomenkarja}
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
                name="divSuomenkarjaLisatiedot"
                value={envData.divSuomenkarjaLisatiedot}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="divSuomenkarjaTavoitteet"
                value={envData.divSuomenkarjaTavoitteet}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          {/* 6. Risteytyseläinten osuus */}
          <tr>
            <td style={styles.td}>Risteytyseläinten osuus lypsylehmistä, %</td>
            <td style={styles.td}>
              <input
                type="text"
                name="divRisteytys"
                value={envData.divRisteytys}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="divRisteytysLisatiedot"
                value={envData.divRisteytysLisatiedot}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="divRisteytysTavoitteet"
                value={envData.divRisteytysTavoitteet}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          {/* 7. Soija ja GM -vapaus */}
          <tr>
            <td style={styles.td}>Soija ja GM -vapaus ruokinnassa, kyllä/ei</td>
            <td style={styles.td}>
              <select
                name="divSoijaGM"
                value={envData.divSoijaGM}
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
                name="divSoijaGMLisatiedot"
                value={envData.divSoijaGMLisatiedot}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="divSoijaGMTavoitteet"
                value={envData.divSoijaGMTavoitteet}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          {/* 8. Palmuöljyttömyys */}
          <tr>
            <td style={styles.td}>Palmuöljyttömyys ruokinnassa, kyllä/ei</td>
            <td style={styles.td}>
              <select
                name="divPalmu"
                value={envData.divPalmu}
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
                name="divPalmuLisatiedot"
                value={envData.divPalmuLisatiedot}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="divPalmuTavoitteet"
                value={envData.divPalmuTavoitteet}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          {/* 9. Erityiset toimenpiteet */}
          <tr>
            <td style={styles.td}>Erityiset toimenpiteet</td>
            <td style={styles.td}>
              <textarea
                name="divErityisetToimenpiteet"
                value={envData.divErityisetToimenpiteet}
                onChange={handleChange}
                rows={2}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="divErityisetToimenpiteetLisatiedot"
                value={envData.divErityisetToimenpiteetLisatiedot}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="divErityisetToimenpiteetTavoitteet"
                value={envData.divErityisetToimenpiteetTavoitteet}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          {/* 10. Keskimääräinen lohkokoko */}
          <tr>
            <td style={styles.td}>Keskimääräinen lohkokoko, ha</td>
            <td style={styles.td}>
              <input
                type="text"
                name="divLohkokoko"
                value={envData.divLohkokoko}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="divLohkokokoLisatiedot"
                value={envData.divLohkokokoLisatiedot}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="divLohkokokoTavoitteet"
                value={envData.divLohkokokoTavoitteet}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          {/* 11. Keskimääräinen lohkoetäisyys */}
          <tr>
            <td style={styles.td}>Keskimääräinen lohkoetäisyys, km</td>
            <td style={styles.td}>
              <input
                type="text"
                name="divLohkoetaisyys"
                value={envData.divLohkoetaisyys}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="divLohkoetaisyysLisatiedot"
                value={envData.divLohkoetaisyysLisatiedot}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="divLohkoetaisyysTavoitteet"
                value={envData.divLohkoetaisyysTavoitteet}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          {/* 12. Peltoviljelyssä on käytössä toimenpiteitä */}
          <tr>
            <td style={styles.td}>
              Peltoviljelyssä on käytössä toimenpiteitä, jotka parantavat ympäristön tilaa, kyllä/ei
            </td>
            <td style={styles.td}>
              <select
                name="divPeltoviljely"
                value={envData.divPeltoviljely}
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
                name="divPeltoviljelyLisatiedot"
                value={envData.divPeltoviljelyLisatiedot}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="divPeltoviljelyTavoitteet"
                value={envData.divPeltoviljelyTavoitteet}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          {/* 13. Peltojen vesitalous */}
          <tr>
            <td style={styles.td}>
              Peltojen vesitaloutta ylläpidetään ja kehitetään, kyllä/ei
            </td>
            <td style={styles.td}>
              <select
                name="divVesitalous"
                value={envData.divVesitalous}
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
                name="divVesitalousLisatiedot"
                value={envData.divVesitalousLisatiedot}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="divVesitalousTavoitteet"
                value={envData.divVesitalousTavoitteet}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          {/* 14. Erityiset toimenpiteet (lisäkenttä) */}
          <tr>
            <td style={styles.td}>Erityiset toimenpiteet (lisäkenttä)</td>
            <td style={styles.td}>
              <textarea
                name="divErityisetToimenpiteet2"
                value={envData.divErityisetToimenpiteet2}
                onChange={handleChange}
                rows={2}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="divErityisetToimenpiteet2Lisatiedot"
                value={envData.divErityisetToimenpiteet2Lisatiedot}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td style={styles.td}>
              <input
                type="text"
                name="divErityisetToimenpiteet2Tavoitteet"
                value={envData.divErityisetToimenpiteet2Tavoitteet}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
        </tbody>
      </table>

   {/* --- 2.3 Lannan käsittely ja jätehuolto --- */}
   <h3>2.3 Lannan käsittely ja jätehuolto</h3>
      <table style={{ borderCollapse: 'collapse', width: '100%', marginBottom: '2rem' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#f0f0f0', textAlign: 'left' }}>Kenttä</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#f0f0f0', textAlign: 'left' }}>Uusin tulos / Arvo</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#f0f0f0', textAlign: 'left' }}>Lisätiedot</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', backgroundColor: '#f0f0f0', textAlign: 'left' }}>Tavoitteet ja aikataulut</th>
          </tr>
        </thead>
        <tbody>
          {/* Viimeisin ympäristölupa, pvm */}
          <tr>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>Viimeisin ympäristölupa, pvm</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              <input type="text" name="lantaYmparistolupa" value={envData.lantaYmparistolupa} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              <input type="text" name="lantaYmparistolupaLisatiedot" value={envData.lantaYmparistolupaLisatiedot || ''} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              <input type="text" name="lantaYmparistolupaTavoitteet" value={envData.lantaYmparistolupaTavoitteet || ''} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          {/* Lietelannan osuus, % (sininen) */}
          <tr style={{ color: 'blue' }}>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>Lietelannan osuus, %</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              <input type="text" name="lantaLietelannanOsuus" value={envData.lantaLietelannanOsuus} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              <input type="text" name="lantaLietelannanOsuusLisatiedot" value={envData.lantaLietelannanOsuusLisatiedot || ''} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              <input type="text" name="lantaLietelannanOsuusTavoitteet" value={envData.lantaLietelannanOsuusTavoitteet || ''} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          {/* Lannan levitysmenetelmä */}
          <tr>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>Lannan levitysmenetelmä (kerro lisätiedoissa)</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              <input type="text" name="lantaLevitysmenetelma" value={envData.lantaLevitysmenetelma} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              <input type="text" name="lantaLevitysmenetelmaLisatiedot" value={envData.lantaLevitysmenetelmaLisatiedot || ''} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              <input type="text" name="lantaLevitysmenetelmaTavoitteet" value={envData.lantaLevitysmenetelmaTavoitteet || ''} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          {/* Pääasiallinen kuivikemateriaali */}
          <tr>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>Pääasiallinen kuivikemateriaali (kerro lisätiedoissa)</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              <input type="text" name="lantaKuivikemateriaali" value={envData.lantaKuivikemateriaali} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              <input type="text" name="lantaKuivikemateriaaliLisatiedot" value={envData.lantaKuivikemateriaaliLisatiedot || ''} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              <input type="text" name="lantaKuivikemateriaaliTavoitteet" value={envData.lantaKuivikemateriaaliTavoitteet || ''} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          {/* Kuvaus jätemuovien varastoinnista ja hävittämisestä */}
          <tr>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>Kuvaus jätemuovien varastoinnista ja hävittämisestä</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              <input type="text" name="lantaJatemuovit" value={envData.lantaJatemuovit} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              <input type="text" name="lantaJatemuovitLisatiedot" value={envData.lantaJatemuovitLisatiedot || ''} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              <input type="text" name="lantaJatemuovitTavoitteet" value={envData.lantaJatemuovitTavoitteet || ''} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          {/* Kuvaus vaarallisten aineiden varastoinnista ja hävittämisestä */}
          <tr>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              Kuvaus vaarallisten aineiden ja kemikaalien varastoinnista ja hävittämisestä (esim. akut, saliontaaineet, hapot, kasvinsuojelu-aineet)
            </td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              <input type="text" name="lantaVaarallisetAineet" value={envData.lantaVaarallisetAineet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              <input type="text" name="lantaVaarallisetAineetLisatiedot" value={envData.lantaVaarallisetAineetLisatiedot || ''} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              <input type="text" name="lantaVaarallisetAineetTavoitteet" value={envData.lantaVaarallisetAineetTavoitteet || ''} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          {/* Kuvaus jäteöljyn varastoinnista ja hävittämisestä */}
          <tr>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>Kuvaus jäteöljyn varastoinnista ja hävittämisestä</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              <input type="text" name="lantaJateoljy" value={envData.lantaJateoljy} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              <input type="text" name="lantaJateoljyLisatiedot" value={envData.lantaJateoljyLisatiedot || ''} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              <input type="text" name="lantaJateoljyTavoitteet" value={envData.lantaJateoljyTavoitteet || ''} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          {/* Kuvaus puristenesteiden käsittelytavasta */}
          <tr>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>Kuvaus puristenesteiden käsittelytavasta</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              <input type="text" name="lantaPuristeneste" value={envData.lantaPuristeneste} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              <input type="text" name="lantaPuristenesteLisatiedot" value={envData.lantaPuristenesteLisatiedot || ''} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              <input type="text" name="lantaPuristenesteTavoitteet" value={envData.lantaPuristenesteTavoitteet || ''} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          {/* Muut mahdolliset toimenpiteet */}
          <tr>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>Muut mahdolliset toimenpiteet</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              <textarea
                name="lantaMuutToimenpiteet"
                value={envData.lantaMuutToimenpiteet}
                onChange={handleChange}
                rows={2}
                style={{ width: '100%' }}
              />
            </td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              <input type="text" name="lantaMuutToimenpiteetLisatiedot" value={envData.lantaMuutToimenpiteetLisatiedot || ''} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              <input type="text" name="lantaMuutToimenpiteetTavoitteet" value={envData.lantaMuutToimenpiteetTavoitteet || ''} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center' }}>
        <button type="button" onClick={onPrevious} style={{ marginRight: '1rem' }}>
          Edellinen
        </button>
        <button type="submit" onClick={handleSubmit} style={{ marginRight: '1rem' }}>
          Seuraava
        </button>
        <button type="button" onClick={handlePDFSave}>
          Tallenna PDF
        </button>
      </div>
    </div>
  );
};

export default EnvironmentPage;