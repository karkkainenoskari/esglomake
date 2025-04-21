import React, { useState, useEffect } from 'react';
import './tables.css';
import LogoHeader from './LogoHeader';
import AutoResizeTextArea from './AutoResizeTextArea';
import YesNoToggle from './YesNoToggle';


const EnvironmentPage = ({ onNext, onPrevious, companyData, initialEnvData, onDataUpdate }) => {
  const [envData, setEnvData] = useState(() => {
    const savedData = localStorage.getItem('environmentData');
    if (savedData) {
      return JSON.parse(savedData);
    }
    return initialEnvData || {
      // === 2.1 Hiilijalanjälki
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
      envToimenpiteetVuodet: '',
      envToimenpiteetTavoiteTeksti: '',
      envTavoitteetVuosi1: '',
      envTavoitteetVuosi2: '',
      envTavoitteetVuosi3: '',

      // === 2.2 Monimuotoisuus
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
      divErityisetVuodet: '',
      divErityisetTavoiteTeksti: '',
      divTavoitteetVuosi1: '',
      divTavoitteetVuosi2: '',
      divTavoitteetVuosi3: '',

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
      envRavinnelaskelma: '',
      envRavinnelaskelmaLisatiedot: '',
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
      envPeltoviljelyErityisetToimenpiteetVuodet: '',
      envPeltoviljelyErityisetToimenpiteetTavoiteTeksti: '',

      envVesitalousKuvaus: '',
      envVesitalousKuvausLisatiedot: '',
      envVesitalousKuvausTavoitteet: '',
      envPeltoviljelyTavoitteetVuosi1: '',
      envPeltoviljelyTavoitteetVuosi2: '',
      envPeltoviljelyTavoitteetVuosi3: '',

      envPeltoviljelyErityisetToimenpiteet: '',
      envPeltoviljelyErityisetToimenpiteetVuodet: '', 
      envPeltoviljelyErityisetToimenpiteetTavoiteTeksti: '',

      // === 2.4 Lannan käsittely ja jätehuolto 
      lantaYmparistolupa: '',
      lantaLietelannanOsuus: '',
      lantaLevitysmenetelma: '',
      lantaKuivikemateriaali: '',
      lantaJatemuovit: '',
      lantaVaarallisetAineet: '',
      lantaJateoljy: '',
      lantaPuristeneste: '',
      lantaMuutToimenpiteet: '',
      lantaMuutToimenpiteetVuodet: '',
      lantaMuutToimenpiteetTavoiteTeksti: '',
      lantaTavoitteetVuosi1: '',
      lantaTavoitteetVuosi2: '',
      lantaTavoitteetVuosi3: '',

      // === 2.5 Energian käyttö 
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
      energyErityisetToimenpiteetVuodet: '',
      energyErityisetToimenpiteetTavoiteTeksti: '',
      energyTavoitteetVuosi1: '',
      energyTavoitteetVuosi2: '',
      energyTavoitteetVuosi3: ''
    };
  });


  useEffect(() => {
    if (!localStorage.getItem('environmentData') && initialEnvData) {
      setEnvData(initialEnvData);
    }
  }, [initialEnvData]);

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
      <div
        style={{
          marginLeft: '350px',
          marginBottom: '40px',
          marginTop: '25px',
          border: '1px solid #ccc',
          borderRadius: 10,
          padding: '1rem 1.5rem',
          Width: '450px',
          height: '215px',
          overflow: 'auto',         
          lineHeight: 1.5,
          flex: '1 1 350px'
        }}
      >
        <p style={{ margin: 0 }}>
          Ekologisen kestävyyden vaatimukset ovat nousseet osaksi rahoituksen
          hakuprosessia. Rahoituksen vastuullisuuden varmistamiseksi pankkien on
          hyödyllistä seurata esimerkiksi rahoitettujen kohteiden ilmastovaikutuksia,
          jonka vuoksi myös maatalousrahoituksessa on hyödyllistä esittää laskelma
          tuotannon ilmastovaikutuksista. Ravinnetaseella ja ravinteiden hallinnan
          osoittamisella laskelmien kautta on merkitystä etenkin kotieläintuotannon
          tuotantosuunnissa. Tilan energiankulutuksen määrä ja lajit on hyödyllistä
          kirjata ylös ja pohtia kehittämiseen vaihtoehtoja. Ekologiseen kestävyyteen
          kuuluu olennaisesti myös luonnon monimuotoisuuden vaaliminen, johon
          liittyviä toimia ja kehittämistavoitteita kannattaa kirjata ylös.
        </p>
      </div>
      <h3
    style={{
      marginLeft: '70px',  
      marginTop: '-100px',     
      fontSize: '32px',      
      fontWeight: '700'      
    }}
  >
    Ympäristö
  </h3>

      <table className="common-table environment-table">
        <colgroup>
          <col />
          <col />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th>Hiilijalanjälki ja tuotannon tehokkuus</th>
            <th>Uusin tulos</th>
            <th>Kuvaus</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Maidon hiilijalanjälki, Co2/kg maitoa

            </td>
            <td>
              <input type="text" name="envMaidonHiilijalanjalki" value={envData.envMaidonHiilijalanjalki} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
              <AutoResizeTextArea name="envMaidonHiilijalanjalkiLisatiedot" value={envData.envMaidonHiilijalanjalkiLisatiedot} onChange={handleChange} style={{ width: '100%' }} placeholder="Tieto löytyy hiilijalanjälki laskurista" />
            </td>
          </tr>
          <tr>
            <td>Scope 1 päästö, tCO2e, %

            </td>
            <td>
              <input type="text" name="envScope1" value={envData.envScope1} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
              <AutoResizeTextArea name="envScope1Lisatiedot" value={envData.envScope1Lisatiedot} onChange={handleChange} style={{ width: '100%' }} placeholder="Tieto löytyy hiilijalanjälki laskurista" />
            </td>
          </tr>
          <tr>
            <td>Scope 2 päästö, tCO2e, %
            </td>
            <td>
              <input type="text" name="envScope2" value={envData.envScope2} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
              <AutoResizeTextArea name="envScope2Lisatiedot" value={envData.envScope2Lisatiedot} onChange={handleChange} style={{ width: '100%' }} placeholder="Tieto löytyy hiilijalanjälki laskurista" />
            </td>
          </tr>
          <tr>
            <td>Scope 3 päästö, tCO2e, %
            </td>
            <td>
              <input type="text" name="envScope3" value={envData.envScope3} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
              <AutoResizeTextArea name="envScope3Lisatiedot" value={envData.envScope3Lisatiedot} onChange={handleChange} style={{ width: '100%' }} placeholder="Tieto löytyy hiilijalanjälki laskurista" />
            </td>
          </tr>
          <tr>
            <td>Hiiliviljelykoulutus suoritettu</td>
            <td style={{ textAlign: 'center' }}>
              <YesNoToggle
                value={envData.envHiiliviljelykoulutus}
                onChange={(val) => setEnvData({ ...envData, envHiiliviljelykoulutus: val })}
                themeColor="#4CAF50"
              />
            </td>
            <td>
              <AutoResizeTextArea name="envHiiliviljelykoulutusLisatiedot" value={envData.envHiiliviljelykoulutusLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
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
          </tr>
          <tr>
            <td>Keskilehmäluku, kpl
            </td>
            <td>
              <input type="text" name="envKeskilehmaluku" value={envData.envKeskilehmaluku} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
              <AutoResizeTextArea name="envKeskilehmalukuLisatiedot" value={envData.envKeskilehmalukuLisatiedot} onChange={handleChange} style={{ width: '100%' }} placeholder="Tieto löytyy tuotosseurannasta tai meijerin tiedoista" />
            </td>
          </tr>
          <tr>
            <td>Poikimaväli, vrk  </td>
            <td>
              <input type="text" name="envPoikimavali" value={envData.envPoikimavali} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
              <AutoResizeTextArea name="envPoikimavaliLisatiedot" value={envData.envPoikimavaliLisatiedot} onChange={handleChange} style={{ width: '100%' }} placeholder="Tieto löytyy tuotosseurannasta tai meijerin tiedoista" />
            </td>
          </tr>
          <tr>
            <td>Hiehojen poikimaikä, kk  </td>
            <td>
              <input type="text" name="envHiehopoikimaika" value={envData.envHiehopoikimaika} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
              <AutoResizeTextArea name="envHiehopoikimaikaLisatiedot" value={envData.envHiehopoikimaikaLisatiedot} onChange={handleChange} style={{ width: '100%' }} placeholder="Tieto löytyy tuotosseurannasta tai meijerin tiedoista" />
            </td>
          </tr>
          <tr>
            <td>Keskituotos, EKM kg/lehmä  </td>
            <td>
              <input type="text" name="envKeskituotos" value={envData.envKeskituotos} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
              <AutoResizeTextArea name="envKeskituotosLisatiedot" value={envData.envKeskituotosLisatiedot} onChange={handleChange} style={{ width: '100%' }} placeholder="Tieto löytyy tuotosseurannasta tai meijerin tiedoista" />
            </td>
          </tr>
          <tr>
            <td>Tuotosseurannan rasva-%, vuoden keskiarvo </td>
            <td>
              <input type="text" name="envTuotosRasva" value={envData.envTuotosRasva} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
              <AutoResizeTextArea name="envTuotosRasvaLisatiedot" value={envData.envTuotosRasvaLisatiedot} onChange={handleChange} style={{ width: '100%' }} placeholder="Tieto löytyy tuotosseurannasta tai meijerin tiedoista" />
            </td>
          </tr>
          <tr>
            <td>Tuotosseurannan valkuais-%, vuoden keskiarvo </td>
            <td>
              <input type="text" name="envTuotosValkuainen" value={envData.envTuotosValkuainen} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
              <AutoResizeTextArea name="envTuotosValkuainenLisatiedot" value={envData.envTuotosValkuainenLisatiedot} onChange={handleChange} style={{ width: '100%' }} placeholder="Tieto löytyy tuotosseurannasta tai meijerin tiedoista" />
            </td>
          </tr>
          <tr>
            <td>Maidon ureapitoisuus, mg/100 ml

            </td>
            <td>
              <input type="text" name="envMaidonUrea" value={envData.envMaidonUrea} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
              <AutoResizeTextArea name="envMaidonUreaLisatiedot" value={envData.envMaidonUreaLisatiedot} onChange={handleChange} style={{ width: '100%' }} placeholder="Tieto löytyy tuotosseurannasta tai meijerin tiedoista" />
            </td>
          </tr>
          <tr>
            <td>Meijerimaidon osuus, %  </td>
            <td>
              <input type="text" name="envMeijerimaidonOsuus" value={envData.envMeijerimaidonOsuus} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
              <AutoResizeTextArea name="envMeijerimaidonOsuusLisatiedot" value={envData.envMeijerimaidonOsuusLisatiedot} onChange={handleChange} style={{ width: '100%' }} placeholder="Tieto löytyy tuotosseurannasta tai meijerin tiedoista" />
            </td>
          </tr>
          <tr>
            <td>Käytössä vähäpäästöinen kylmäaine tilasäililössä

            </td>
            <td style={{ textAlign: 'center' }}>
              <YesNoToggle
                value={envData.envKaytossaVahapaastoinenKylmainetilasaililossa}
                onChange={(val) => setEnvData({ ...envData, envKaytossaVahapaastoinenKylmainetilasaililossa: val })}
                themeColor="#4CAF50"
              />
            </td>
            <td>
              <AutoResizeTextArea name="envKaytossaVahapaastoinenKylmainetilasaililossaLisatiedot" value={envData.envKaytossaVahapaastoinenKylmainetilasaililossaLisatiedot} onChange={handleChange} style={{ width: '100%' }} placeholder="Tieto löytyy hiilijalanjälki laskurista" />
            </td>
          </tr>
          <tr>
            <td>Karkearehun osuus lypsylehmien ruokinnassa, % </td>
            <td>
              <input type="text" name="envKarkearehunOsuus" value={envData.envKarkearehunOsuus} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
              <AutoResizeTextArea name="envKarkearehunOsuusLisatiedot" value={envData.envKarkearehunOsuusLisatiedot} onChange={handleChange} style={{ width: '100%' }} placeholder="Tieto löytyy tuotosseurannasta tai meijerin tiedoista" />
            </td>
          </tr>
          <tr>
            <td>Päästöjä vähentävät lisäravinteet lypsylehmillä käytössä</td>
            <td style={{ textAlign: 'center' }}>
              <YesNoToggle
                value={envData.envPaastojaVahentavatLisaravinteet}
                onChange={(val) => setEnvData({ ...envData, envPaastojaVahentavatLisaravinteet: val })}
                themeColor="#4CAF50"
              />
            </td>
            <td>
              <AutoResizeTextArea name="envPaastojaVahentavatLisaravinteetLisatiedot" value={envData.envPaastojaVahentavatLisaravinteetLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Ruokinnan seurantalaskelma tehty  </td>
            <td style={{ textAlign: 'center' }}>
              <YesNoToggle
                value={envData.envRuokinnanSeurantalaskelmiaTehty}
                onChange={(val) => setEnvData({ ...envData, envRuokinnanSeurantalaskelmiaTehty: val })}
                themeColor="#4CAF50"
              />
            </td>
            <td>
              <AutoResizeTextArea name="envRuokinnanSeurantalaskelmiaTehtyLisatiedot" value={envData.envRuokinnanSeurantalaskelmiaTehtyLisatiedot} onChange={handleChange} style={{ width: '100%' }} placeholder="Tieto löytyy tuotosseurannasta tai meijerin tiedoista" />
            </td>
          </tr>
          <tr>
            <td>Kuiva-ainekiloa rehua/EKM kg
            </td>
            <td>
              <input type="text" name="envKuivaAinekiloa" value={envData.envKuivaAinekiloa} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
              <AutoResizeTextArea name="envKuivaAinekiloaLisatiedot" value={envData.envKuivaAinekiloaLisatiedot} onChange={handleChange} style={{ width: '100%' }} placeholder="Kaikki rehut yhteensä, esim. ruokinnan seurantalaskelmista tai resurssiviisas maatila -raportista (tieto löytyy tuotosseurannasta tai meijerin tiedoista)" />
            </td>
          </tr>
          <tr>
            <td>Typen hyväksikäyttö % ruokinnassa

            </td>
            <td>
              <input type="text" name="envTypenHyvaksykaytto" value={envData.envTypenHyvaksykaytto} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
              <AutoResizeTextArea name="envTypenHyvaksykayttoLisatiedot" value={envData.envTypenHyvaksykayttoLisatiedot} onChange={handleChange} style={{ width: '100%' }} placeholder="Esim. ruokinnan seurantalaskelmista tai resurssiviisas maatila -raportista (tieto löytyy tuotosseurannasta tai meijerin tiedoista)" />
            </td>
          </tr>
          <tr>
            <td>Rehun säästöindeksin huomioiminen jalostuksessa</td>
            <td style={{ textAlign: 'center' }}>
              <YesNoToggle
                value={envData.envRehunSaastoindeksi}
                onChange={(val) => setEnvData({ ...envData, envRehunSaastoindeksi: val })}
                themeColor="#4CAF50"
              />
            </td>
            <td>
              <AutoResizeTextArea name="envRehunSaastoindeksiLisatiedot" value={envData.envRehunSaastoindeksiLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Ruokinnan omavaraisuusaste % </td>
            <td>
              <input type="text" name="envRuokinnanOmavaraisuusaste" value={envData.envRuokinnanOmavaraisuusaste} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
              <AutoResizeTextArea name="envRuokinnanOmavaraisuusasteLisatiedot" value={envData.envRuokinnanOmavaraisuusasteLisatiedot} onChange={handleChange} style={{ width: '100%' }} placeholder="Kaikki rehut yhteensä" />
            </td>
          </tr>
          <tr>
            <td>Kuvaus muista mahdollisista toimenpiteistä</td>
            <td colSpan="3">
              <AutoResizeTextArea name="envMuutToimenpiteet" value={envData.envMuutToimenpiteet} onChange={handleChange} rows={2} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
          </tr>
          <tr>
            <td>Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä</td>
            <td colSpan="2">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontWeight: 'bold' }}>Vuosi-1</label>
                  <AutoResizeTextArea
                    name="envTavoitteetVuosi1"
                    value={envData.envTavoitteetVuosi1 || ""}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Kirjoita tavoite vuodelle 1..."
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontWeight: 'bold' }}>Vuosi-2</label>
                  <AutoResizeTextArea
                    name="envTavoitteetVuosi2"
                    value={envData.envTavoitteetVuosi2 || ""}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Kirjoita tavoite vuodelle 2..."
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontWeight: 'bold' }}>Vuosi-3</label>
                  <AutoResizeTextArea
                    name="envTavoitteetVuosi3"
                    value={envData.envTavoitteetVuosi3 || ""}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Kirjoita tavoite vuodelle 3..."
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <table className="common-table environment-table">
        <colgroup>
          <col />
          <col />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th>Monimuotoisuus</th>
            <th>Uusin tulos</th>
            <th>Kuvaus</th>
          </tr>
        </thead>
        <tbody>

          <tr>
            <td>Maatalousluonnon ja maiseman -hoitosopimus</td>
            <td style={{ textAlign: 'center' }}>
              <YesNoToggle
                value={envData.divHoitosopimus}
                onChange={(val) => setEnvData({ ...envData, divHoitosopimus: val })}
                themeColor="#4CAF50"
              />

            </td>
            <td>
              <AutoResizeTextArea name="divHoitosopimusLisatiedot" value={envData.divHoitosopimusLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Monimuotoisuutta edistävä pinta-ala yhteensä, ha </td>
            <td>
              <input type="text" name="divPintaAla" value={envData.divPintaAla} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
              <AutoResizeTextArea name="divPintaAlaLisatiedot" value={envData.divPintaAlaLisatiedot} onChange={handleChange} style={{ width: '100%' }} placeholder="Esim. perinnebiotoopit, luonnonlaitumet, riistapellot, peltojen reuna-alueet, pölyttäjäkasvit" />
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
          </tr>

          <tr>
            <td>Biodiversiteettikartoitus tehty</td>
            <td style={{ textAlign: 'center' }}>
              <YesNoToggle
                value={envData.divBiodiversiteetti}
                onChange={(val) => setEnvData({ ...envData, divBiodiversiteetti: val })}
                themeColor="#4CAF50"
              />

            </td>
            <td>
              <AutoResizeTextArea name="divBiodiversiteettiLisatiedot" value={envData.divBiodiversiteettiLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>

          <tr>
            <td>Suomenkarjan eläinten kasvattaminen</td>
            <td style={{ textAlign: 'center' }}>
              <YesNoToggle
                value={envData.divSuomenkarja}
                onChange={(val) => setEnvData({ ...envData, divSuomenkarja: val })}
                themeColor="#4CAF50"
              />

            </td>
            <td>
              <AutoResizeTextArea name="divSuomenkarjaLisatiedot" value={envData.divSuomenkarjaLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
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
          </tr>
          <tr>

            <td>Soija ja GM -vapaus ruokinnassa</td>
            <td style={{ textAlign: 'center' }}>
              <YesNoToggle
                value={envData.divSoijaGM}
                onChange={(val) => setEnvData({ ...envData, divSoijaGM: val })}
                themeColor="#4CAF50"
              />
            </td>
            <td>
              <AutoResizeTextArea name="divSoijaGMLisatiedot" value={envData.divSoijaGMLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>

            <td>Palmuöljyttömyys ruokinnassa</td>
            <td style={{ textAlign: 'center' }}>
              <YesNoToggle
                value={envData.divPalmu}
                onChange={(val) => setEnvData({ ...envData, divPalmu: val })}
                themeColor="#4CAF50"
              />
            </td>
            <td>
              <AutoResizeTextArea name="divPalmuLisatiedot" value={envData.divPalmuLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Kuvaus muista mahdollisista toimenpiteistä</td>
            <td colSpan="3">
              <AutoResizeTextArea name="divErityisetToimenpiteet" value={envData.divErityisetToimenpiteet} onChange={handleChange} rows={2} style={{ width: '100%' }} />
            </td>

          </tr>
          <tr>

          </tr>
          <tr>
            <td>Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä</td>
            <td colSpan="2">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontWeight: 'bold' }}>Vuosi-1</label>
                  <AutoResizeTextArea
                    name="divTavoitteetVuosi1"
                    value={envData.divTavoitteetVuosi1 || ""}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Kirjoita tavoite vuodelle 1..."
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontWeight: 'bold' }}>Vuosi-2</label>
                  <AutoResizeTextArea
                    name="divTavoitteetVuosi2"
                    value={envData.divTavoitteetVuosi2 || ""}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Kirjoita tavoite vuodelle 2..."
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontWeight: 'bold' }}>Vuosi-3</label>
                  <AutoResizeTextArea
                    name="divTavoitteetVuosi3"
                    value={envData.divTavoitteetVuosi3 || ""}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Kirjoita tavoite vuodelle 3..."
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* */}
      <table className="common-table environment-table">
        <colgroup>
          <col />
          <col />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th>Peltoviljely</th>
            <th>Uusin tulos</th>
            <th>Kuvaus</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Viljelykasvien kokonaispinta-ala, ha

            </td>
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
                style={{ width: '100%' }} placeholder="Tieto löytyy hiilijalanjälkilaskurista"
              />
            </td>
          </tr>
          <tr>
            <td>Viljelykasvien pinta-ala suhteessa eläinmäärään, ha/ey
            </td>
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
                style={{ width: '100%' }} placeholder="Tieto löytyy hiilijalanjälkilaskurista"
              />
            </td>
          </tr>
          <tr>
            <td>Turvemaiden osuus, %
            </td>
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
                style={{ width: '100%' }} placeholder="Tieto löytyy hiilijalanjälkilaskurista"
              />
            </td>
          </tr>

          <tr>

            <td>Ravinnetaselaskelma tehty</td>
            <td style={{ textAlign: 'center' }}>
              <YesNoToggle
                value={envData.envRavinnelaskelma}
                onChange={(val) => setEnvData({ ...envData, envRavinnelaskelma: val })}
                themeColor="#4CAF50"
              />
            </td>
            <td>
              <AutoResizeTextArea name="envRavinnelaskelmaLisatiedot" value={envData.envRavinnelaskelmaLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Säilörehun D-arvo keskimäärin (esim. Valman kautta) </td>
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
                style={{ width: '100%' }} placeholder="Tieto löytyy tuotosseurannasta tai meijerin tiedoista"
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
          </tr>
          <tr>
            <td>Kuvaus rehuntuotannon toimintatavoista/strategiasta</td>
            <td>
              <input
                type='text'
                name="envRehuntuotantoKuvaus"
                value={envData.envRehuntuotantoKuvaus || ""}
                onChange={handleChange}

                style={{ width: '100%' }}
              />
            </td>
            <td>
              <AutoResizeTextArea
                name="envRehuntuotantoKuvausLisatiedot"
                value={envData.envRehuntuotantoKuvausLisatiedot || ""}
                onChange={handleChange}
                style={{ width: '100%' }}
                placeholder=" Esim. eri lohkojen käyttö, korjuukerrat, yhteistyö"
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
          </tr>
          <tr>
            <td>Kuvaus peltoviljelyssä käytössä olevista toimenpiteistä, jotka parantavat ympäristön tilaa</td>
            <td>
              <input
                type='text'
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
          </tr>
          <tr>
            <td>Kuvaus, miten peltojen vesitaloutta ylläpidetään ja kehitetään</td>
            <td>
              <input
                type='text'
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
          </tr>
          <tr>
            <td>Kuvaus muista mahdollisista toimenpiteistä</td>
            <td colSpan="3">
              <AutoResizeTextArea
                name="envPeltoviljelyErityisetToimenpiteet"
                value={envData.envPeltoviljelyErityisetToimenpiteet || ""}
                onChange={handleChange}
                rows={2}
                style={{ width: '100%' }}
              />
            </td>
          </tr>
          <tr>
            <td>Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä</td>
            <td colSpan="2">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontWeight: 'bold' }}>Vuosi-1</label>
                  <AutoResizeTextArea
                    name="envPeltoviljelyTavoitteetVuosi1"
                    value={envData.envPeltoviljelyTavoitteetVuosi1 || ""}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Kirjoita tavoite vuodelle 1..."
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontWeight: 'bold' }}>Vuosi-2</label>
                  <AutoResizeTextArea
                    name="envPeltoviljelyTavoitteetVuosi2"
                    value={envData.envPeltoviljelyTavoitteetVuosi2 || ""}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Kirjoita tavoite vuodelle 2..."
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontWeight: 'bold' }}>Vuosi-3</label>
                  <AutoResizeTextArea
                    name="envPeltoviljelyTavoitteetVuosi3"
                    value={envData.envPeltoviljelyTavoitteetVuosi3 || ""}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Kirjoita tavoite vuodelle 3..."
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <table className="common-table environment-table">
        <colgroup>
          <col />
          <col />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th>Lannan käsittely ja jätehuolto</th>
            <th>Uusin tulos</th>
            <th>Kuvaus</th>
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
          </tr>
          <tr>
            <td>Lietelannan osuus, % </td>
            <td>
              <input type="text" name="lantaLietelannanOsuus" value={envData.lantaLietelannanOsuus} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
              <AutoResizeTextArea name="lantaLietelannanOsuusLisatiedot" value={envData.lantaLietelannanOsuusLisatiedot || ''} onChange={handleChange} style={{ width: '100%' }} placeholder="Tieto löytyy hiilijalanjälkilaskurista" />
            </td>
          </tr>
          <tr>
            <td>Kuvaus lannan levitysmenetelmästä </td>
            <td>
              <input type="text" name="lantaLevitysmenetelma" value={envData.lantaLevitysmenetelma} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
              <AutoResizeTextArea name="lantaLevitysmenetelmaLisatiedot" value={envData.lantaLevitysmenetelmaLisatiedot || ''} onChange={handleChange} style={{ width: '100%' }}
                placeholder="Kerro tarkempi kuvaus..." />
            </td>
          </tr>
          <tr>
            <td>Pääasiallinen kuivikemateriaali</td>
            <td>
              <input type="text" name="lantaKuivikemateriaali" value={envData.lantaKuivikemateriaali} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
              <AutoResizeTextArea name="lantaKuivikemateriaaliLisatiedot" value={envData.lantaKuivikemateriaaliLisatiedot || ''} onChange={handleChange} style={{ width: '100%' }} />
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
          </tr>
          <tr>
            <td>
              Kuvaus vaarallisten aineiden ja kemikaalien varastoinnista ja hävittämisestä<br />

            </td>
            <td>
              <input type="text" name="lantaVaarallisetAineet" value={envData.lantaVaarallisetAineet} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
              <AutoResizeTextArea name="lantaVaarallisetAineetLisatiedot" value={envData.lantaVaarallisetAineetLisatiedot || ''} onChange={handleChange} style={{ width: '100%' }} placeholder="Esim. akut, saliontaaineet, hapot, kasvinsuojelu-aineet" />
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
          </tr>
          <tr>
            <td>Kuvaus puristenesteiden käsittelytavasta</td>
            <td>
              <input type="text" name="lantaPuristeneste" value={envData.lantaPuristeneste} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
              <AutoResizeTextArea name="lantaPuristenesteLisatiedot" value={envData.lantaPuristenesteLisatiedot || ''} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Kuvaus muista mahdollisista toimenpiteistä</td>
            <td colSpan="3">
              <AutoResizeTextArea name="lantaMuutToimenpiteet" value={envData.lantaMuutToimenpiteet} onChange={handleChange} rows={2} style={{ width: '100%' }} />
            </td>

          </tr>
          <tr>
            <td>Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä</td>
            <td colSpan="2">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontWeight: 'bold' }}>Vuosi-1</label>
                  <AutoResizeTextArea
                    name="lantaTavoitteetVuosi1"
                    value={envData.lantaTavoitteetVuosi1 || ""}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Kirjoita tavoite vuodelle 1..."
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontWeight: 'bold' }}>Vuosi-2</label>
                  <AutoResizeTextArea
                    name="lantaTavoitteetVuosi2"
                    value={envData.lantaTavoitteetVuosi2 || ""}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Kirjoita tavoite vuodelle 2..."
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontWeight: 'bold' }}>Vuosi-3</label>
                  <AutoResizeTextArea
                    name="lantaTavoitteetVuosi3"
                    value={envData.lantaTavoitteetVuosi3 || ""}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Kirjoita tavoite vuodelle 3..."
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <table className="common-table environment-table">
        <colgroup>
          <col />
          <col />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th>Energian käyttö</th>
            <th>Uusin tulos</th>
            <th>Kuvaus</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sähkön käyttömäärä, kWh/v </td>
            <td>
              <input type="text" name="energySahkonKayttomaara" value={envData.energySahkonKayttomaara} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
              <AutoResizeTextArea name="energySahkonKayttomaaraLisatiedot" value={envData.energySahkonKayttomaaraLisatiedot} onChange={handleChange} style={{ width: '100%' }} placeholder="Tieto löytyy hiilijalanjälkilaskurista" />
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
          </tr>
          <tr>
            <td>Oman sähkön tuotanto, kWh/v </td>
            <td>
              <input type="text" name="energyOmaSahkotuotanto" value={envData.energyOmaSahkotuotanto} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
              <AutoResizeTextArea name="energyOmaSahkotuotantoLisatiedot" value={envData.energyOmaSahkotuotantoLisatiedot} onChange={handleChange} style={{ width: '100%' }} placeholder="Esim. aurinko- tai tuulivoimala" />
            </td>
          </tr>
          <tr>
            <td>Polttoaineiden kokonaiskäyttömäärä, l/v </td>
            <td>
              <input type="text" name="energyPolttoaineenKaytto" value={envData.energyPolttoaineenKaytto} onChange={handleChange} style={{ width: '100%' }} />
            </td>
            <td>
              <AutoResizeTextArea name="energyPolttoaineenKayttoLisatiedot" value={envData.energyPolttoaineenKayttoLisatiedot} onChange={handleChange} style={{ width: '100%' }} placeholder="Tieto löytyy hiilijalanjälki laskurista" />
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
          </tr>
          <tr>

            <td>Lanta käsitellään biokaasulaitoksessa</td>
            <td style={{ textAlign: 'center' }}>
              <YesNoToggle
                value={envData.energyBiokaasu}
                onChange={(val) => setEnvData({ ...envData, energyBiokaasu: val })}
                themeColor="#4CAF50"
              />
            </td>
            <td>
              <AutoResizeTextArea name="energyBiokaasuLisatiedot" value={envData.energyBiokaasuLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>

            <td>Maidon esijäähdytys</td>
            <td style={{ textAlign: 'center' }}>
              <YesNoToggle
                value={envData.energyEsijahdytys}
                onChange={(val) => setEnvData({ ...envData, energyEsijahdytys: val })}
                themeColor="#4CAF50"
              />
            </td>
            <td>
              <AutoResizeTextArea name="energyEsijahdytysLisatiedot" value={envData.energyEsijahdytysLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>

            <td>Lämmön talteenotto</td>
            <td style={{ textAlign: 'center' }}>
              <YesNoToggle
                value={envData.energyLampotalteenotto}
                onChange={(val) => setEnvData({ ...envData, energyLampotalteenotto: val })}
                themeColor="#4CAF50"
              />
            </td>
            <td>
              <AutoResizeTextArea name="energyLampotalteenottoLisatiedot" value={envData.energyLampotalteenottoLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Kuvaus muista mahdollisista toimenpiteistä</td>
            <td colSpan="3">
              <AutoResizeTextArea name="energyErityisetToimenpiteet" value={envData.energyErityisetToimenpiteet} onChange={handleChange} rows={2} style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td>Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä</td>
            <td colSpan="2">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontWeight: 'bold' }}>Vuosi-1</label>
                  <AutoResizeTextArea
                    name="energyTavoitteetVuosi1"
                    value={envData.energyTavoitteetVuosi1 || ""}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Kirjoita tavoite vuodelle 1..."
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontWeight: 'bold' }}>Vuosi-2</label>
                  <AutoResizeTextArea
                    name="energyTavoitteetVuosi2"
                    value={envData.energyTavoitteetVuosi2 || ""}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Kirjoita tavoite vuodelle 2..."
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontWeight: 'bold' }}>Vuosi-3</label>
                  <AutoResizeTextArea
                    name="energyTavoitteetVuosi3"
                    value={envData.energyTavoitteetVuosi3 || ""}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Kirjoita tavoite vuodelle 3..."
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        style={{
          marginTop: '1rem',
          display: 'flex',
          justifyContent: 'center',   
          gap: '1.5rem',                
          alignItems: 'center'
        }}
      >
        <button
          type="button"
          onClick={onPrevious}
          style={{
            fontSize: '16px',
            padding: '10px 20px',
            borderRadius: '8px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Edellinen
        </button>

        <button
          type="submit"
          onClick={handleSubmit}
          style={{
            fontSize: '16px',
            padding: '10px 20px',
            borderRadius: '8px',
            backgroundColor: '#28a745',    
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Seuraava
        </button>
      </div>

    </div>
  );
};

export default EnvironmentPage;
