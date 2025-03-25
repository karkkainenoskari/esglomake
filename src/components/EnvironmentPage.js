import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import './tables.css';
import LogoHeader from './LogoHeader';
import AutoResizeTextArea from './AutoResizeTextArea';

const EnvironmentPage = ({ onNext, onPrevious, companyData, initialEnvData, onDataUpdate }) => {
  // Alustetaan tila localStoragesta, jos dataa löytyy, muuten käytetään initialEnvData tai oletusarvoja.
  const [envData, setEnvData] = useState(() => {
    const savedData = localStorage.getItem('environmentData');
    if (savedData) {
      return JSON.parse(savedData);
    }
    return initialEnvData || {
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

    divErityisetToimenpiteet2: '',
    divErityisetToimenpiteet2Lisatiedot: '',
    divErityisetToimenpiteet2Tavoitteet: '',

    // === 2.3 Peltoviljely

    envPeltoviljelyKokonaispintaAla: '',
    envPeltoviljelyKokonaispintaAlaLisatiedot: '',
    envPeltoviljelyKokonaispintaAlaTavoitteet: '',

    envPeltoviljelySuhdeElainmaara: '',
    envPeltoviljelySuhdeElainmaaraLisatiedot: '',
    envPeltoviljelySuhdeElainmaaraTavoitteet: '',

    envTurvemaidenOsuus: '',
    envTurvemaidenOsuusLisatiedot: '',
    envTurvemaidenOsuusTavoitteet: '',

    envSaileRehunDArvo: '',
    envSaileRehunDArvoLisatiedot: '',
    envSaileRehunDArvoTavoitteet: '',

    envNurmisato: '',
    envNurmisatoLisatiedot: '',
    envNurmisatoTavoitteet: '',

    envViljasato: '',
    envViljasatoLisatiedot: '',
    envViljasatoTavoitteet: '',

    envRehuntuotantoKuvaus: '',
    envRehuntuotantoKuvausLisatiedot: '',
    envRehuntuotantoKuvausTavoitteet: '',

    envLohkoetaisyys: '',
    envLohkoetaisyysLisatiedot: '',
    envLohkoetaisyysTavoitteet: '',

    envPeltoviljelyToimenpiteet: '',
    envPeltoviljelyToimenpiteetLisatiedot: '',
    envPeltoviljelyToimenpiteetTavoitteet: '',

    envVesitalousKuvaus: '',
    envVesitalousKuvausLisatiedot: '',
    envVesitalousKuvausTavoitteet: '',

    envPeltoviljelyErityisetToimenpiteet: '',
    envPeltoviljelyErityisetToimenpiteetLisatiedot: '',
    envPeltoviljelyErityisetToimenpiteetTavoitteet: '',
    // === 2.4 Lannan käsittely ja jätehuolto (lanta) ===
    lantaYmparistolupa: '',
    lantaLietelannanOsuus: '',
    lantaLevitysmenetelma: '',
    lantaKuivikemateriaali: '',
    lantaJatemuovit: '',
    lantaVaarallisetAineet: '',
    lantaJateoljy: '',
    lantaPuristeneste: '',
    lantaMuutToimenpiteet: '',

    // === 2.5 Energian käyttö (energy) ===
    energySahkonKayttomaara: '',
    energySahkonKayttomaaraLisatiedot: '',
    energySahkonKayttomaaraTavoitteet: '',

    energySahkonKayttomaaraSuhteessa: '',
    energySahkonKayttomaaraSuhteessaLisatiedot: '',
    energySahkonKayttomaaraSuhteessaTavoitteet: '',

    energyOmaSahkotuotanto: '',
    energyOmaSahkotuotantoLisatiedot: '',
    energyOmaSahkotuotantoTavoitteet: '',

    energyPolttoaineenKaytto: '',
    energyPolttoaineenKayttoLisatiedot: '',
    energyPolttoaineenKayttoTavoitteet: '',

    energyPolttoaineenKayttoSuhteessa: '',
    energyPolttoaineenKayttoSuhteessaLisatiedot: '',
    energyPolttoaineenKayttoSuhteessaTavoitteet: '',

    energyBiokaasu: '',
    energyBiokaasuLisatiedot: '',
    energyBiokaasuTavoitteet: '',

    energyEsijahdytys: '',
    energyEsijahdytysLisatiedot: '',
    energyEsijahdytysTavoitteet: '',

    energyLampotalteenotto: '',
    energyLampotalteenottoLisatiedot: '',
    energyLampotalteenottoTavoitteet: '',

    energyErityisetToimenpiteet: '',
    energyErityisetToimenpiteetLisatiedot: '',
    energyErityisetToimenpiteetTavoitteet: ''
  };
  });

  
  useEffect(() => {
    if (!localStorage.getItem('environmentData') && initialEnvData) {
      setEnvData(initialEnvData);
    }
  }, [initialEnvData]);

  // Tallennetaan envData localStorageen aina, kun sitä muutetaan
  useEffect(() => {
    localStorage.setItem('environmentData', JSON.stringify(envData));
    if (onDataUpdate) {
      onDataUpdate(envData);
    }
  }, [envData, onDataUpdate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEnvData({ ...envData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onNext) onNext(envData);
  };


  return (
    <div style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto' }}>

      <LogoHeader />

      <h2>Ympäristö</h2>

      <table className="common-table">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th>Hiilijalanjälki ja tuotannon tehokkuus</th>
            <th>Uusin tulos</th>
            <th>Kuvaus</th>
            <th>Tavoite ja aikataulu</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Maidon hiilijalanjälki, Co2/kg maitoa
              <span
                style={{
                  marginLeft: '5px',
                  cursor: 'help',
                  color: '#333',
                  border: '1px solid #333',   // Kehyksen tyyli
                  borderRadius: '50%',        // Pyöristetty ympyrä
                  backgroundColor: '#eee',    // Taustaväri
                  padding: '2px 6px',         // Sisämarginaali
                  fontWeight: 'bold',         // Vahvennettu fontti
                }}
                title="Tieto löytyy hiilijalanjälkilaskurista"
              >
                ?
              </span>
            </td>
            <td>
              <input type="text" name="envMaidonHiilijalanjalki" value={envData.envMaidonHiilijalanjalki} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envMaidonHiilijalanjalkiLisatiedot" value={envData.envMaidonHiilijalanjalkiLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envMaidonHiilijalanjalkiTavoitteet" value={envData.envMaidonHiilijalanjalkiTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Scope 1 päästö, tCO2e, %
              <span
                style={{
                  marginLeft: '5px',
                  cursor: 'help',
                  color: '#333',
                  border: '1px solid #333',   // Kehyksen tyyli
                  borderRadius: '50%',        // Pyöristetty ympyrä
                  backgroundColor: '#eee',    // Taustaväri
                  padding: '2px 6px',         // Sisämarginaali
                  fontWeight: 'bold',         // Vahvennettu fontti
                }}
                title="Tieto löytyy hiilijalanjälkilaskurista"
              >
                ?
              </span>
            </td>
            <td>
              <input type="text" name="envScope1" value={envData.envScope1} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envScope1Lisatiedot" value={envData.envScope1Lisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envScope1Tavoitteet" value={envData.envScope1Tavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Scope 2 päästö, tCO2e, %

              <span
                style={{
                  marginLeft: '5px',
                  cursor: 'help',
                  color: '#333',
                  border: '1px solid #333',   // Kehyksen tyyli
                  borderRadius: '50%',        // Pyöristetty ympyrä
                  backgroundColor: '#eee',    // Taustaväri
                  padding: '2px 6px',         // Sisämarginaali
                  fontWeight: 'bold',
                }}
                title="Tieto löytyy hiilijalanjälkilaskurista"
              >
                ?
              </span>
            </td>
            <td>
              <input type="text" name="envScope2" value={envData.envScope2} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envScope2Lisatiedot" value={envData.envScope2Lisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envScope2Tavoitteet" value={envData.envScope2Tavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Scope 3 päästö, tCO2e, %

              <span
                style={{
                  marginLeft: '5px',
                  cursor: 'help',
                  color: '#333',
                  border: '1px solid #333',   // Kehyksen tyyli
                  borderRadius: '50%',        // Pyöristetty ympyrä
                  backgroundColor: '#eee',    // Taustaväri
                  padding: '2px 6px',         // Sisämarginaali
                  fontWeight: 'bold',
                }}
                title="Tieto löytyy hiilijalanjälkilaskurista"
              >
                ?
              </span>
            </td>
            <td>
              <input type="text" name="envScope3" value={envData.envScope3} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envScope3Lisatiedot" value={envData.envScope3Lisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envScope3Tavoitteet" value={envData.envScope3Tavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Hiiliviljelykoulutus suoritettu, kyllä/ei</td>
            <td>
              <select name="envHiiliviljelykoulutus" value={envData.envHiiliviljelykoulutus} onChange={handleChange} style={{ width: '100%' }}>
                <option value="">Valitse</option>
                <option value="kylla">Kyllä</option>
                <option value="ei">Ei</option>
              </select>
            </td>
            <td>
              <AutoResizeTextArea name="envHiiliviljelykoulutusLisatiedot" value={envData.envHiiliviljelykoulutusLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envHiiliviljelykoulutusTavoitteet" value={envData.envHiiliviljelykoulutusTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Hiiliviljelytoimenpiteet rehuntuotannossa, ha</td>
            <td>
              <input type="text" name="envHiiliviljelytoimenpiteet" value={envData.envHiiliviljelytoimenpiteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envHiiliviljelytoimenpiteetLisatiedot" value={envData.envHiiliviljelytoimenpiteetLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envHiiliviljelytoimenpiteetTavoitteet" value={envData.envHiiliviljelytoimenpiteetTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Keskilehmäluku, kpl
              <span
                style={{
                  marginLeft: '5px',
                  cursor: 'help',
                  color: '#333',
                  border: '1px solid #333',
                  borderRadius: '50%',
                  backgroundColor: '#eee',
                  padding: '2px 6px',
                  fontWeight: 'bold'
                }}
                title="Tieto löytyy tuotosseurannasta tai meijerin tiedoista"
              >
                ?
              </span>
            </td>
            <td>
              <input type="text" name="envKeskilehmaluku" value={envData.envKeskilehmaluku} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envKeskilehmalukuLisatiedot" value={envData.envKeskilehmalukuLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envKeskilehmalukuTavoitteet" value={envData.envKeskilehmalukuTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Poikimaväli, vrk  <span
              style={{
                marginLeft: '5px',
                cursor: 'help',
                color: '#333',
                border: '1px solid #333',
                borderRadius: '50%',
                backgroundColor: '#eee',
                padding: '2px 6px',
                fontWeight: 'bold'
              }}
              title="Tieto löytyy tuotosseurannasta tai meijerin tiedoista"
            >
              ?
            </span></td>
            <td>
              <input type="text" name="envPoikimavali" value={envData.envPoikimavali} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envPoikimavaliLisatiedot" value={envData.envPoikimavaliLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envPoikimavaliTavoitteet" value={envData.envPoikimavaliTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Hiehopoikimaikä, kk  <span
              style={{
                marginLeft: '5px',
                cursor: 'help',
                color: '#333',
                border: '1px solid #333',
                borderRadius: '50%',
                backgroundColor: '#eee',
                padding: '2px 6px',
                fontWeight: 'bold'
              }}
              title="Tieto löytyy tuotosseurannasta tai meijerin tiedoista"
            >
              ?
            </span></td>
            <td>
              <input type="text" name="envHiehopoikimaika" value={envData.envHiehopoikimaika} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envHiehopoikimaikaLisatiedot" value={envData.envHiehopoikimaikaLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envHiehopoikimaikaTavoitteet" value={envData.envHiehopoikimaikaTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Keskituotos, EKM kg/lehmä  <span
              style={{
                marginLeft: '5px',
                cursor: 'help',
                color: '#333',
                border: '1px solid #333',
                borderRadius: '50%',
                backgroundColor: '#eee',
                padding: '2px 6px',
                fontWeight: 'bold'
              }}
              title="Tieto löytyy tuotosseurannasta tai meijerin tiedoista"
            >
              ?
            </span></td>
            <td>
              <input type="text" name="envKeskituotos" value={envData.envKeskituotos} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envKeskituotosLisatiedot" value={envData.envKeskituotosLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envKeskituotosTavoitteet" value={envData.envKeskituotosTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Tuotosseurannan rasva-%, vuoden keskiarvo <span
              style={{
                marginLeft: '5px',
                cursor: 'help',
                color: '#333',
                border: '1px solid #333',
                borderRadius: '50%',
                backgroundColor: '#eee',
                padding: '2px 6px',
                fontWeight: 'bold'
              }}
              title="Tieto löytyy tuotosseurannasta tai meijerin tiedoista"
            >
              ?
            </span></td>
            <td>
              <input type="text" name="envTuotosRasva" value={envData.envTuotosRasva} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envTuotosRasvaLisatiedot" value={envData.envTuotosRasvaLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envTuotosRasvaTavoitteet" value={envData.envTuotosRasvaTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Tuotosseurannan valkuais-%, vuoden keskiarvo <span
              style={{
                marginLeft: '5px',
                cursor: 'help',
                color: '#333',
                border: '1px solid #333',
                borderRadius: '50%',
                backgroundColor: '#eee',
                padding: '2px 6px',
                fontWeight: 'bold'
              }}
              title="Tieto löytyy tuotosseurannasta tai meijerin tiedoista"
            >
              ?
            </span></td>
            <td>
              <input type="text" name="envTuotosValkuainen" value={envData.envTuotosValkuainen} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envTuotosValkuainenLisatiedot" value={envData.envTuotosValkuainenLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envTuotosValkuainenTavoitteet" value={envData.envTuotosValkuainenTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Maidon ureapitoisuus, mg/100 ml
              <span
                style={{
                  marginLeft: '5px',
                  cursor: 'help',
                  color: '#333',
                  border: '1px solid #333',
                  borderRadius: '50%',
                  backgroundColor: '#eee',
                  padding: '2px 6px',
                  fontWeight: 'bold'
                }}
                title="Tieto löytyy tuotosseurannasta tai meijerin tiedoista"
              >
                ?
              </span>
            </td>
            <td>
              <input type="text" name="envMaidonUrea" value={envData.envMaidonUrea} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envMaidonUreaLisatiedot" value={envData.envMaidonUreaLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envMaidonUreaTavoitteet" value={envData.envMaidonUreaTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Meijerimaidon osuus, %  <span
              style={{
                marginLeft: '5px',
                cursor: 'help',
                color: '#333',
                border: '1px solid #333',
                borderRadius: '50%',
                backgroundColor: '#eee',
                padding: '2px 6px',
                fontWeight: 'bold'
              }}
              title="Tieto löytyy tuotosseurannasta tai meijerin tiedoista"
            >
              ?
            </span></td>
            <td>
              <input type="text" name="envMeijerimaidonOsuus" value={envData.envMeijerimaidonOsuus} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envMeijerimaidonOsuusLisatiedot" value={envData.envMeijerimaidonOsuusLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envMeijerimaidonOsuusTavoitteet" value={envData.envMeijerimaidonOsuusTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Käytössä vähäpäästöinen kylmäaine tilasäililössä, kyllä/ei
              <span
                style={{
                  marginLeft: '5px',
                  cursor: 'help',
                  color: '#333',
                  border: '1px solid #333',   // Kehyksen tyyli
                  borderRadius: '50%',        // Pyöristetty ympyrä
                  backgroundColor: '#eee',    // Taustaväri
                  padding: '2px 6px',         // Sisämarginaali
                  fontWeight: 'bold',
                }}
                title="Tieto löytyy hiilijalanjälkilaskurista"
              >
                ?
              </span>
            </td>
            <td>
              <select name="envKaytossaVahapaastoinenKylmainetilasaililossa" value={envData.envKaytossaVahapaastoinenKylmainetilasaililossa} onChange={handleChange} style={{ width: '100%' }}>
                <option value="">Valitse</option>
                <option value="kylla">Kyllä</option>
                <option value="ei">Ei</option>
              </select>
            </td>
            <td>
            <AutoResizeTextArea name="envKaytossaVahapaastoinenKylmainetilasaililossaLisatiedot" value={envData.envKaytossaVahapaastoinenKylmainetilasaililossaLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envKaytossaVahapaastoinenKylmainetilasaililossaTavoitteet" value={envData.envKaytossaVahapaastoinenKylmainetilasaililossaTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Karkearehun osuus lypsylehmien ruokinnassa, %  <span
              style={{
                marginLeft: '5px',
                cursor: 'help',
                color: '#333',
                border: '1px solid #333',
                borderRadius: '50%',
                backgroundColor: '#eee',
                padding: '2px 6px',
                fontWeight: 'bold'
              }}
              title="Tieto löytyy tuotosseurannasta tai meijerin tiedoista"
            >
              ?
            </span></td>
            <td>
              <input type="text" name="envKarkearehunOsuus" value={envData.envKarkearehunOsuus} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envKarkearehunOsuusLisatiedot" value={envData.envKarkearehunOsuusLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envKarkearehunOsuusTavoitteet" value={envData.envKarkearehunOsuusTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Päästöjä vähentävät lisäravinteet lypsylehmillä käytössä, kyllä/ei</td>
            <td>
              <select name="envPaastojaVahentavatLisaravinteet" value={envData.envPaastojaVahentavatLisaravinteet} onChange={handleChange} style={{ width: '100%' }}>
                <option value="">Valitse</option>
                <option value="kylla">Kyllä</option>
                <option value="ei">Ei</option>
              </select>
            </td>
            <td>
            <AutoResizeTextArea name="envPaastojaVahentavatLisaravinteetLisatiedot" value={envData.envPaastojaVahentavatLisaravinteetLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envPaastojaVahentavatLisaravinteetTavoitteet" value={envData.envPaastojaVahentavatLisaravinteetTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Ruokinnan seurantalaskelma tehty kyllä/ei  <span
              style={{
                marginLeft: '5px',
                cursor: 'help',
                color: '#333',
                border: '1px solid #333',
                borderRadius: '50%',
                backgroundColor: '#eee',
                padding: '2px 6px',
                fontWeight: 'bold'
              }}
              title="Tieto löytyy tuotosseurannasta tai meijerin tiedoista"
            >
              ?
            </span></td>
            <td>
              <select name="envRuokinnanSeurantalaskelmiaTehty" value={envData.envRuokinnanSeurantalaskelmiaTehty} onChange={handleChange} style={{ width: '100%' }}>
                <option value="">Valitse</option>
                <option value="kylla">Kyllä</option>
                <option value="ei">Ei</option>
              </select>
            </td>
            <td>
            <AutoResizeTextArea name="envRuokinnanSeurantalaskelmiaTehtyLisatiedot" value={envData.envRuokinnanSeurantalaskelmiaTehtyLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envRuokinnanSeurantalaskelmiaTehtyTavoitteet" value={envData.envRuokinnanSeurantalaskelmiaTehtyTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Kuiva-ainekiloa rehua/EKM kg
              (kaikki rehut yhteensä, esim. ruokinnan seurantalaskelmista tai resurssiviisas maatila -raportista)
              <span
                style={{
                  marginLeft: '5px',
                  cursor: 'help',
                  color: '#333',
                  border: '1px solid #333',
                  borderRadius: '50%',
                  backgroundColor: '#eee',
                  padding: '2px 6px',
                  fontWeight: 'bold'
                }}
                title="Tieto löytyy tuotosseurannasta tai meijerin tiedoista"
              >
                ?
              </span></td>
            <td>
              <input type="text" name="envKuivaAinekiloa" value={envData.envKuivaAinekiloa} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envKuivaAinekiloaLisatiedot" value={envData.envKuivaAinekiloaLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envKuivaAinekiloaTavoitteet" value={envData.envKuivaAinekiloaTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Typen hyväksikäyttö % ruokinnassa (esim. ruokinnan seurantalaskelmista tai resurssiviisas maatila -raportista)
              <span
                style={{
                  marginLeft: '5px',
                  cursor: 'help',
                  color: '#333',
                  border: '1px solid #333',
                  borderRadius: '50%',
                  backgroundColor: '#eee',
                  padding: '2px 6px',
                  fontWeight: 'bold'
                }}
                title="Tieto löytyy tuotosseurannasta tai meijerin tiedoista"
              >
                ?
              </span></td>
            <td>
              <input type="text" name="envTypenHyvaksykaytto" value={envData.envTypenHyvaksykaytto} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envTypenHyvaksykayttoLisatiedot" value={envData.envTypenHyvaksykayttoLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envTypenHyvaksykayttoTavoitteet" value={envData.envTypenHyvaksykayttoTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Rehun säästöindeksin huomioiminen jalostuksessa, kyllä/ei</td>
            <td>
              <select name="envRehunSaastoindeksi" value={envData.envRehunSaastoindeksi} onChange={handleChange} style={{ width: '100%' }}>
                <option value="">Valitse</option>
                <option value="kylla">Kyllä</option>
                <option value="ei">Ei</option>
              </select>
            </td>
            <td>
            <AutoResizeTextArea name="envRehunSaastoindeksiLisatiedot" value={envData.envRehunSaastoindeksiLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envRehunSaastoindeksiTavoitteet" value={envData.envRehunSaastoindeksiTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Ruokinnan omavaraisuusaste % (kaikki rehut yhteensä)</td>
            <td>
              <input type="text" name="envRuokinnanOmavaraisuusaste" value={envData.envRuokinnanOmavaraisuusaste} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envRuokinnanOmavaraisuusasteLisatiedot" value={envData.envRuokinnanOmavaraisuusasteLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envRuokinnanOmavaraisuusasteTavoitteet" value={envData.envRuokinnanOmavaraisuusasteTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Muut mahdolliset toimenpiteet</td>
            <td>
              <textarea name="envMuutToimenpiteet" value={envData.envMuutToimenpiteet} onChange={handleChange} rows={2} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envMuutToimenpiteetLisatiedot" value={envData.envMuutToimenpiteetLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="envMuutToimenpiteetTavoitteet" value={envData.envMuutToimenpiteetTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
        </tbody>
      </table>

      <table className="common-table">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th>Monimuotoisuus</th>
            <th>Uusin tulos</th>
            <th>Kuvaus</th>
            <th>Tavoite ja aikataulu</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Maatalousluonnon ja maiseman -hoitosopimus, kyllä/ei</td>
            <td>
              <select name="divHoitosopimus" value={envData.divHoitosopimus} onChange={handleChange} style={{ width: '100%' }}>
                <option value="">Valitse</option>
                <option value="kylla">Kyllä</option>
                <option value="ei">Ei</option>
              </select>
            </td>
            <td>
            <AutoResizeTextArea name="divHoitosopimusLisatiedot" value={envData.divHoitosopimusLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="divHoitosopimusTavoitteet" value={envData.divHoitosopimusTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Monimuotoisuutta edistävä pinta-ala yhteensä, ha (esim. perinnebiotoopit, luonnonlaitumet, riistapellot, peltojen reuna-alueet, pölyttäjäkasvit)</td>
            <td>
              <input type="text" name="divPintaAla" value={envData.divPintaAla} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="divPintaAlaLisatiedot" value={envData.divPintaAlaLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="divPintaAlaTavoitteet" value={envData.divPintaAlaTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Kosteikot, ha</td>
            <td>
              <input type="text" name="divKosteikot" value={envData.divKosteikot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="divKosteikotLisatiedot" value={envData.divKosteikotLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="divKosteikotTavoitteet" value={envData.divKosteikotTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Biodiversiteettikartoitus tehty, kyllä/ei</td>
            <td>
              <select name="divBiodiversiteetti" value={envData.divBiodiversiteetti} onChange={handleChange} style={{ width: '100%' }}>
                <option value="">Valitse</option>
                <option value="kylla">Kyllä</option>
                <option value="ei">Ei</option>
              </select>
            </td>
            <td>
            <AutoResizeTextArea name="divBiodiversiteettiLisatiedot" value={envData.divBiodiversiteettiLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="divBiodiversiteettiTavoitteet" value={envData.divBiodiversiteettiTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Suomenkarjan eläinten kasvattaminen, kyllä/ei</td>
            <td>
              <select name="divSuomenkarja" value={envData.divSuomenkarja} onChange={handleChange} style={{ width: '100%' }}>
                <option value="">Valitse</option>
                <option value="kylla">Kyllä</option>
                <option value="ei">Ei</option>
              </select>
            </td>
            <td>
            <AutoResizeTextArea name="divSuomenkarjaLisatiedot" value={envData.divSuomenkarjaLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="divSuomenkarjaTavoitteet" value={envData.divSuomenkarjaTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Risteytyseläinten osuus lypsylehmistä, %</td>
            <td>
              <input type="text" name="divRisteytys" value={envData.divRisteytys} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="divRisteytysLisatiedot" value={envData.divRisteytysLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="divRisteytysTavoitteet" value={envData.divRisteytysTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Soija ja GM -vapaus ruokinnassa, kyllä/ei</td>
            <td>
              <select name="divSoijaGM" value={envData.divSoijaGM} onChange={handleChange} style={{ width: '100%' }}>
                <option value="">Valitse</option>
                <option value="kylla">Kyllä</option>
                <option value="ei">Ei</option>
              </select>
            </td>
            <td>
            <AutoResizeTextArea name="divSoijaGMLisatiedot" value={envData.divSoijaGMLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="divSoijaGMTavoitteet" value={envData.divSoijaGMTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Palmuöljyttömyys ruokinnassa, kyllä/ei</td>
            <td>
              <select name="divPalmu" value={envData.divPalmu} onChange={handleChange} style={{ width: '100%' }}>
                <option value="">Valitse</option>
                <option value="kylla">Kyllä</option>
                <option value="ei">Ei</option>
              </select>
            </td>
            <td>
            <AutoResizeTextArea name="divPalmuLisatiedot" value={envData.divPalmuLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="divPalmuTavoitteet" value={envData.divPalmuTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Erityiset toimenpiteet</td>
            <td>
              <textarea name="divErityisetToimenpiteet" value={envData.divErityisetToimenpiteet} onChange={handleChange} rows={2} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="divErityisetToimenpiteetLisatiedot" value={envData.divErityisetToimenpiteetLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="divErityisetToimenpiteetTavoitteet" value={envData.divErityisetToimenpiteetTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>

          </tr>
        </tbody>
      </table>
      
       {/* */ }  
      <table className="common-table">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th>Peltoviljely</th>
            <th>Uusin tulos</th>
            <th>Kuvaus</th>
            <th>Tavoite ja aikataulu</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Viljelykasvien kokonaispinta-ala, ha</td>
            <td>
              <input
                type="text"
                name="envPeltoviljelyKokonaispintaAla"
                value={envData.envPeltoviljelyKokonaispintaAla || ""}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td>
            <AutoResizeTextArea
                name="envPeltoviljelyKokonaispintaAlaLisatiedot"
                value={envData.envPeltoviljelyKokonaispintaAlaLisatiedot || ""}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td>
            <AutoResizeTextArea
                name="envPeltoviljelyKokonaispintaAlaTavoitteet"
                value={envData.envPeltoviljelyKokonaispintaAlaTavoitteet || ""}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          <tr>
            <td>Viljelykasvien pinta-ala suhteessa eläinmäärään, ha/ey</td>
            <td>
              <input
                type="text"
                name="envPeltoviljelySuhdeElainmaara"
                value={envData.envPeltoviljelySuhdeElainmaara || ""}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td>
            <AutoResizeTextArea
                name="envPeltoviljelySuhdeElainmaaraLisatiedot"
                value={envData.envPeltoviljelySuhdeElainmaaraLisatiedot || ""}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td>
            <AutoResizeTextArea
                name="envPeltoviljelySuhdeElainmaaraTavoitteet"
                value={envData.envPeltoviljelySuhdeElainmaaraTavoitteet || ""}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          <tr>
            <td>Turvemaiden osuus, %</td>
            <td>
              <input
                type="text"
                name="envTurvemaidenOsuus"
                value={envData.envTurvemaidenOsuus || ""}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td>
            <AutoResizeTextArea
                name="envTurvemaidenOsuusLisatiedot"
                value={envData.envTurvemaidenOsuusLisatiedot || ""}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td>
            <AutoResizeTextArea
                name="envTurvemaidenOsuusTavoitteet"
                value={envData.envTurvemaidenOsuusTavoitteet || ""}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          <tr>
            <td>Säilörehun D-arvo keskimäärin (esim. Valman kautta)</td>
            <td>
              <input
                type="text"
                name="envSaileRehunDArvo"
                value={envData.envSaileRehunDArvo || ""}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td>
            <AutoResizeTextArea
                name="envSaileRehunDArvoLisatiedot"
                value={envData.envSaileRehunDArvoLisatiedot || ""}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td>
            <AutoResizeTextArea
                name="envSaileRehunDArvoTavoitteet"
                value={envData.envSaileRehunDArvoTavoitteet || ""}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          <tr>
            <td>Nurmisato keskimäärin, kg ka/ha</td>
            <td>
              <input
                type="text"
                name="envNurmisato"
                value={envData.envNurmisato || ""}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td>
            <AutoResizeTextArea
                name="envNurmisatoLisatiedot"
                value={envData.envNurmisatoLisatiedot || ""}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td>
            <AutoResizeTextArea
                name="envNurmisatoTavoitteet"
                value={envData.envNurmisatoTavoitteet || ""}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          <tr>
            <td>Viljasato keskimäärin, kg/ha</td>
            <td>
              <input
                type="text"
                name="envViljasato"
                value={envData.envViljasato || ""}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td>
            <AutoResizeTextArea
                name="envViljasatoLisatiedot"
                value={envData.envViljasatoLisatiedot || ""}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td>
            <AutoResizeTextArea
                name="envViljasatoTavoitteet"
                value={envData.envViljasatoTavoitteet || ""}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          <tr>
            <td>Kuvaus rehuntuotannon toimintatavoista/strategiasta (esim. eri lohkojen käyttö, korjuukerrat, yhteistyö)</td>
            <td>
              <textarea
                name="envRehuntuotantoKuvaus"
                value={envData.envRehuntuotantoKuvaus || ""}
                onChange={handleChange}
                rows={2}
                style={{ width: '100%' }}
              />
            </td>
            <td>
            <AutoResizeTextArea
                name="envRehuntuotantoKuvausLisatiedot"
                value={envData.envRehuntuotantoKuvausLisatiedot || ""}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td>
            <AutoResizeTextArea
                name="envRehuntuotantoKuvausTavoitteet"
                value={envData.envRehuntuotantoKuvausTavoitteet || ""}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          <tr>
            <td>Keskimääräinen lohkoetäisyys, km</td>
            <td>
              <input
                type="text"
                name="envLohkoetaisyys"
                value={envData.envLohkoetaisyys || ""}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td>
            <AutoResizeTextArea
                name="envLohkoetaisyysLisatiedot"
                value={envData.envLohkoetaisyysLisatiedot || ""}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td>
            <AutoResizeTextArea
                name="envLohkoetaisyysTavoitteet"
                value={envData.envLohkoetaisyysTavoitteet || ""}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          <tr>
            <td>Kuvaus peltoviljelyssä käytössä olevista toimenpiteistä, jotka parantavat ympäristön tilaa</td>
            <td>
              <textarea
                name="envPeltoviljelyToimenpiteet"
                value={envData.envPeltoviljelyToimenpiteet || ""}
                onChange={handleChange}
                rows={2}
                style={{ width: '100%' }}
              />
            </td>
            <td>
            <AutoResizeTextArea
                name="envPeltoviljelyToimenpiteetLisatiedot"
                value={envData.envPeltoviljelyToimenpiteetLisatiedot || ""}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td>
            <AutoResizeTextArea
                name="envPeltoviljelyToimenpiteetTavoitteet"
                value={envData.envPeltoviljelyToimenpiteetTavoitteet || ""}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          <tr>
            <td>Kuvaus, miten peltojen vesitaloutta ylläpidetään ja kehitetään</td>
            <td>
              <textarea
                name="envVesitalousKuvaus"
                value={envData.envVesitalousKuvaus || ""}
                onChange={handleChange}
                rows={2}
                style={{ width: '100%' }}
              />
            </td>
            <td>
            <AutoResizeTextArea
                name="envVesitalousKuvausLisatiedot"
                value={envData.envVesitalousKuvausLisatiedot || ""}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td>
            <AutoResizeTextArea
                name="envVesitalousKuvausTavoitteet"
                value={envData.envVesitalousKuvausTavoitteet || ""}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          <tr>
            <td>Erityiset toimenpiteet</td>
            <td>
              <textarea
                name="envPeltoviljelyErityisetToimenpiteet"
                value={envData.envPeltoviljelyErityisetToimenpiteet || ""}
                onChange={handleChange}
                rows={2}
                style={{ width: '100%' }}
              />
            </td>
            <td>
            <AutoResizeTextArea
                name="envPeltoviljelyErityisetToimenpiteetLisatiedot"
                value={envData.envPeltoviljelyErityisetToimenpiteetLisatiedot || ""}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
            <td>
            <AutoResizeTextArea
                name="envPeltoviljelyErityisetToimenpiteetTavoitteet"
                value={envData.envPeltoviljelyErityisetToimenpiteetTavoitteet || ""}
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <table className="common-table">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th>Lannan käsittely ja jätehuolto</th>
            <th>Uusin tulos</th>
            <th>Kuvaus</th>
            <th>Tavoite ja aikataulu</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Viimeisin ympäristölupa, pvm</td>
            <td>
              <input type="text" name="lantaYmparistolupa" value={envData.lantaYmparistolupa} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="lantaYmparistolupaLisatiedot" value={envData.lantaYmparistolupaLisatiedot || ''} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="lantaYmparistolupaTavoitteet" value={envData.lantaYmparistolupaTavoitteet || ''} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Lietelannan osuus, % <span
              style={{
                marginLeft: '5px',
                cursor: 'help',
                color: '#333',
                border: '1px solid #333',   // Kehyksen tyyli
                borderRadius: '50%',        // Pyöristetty ympyrä
                backgroundColor: '#eee',    // Taustaväri
                padding: '2px 6px',         // Sisämarginaali
                fontWeight: 'bold',
              }}
              title="Tieto löytyy hiilijalanjälkilaskurista"
            >
              ?
            </span></td>
            <td>
              <input type="text" name="lantaLietelannanOsuus" value={envData.lantaLietelannanOsuus} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="lantaLietelannanOsuusLisatiedot" value={envData.lantaLietelannanOsuusLisatiedot || ''} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="lantaLietelannanOsuusTavoitteet" value={envData.lantaLietelannanOsuusTavoitteet || ''} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Lannan levitysmenetelmä (kerro lisätiedoissa)</td>
            <td>
              <input type="text" name="lantaLevitysmenetelma" value={envData.lantaLevitysmenetelma} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="lantaLevitysmenetelmaLisatiedot" value={envData.lantaLevitysmenetelmaLisatiedot || ''} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="lantaLevitysmenetelmaTavoitteet" value={envData.lantaLevitysmenetelmaTavoitteet || ''} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Pääasiallinen kuivikemateriaali (kerro lisätiedoissa)</td>
            <td>
              <input type="text" name="lantaKuivikemateriaali" value={envData.lantaKuivikemateriaali} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="lantaKuivikemateriaaliLisatiedot" value={envData.lantaKuivikemateriaaliLisatiedot || ''} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="lantaKuivikemateriaaliTavoitteet" value={envData.lantaKuivikemateriaaliTavoitteet || ''} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Kuvaus jätemuovien varastoinnista ja hävittämisestä</td>
            <td>
              <input type="text" name="lantaJatemuovit" value={envData.lantaJatemuovit} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="lantaJatemuovitLisatiedot" value={envData.lantaJatemuovitLisatiedot || ''} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="lantaJatemuovitTavoitteet" value={envData.lantaJatemuovitTavoitteet || ''} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>
              Kuvaus vaarallisten aineiden ja kemikaalien varastoinnista ja hävittämisestä<br />
              (esim. akut, saliontaaineet, hapot, kasvinsuojelu-aineet)
            </td>
            <td>
              <input type="text" name="lantaVaarallisetAineet" value={envData.lantaVaarallisetAineet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="lantaVaarallisetAineetLisatiedot" value={envData.lantaVaarallisetAineetLisatiedot || ''} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="lantaVaarallisetAineetTavoitteet" value={envData.lantaVaarallisetAineetTavoitteet || ''} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Kuvaus jäteöljyn varastoinnista ja hävittämisestä</td>
            <td>
              <input type="text" name="lantaJateoljy" value={envData.lantaJateoljy} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="lantaJateoljyLisatiedot" value={envData.lantaJateoljyLisatiedot || ''} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="lantaJateoljyTavoitteet" value={envData.lantaJateoljyTavoitteet || ''} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Kuvaus puristenesteiden käsittelytavasta</td>
            <td>
              <input type="text" name="lantaPuristeneste" value={envData.lantaPuristeneste} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="lantaPuristenesteLisatiedot" value={envData.lantaPuristenesteLisatiedot || ''} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="lantaPuristenesteTavoitteet" value={envData.lantaPuristenesteTavoitteet || ''} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Muut mahdolliset toimenpiteet</td>
            <td>
              <textarea name="lantaMuutToimenpiteet" value={envData.lantaMuutToimenpiteet} onChange={handleChange} rows={2} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="lantaMuutToimenpiteetLisatiedot" value={envData.lantaMuutToimenpiteetLisatiedot || ''} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="lantaMuutToimenpiteetTavoitteet" value={envData.lantaMuutToimenpiteetTavoitteet || ''} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
        </tbody>
      </table>

      <table className="common-table">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th>Energian käyttö</th>
            <th>Uusin tulos</th>
            <th>Kuvaus</th>
            <th>Tavoite ja aikataulu</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sähkön käyttömäärä, kWh/v <span
              style={{
                marginLeft: '5px',
                cursor: 'help',
                color: '#333',
                border: '1px solid #333',   // Kehyksen tyyli
                borderRadius: '50%',        // Pyöristetty ympyrä
                backgroundColor: '#eee',    // Taustaväri
                padding: '2px 6px',         // Sisämarginaali
                fontWeight: 'bold',
              }}
              title="Tieto löytyy hiilijalanjälkilaskurista"
            >
              ?
            </span></td>
            <td>
              <input type="text" name="energySahkonKayttomaara" value={envData.energySahkonKayttomaara} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="energySahkonKayttomaaraLisatiedot" value={envData.energySahkonKayttomaaraLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="energySahkonKayttomaaraTavoitteet" value={envData.energySahkonKayttomaaraTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Sähkön käyttömäärä suhteessa tuotantoon, kWh/kg maitoa/v</td>
            <td>
              <input type="text" name="energySahkonKayttomaaraSuhteessa" value={envData.energySahkonKayttomaaraSuhteessa} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="energySahkonKayttomaaraSuhteessaLisatiedot" value={envData.energySahkonKayttomaaraSuhteessaLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="energySahkonKayttomaaraSuhteessaTavoitteet" value={envData.energySahkonKayttomaaraSuhteessaTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Oman sähkön tuotanto, kWh/v (esim. aurinko- tai tuulivoimala)</td>
            <td>
              <input type="text" name="energyOmaSahkotuotanto" value={envData.energyOmaSahkotuotanto} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="energyOmaSahkotuotantoLisatiedot" value={envData.energyOmaSahkotuotantoLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="energyOmaSahkotuotantoTavoitteet" value={envData.energyOmaSahkotuotantoTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Polttoaineiden kokonaiskäyttömäärä, l/v <span
              style={{
                marginLeft: '5px',
                cursor: 'help',
                color: '#333',
                border: '1px solid #333',   // Kehyksen tyyli
                borderRadius: '50%',        // Pyöristetty ympyrä
                backgroundColor: '#eee',    // Taustaväri
                padding: '2px 6px',         // Sisämarginaali
                fontWeight: 'bold',
              }}
              title="Tieto löytyy tuotosseurannasta tai meijerin tiedoista"
            >
              ?
            </span></td>
            <td>
              <input type="text" name="energyPolttoaineenKaytto" value={envData.energyPolttoaineenKaytto} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="energyPolttoaineenKayttoLisatiedot" value={envData.energyPolttoaineenKayttoLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="energyPolttoaineenKayttoTavoitteet" value={envData.energyPolttoaineenKayttoTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Polttoaineiden käyttömäärä suhteessa tuotantoon, l/kg maitoa</td>
            <td>
              <input type="text" name="energyPolttoaineenKayttoSuhteessa" value={envData.energyPolttoaineenKayttoSuhteessa} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="energyPolttoaineenKayttoSuhteessaLisatiedot" value={envData.energyPolttoaineenKayttoSuhteessaLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="energyPolttoaineenKayttoSuhteessaTavoitteet" value={envData.energyPolttoaineenKayttoSuhteessaTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Lanta käsitellään biokaasulaitoksessa, kyllä/ei</td>
            <td>
              <select name="energyBiokaasu" value={envData.energyBiokaasu} onChange={handleChange} style={{ width: '100%' }}>
                <option value="">Valitse</option>
                <option value="kylla">Kyllä</option>
                <option value="ei">Ei</option>
              </select>
            </td>
            <td>
            <AutoResizeTextArea name="energyBiokaasuLisatiedot" value={envData.energyBiokaasuLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="energyBiokaasuTavoitteet" value={envData.energyBiokaasuTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Maidon esijäähdytys, kyllä/ei</td>
            <td>
              <select name="energyEsijahdytys" value={envData.energyEsijahdytys} onChange={handleChange} style={{ width: '100%' }}>
                <option value="">Valitse</option>
                <option value="kylla">Kyllä</option>
                <option value="ei">Ei</option>
              </select>
            </td>
            <td>
            <AutoResizeTextArea name="energyEsijahdytysLisatiedot" value={envData.energyEsijahdytysLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="energyEsijahdytysTavoitteet" value={envData.energyEsijahdytysTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Lämmön talteenotto, kyllä/ei</td>
            <td>
              <select name="energyLampotalteenotto" value={envData.energyLampotalteenotto} onChange={handleChange} style={{ width: '100%' }}>
                <option value="">Valitse</option>
                <option value="kylla">Kyllä</option>
                <option value="ei">Ei</option>
              </select>
            </td>
            <td>
            <AutoResizeTextArea name="energyLampotalteenottoLisatiedot" value={envData.energyLampotalteenottoLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="energyLampotalteenottoTavoitteet" value={envData.energyLampotalteenottoTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Erityiset toimenpiteet</td>
            <td>
              <textarea name="energyErityisetToimenpiteet" value={envData.energyErityisetToimenpiteet} onChange={handleChange} rows={2} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="energyErityisetToimenpiteetLisatiedot" value={envData.energyErityisetToimenpiteetLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
            <AutoResizeTextArea name="energyErityisetToimenpiteetTavoitteet" value={envData.energyErityisetToimenpiteetTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
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
      </div>
    </div>
  );
};

export default EnvironmentPage;
