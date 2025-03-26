import React, { useState, useEffect } from 'react';
import './tables.css';
import LogoHeader from './LogoHeader'; 
import AutoResizeTextArea from './AutoResizeTextArea';

const TalousJaHallintoPage = ({
  onNext,
  onPrevious,
  initialFinanceData,
  initialData,
  environmentData,
  socialData,
  onDataUpdate
}) => {

  const [localFinanceData, setLocalFinanceData] = useState(() => {
    const savedData = localStorage.getItem('financeData');
    if (savedData) {
      return JSON.parse(savedData);
    }
    return initialFinanceData || {
    // 4.1 Johtaminen
    yrityksenArvot: '',
    yrityksenArvotLisatiedot: '',
    yrityksenArvotTavoitteet: '',

    visioMaare: '',
    visioMaareLisatiedot: '',
    visioMaareTavoitteet: '',

    strategiaLaadittu: '',
    strategiaLaadittuLisatiedot: '',
    strategiaLaadittuTavoitteet: '',

    organisaatioKuvattu: '',
    organisaatioKuvattuLisatiedot: '',
    organisaatioKuvattuTavoitteet: '',

    johtamisKaytannot: '',
    johtamisKaytannotLisatiedot: '',
    johtamisKaytannotTavoitteet: '',

    liiketoimintasuunnitelma: '',
    liiketoimintasuunnitelmaLisatiedot: '',
    liiketoimintasuunnitelmaTavoitteet: '',

    talousErityisetToimenpiteet: '',
    talousErityisetToimenpiteetLisatiedot: '',
    talousErityisetToimenpiteetTavoitteet: '',

    // 4.2 Riskien hallinta
    riskVarautumissuunnitelma: '',
    riskVarautumissuunnitelmaLisatiedot: '',
    riskVarautumissuunnitelmaTavoitteet: '',
    riskPelastautumissuunnitelma: '',
    riskPelastautumissuunnitelmaLisatiedot: '',
    riskPelastautumissuunnitelmaTavoitteet: '',
    riskRiskikartoitukset: '',
    riskRiskikartoituksetLisatiedot: '',
    riskRiskikartoituksetTavoitteet: '',
    riskVakuutus: '',
    riskVakuutusLisatiedot: '',
    riskVakuutusTavoitteet: '',
    riskHenkiloriskit: '',
    riskHenkiloriskitLisatiedot: '',
    riskHenkiloriskitTavoitteet: '',
    riskRahoitus: '',
    riskRahoitusLisatiedot: '',
    riskRahoitusTavoitteet: '',
    riskHintariski: '',
    riskHintariskiLisatiedot: '',
    riskHintariskiTavoitteet: '',
    riskVarautuminenSahko: '',
    riskVarautuminenSahkoLisatiedot: '',
    riskVarautuminenSahkoTavoitteet: '',
    riskVesihuolto: '',
    riskVesihuoltoLisatiedot: '',
    riskVesihuoltoTavoitteet: '',
    riskElainriskit: '',
    riskElainriskitLisatiedot: '',
    riskElainriskitTavoitteet: '',
    riskPeltoriski: '',
    riskPeltoriskiLisatiedot: '',
    riskPeltoriskiTavoitteet: '',
    riskTietoturva: '',
    riskTietoturvaLisatiedot: '',
    riskTietoturvaTavoitteet: '',
    riskErityisetToimenpiteet: '',
    riskErityisetToimenpiteetLisatiedot: '',
    riskErityisetToimenpiteetTavoitteet: '',

    // 4.3 Kilpailukyky ja kannattavuus
    talousSuunnittelu: '',
    talousSuunnitteluLisatiedot: '',
    talousSuunnitteluTavoitteet: '',

    toiminnanMittarit: '',
    toiminnanMittaritLisatiedot: '',
    toiminnanMittaritTavoitteet: '',

    maksuvalmius: '',
    maksuvalmiusLisatiedot: '',
    maksuvalmiusTavoitteet: '',

    budjetointi: '',
    budjetointiLisatiedot: '',
    budjetointiTavoitteet: '',

    kuukausiAlv: '',
    kuukausiAlvLisatiedot: '',
    kuukausiAlvTavoitteet: '',

    valintilinpaate: '',
    valintilinpaateLisatiedot: '',
    valintilinpaateTavoitteet: '',

    kannattavuusLaskenta: '',
    kannattavuusLaskentaLisatiedot: '',
    kannattavuusLaskentaTavoitteet: '',

    tuotantokustannus: '',
    tuotantokustannusLisatiedot: '',
    tuotantokustannusTavoitteet: '',

    velkaSuhde: '',
    velkaSuhdeLisatiedot: '',
    velkaSuhdeTavoitteet: '',

    keskeisetVerkostot: '',
    keskeisetVerkostotLisatiedot: '',
    keskeisetVerkostotTavoitteet: '',

    vertailuTiedot: '',
    vertailuTiedotLisatiedot: '',
    vertailuTiedotTavoitteet: '',

    asiantuntijat: '',
    asiantuntijatLisatiedot: '',
    asiantuntijatTavoitteet: '',

    ulkoistetutPalvelut: '',
    ulkoistetutPalvelutLisatiedot: '',
    ulkoistetutPalvelutTavoitteet: '',
  };
  });

  useEffect(() => {
    localStorage.setItem('financeData', JSON.stringify(localFinanceData));
    if (onDataUpdate) {
      onDataUpdate(localFinanceData);
    }
  }, [localFinanceData, onDataUpdate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFinanceData({
      ...localFinanceData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onNext) onNext(localFinanceData);
  };
  
  return (
    <div style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Lisätään logot yläosaan */}
      <LogoHeader />
      

      <h2>Talous ja hallinto</h2>

      {/* 4.1 Johtaminen */}
 
      <form onSubmit={handleSubmit}>
        <table className="common-table">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th>Johtaminen</th>
              <th>Uusin tulos</th>
              <th>Kuvaus</th>
              <th>Tavoite ja aikataulu</th>
            </tr>
          </thead>
          <tbody>
            {/* Esimerkki: Yrityksen arvot */}
            <tr>
              <td>Yrityksen arvot määritetty, kyllä/ei</td>
              <td>
                <select
                  name="yrityksenArvot"
                  value={localFinanceData.yrityksenArvot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                >
                  <option value="">Valitse</option>
                  <option value="kylla">Kyllä</option>
                  <option value="ei">Ei</option>
                </select>
              </td>
              <td>
              <AutoResizeTextArea
                  name="yrityksenArvotLisatiedot"
                  value={localFinanceData.yrityksenArvotLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
              <AutoResizeTextArea
                  name="yrityksenArvotTavoitteet"
                  value={localFinanceData.yrityksenArvotTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            {/* Lisää muut 4.1 Johtaminen -osion kentät samalla tavalla */}
          </tbody>
        </table>

        {/* 4.2 Riskien hallinta */}
       
        <table className="common-table">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th>Riskien hallinta</th>
              <th>Uusin tulos</th>
              <th>Kuvaus</th>
              <th>Tavoite ja aikataulu</th>
            </tr>
          </thead>
          <tbody>
            {/* Esimerkki: Varautumissuunnitelma poikkeustilanteisiin */}
            <tr>
              <td>Varautumissuunnitelma poikkeustilanteisiin, kyllä/ei</td>
              <td>
                <select
                  name="riskVarautumissuunnitelma"
                  value={localFinanceData.riskVarautumissuunnitelma}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                >
                  <option value="">Valitse</option>
                  <option value="kylla">Kyllä</option>
                  <option value="ei">Ei</option>
                </select>
              </td>
              <td>
              <AutoResizeTextArea
                  name="riskVarautumissuunnitelmaLisatiedot"
                  value={localFinanceData.riskVarautumissuunnitelmaLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
              <AutoResizeTextArea
                  name="riskVarautumissuunnitelmaTavoitteet"
                  value={localFinanceData.riskVarautumissuunnitelmaTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            {/* Lisää muut riskien hallinta -osion kentät samalla tavalla */}
          </tbody>
        </table>

        {/* 4.3 Kilpailukyky ja kannattavuus */}

        <table className="common-table">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th>Kenttä</th>
              <th>Uusin tulos / Arvo</th>
              <th>Kuvaus</th>
              <th>Tavoite ja aikataulu</th>
            </tr>
          </thead>
          <tbody>
            {/* Esimerkki: Kuvaus talouden suunnittelusta ja seurannasta */}
            <tr>
              <td>Kuvaus talouden suunnittelusta ja seurannasta</td>
              <td>
                <input
                  type="text"
                  name="talousSuunnittelu"
                  value={localFinanceData.talousSuunnittelu}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
              <AutoResizeTextArea
                  name="talousSuunnitteluLisatiedot"
                  value={localFinanceData.talousSuunnitteluLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
              <AutoResizeTextArea
                  name="talousSuunnitteluTavoitteet"
                  value={localFinanceData.talousSuunnitteluTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            {/* Lisää muut 4.3 Kilpailukyky ja kannattavuus -osion kentät samalla tavalla */}
          </tbody>
        </table>

        {/* Navigointi */}
        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center' }}>
          <button type="button" onClick={onPrevious} style={{ marginRight: '1rem' }}>
            Edellinen
          </button>
          <button type="submit">
            Seuraava
          </button>
        </div>
      </form>
    </div>
  );
};

export default TalousJaHallintoPage;
