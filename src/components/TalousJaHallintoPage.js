import React, { useState, useEffect } from 'react';
import './tables.css';
import LogoHeader from './LogoHeader'; 
import AutoResizeTextArea from './AutoResizeTextArea';
import YesNoToggle from './YesNoToggle';

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
    // Palauta laajennettu oletusdata:
    // Ota talteen alla olevat avaimet ja lisää localFinanceData:n sisälle
return {
  // JOHTAMINEN
  yrityksenArvot: '',
  yrityksenArvotLisatiedot: '',
  yrityksenArvotTavoitteet: '',

  visioMaare: '',
  visioMaareLisatiedot: '',
  visioMaareTavoitteet: '',

  strategiaLaadittu: '',
  strategiaLaadittuLisatiedot: '',
  strategiaLaadittuTavoitteet: '',

  liiketoimintasuunnitelma: '',
  liiketoimintasuunnitelmaLisatiedot: '',
  liiketoimintasuunnitelmaTavoitteet: '',

  organisaatioKuvattu: '',
  organisaatioKuvattuLisatiedot: '',
  organisaatioKuvattuTavoitteet: '',

  johtamisKaytannot: '',
  johtamisKaytannotLisatiedot: '',
  johtamisKaytannotTavoitteet: '',

  johtaminenVertailutieto: '',
  johtaminenVertailutietoLisatiedot: '',
  johtaminenVertailutietoTavoitteet: '',

  johtaminenAsiantuntijat: '',
  johtaminenAsiantuntijatLisatiedot: '',
  johtaminenAsiantuntijatTavoitteet: '',

  johtaminenErityisetToimenpiteet: '',

  // KILPAILUKYKY JA TALOUS
  toiminnanMittarit: '',
  toiminnanMittaritLisatiedot: '',
  toiminnanMittaritTavoitteet: '',

  velkaLiikevaihto: '',
  velkaLiikevaihtoLisatiedot: '',
  velkaLiikevaihtoTavoitteet: '',

  kannattavuusLaskenta: '',
  kannattavuusLaskentaLisatiedot: '',
  kannattavuusLaskentaTavoitteet: '',

  yrittajanVoitto: '',
  yrittajanVoittoLisatiedot: '',
  yrittajanVoittoTavoitteet: '',

  tuotantokustannusLaskenta: '',
  tuotantokustannusLaskentaLisatiedot: '',
  tuotantokustannusLaskentaTavoitteet: '',

  maidonTuotantokustannus: '',
  maidonTuotantokustannusLisatiedot: '',
  maidonTuotantokustannusTavoitteet: '',

  maksuvalmiusKuvaus: '',
  maksuvalmiusKuvausLisatiedot: '',
  maksuvalmiusKuvausTavoitteet: '',

  budjetointiKuvaus: '',
  budjetointiKuvausLisatiedot: '',
  budjetointiKuvausTavoitteet: '',

  kilpailuErityisetToimenpiteet: '',

  // RISKIT
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
      <table className="common-table finance-table">
          <colgroup>
            <col />
            <col />
            <col />
            {/* <col />*/}
          </colgroup>
          <thead>
            <tr>
              <th>Johtaminen</th>
              <th>Uusin tulos</th>
              <th>Kuvaus</th>
             {/* <th>Tavoite ja aikataulu</th>*/ }
            </tr>
          </thead>
          <tbody>
            {/* Yrityksen arvot */}
            <tr>
              <td>Yrityksen arvot on määritetty</td>
              <td>
              <YesNoToggle
                  value={localFinanceData.yrityksenArvot}
                  onChange={(val) =>
                    setLocalFinanceData({ ...localFinanceData, yrityksenArvot: val })
                    
                  }
                  themeColor="  #d30101"
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="yrityksenArvotLisatiedot"
                  value={localFinanceData.yrityksenArvotLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              {/* 
              <td>
                <AutoResizeTextArea
                  name="yrityksenArvotTavoitteet"
                  value={localFinanceData.yrityksenArvotTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              */}
            </tr>

            {/* Visio */}
            <tr>
              <td>Visio on määritetty</td>
              <td>
              <YesNoToggle
                  value={localFinanceData.visioMaare}
                  onChange={(val) =>
                    setLocalFinanceData({ ...localFinanceData, visioMaare: val })
                  }
                  themeColor="  #d30101"
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="visioMaareLisatiedot"
                  value={localFinanceData.visioMaareLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              {/*
              <td>
                <AutoResizeTextArea
                  name="visioMaareTavoitteet"
                  value={localFinanceData.visioMaareTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              */}
            </tr>

            {/* Strategia */}
            <tr>
              <td>Strategia on laadittu ja sitä päivitetään</td>
              <td>
              <YesNoToggle
                  value={localFinanceData.strategiaLaadittu}
                  onChange={(val) =>
                    setLocalFinanceData({ ...localFinanceData, strategiaLaadittu: val })
                  }
                  themeColor="  #d30101"
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="strategiaLaadittuLisatiedot"
                  value={localFinanceData.strategiaLaadittuLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              {/*
              <td>
                <AutoResizeTextArea
                  name="strategiaLaadittuTavoitteet"
                  value={localFinanceData.strategiaLaadittuTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              */}
            </tr>

            {/* Liiketoimintasuunnitelma ja/tai investointisuunnitelma */}
            <tr>
              <td>
                Liiketoimintasuunnitelma ja/tai investointisuunnitelma on tehty
        
              </td>
              <td>
              <YesNoToggle
                  value={localFinanceData.liiketoimintasuunnitelma}
                  onChange={(val) =>
                    setLocalFinanceData({ ...localFinanceData, liiketoimintasuunnitelma: val })
                  }
                  themeColor="  #d30101"
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="liiketoimintasuunnitelmaLisatiedot"
                  value={localFinanceData.liiketoimintasuunnitelmaLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              {/*
              <td>
                <AutoResizeTextArea
                  name="liiketoimintasuunnitelmaTavoitteet"
                  value={localFinanceData.liiketoimintasuunnitelmaTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              */}
            </tr>

            {/* Organisaatio, omistajat ja vastuualueet */}
            <tr>
              <td>Organisaatio, omistajat ja vastuualueet on kuvattu</td>
              <td>
              <YesNoToggle
                  value={localFinanceData.organisaatioKuvattu}
                  onChange={(val) =>
                    setLocalFinanceData({ ...localFinanceData, organisaatioKuvattu: val })
                  }
                  themeColor="  #d30101"
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="organisaatioKuvattuLisatiedot"
                  value={localFinanceData.organisaatioKuvattuLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              {/*
              <td>
                <AutoResizeTextArea
                  name="organisaatioKuvattuTavoitteet"
                  value={localFinanceData.organisaatioKuvattuTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              */}
            </tr>

            {/* Kuvaus erityisistä johtamiskäytännöistä */}
            <tr>
              <td>
                Kuvaus erityisistä johtamiskäytännöistä (esim. hallituspalaverit,
                asiantuntijatiimit, discussion group, monikantayhteistyö)
              </td>
              <td>
                {/* "Uusin tulos" -sarake voi olla esim. tyhjä text */}
                <input
                  type="text"
                  name="johtamisKaytannot"
                  value={localFinanceData.johtamisKaytannot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="johtamisKaytannotLisatiedot"
                  value={localFinanceData.johtamisKaytannotLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              {/*
              <td>
                <AutoResizeTextArea
                  name="johtamisKaytannotTavoitteet"
                  value={localFinanceData.johtamisKaytannotTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              */}
            </tr>

            {/* Kuvaus vertailutiedon hyödyntämisestä */}
            <tr>
              <td>Kuvaus vertailutiedon hyödyntämisestä</td>
              <td>
                <input
                  type="text"
                  name="johtaminenVertailutieto"
                  value={localFinanceData.johtaminenVertailutieto}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="johtaminenVertailutietoLisatiedot"
                  value={localFinanceData.johtaminenVertailutietoLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              {/*
              <td>
                <AutoResizeTextArea
                  name="johtaminenVertailutietoTavoitteet"
                  value={localFinanceData.johtaminenVertailutietoTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              */}
            </tr>

            {/* Kuvaus asiantuntijapalveluiden hyödyntämisestä */}
            <tr>
              <td>Kuvaus asiantuntijapalveluiden hyödyntämisestä</td>
              <td>
                <input
                  type="text"
                  name="johtaminenAsiantuntijat"
                  value={localFinanceData.johtaminenAsiantuntijat}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="johtaminenAsiantuntijatLisatiedot"
                  value={localFinanceData.johtaminenAsiantuntijatLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              {/*
              <td>
                <AutoResizeTextArea
                  name="johtaminenAsiantuntijatTavoitteet"
                  value={localFinanceData.johtaminenAsiantuntijatTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              */}
            </tr>

            {/* Erityiset toimenpiteet */}
            <tr>
              <td>Kuvaus muista mahdollisista toimenpiteistä</td>
              {/* Voit yhdistää 3 saraketta jos haluat enemmän tilaa */}
              <td colSpan="3">
                <AutoResizeTextArea
                  name="johtaminenErityisetToimenpiteet"
                  value={localFinanceData.johtaminenErityisetToimenpiteet}
                  onChange={handleChange}
                  rows={2}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* ======================
            2. KILPAILUKYKY JA TALOUS
        ======================= */}
        <table className="common-table finance-table">
          <colgroup>
            <col />
            <col />
            <col />
           {/* <col />*/}
          </colgroup>
          <thead>
            <tr>
              <th>Kilpailukyky ja talous</th>
              <th>Uusin tulos</th>
              <th>Kuvaus</th>
              {/* <th>Tavoite ja aikataulu</th> */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Toiminnan tavoitteet ja mittarit on määritetty</td>
              <td>
              <YesNoToggle
                  value={localFinanceData.toiminnanMittarit}
                  onChange={(val) =>
                    setLocalFinanceData({ ...localFinanceData, toiminnanMittarit: val })
                  }
                  themeColor="  #d30101"
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="toiminnanMittaritLisatiedot"
                  value={localFinanceData.toiminnanMittaritLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              {/*
              <td>
                <AutoResizeTextArea
                  name="toiminnanMittaritTavoitteet"
                  value={localFinanceData.toiminnanMittaritTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              */}
            </tr>

            <tr>
              <td>Velan määrä suhteessa liikevaihtoon, %</td>
              <td>
                <input
                  type="text"
                  name="velkaLiikevaihto"
                  value={localFinanceData.velkaLiikevaihto}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="velkaLiikevaihtoLisatiedot"
                  value={localFinanceData.velkaLiikevaihtoLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              {/*
              <td>
                <AutoResizeTextArea
                  name="velkaLiikevaihtoTavoitteet"
                  value={localFinanceData.velkaLiikevaihtoTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              */}
            </tr>

            <tr>
              <td>
                Koko tilan tulos- tai kannattavuuslaskelman teko säännöllisesti
                
              </td>
              <td>
              <YesNoToggle
                  value={localFinanceData.kannattavuusLaskenta}
                  onChange={(val) =>
                    setLocalFinanceData({ ...localFinanceData, kannattavuusLaskenta: val })
                  }
                  themeColor="  #d30101"
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="kannattavuusLaskentaLisatiedot"
                  value={localFinanceData.kannattavuusLaskentaLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              {/*
              <td>
                <AutoResizeTextArea
                  name="kannattavuusLaskentaTavoitteet"
                  value={localFinanceData.kannattavuusLaskentaTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              */}
            </tr>

            <tr>
              <td>
                Yrittäjän voitto, snt/maito kg (esim. tuloslaskelmasta,
                kannattavuuskirjanpidosta)
              </td>
              <td>
                <input
                  type="text"
                  name="yrittajanVoitto"
                  value={localFinanceData.yrittajanVoitto}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="yrittajanVoittoLisatiedot"
                  value={localFinanceData.yrittajanVoittoLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              {/*
              <td>
                <AutoResizeTextArea
                  name="yrittajanVoittoTavoitteet"
                  value={localFinanceData.yrittajanVoittoTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              */}
            </tr>

            <tr>
              <td>
                Tuotantokustannuslaskelman teko säännöllisesti (esim.
                rehu, maito)
              </td>
              <td>
              <YesNoToggle
                  value={localFinanceData.tuotantokustannusLaskenta}
                  onChange={(val) =>
                    setLocalFinanceData({ ...localFinanceData, tuotantokustannusLaskenta: val })
                  }
                  themeColor="  #d30101"
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="tuotantokustannusLaskentaLisatiedot"
                  value={localFinanceData.tuotantokustannusLaskentaLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              {/*
              <td>
                <AutoResizeTextArea
                  name="tuotantokustannusLaskentaTavoitteet"
                  value={localFinanceData.tuotantokustannusLaskentaTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              */}
            </tr>

            <tr>
              <td>Maidon tuotantokustannus, snt/maitokg</td>
              <td>
                <input
                  type="text"
                  name="maidonTuotantokustannus"
                  value={localFinanceData.maidonTuotantokustannus}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="maidonTuotantokustannusLisatiedot"
                  value={localFinanceData.maidonTuotantokustannusLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              {/*
              <td>
                <AutoResizeTextArea
                  name="maidonTuotantokustannusTavoitteet"
                  value={localFinanceData.maidonTuotantokustannusTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              */}
            </tr>

            <tr>
              <td>Kuvaus maksuvalmiuden ylläpidosta</td>
              <td>
                <input
                  type="text"
                  name="maksuvalmiusKuvaus"
                  value={localFinanceData.maksuvalmiusKuvaus}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="maksuvalmiusKuvausLisatiedot"
                  value={localFinanceData.maksuvalmiusKuvausLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              {/*
              <td>
                <AutoResizeTextArea
                  name="maksuvalmiusKuvausTavoitteet"
                  value={localFinanceData.maksuvalmiusKuvausTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              */}
            </tr>

            <tr>
              <td>Kuvaus budjetointikäytännöistä</td>
              <td>
                <input
                  type="text"
                  name="budjetointiKuvaus"
                  value={localFinanceData.budjetointiKuvaus}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="budjetointiKuvausLisatiedot"
                  value={localFinanceData.budjetointiKuvausLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              {/*
              <td>
                <AutoResizeTextArea
                  name="budjetointiKuvausTavoitteet"
                  value={localFinanceData.budjetointiKuvausTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              */}
            </tr>

            <tr>
              <td>Kuvaus muista mahdollisista toimenpiteistä</td>
              <td colSpan="3">
                <AutoResizeTextArea
                  name="kilpailuErityisetToimenpiteet"
                  value={localFinanceData.kilpailuErityisetToimenpiteet}
                  onChange={handleChange}
                  rows={2}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* ======================
            3. RISKIEN HALLINTA
        ======================= */}
        <table className="common-table finance-table">
          <colgroup>
            <col />
            <col />
            <col />
           {/* <col />*/}
          </colgroup>
          <thead>
            <tr>
              <th>Riskien hallinta</th>
              <th>Uusin tulos</th>
              <th>Kuvaus</th>
             {/* <th>Tavoite ja aikataulu</th>*/}
            </tr>
          </thead>
          <tbody>
            <tr> 
              <td>Varautumissuunnitelma poikkeustilanteisiin tehty</td>
              <td>
              <YesNoToggle
                  value={localFinanceData.riskVarautumissuunnitelma}
                  onChange={(val) =>
                    setLocalFinanceData({ ...localFinanceData, riskVarautumissuunnitelma: val })
                  }
                  themeColor="  #d30101"
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="riskVarautumissuunnitelmaLisatiedot"
                  value={localFinanceData.riskVarautumissuunnitelmaLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
               {/*
              <td>
                <AutoResizeTextArea
                  name="riskVarautumissuunnitelmaTavoitteet"
                  value={localFinanceData.riskVarautumissuunnitelmaTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              */}
            </tr>

            <tr>
              <td>Pelastautumissuunnitelma tehty</td>
              <td>
              <YesNoToggle
                  value={localFinanceData.riskPelastautumissuunnitelma}
                  onChange={(val) =>
                    setLocalFinanceData({ ...localFinanceData, riskPelastautumissuunnitelma: val })
                  }
                  themeColor="  #d30101"
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="riskPelastautumissuunnitelmaLisatiedot"
                  value={localFinanceData.riskPelastautumissuunnitelmaLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              {/*
              <td>
                <AutoResizeTextArea
                  name="riskPelastautumissuunnitelmaTavoitteet"
                  value={localFinanceData.riskPelastautumissuunnitelmaTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              */}
            </tr>

            <tr>
              <td>
                Riskikartoituksia tehty (esim. tapaturmat, eläintaudit,
                sähkö- ja paloturvallisuus, tietoturva)
              </td>
              <td>
              <YesNoToggle
                  value={localFinanceData.riskRiskikartoitukset}
                  onChange={(val) =>
                    setLocalFinanceData({ ...localFinanceData, riskRiskikartoitukset: val })
                  }
                  themeColor="  #d30101"
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="riskRiskikartoituksetLisatiedot"
                  value={localFinanceData.riskRiskikartoituksetLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              {/*
              <td>
                <AutoResizeTextArea
                  name="riskRiskikartoituksetTavoitteet"
                  value={localFinanceData.riskRiskikartoituksetTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              */}
            </tr>

            {/* Kuvaus vakuutusturvasta */}
            <tr>
              <td>Kuvaus vakuutusturvasta (esim. omaisuus, toiminta, eläimet...)</td>
              <td>
                <input
                  type="text"
                  name="riskVakuutus"
                  value={localFinanceData.riskVakuutus}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="riskVakuutusLisatiedot"
                  value={localFinanceData.riskVakuutusLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              {/*
              <td>
                <AutoResizeTextArea
                  name="riskVakuutusTavoitteet"
                  value={localFinanceData.riskVakuutusTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              */}
            </tr>

            {/* Kuvaus henkilöriskien hallinnasta */}
            <tr>
              <td>
                Kuvaus henkilöriskien hallinnasta (esim. edunvalvontavaltuutukset,
                testamentit, avioehto, varahenkilösuunnitelma)
              </td>
              <td>
                <input
                  type="text"
                  name="riskHenkiloriskit"
                  value={localFinanceData.riskHenkiloriskit}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="riskHenkiloriskitLisatiedot"
                  value={localFinanceData.riskHenkiloriskitLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              {/*
              <td>
                <AutoResizeTextArea
                  name="riskHenkiloriskitTavoitteet"
                  value={localFinanceData.riskHenkiloriskitTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              */}
            </tr>

            {/* Kuvaus rahoitusriskien hallinnasta */}
            <tr>
              <td>Kuvaus rahoitusriskien hallinnasta (esim. korkosuojaus)</td>
              <td>
                <input
                  type="text"
                  name="riskRahoitus"
                  value={localFinanceData.riskRahoitus}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="riskRahoitusLisatiedot"
                  value={localFinanceData.riskRahoitusLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              {/*
              <td>
                <AutoResizeTextArea
                  name="riskRahoitusTavoitteet"
                  value={localFinanceData.riskRahoitusTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              */}
            </tr>

            {/* Kuvaus hintariskien hallinnasta */}
            <tr>
              <td>Kuvaus hintariskien hallinta</td>
              <td>
                <input
                  type="text"
                  name="riskHintariski"
                  value={localFinanceData.riskHintariski}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="riskHintariskiLisatiedot"
                  value={localFinanceData.riskHintariskiLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              {/*
              <td>
                <AutoResizeTextArea
                  name="riskHintariskiTavoitteet"
                  value={localFinanceData.riskHintariskiTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              */}
            </tr>

            {localFinanceData.riskVarautumissuunnitelma !== "kylla" && (
  <>
            <tr>
              <td>Kuvaus varautumisesta sähkökatkoksiin (esim. varavoimalähde)</td>
              <td>
                <input
                  type="text"
                  name="riskVarautuminenSahko"
                  value={localFinanceData.riskVarautuminenSahko}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="riskVarautuminenSahkoLisatiedot"
                  value={localFinanceData.riskVarautuminenSahkoLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              {/*
              <td>
                <AutoResizeTextArea
                  name="riskVarautuminenSahkoTavoitteet"
                  value={localFinanceData.riskVarautuminenSahkoTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              */}
            </tr>

  
    <tr>
      <td>Kuvaus vesihuollon varajärjestelmästä</td>
      <td>
        <input
          type="text"
          name="riskVesihuolto"
          value={localFinanceData.riskVesihuolto}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <AutoResizeTextArea
          name="riskVesihuoltoLisatiedot"
          value={localFinanceData.riskVesihuoltoLisatiedot}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      {/*
      <td>
        <AutoResizeTextArea
          name="riskVesihuoltoTavoitteet"
          value={localFinanceData.riskVesihuoltoTavoitteet}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      */}
    </tr>
    <tr>
      <td>Kuvaus eläinriskien hallinnasta (esim. salmonella, Biocheck, tautiluokitukset)</td>
      <td>
        <input
          type="text"
          name="riskElainriskit"
          value={localFinanceData.riskElainriskit}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <AutoResizeTextArea
          name="riskElainriskitLisatiedot"
          value={localFinanceData.riskElainriskitLisatiedot}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      {/*
      <td>
        <AutoResizeTextArea
          name="riskElainriskitTavoitteet"
          value={localFinanceData.riskElainriskitTavoitteet}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      */}
    </tr>
    <tr>
      <td>Kuvaus peltoriskien hallinnasta (esim. vuokrasopimukset, oman pellon osuus, pellon riittävyys ja laatu)</td>
      <td>
        <input
          type="text"
          name="riskPeltoriski"
          value={localFinanceData.riskPeltoriski}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <AutoResizeTextArea
          name="riskPeltoriskiLisatiedot"
          value={localFinanceData.riskPeltoriskiLisatiedot}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      {/*
      <td>
        <AutoResizeTextArea
          name="riskPeltoriskiTavoitteet"
          value={localFinanceData.riskPeltoriskiTavoitteet}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      */}
    </tr>
    <tr>
      <td>Kuvaus tietoturvariskien hallinnasta (esim. etävalvonta, maatalouden ja yksityistalouden eriyttäminen)</td>
      <td>
        <input
          type="text"
          name="riskTietoturva"
          value={localFinanceData.riskTietoturva}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <AutoResizeTextArea
          name="riskTietoturvaLisatiedot"
          value={localFinanceData.riskTietoturvaLisatiedot}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      {/*
      <td>
        <AutoResizeTextArea
          name="riskTietoturvaTavoitteet"
          value={localFinanceData.riskTietoturvaTavoitteet}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      */}
    </tr>
  </>
)}
           
            <tr>
              <td>Kuvaus muista mahdollisista toimenpiteistä</td>
              <td colSpan="3">
                <AutoResizeTextArea
                  name="riskErityisetToimenpiteet"
                  value={localFinanceData.riskErityisetToimenpiteet}
                  onChange={handleChange}
                  rows={2}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
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
