// src/components/SosiaalinenVastuuPage.js
import React, { useState, useEffect } from 'react';
import './tables.css';
import LogoHeader from './LogoHeader';
import AutoResizeTextArea from './AutoResizeTextArea';
import YesNoToggle from './YesNoToggle';
import YearToggle from './YearToggle';

const SosiaalinenVastuuPage = ({ onNext, onPrevious, initialSocialData, onDataUpdate }) => {
  // Alustetaan tila lazy initializerilla: ensin tarkistetaan localStorage.
  const [socialData, setSocialData] = useState(() => {
    const savedData = localStorage.getItem('socialData');
    if (savedData) {
      return JSON.parse(savedData);
    }
    return initialSocialData || {
      // 1. Henkilöstö ja työolosuhteet
      henkilostoStrategia: '',
      henkilostoStrategiaLisatiedot: '',

      HenkilostoStrategiaSisalto: '',
      HenkilostoStrategiaSisaltoLisatiedot: '',

      tyotuottavuus: '',
      tyotuottavuusLisatiedot: '',

      tasaArvo: '',
      tasaArvoLisatiedot: '',

      tyotaHelpottavatRatkaisut: '',
      tyotaHelpottavatRatkaisutLisatiedot: '',

      henkilostoTavoiteVuodet: '',
      henkilostoTavoiteTeksti: '',
      henkilostoTavoitteetVuosi1: '',
      henkilostoTavoitteetVuosi2: '',
      henkilostoTavoitteetVuosi3: '',

      // 2. Yrittäjiin liittyvää
      osaamisenKehittaminen: '',
      osaamisenKehittaminenLisatiedot: '',
      osaamisenKehittaminenTavoitteet: '',
      tyoterveyshuolto: '',
      tyoterveyshuoltoLisatiedot: '',
      tyoterveyshuoltoTavoitteet: '',
      jaksaminen: '',
      jaksaminenLisatiedot: '',
      jaksaminenTavoitteet: '',
      vapaapäivat: '',
      vapaapäivatLisatiedot: '',
      vapaapäivatTavoitteet: '',
      vuosilomat: '',
      vuosilomatLisatiedot: '',
      vuosilomatTavoitteet: '',
      tyoajanMittaaminen: '',
      tyoajanMittaaminenLisatiedot: '',
      tyoajanMittaaminenTavoitteet: '',

      // 3. Työntekijöihin liittyvää
      palkkaus: '',
      palkkausLisatiedot: '',
      palkkausTavoitteet: '',
      tyoterveyshuolto2: '',
      tyoterveyshuolto2Lisatiedot: '',
      tyoterveyshuolto2Tavoitteet: '',
      sairauspoissaolot: '',
      sairauspoissaolotLisatiedot: '',
      sairauspoissaolotTavoitteet: '',
      hoitotaVaativiaTapaturmia: '',
      hoitotaVaativiaTapaturmiaLisatiedot: '',
      hoitotaVaativiaTapaturmiaTavoitteet: '',
      osaamisenKehittaminenJaLisakouluttautuminen: '',
      osaamisenKehittaminenJaLisakouluttautuminenLisatiedot: '',
      osaamisenKehittaminenJaLisakouluttautuminenTavoitteet: '',
      tyhy: '',
      tyhyLisatiedot: '',
      tyhyTavoitteet: '',
      kehityskeskustelut: '',
      kehityskeskustelutLisatiedot: '',
      kehityskeskustelutTavoitteet: '',
      palaverit: '',
      palaveritLisatiedot: '',
      palaveritTavoitteet: '',
      tyosuhteidenKesto: '',
      tyosuhteidenKestoLisatiedot: '',
      tyosuhteidenKestoTavoitteet: '',
      tyotyotyot: '',
      tyotyotyotLisatiedot: '',
      tyotyotyotTavoitteet: '',
      muutErityiset: '',
      muutErityisetLisatiedot: '',
      muutErityisetTavoitteet: '',
      yhteistyoErityisetVuosi1: '',
      yhteistyoErityisetVuosi2: '',
      yhteistyoErityisetVuosi3: '',

      erityisetToimenpiteetVuosi1: '',
      erityisetToimenpiteetVuosi2: '',
      erityisetToimenpiteetVuosi3: '',

      maitoErityisetToimenpiteetVuosi1: '',
      maitoErityisetToimenpiteetVuosi2: '',
      maitoErityisetToimenpiteetVuosi3: '',
     


      // 3.2 Yhteistyö ja avoimuus (omaksi taulukoksi)
      yhteistyoMuidenYrittajien: '',
      yhteistyoMuidenYrittajienLisatiedot: '',
      yhteistyoMuidenYrittajienTavoitteet: '',
      yhteistyoKylayhteisyo: '',
      yhteistyoKylayhteisyoLisatiedot: '',
      yhteistyoKylayhteisyoTavoitteet: '',
      yhteistyoMerkittavat: '',
      yhteistyoMerkittavatLisatiedot: '',
      yhteistyoMerkittavatTavoitteet: '',
      yhteistyoLuottamustoimet: '',
      yhteistyoLuottamustoimetLisatiedot: '',
      yhteistyoLuottamustoimetTavoitteet: '',
      avoimuusImago: '',
      avoimuusImagoLisatiedot: '',
      avoimuusImagoTavoitteet: '',
      yhteistyoErityiset: '',
      yhteistyoErityisetLisatiedot: '',
      yhteistyoErityisetTavoitteet: '',
      yhteistyoErityisetVuodet: '',
      yhteistyoErityisetTavoiteTeksti: '',

      // 3.3 Eläinten hyvinvointi
      nautojenTerveydenhuoltorekisteri: '',
      nautojenTerveydenhuoltorekisteriLisatiedot: '',
      nautojenTerveydenhuoltorekisteriTavoitteet: '',
      nautojenTerveydenhuoltorekisteriErityiset: '',
      sorkkaterveys: '',
      sorkkaterveysLisatiedot: '',
      sorkkaterveysTavoitteet: '',
      sorkkaterveysErityiset: '',
      lehmienpoisto: '',
      lehmienpoistoLisatiedot: '',
      vasikkakuolleisuus: '',
      vasikkakuolleisuusLisatiedot: '',
      vasikkakuolleisuusTavoitteet: '',
      vasikkakuolleisuusErityiset: '',
      lehmienKeskipoikimakerta: '',
      lehmienKeskipoikimakertaLisatiedot: '',
      lehmienKeskipoikimakertaTavoitteet: '',
      lehmienKeskipoikimakertaErityiset: '',
      poistettujenLehmienElinikaiTuotos: '',
      poistettujenLehmienElinikaiTuotosLisatiedot: '',
      poistettujenLehmienElinikaiTuotosTavoitteet: '',
      poistettujenLehmienElinikaiTuotosErityiset: '',
      ekmPerElinpiva: '',
      ekmPerElinpivaLisatiedot: '',
      ekmPerElinpivaTavoitteet: '',
      ekmPerElinpivaErityiset: '',
      laiduntaminen: '',
      laiduntaminenLisatiedot: '',
      laiduntaminenTavoitteet: '',
      laiduntaminenErityiset: '',
      jaloittelu: '',
      jaloitteluLisatiedot: '',
      jaloitteluTavoitteet: '',
      jaloitteluErityiset: '',
      ymparivuotinenJaloittelu: '',
      ymparivuotinenJaloitteluLisatiedot: '',
      ymparivuotinenJaloitteluTavoitteet: '',
      ymparivuotinenJaloitteluErityiset: '',
      lehmienMakuupaikka: '',
      lehmienMakuupaikkaLisatiedot: '',
      lehmienMakuupaikkaTavoitteet: '',
      lehmienMakuupaikkaErityiset: '',
      viilennys: '',
      viilennysLisatiedot: '',
      viilennysTavoitteet: '',
      viilennysErityiset: '',
      lehmillaKaytavat: '',
      lehmillaKaytavatLisatiedot: '',
      lehmillaKaytavatTavoitteet: '',
      lehmillaKaytavatErityiset: '',
      vierihoito: '',
      vierihoitoLisatiedot: '',
      vierihoitoTavoitteet: '',
      vierihoitoErityiset: '',
      wellfareQuality: '',
      wellfareQualityLisatiedot: '',
      wellfareQualityTavoitteet: '',
      wellfareQualityErityiset: '',
      elviStatus: '',
      elviStatusLisatiedot: '',
      elviStatusTavoitteet: '',
      elviStatusErityiset: '',
      // 3.4 Maidon laatu
      laakekirjanpito: '',
      laakekirjanpitoLisatiedot: '',
      laakekirjanpitoTavoitteet: '',
      tankkimaidonTestaus: '',
      tankkimaidonTestausLisatiedot: '',
      tankkimaidonTestausTavoitteet: '',
      eLuokanOsuus: '',
      eLuokanOsuusLisatiedot: '',
      eLuokanOsuusTavoitteet: '',
      maidonSolupitoisuus: '',
      maidonSolupitoisuusLisatiedot: '',
      maidonSolupitoisuusTavoitteet: '',
      maitoErityisetToimenpiteet: '',
      maitoErityisetToimenpiteetLisatiedot: '',
      maitoErityisetToimenpiteetTavoitteet: '',
      // Uudet kentät Eläinten hyvinvointi -osuudelle
      maitoErityisetToimenpiteetVuodet: '',
      maitoErityisetToimenpiteetTavoiteTeksti: ''
    };
  });

  useEffect(() => {
    if (!localStorage.getItem('socialData') && initialSocialData) {
      setSocialData(initialSocialData);
    }
  }, [initialSocialData]);

  // Tallennetaan socialData localStorageen aina, kun sitä muutetaan.
  useEffect(() => {
    localStorage.setItem('socialData', JSON.stringify(socialData));
    if (onDataUpdate) {
      onDataUpdate(socialData);
    }
  }, [socialData, onDataUpdate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSocialData({ ...socialData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onNext) onNext(socialData);
  };
  return (
    <div style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Lisätään logot yläosaan */}
      <LogoHeader />


      <h2>Sosiaalinen vastuu</h2>
      <form onSubmit={handleSubmit}>
        <table className="common-table social-table">
          <colgroup>
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th>Henkilöstö ja työolosuhteet</th>
              <th>Uusin tulos</th>
              <th>Kuvaus</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Kirjallinen henkilöstöstrategia tehty<br />
              </td>

              <td style={{ textAlign: 'center' }}>
                <YesNoToggle
                  value={socialData.henkilostoStrategia}
                  onChange={(val) => setSocialData({ ...socialData, HenkilostoStrategia: val })}
                  themeColor=" #ec9005"
                />
              </td>
              <td>
                <AutoResizeTextArea name="henkilostoStrategiaLisatiedot" value={socialData.henkilostoStrategiaLisatiedot} onChange={handleChange} style={{ width: '100%' }}
                />
              </td>

            </tr>

            <tr>
              <td>Kuvaus henkilöstöstrategian sisällöstä </td>
              <td>
                <input type="text" name="HenkilostoStrategiaSisalto" value={socialData.HenkilostoStrategiaSisalto} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <AutoResizeTextArea name="HenkilostoStrategiaSisaltoLisatiedot" value={socialData.HenkilostoStrategiaSisaltoLisatiedot} onChange={handleChange} style={{ width: '100%' }} placeholder="Esim. henkilöstötarpeet, johtaminen, suunnitelmallisuus, vastuut, työntekijöiden määrä" />
              </td>
            </tr>
            <tr>
              <td>Työn tuottavuus, maitokg/navettatyöt h</td>
              <td>
                <input type="text" name="tyotuottavuus" value={socialData.tyotuottavuus} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <AutoResizeTextArea name="tyotuottavuusLisatiedot" value={socialData.tyotuottavuusLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            </tr>
            <tr>
              <td>Tasa-arvon huomiointi</td>
              <td>
                <input type="text" name="tasaArvo" value={socialData.tasaArvo} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <AutoResizeTextArea name="tasaArvoLisatiedot" value={socialData.tasaArvoLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            </tr>
            <tr>
              <td>Kuvaus töitä helpottavista ja keventävistä ratkaisuista</td>
              <td>
                <input type="text" name="tyotaHelpottavatRatkaisut" value={socialData.tyotaHelpottavatRatkaisut} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <AutoResizeTextArea name="tyotaHelpottavatRatkaisutLisatiedot" value={socialData.tyotaHelpottavatRatkaisutLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            </tr>


            <tr>
              <td colSpan="4" style={{ fontWeight: 'bold', backgroundColor: '#f7f7f7' }}>
                Yrittäjiin liittyvää
              </td>
            </tr>
            <tr>
              <td>Oman osaamisen kehittäminen ja lisäkouluttautuminen, pv/v </td>
              <td>
                <input type="text" name="osaamisenKehittaminen" value={socialData.osaamisenKehittaminen} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <AutoResizeTextArea name="osaamisenKehittaminenLisatiedot" value={socialData.osaamisenKehittaminenLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            </tr>
            <tr>
              <td>Oma työterveyshuolto</td>
              <td style={{ textAlign: 'center' }}>
                <YesNoToggle
                  value={socialData.tyoterveyshuolto}
                  onChange={(val) => setSocialData({ ...socialData, tyoterveyshuolto: val })}
                  themeColor=" #ec9005"
                />
              </td>
              <td>
                <AutoResizeTextArea name="tyoterveyshuoltoLisatiedot" value={socialData.tyoterveyshuoltoLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            </tr>
            <tr>
              <td>Kuvaus oman hyvinvoinnin ja jaksamisen ylläpidosta </td>
              <td>
                <input type="text" name="jaksaminen" value={socialData.jaksaminen} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <AutoResizeTextArea name="jaksaminenLisatiedot" value={socialData.jaksaminenLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            </tr>
            <tr>
              <td>
                Mahdollisuus säännöllisiin vapaapäiviin<br />

              </td>
              <td style={{ textAlign: 'center' }}>
                <YesNoToggle
                  value={socialData.vapaapäivat}
                  onChange={(val) => setSocialData({ ...socialData, vapaapäivat: val })}
                  themeColor=" #ec9005"
                />
              </td>
              <td>
                <AutoResizeTextArea name="vapaapäivatLisatiedot" value={socialData.vapaapäivatLisatiedot} onChange={handleChange} style={{ width: '100%' }}
                  placeholder="Kuvaa miten..." />
              </td>
            </tr>
            <tr>
              <td>Vuosilomien pitäminen suunnitellusti</td>
              <td style={{ textAlign: 'center' }}>
                <YesNoToggle
                  value={socialData.vuosilomat}
                  onChange={(val) => setSocialData({ ...socialData, vuosilomat: val })}
                  themeColor=" #ec9005"
                />
              </td>
              <td>
                <AutoResizeTextArea name="vuosilomatLisatiedot" value={socialData.vuosilomatLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            </tr>
            <tr>
              <td>
                Työajan mittaaminen<br />

              </td>
              <td style={{ textAlign: 'center' }}>
                <YesNoToggle
                  value={socialData.tyoajanMittaaminen}
                  onChange={(val) => setSocialData({ ...socialData, tyoajanMittaaminen: val })}
                  themeColor=" #ec9005"
                />
              </td>
              <td>
                <AutoResizeTextArea name="tyoajanMittaaminenLisatiedot" value={socialData.tyoajanMittaaminenLisatiedot} onChange={handleChange} style={{ width: '100%' }}
                  placeholder="Kuvaa miten..." />
              </td>
            </tr>
            <tr>
              <td colSpan="4" style={{ fontWeight: 'bold', backgroundColor: '#f7f7f7' }}>
                Työntekijöihin liittyvää
              </td>
            </tr>
            <tr>
              <td>Kuvaus työntekijöiden palkkauksesta </td>
              <td>
                <input type="text" name="palkkaus" value={socialData.palkkaus} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <AutoResizeTextArea name="palkkausLisatiedot" value={socialData.palkkausLisatiedot} onChange={handleChange} style={{ width: '100%' }}
                  placeholder="Esim. TES, lisät, bonukset" />
              </td>
            </tr>
            <tr>
              <td>Työterveyshuolto</td>
              <td style={{ textAlign: 'center' }}>
                <YesNoToggle
                  value={socialData.tyoterveyshuolto}
                  onChange={(val) => setSocialData({ ...socialData, tyoterveyshuolto: val })}
                  themeColor=" #ec9005"
                />
              </td>
              <td>
                <AutoResizeTextArea name="tyoterveyshuolto2Lisatiedot" value={socialData.tyoterveyshuolto2Lisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            </tr>
            <tr>
              <td>Sairauspoissaolot, pv/v</td>
              <td>
                <input type="text" name="sairauspoissaolot" value={socialData.sairauspoissaolot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <AutoResizeTextArea name="sairauspoissaolotLisatiedot" value={socialData.sairauspoissaolotLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            </tr>
            <tr>
              <td>Hoitota vaativia tapaturmia keskimäärin, kpl/v</td>
              <td>
                <input type="text" name="hoitotaVaativiaTapaturmia" value={socialData.hoitotaVaativiaTapaturmia} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <AutoResizeTextArea name="hoitotaVaativiaTapaturmiaLisatiedot" value={socialData.hoitotaVaativiaTapaturmiaLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            </tr>

            <tr>
              <td>Osaamisen kehittäminen ja lisäkouluttautuminen, pv/v</td>
              <td>
                <input
                  type="text"
                  name="osaamisenKehittaminenJaLisakouluttautuminen"
                  value={socialData.osaamisenKehittaminenJaLisakouluttautuminen}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="osaamisenKehittaminenJaLisakouluttautuminenLisatiedot"
                  value={socialData.osaamisenKehittaminenJaLisakouluttautuminenLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            <tr>
              <td>Kuvaus yrityksen tyhy -toiminnasta</td>
              <td>
                <input
                  type="text"
                  name="tyhy"
                  value={socialData.tyhy}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="tyhyLisatiedot"
                  value={socialData.tyhyLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            <tr>
              <td>Säännölliset kehityskeskuskustelut</td>
              <td style={{ textAlign: 'center' }}>
                <YesNoToggle
                  value={socialData.kehityskeskustelut}
                  onChange={(val) => setSocialData({ ...socialData, kehityskeskustelut: val })}
                  themeColor=" #ec9005"
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="kehityskeskustelutLisatiedot"
                  value={socialData.kehityskeskustelutLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            <tr>
              <td>Kuvaus säännöllisistä palaverikäytännöistä</td>
              <td style={{ textAlign: 'center' }}>
                <YesNoToggle
                  value={socialData.palaverit}
                  onChange={(val) => setSocialData({ ...socialData, palaverit: val })}
                  themeColor=" #ec9005"
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="palaveritLisatiedot"
                  value={socialData.palaveritLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            <tr>
              <td>Työsuhteiden kesto keskimäärin, työvuosia/hlö</td>
              <td>
                <input
                  type="text"
                  name="tyosuhteidenKesto"
                  value={socialData.tyosuhteidenKesto}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="tyosuhteidenKestoLisatiedot"
                  value={socialData.tyosuhteidenKestoLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            <tr>
              <td>Työtyytyväisyyden mittaaminen käytössä</td>
              <td style={{ textAlign: 'center' }}>
                <YesNoToggle
                  value={socialData.tyotyotyot}
                  onChange={(val) => setSocialData({ ...socialData, tyotyotyot: val })}
                  themeColor=" #ec9005"
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="tyotyotyotLisatiedot"
                  value={socialData.tyotyotyotLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            <tr>
              <td>Kuvaus muista mahdollisista toimenpiteistä</td>
              <td colSpan="3">
                <textarea
                  name="muutErityiset"
                  value={socialData.muutErityiset}
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
                      name="henkilostoTavoitteetVuosi1"
                      value={socialData.henkilostoTavoitteetVuosi1 || ""}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Kirjoita tavoite vuodelle 1..."
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontWeight: 'bold' }}>Vuosi-2</label>
                    <AutoResizeTextArea
                      name="henkilostoTavoitteetVuosi2"
                      value={socialData.henkilostoTavoitteetVuosi2 || ""}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Kirjoita tavoite vuodelle 2..."
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontWeight: 'bold' }}>Vuosi-3</label>
                    <AutoResizeTextArea
                      name="henkilostoTavoitteetVuosi3"
                      value={socialData.henkilostoTavoitteetVuosi3 || ""}
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



        <table className="common-table social-table">
          <colgroup>
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th>Yhteistyö ja avoimuus</th>
              <th>Uusin tulos</th>
              <th>Kuvaus</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Kuvaa yhteistyötä muiden yrittäjien kanssa<br />

              </td>
              <td>
                <input
                  type="text"
                  name="yhteistyoMuidenYrittajien"
                  value={socialData.yhteistyoMuidenYrittajien}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="yhteistyoMuidenYrittajienLisatiedot"
                  value={socialData.yhteistyoMuidenYrittajienLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                  placeholder=" Esim. yhteiset työntekijät, hiehojen kasvatus, yhteistyöhakuisuus"
                />
              </td>
            </tr>
            <tr>
              <td>Kuvaus yhteistyöstä kyläyhteisön kanssa</td>
              <td>
                <input
                  type="text"
                  name="yhteistyoKylayhteisyo"
                  value={socialData.yhteistyoKylayhteisyo}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="yhteistyoKylayhteisyoLisatiedot"
                  value={socialData.yhteistyoKylayhteisyoLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            <tr>
              <td>Kuvaus merkittävimmistä yhteistyökumppaneista</td>
              <td>
                <input
                  type="text"
                  name="yhteistyoMerkittavat"
                  value={socialData.yhteistyoMerkittavat}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="yhteistyoMerkittavatLisatiedot"
                  value={socialData.yhteistyoMerkittavatLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            <tr>
              <td>Kuvaus yrittäjien luottamustoimista</td>
              <td>
                <input
                  type="text"
                  name="yhteistyoLuottamustoimet"
                  value={socialData.yhteistyoLuottamustoimet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="yhteistyoLuottamustoimetLisatiedot"
                  value={socialData.yhteistyoLuottamustoimetLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            <tr>
              <td>
                Kuvaus yrityksen avoimuudesta ja imagon kehittämisestä<br />
              </td>
              <td>
                <input
                  type="text"
                  name="avoimuusImago"
                  value={socialData.avoimuusImago}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="avoimuusImagoLisatiedot"
                  value={socialData.avoimuusImagoLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                  placeholder="Sosiaalinen media, verkkosivut, avoimet ovet, vierailuryhmät"
                />
              </td>
            </tr>
            <tr>
              <td>Kuvaus muista mahdollisista toimenpiteistä</td>
              <td colSpan="3">
                <textarea
                  type="text"
                  name="yhteistyoErityiset"
                  value={socialData.yhteistyoErityiset}
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
                      name="yhteistyoErityisetVuosi1"
                      value={socialData.yhteistyoErityisetVuosi1 || ""}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Kirjoita tavoite vuodelle 1..."
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontWeight: 'bold' }}>Vuosi-2</label>
                    <AutoResizeTextArea
                      name="yhteistyoErityisetVuosi2"
                      value={socialData.yhteistyoErityisetVuosi2 || ""}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Kirjoita tavoite vuodelle 2..."
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontWeight: 'bold' }}>Vuosi-3</label>
                    <AutoResizeTextArea
                      name="yhteistyoErityisetVuosi3"
                      value={socialData.yhteistyoErityisetVuosi3 || ""}
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



        <table className="common-table social-table">
          <colgroup>
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th>Eläinten hyvinvointi</th>
              <th>Uusin tulos</th>
              <th>Kuvaus</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Nautojen terveydenhuoltorekisteri Naseva käytössä</td>
              <td style={{ textAlign: 'center' }}>
                <YesNoToggle
                  value={socialData.nautojenTerveydenhuoltorekisteri}
                  onChange={(val) => setSocialData({ ...socialData, nautojenTerveydenhuoltorekisteri: val })}
                  themeColor=" #ec9005"
                />
              </td>
              <td>
                <AutoResizeTextArea name="nautojenTerveydenhuoltorekisteriLisatiedot" value={socialData.nautojenTerveydenhuoltorekisteriLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            </tr>
            <tr>

              <td>Sorkkaterveyden seuranta ja hoito säännöllisesti, kyllä/ei</td>
              <td style={{ textAlign: 'center' }}>
                <YesNoToggle
                  value={socialData.sorkkaterveys}
                  onChange={(val) => setSocialData({ ...socialData, sorkkaterveys: val })}
                  themeColor=" #ec9005"
                />
              </td>
              <td>
                <AutoResizeTextArea name="sorkkaterveysLisatiedot" value={socialData.sorkkaterveysLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            </tr>
            <tr>
              <td>Lehmien poisto %  </td>
              <td>
                <input type="text" name="lehmienpoisto" value={socialData.lehmienpoisto} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <AutoResizeTextArea name="lehminepoistoLisatiedot" value={socialData.lehmienpoistoLisatiedot} onChange={handleChange} style={{ width: '100%' }} placeholder="Tieto löytyy tuotosseurannasta tai meijerin tiedoista" />
              </td>
            </tr>
            <tr>
              <td>Vasikkakuolleisuus %  </td>
              <td>
                <input type="text" name="vasikkakuolleisuus" value={socialData.vasikkakuolleisuus} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <AutoResizeTextArea name="vasikkakuolleisuusLisatiedot" value={socialData.vasikkakuolleisuusLisatiedot} onChange={handleChange} style={{ width: '100%' }} placeholder="Tuotosseurannan luku" />
              </td>
            </tr>
            <tr>
              <td>Lehmien keskipoikimakerta  </td>
              <td>
                <input type="text" name="lehmienKeskipoikimakerta" value={socialData.lehmienKeskipoikimakerta} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <AutoResizeTextArea name="lehmienKeskipoikimakertaLisatiedot" value={socialData.lehmienKeskipoikimakertaLisatiedot} onChange={handleChange} style={{ width: '100%' }} placeholder="Tieto löytyy tuotosseurannasta tai meijerin tiedoista" />
              </td>
            </tr>
            <tr>
              <td>Poistettujen lehmien elinikäistuotos, kg </td>
              <td>
                <input type="text" name="poistettujenLehmienElinikaiTuotos" value={socialData.poistettujenLehmienElinikaiTuotos} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <AutoResizeTextArea name="poistettujenLehmienElinikaiTuotosLisatiedot" value={socialData.poistettujenLehmienElinikaiTuotosLisatiedot} onChange={handleChange} style={{ width: '100%' }} placeholder="Tieto löytyy tuotosseurannasta tai meijerin tiedoista" />
              </td>
            </tr>
            <tr>
              <td>Poistettujen lehmien EKM kg/elinpäivä</td>
              <td>
                <input type="text" name="ekmPerElinpiva" value={socialData.ekmPerElinpiva} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <AutoResizeTextArea name="ekmPerElinpivaLisatiedot" value={socialData.ekmPerElinpivaLisatiedot} onChange={handleChange} style={{ width: '100%' }}
                  placeholder="Tieto löytyy tuotosseurannasta tai meijerin tiedoista (vuosiraportti)" />
              </td>
            </tr>
            <tr>
              <td>Laiduntaminen käytössä<br /></td>
              <td style={{ textAlign: 'center' }}>
                <YesNoToggle
                  value={socialData.laiduntaminen}
                  onChange={(val) => setSocialData({ ...socialData, laiduntaminen: val })}
                  themeColor=" #ec9005"
                />
              </td>
              <td>
                <AutoResizeTextArea name="laiduntaminenLisatiedot" value={socialData.laiduntaminenLisatiedot} onChange={handleChange} style={{ width: '100%' }}
                  placeholder="Kuvaa mitkä eläinryhmät laiduntavat" />
              </td>
            </tr>
            <tr>
              <td>Jaloittelu käytössä </td>
              <td>
                <input type="text" name="jaloittelu" value={socialData.jaloittelu} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <AutoResizeTextArea name="jaloitteluLisatiedot" value={socialData.jaloitteluLisatiedot} onChange={handleChange} style={{ width: '100%' }} placeholder="Kuvaa mitkä eläinryhmät jaloittelevat" />
              </td>
            </tr>
            <tr>
              <td>Ympärivuotinen jaloittelu käytössä </td>
              <td>
                <input type="text" name="ymparivuotinenJaloittelu" value={socialData.ymparivuotinenJaloittelu} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <AutoResizeTextArea name="ymparivuotinenJaloitteluLisatiedot" value={socialData.ymparivuotinenJaloitteluLisatiedot} onChange={handleChange} style={{ width: '100%' }} placeholder="Kuvaa mitkä eläinryhmät jaloittelevat ympärivuotisesti" />
              </td>
            </tr>
            <tr>
              <td>
                Kuvaus lehmien makuupaikasta<br />

              </td>
              <td>
                <input type="text" name="lehmienMakuupaikka" value={socialData.lehmienMakuupaikka} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <AutoResizeTextArea name="lehmienMakuupaikkaLisatiedot" value={socialData.lehmienMakuupaikkaLisatiedot} onChange={handleChange} style={{ width: '100%' }} placeholder="Esim. parsipeti, syväkuivikeparsi, syväkuivitettu makuualue" />
              </td>
            </tr>
            <tr>
              <td>Viilennys lypsynavetassa</td>
              <td style={{ textAlign: 'center' }}>
                <YesNoToggle
                  value={socialData.viilennys}
                  onChange={(val) => setSocialData({ ...socialData, viilennys: val })}
                  themeColor=" #ec9005"
                />
              </td>
              <td>
                <AutoResizeTextArea name="viilennysLisatiedot" value={socialData.viilennysLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            </tr>
            <tr>
              <td>Lehmillä käytävämatot</td>
              <td style={{ textAlign: 'center' }}>
                <YesNoToggle
                  value={socialData.lehmillaKaytavat}
                  onChange={(val) => setSocialData({ ...socialData, lehmillaKaytavat: val })}
                  themeColor=" #ec9005"
                />
              </td>
              <td>
                <AutoResizeTextArea name="lehmillaKaytavatLisatiedot" value={socialData.lehmillaKaytavatLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            </tr>
            <tr>
              <td>Pidennetty vierihoito tai imettäjälehmät käytäntönä</td>
              <td style={{ textAlign: 'center' }}>
                <YesNoToggle
                  value={socialData.vierihoito}
                  onChange={(val) => setSocialData({ ...socialData, vierihoito: val })}
                  themeColor=" #ec9005"
                />
              </td>
              <td>
                <AutoResizeTextArea name="vierihoitoLisatiedot" value={socialData.vierihoitoLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            </tr>
            <tr>
              <td>WellFare Quality -koulutus ja sertifiointi suoritettu</td>
              <td style={{ textAlign: 'center' }}>
                <YesNoToggle
                  value={socialData.wellfareQuality}
                  onChange={(val) => setSocialData({ ...socialData, wellfareQuality: val })}
                  themeColor=" #ec9005"
                />
              </td>
              <td>
                <AutoResizeTextArea name="wellfareQualityLisatiedot" value={socialData.wellfareQualityLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            </tr>
            <tr>
              <td>ELVI -merkki -status voimassa</td>
              <td style={{ textAlign: 'center' }}>
                <YesNoToggle
                  value={socialData.elviStatus}
                  onChange={(val) => setSocialData({ ...socialData, elviStatus: val })}
                  themeColor=" #ec9005"
                />
              </td>
              <td>
                <AutoResizeTextArea name="elviStatusLisatiedot" value={socialData.elviStatusLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            </tr>
            <tr>
              <td>Kuvaus muista mahdollisista toimenpiteistä</td>
              <td colSpan="3">
                <textarea type="text" name="erityisetToimenpiteet" value={socialData.erityisetToimenpiteet} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            </tr>
            <tr>
              <td>Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä</td>
              <td colSpan="3">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ fontWeight: 'bold' }}>Vuosi-1</label>
                    <AutoResizeTextArea
                      name="erityisetToimenpiteetVuosi1"
                      value={socialData.erityisetToimenpiteetVuosi1 || ""}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Kirjoita tavoite vuodelle 1..."
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontWeight: 'bold' }}>Vuosi-2</label>
                    <AutoResizeTextArea
                      name="erityisetToimenpiteetVuosi2"
                      value={socialData.erityisetToimenpiteetVuosi2 || ""}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Kirjoita tavoite vuodelle 2..."
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontWeight: 'bold' }}>Vuosi-3</label>
                    <AutoResizeTextArea
                      name="erityisetToimenpiteetVuosi3"
                      value={socialData.erityisetToimenpiteetVuosi3 || ""}
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


        <table className="common-table social-table">
          <colgroup>
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th>Tuotteen laatu</th>
              <th>Uusin tulos</th>
              <th>Kuvaus</th>
            </tr>
          </thead>
          <tbody>

            <tr>
              <td>
                Sähköinen lääkekirjanpito käytössä <br />

              </td>
              <td style={{ textAlign: 'center' }}>
                <YesNoToggle
                  value={socialData.laakekirjanpito}
                  onChange={(val) => setSocialData({ ...socialData, laakekirjanpito: val })}
                  themeColor=" #ec9005"
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="laakekirjanpitoLisatiedot"
                  value={socialData.laakekirjanpitoLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                  placeholder="Esim. Naseva"
                />

              </td>
            </tr>
            <tr>
              <td>
                Tankkimaidon testaaminen antibioottihoitojen yhteydessä
              </td>
              <td style={{ textAlign: 'center' }}>
                <YesNoToggle
                  value={socialData.tankkimaidonTestaus}
                  onChange={(val) => setSocialData({ ...socialData, tankkimaidonTestaus: val })}
                  themeColor=" #ec9005"
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="tankkimaidonTestausLisatiedot"
                  value={socialData.tankkimaidonTestausLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            <tr>
              <td>Montako vuotta tuotettu E-luokan maitoa</td>
              <td>
                <input
                  type="text"
                  name="eLuokanOsuus"
                  value={socialData.eLuokanOsuus}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="eLuokanOsuusLisatiedot"
                  value={socialData.eLuokanOsuusLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                  placeholder="Tieto löytyy tuotosseurannasta tai meijerin tiedoista"
                />
              </td>
            </tr>
            <tr>
              <td>
                Maidon solupitoisuus
              </td>
              <td>
                <input
                  type="text"
                  name="maidonSolupitoisuus"
                  value={socialData.maidonSolupitoisuus}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <AutoResizeTextArea
                  name="maidonSolupitoisuusLisatiedot"
                  value={socialData.maidonSolupitoisuusLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                  placeholder="Tieto löytyy tuotosseurannasta tai meijerin tiedoista"
                />
              </td>
            </tr>
            <tr>
              <td>Kuvaus muista mahdollisista toimenpiteistä</td>
              <td colSpan="3">
                <textarea
                  type="text"
                  name="maitoErityisetToimenpiteet"
                  value={socialData.maitoErityisetToimenpiteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            {/* Uusi rivi eläinten hyvinvointi -osuudelle: vuosisyklin valinta + tavoitekenttä */}
            <tr>
              <td>Kuvaus mahdollisista tavoitteista seuraavan kolmen vuoden sisällä</td>
              <td colSpan="3">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ fontWeight: 'bold' }}>Vuosi-1</label>
                    <AutoResizeTextArea
                      name="maitoErityisetToimenpiteetVuosi1"
                      value={socialData.maitoErityisetToimenpiteetVuosi1 || ""}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Kirjoita tavoite vuodelle 1..."
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontWeight: 'bold' }}>Vuosi-2</label>
                    <AutoResizeTextArea
                      name="maitoErityisetToimenpiteetVuosi2"
                      value={socialData.maitoErityisetToimenpiteetVuosi2 || ""}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Kirjoita tavoite vuodelle 2..."
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontWeight: 'bold' }}>Vuosi-3</label>
                    <AutoResizeTextArea
                      name="maitoErityisetToimenpiteetVuosi3"
                      value={socialData.maitoErityisetToimenpiteetVuosi3 || ""}
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

        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center' }}>
          <button type="button" onClick={onPrevious} style={{ marginRight: '1rem' }}>
            Edellinen
          </button>
          <button type="submit" onClick={handleSubmit} style={{ marginRight: '1rem' }}>
            Seuraava
          </button>
        </div>
      </form>
    </div>
  );
};

export default SosiaalinenVastuuPage;
