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

      visioMaare: '',
      visioMaareLisatiedot: '',
    
      strategiaLaadittu: '',
      strategiaLaadittuLisatiedot: '',

      liiketoimintasuunnitelma: '',
      liiketoimintasuunnitelmaLisatiedot: '',

      organisaatioKuvattu: '',
      organisaatioKuvattuLisatiedot: '',
      
      johtamisKaytannot: '',
      johtamisKaytannotLisatiedot: '',
 
      johtaminenVertailutieto: '',
      johtaminenVertailutietoLisatiedot: '',

      johtaminenAsiantuntijat: '',
      johtaminenAsiantuntijatLisatiedot: '',
   
      johtaminenErityisetToimenpiteet: '',
      johtaminenErityisetToimenpiteetVuodet: '',

      johtaminenErityisetToimenpiteetVuosi1: '',
      johtaminenErityisetToimenpiteetVuosi2: '',
      johtaminenErityisetToimenpiteetVuosi3: '',


      // KILPAILUKYKY JA TALOUS
      toiminnanMittarit: '',
      toiminnanMittaritLisatiedot: '',

      velkaLiikevaihto: '',
      velkaLiikevaihtoLisatiedot: '',

      velkaKayttokate: '',
      velkaKayttokateLisatiedot: '',

      kannattavuusLaskenta: '',
      kannattavuusLaskentaLisatiedot: '',

      yrittajanVoitto: '',
      yrittajanVoittoLisatiedot: '',

      tuotantokustannusLaskenta: '',
      tuotantokustannusLaskentaLisatiedot: '',

      maidonTuotantokustannus: '',
      maidonTuotantokustannusLisatiedot: '',

      maksuvalmiusKuvaus: '',
      maksuvalmiusKuvausLisatiedot: '',

      budjetointiKuvaus: '',
      budjetointiKuvausLisatiedot: '',

      kilpailuErityisetToimenpiteet: '',
      kilpailuErityisetToimenpiteetVuodet: '',
      kilpailuErityisetToimenpiteetTavoiteTeksti: '',

      kilpailuErityisetToimenpiteetVuosi1: '',
      kilpailuErityisetToimenpiteetVuosi2: '',
      kilpailuErityisetToimenpiteetVuosi3: '',

      // RISKIT
      riskVarautumissuunnitelma: '',
      riskVarautumissuunnitelmaLisatiedot: '',

      riskPelastautumissuunnitelma: '',
      riskPelastautumissuunnitelmaLisatiedot: '',

      riskRiskikartoitukset: '',
      riskRiskikartoituksetLisatiedot: '',

      riskVakuutus: '',
      riskVakuutusLisatiedot: '',

      riskHenkiloriskit: '',
      riskHenkiloriskitLisatiedot: '',

      riskRahoitus: '',
      riskRahoitusLisatiedot: '',

      riskHintariski: '',
      riskHintariskiLisatiedot: '',

      riskVarautuminenSahko: '',
      riskVarautuminenSahkoLisatiedot: '',

      riskVesihuolto: '',
      riskVesihuoltoLisatiedot: '',

      riskElainriskit: '',
      riskElainriskitLisatiedot: '',

      riskPeltoriski: '',
      riskPeltoriskiLisatiedot: '',

      riskTietoturva: '',
      riskTietoturvaLisatiedot: '',

      riskErityisetToimenpiteet: '',
      riskErityisetToimenpiteetVuodet: '',

     riskErityisetToimenpiteetVuosi1: '',
     riskErityisetToimenpiteetVuosi2: '',
     riskErityisetToimenpiteetVuosi3: '',
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
          overflow: 'auto',         // rajaa leveys
          lineHeight: 1.5,
          flex: '1 1 350px'
        }}
      >
        <p style={{ margin: 0 }}>
        Keskeisin arvioitava lainan myöntämisen kriteeri on lainan takaisinmaksukyky. Toiminnan on oltava liiketoimintasuunnitelmalla osoitettuna laskennallisesti riittävän kannattavaa, jotta pitkällä aikavälillä rahavirtojen voidaan olettaa riittävän tavoitteisiin. Kannattavuuden ohella yrityksen tulee pystyä osoittamaan valmiudet maksuvalmiuden säilyttämiseen. Rahoittajat arvioivat tätä tyypillisesti toteutuneen maksukäyttäytymisen perusteella. Uuden yrittäjän, jolla ei ole käytettävissä maksuhistoriaa, tai investoivan yrityksen, jonka toimintaa ollaan olennaisesti muuttamassa, on erittäin hyödyllistä laatia kassabudjetti vuotuisista tuloista ja menoista. Budjetin laatiminen ja sen toteutumisen jatkuva seuraaminen on erittäin hyvä tapa osoittaa kassanhallinnan ja riskinhallinnan osaaminen rahoittajalle. Lainanhakijan on tarpeellista laatia yritykselle visio, johon toiminta tähtää ja strategia sille, miten toimintaa aiotaan tulevaisuudessa harjoittaa. Rahoituksen näkökulmasta etenkin tulevia investointitarpeita tulisi huolellisesti pohtia osana strategiaa.
        </p>
      </div>
      <h3
    style={{
      marginLeft: '40px',   // siirtää otsikon alkua sivulle päin
      marginTop: '-100px',     // pystysuuntainen etäisyys edellisestä
      fontSize: '32px',      // haluttu koko
      fontWeight: '600'      // haluttu paksuus
    }}
  >
    Talous ja hallinto
  </h3>


      <form onSubmit={handleSubmit}>
        <table className="common-table finance-table">
          <colgroup>
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th>Johtaminen</th>
              <th>Uusin tulos</th>
              <th>Kuvaus</th>
            </tr>
          </thead>
          <tbody>

            <tr>
              <td>Yrityksen arvot on määritetty</td>
              <td style={{ textAlign: 'center' }}>
                <YesNoToggle
                  value={localFinanceData.yrityksenArvot}
                  onChange={(val) =>
                    setLocalFinanceData({ ...localFinanceData, yrityksenArvot: val })

                  }
                  themeColor="  #0345fa"
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
            </tr>


            <tr>
              <td>Visio on määritetty</td>
              <td style={{ textAlign: 'center' }}>
                <YesNoToggle
                  value={localFinanceData.visioMaare}
                  onChange={(val) =>
                    setLocalFinanceData({ ...localFinanceData, visioMaare: val })
                  }
                  themeColor="  #0345fa"
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
            </tr>


            <tr>
              <td>Strategia on laadittu ja sitä päivitetään</td>
              <td style={{ textAlign: 'center' }}>
                <YesNoToggle
                  value={localFinanceData.strategiaLaadittu}
                  onChange={(val) =>
                    setLocalFinanceData({ ...localFinanceData, strategiaLaadittu: val })
                  }
                  themeColor="  #0345fa"
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
            </tr>


            <tr>
              <td>
                Liiketoimintasuunnitelma ja/tai investointisuunnitelma on tehty

              </td>
              <td style={{ textAlign: 'center' }}>
                <YesNoToggle
                  value={localFinanceData.liiketoimintasuunnitelma}
                  onChange={(val) =>
                    setLocalFinanceData({ ...localFinanceData, liiketoimintasuunnitelma: val })
                  }
                  themeColor="  #0345fa"
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
            </tr>


            <tr>
              <td>Organisaatio, omistajat ja vastuualueet on kuvattu</td>
              <td style={{ textAlign: 'center' }}>
                <YesNoToggle
                  value={localFinanceData.organisaatioKuvattu}
                  onChange={(val) =>
                    setLocalFinanceData({ ...localFinanceData, organisaatioKuvattu: val })
                  }
                  themeColor="  #0345fa"
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
            </tr>
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
                  placeholder="(Esim. johtaminen ja hallinto, eläimet, pelto, talous) "
                />
              </td>
            </tr>


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
                  placeholder="Esim. pienryhmätoiminta"
                />
              </td>
            </tr>


            <tr>
              <td>Kuvaus muista mahdollisista toimenpiteistä</td>

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
            <tr>
              <td>Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä</td>
              <td colSpan="3">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ fontWeight: 'bold' }}>Vuosi-1</label>
                    <AutoResizeTextArea
                      name="johtaminenErityisetToimenpiteetVuosi1"
                      value={localFinanceData.johtaminenErityisetToimenpiteetVuosi1 || ""}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Kirjoita tavoite vuodelle 1..."
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontWeight: 'bold' }}>Vuosi-2</label>
                    <AutoResizeTextArea
                      name="johtaminenErityisetToimenpiteetVuosi2"
                      value={localFinanceData.johtaminenErityisetToimenpiteetVuosi2 || ""}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Kirjoita tavoite vuodelle 2..."
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontWeight: 'bold' }}>Vuosi-3</label>
                    <AutoResizeTextArea
                      name="johtaminenErityisetToimenpiteetVuosi3"
                      value={localFinanceData.johtaminenErityisetToimenpiteetVuosi3 || ""}
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


        <table className="common-table finance-table">
          <colgroup>
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th>Kilpailukyky ja talous</th>
              <th>Uusin tulos</th>
              <th>Kuvaus</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Toiminnan tavoitteet ja mittarit on määritetty</td>
              <td style={{ textAlign: 'center' }}>
                <YesNoToggle
                  value={localFinanceData.toiminnanMittarit}
                  onChange={(val) =>
                    setLocalFinanceData({ ...localFinanceData, toiminnanMittarit: val })
                  }
                  themeColor="  #0345fa"
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
            </tr>

            <tr>
              <td>Velan määrä suhteessa käyttökatteeseen, %</td>
              <td>
                <input
                  type="text"
                  name="velkaKayttokate"
                  value={localFinanceData.velkaKayttokate}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="velkaKayttokateLisatiedot"
                  value={localFinanceData.velkaKayttokateLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>

            <tr>
              <td>
                Koko tilan tulos- tai kannattavuuslaskelman teko säännöllisesti

              </td>
              <td style={{ textAlign: 'center' }}>
                <YesNoToggle
                  value={localFinanceData.kannattavuusLaskenta}
                  onChange={(val) =>
                    setLocalFinanceData({ ...localFinanceData, kannattavuusLaskenta: val })
                  }
                  themeColor="  #0345fa"
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
            </tr>

            <tr>
              <td>
                Yrittäjän voitto, snt/maito kg
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
                  placeholder="Esim. tuloslaskelmasta, kannattavuuskirjanpidosta"
                />
              </td>
            </tr>

            <tr>
              <td>
                Tuotantokustannuslaskelman teko säännöllisesti
              </td>
              <td style={{ textAlign: 'center' }}>
                <YesNoToggle
                  value={localFinanceData.tuotantokustannusLaskenta}
                  onChange={(val) =>
                    setLocalFinanceData({ ...localFinanceData, tuotantokustannusLaskenta: val })
                  }
                  themeColor="  #0345fa"
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="tuotantokustannusLaskentaLisatiedot"
                  value={localFinanceData.tuotantokustannusLaskentaLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                  placeholder="Esim. rehu, maito"
                />
              </td>
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
            <tr>
              <td>Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä</td>
              <td colSpan="3">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ fontWeight: 'bold' }}>Vuosi-1</label>
                    <AutoResizeTextArea
                      name="kilpailuErityisetToimenpiteetVuosi1"
                      value={localFinanceData.kilpailuErityisetToimenpiteetVuosi1 || ""}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Kirjoita tavoite vuodelle 1..."
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontWeight: 'bold' }}>Vuosi-2</label>
                    <AutoResizeTextArea
                      name="kilpailuErityisetToimenpiteetVuosi2"
                      value={localFinanceData.kilpailuErityisetToimenpiteetVuosi2 || ""}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Kirjoita tavoite vuodelle 2..."
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontWeight: 'bold' }}>Vuosi-3</label>
                    <AutoResizeTextArea
                      name="kilpailuErityisetToimenpiteetVuosi3"
                      value={localFinanceData.kilpailuErityisetToimenpiteetVuosi3 || ""}
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

        <table className="common-table finance-table">
          <colgroup>
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th>Riskien hallinta</th>
              <th>Uusin tulos</th>
              <th>Kuvaus</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Varautumissuunnitelma poikkeustilanteisiin tehty</td>
              <td style={{ textAlign: 'center' }}>
                <YesNoToggle
                  value={localFinanceData.riskVarautumissuunnitelma}
                  onChange={(val) =>
                    setLocalFinanceData({ ...localFinanceData, riskVarautumissuunnitelma: val })
                  }
                  themeColor="  #0345fa"
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
            </tr>

            <tr>
              <td>Pelastautumissuunnitelma tehty</td>
              <td style={{ textAlign: 'center' }}>
                <YesNoToggle
                  value={localFinanceData.riskPelastautumissuunnitelma}
                  onChange={(val) =>
                    setLocalFinanceData({ ...localFinanceData, riskPelastautumissuunnitelma: val })
                  }
                  themeColor="  #0345fa"
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
            </tr>

            <tr>
              <td>
                Riskikartoituksia tehty
              </td>
              <td style={{ textAlign: 'center' }}>
                <YesNoToggle
                  value={localFinanceData.riskRiskikartoitukset}
                  onChange={(val) =>
                    setLocalFinanceData({ ...localFinanceData, riskRiskikartoitukset: val })
                  }
                  themeColor="  #0345fa"
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="riskRiskikartoituksetLisatiedot"
                  value={localFinanceData.riskRiskikartoituksetLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                  placeholder="Esim. tapaturmat, eläintaudit, sähkö- ja paloturvallisuus, tietoturva"
                />
              </td>
            </tr>
            <tr>
              <td>Kuvaus vakuutusturvasta </td>
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
                  placeholder="Esim. omaisuus, toiminta, eläimet..."
                />
              </td>
            </tr>
            <tr>
              <td>
                Kuvaus henkilöriskien hallinnasta ja dokumentaatiosta
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
                  placeholder="Esim. edunvalvontavaltuutukset, testamentit, avioehto, varahenkilösuunnitelma"
                />
              </td>
            </tr>
            <tr>
              <td>Kuvaus rahoitusriskien hallinnasta </td>
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
                  placeholder="Esim. korkosuojaus"
                />
              </td>
            </tr>
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
            </tr>

            {localFinanceData.riskVarautumissuunnitelma !== "Kyllä" && (
              <>
                <tr>
                  <td>Kuvaus varautumisesta sähkökatkoksiin </td>
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
                      placeholder="Esim. tilalla on varavoimalähde"
                    />
                  </td>

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
                </tr>
                <tr>
                  <td>Kuvaus eläinriskien hallinnasta </td>
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
                      placeholder="Esim. salmonella, Biocheck, tautiluokitukset"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Kuvaus peltoriskien hallinnasta </td>
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
                      placeholder="Esim. vuokrasopimukset, oman pellon osuus, pellon riittävyys ja laatu"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Kuvaus tietoturvariskien hallinnasta </td>
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
                      placeholder="Esim. etävalvonta, maatalouden ja yksityistalouden eriyttäminen"
                    />
                  </td>
                </tr>
              </>
            )}
            <tr>
              <td>Kuvaus muista mahdollista toimenpiteistä</td>
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
            <tr>
              <td>Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä</td>
              <td colSpan="3">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ fontWeight: 'bold' }}>Vuosi-1</label>
                    <AutoResizeTextArea
                      name="riskErityisetToimenpiteetVuosi1"
                      value={localFinanceData.riskErityisetToimenpiteetVuosi1 || ""}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Kirjoita tavoite vuodelle 1..."
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontWeight: 'bold' }}>Vuosi-2</label>
                    <AutoResizeTextArea
                      name="riskErityisetToimenpiteetVuosi2"
                      value={localFinanceData.riskErityisetToimenpiteetVuosi2 || ""}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Kirjoita tavoite vuodelle 2..."
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontWeight: 'bold' }}>Vuosi-3</label>
                    <AutoResizeTextArea
                      name="riskErityisetToimenpiteetVuosi3"
                      value={localFinanceData.riskErityisetToimenpiteetVuosi3 || ""}
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
    justifyContent: 'center',   // keskittää napit
    gap: '1rem',                // sama marginaali napin väliin
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
      backgroundColor: '#0345FA',      // harmaa “Edellinen”
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
      backgroundColor: '#0345FA',      // sininen “Seuraava” (kuten Johdanto)
      color: 'white',
      border: 'none',
      cursor: 'pointer'
    }}
  >
    Seuraava
  </button>
</div>

      </form>
    </div>
  );
};

export default TalousJaHallintoPage;
