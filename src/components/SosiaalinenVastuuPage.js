// src/components/SosiaalinenVastuuPage.js
import React, { useState, useEffect } from 'react';
import './tables.css';
import LogoHeader from './LogoHeader'; 
import AutoResizeTextArea from './AutoResizeTextArea';

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
    henkilostoStrategiaTavoitteet: '',
    tyotuottavuus: '',
    tyotuottavuusLisatiedot: '',
    tyotuottavuusTavoitteet: '',
    tasaArvo: '',
    tasaArvoLisatiedot: '',
    tasaArvoTavoitteet: '',
    tyotaHelpottavatRatkaisut: '',
    tyotaHelpottavatRatkaisutLisatiedot: '',
    tyotaHelpottavatRatkaisutTavoitteet: '',

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
    // Uudet kentät – lisätään HOITOTA VAATIVIA TAPATURMIA jälkeen ennen "Muut erityiset toimenpiteet"
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

    // 3.3 Eläinten hyvinvointi
    nautojenTerveydenhuoltorekisteri: '',
    nautojenTerveydenhuoltorekisteriLisatiedot: '',
    nautojenTerveydenhuoltorekisteriTavoitteet: '',
    nautojenTerveydenhuoltorekisteriErityiset: '',
    
    sorkkaterveys: '',
    sorkkaterveysLisatiedot: '',
    sorkkaterveysTavoitteet: '',
    sorkkaterveysErityiset: '',
    
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
  maitoErityisetToimenpiteetTavoitteet: ''
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

      {/* Ulkopuolinen otsikko */}
  

      {/* Ensimmäinen yhtenäinen taulukko: Henkilöstö, Yrittäjiin ja Työntekijöihin liittyvää */}
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
              <th>Henkilöstö ja työolosuhteet</th>
              <th>Uusin tulos / Arvo</th>
              <th>Kuvaus</th>
              <th>Tavoite ja aikataulu</th>
            </tr>
          </thead>
          <tbody>
            {/* 1. Henkilöstö ja työolosuhteet */}
            <tr>
              <td>
                Kirjallinen henkilöstöstrategia tehty, kyllä/ei<br />
                (kuvaa esim. henkilöstötarpeet, johtaminen, suunnitelmallisuus, vastuut, työntekijöiden määrä)
              </td>
              <td>
                <select name="henkilostoStrategia" value={socialData.henkilostoStrategia} onChange={handleChange} style={{ width: '100%' }}>
                  <option value="">Valitse</option>
                  <option value="kylla">Kyllä</option>
                  <option value="ei">Ei</option>
                </select>
              </td>
              <td>
              <AutoResizeTextArea name="henkilostoStrategiaLisatiedot" value={socialData.henkilostoStrategiaLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
              <AutoResizeTextArea name="henkilostoStrategiaTavoitteet" value={socialData.henkilostoStrategiaTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
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
              <td>
              <AutoResizeTextArea name="tyotuottavuusTavoitteet" value={socialData.tyotuottavuusTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
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
              <td>
              <AutoResizeTextArea name="tasaArvoTavoitteet" value={socialData.tasaArvoTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
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
              <td>
              <AutoResizeTextArea name="tyotaHelpottavatRatkaisutTavoitteet" value={socialData.tyotaHelpottavatRatkaisutTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            </tr>

            {/* Väliotsikko: Yrittäjiin liittyvää */}
            <tr>
              <td colSpan="4" style={{ fontWeight: 'bold', backgroundColor: '#f7f7f7' }}>
                Yrittäjiin liittyvää
              </td>
            </tr>
            <tr>
              <td>Oman osaamisen kehittäminen (kuvaa lisätietokenttään)</td>
              <td>
                <input type="text" name="osaamisenKehittaminen" value={socialData.osaamisenKehittaminen} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
              <AutoResizeTextArea name="osaamisenKehittaminenLisatiedot" value={socialData.osaamisenKehittaminenLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
              <AutoResizeTextArea name="osaamisenKehittaminenTavoitteet" value={socialData.osaamisenKehittaminenTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            </tr>
            <tr>
              <td>Työterveyshuolto, kyllä/ei</td>
              <td>
                <select name="tyoterveyshuolto" value={socialData.tyoterveyshuolto} onChange={handleChange} style={{ width: '100%' }}>
                  <option value="">Valitse</option>
                  <option value="kylla">Kyllä</option>
                  <option value="ei">Ei</option>
                </select>
              </td>
              <td>
              <AutoResizeTextArea name="tyoterveyshuoltoLisatiedot" value={socialData.tyoterveyshuoltoLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
              <AutoResizeTextArea name="tyoterveyshuoltoTavoitteet" value={socialData.tyoterveyshuoltoTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            </tr>
            <tr>
              <td>Jaksamisen ylläpito (kuvaa lisätietokenttään)</td>
              <td>
                <input type="text" name="jaksaminen" value={socialData.jaksaminen} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
              <AutoResizeTextArea name="jaksaminenLisatiedot" value={socialData.jaksaminenLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
              <AutoResizeTextArea name="jaksaminenTavoitteet" value={socialData.jaksaminenTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            </tr>
            <tr>
              <td>
                Mahdollisuus säännöllisiin vapaapäiviin, kyllä/ei<br />
                (kuvaa lisätietokenttään miten)
              </td>
              <td>
                <select name="vapaapäivat" value={socialData.vapaapäivat} onChange={handleChange} style={{ width: '100%' }}>
                  <option value="">Valitse</option>
                  <option value="kylla">Kyllä</option>
                  <option value="ei">Ei</option>
                </select>
              </td>
              <td>
              <AutoResizeTextArea name="vapaapäivatLisatiedot" value={socialData.vapaapäivatLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
              <AutoResizeTextArea name="vapaapäivatTavoitteet" value={socialData.vapaapäivatTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            </tr>
            <tr>
              <td>Vuosilomien pitäminen suunnitellusti, kyllä/ei</td>
              <td>
                <select name="vuosilomat" value={socialData.vuosilomat} onChange={handleChange} style={{ width: '100%' }}>
                  <option value="">Valitse</option>
                  <option value="kylla">Kyllä</option>
                  <option value="ei">Ei</option>
                </select>
              </td>
              <td>
              <AutoResizeTextArea name="vuosilomatLisatiedot" value={socialData.vuosilomatLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
              <AutoResizeTextArea name="vuosilomatTavoitteet" value={socialData.vuosilomatTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            </tr>
            <tr>
              <td>
                Työajan mittaaminen, kyllä/ei<br />
                (kuvaa lisätietokenttään miten)
              </td>
              <td>
                <select name="tyoajanMittaaminen" value={socialData.tyoajanMittaaminen} onChange={handleChange} style={{ width: '100%' }}>
                  <option value="">Valitse</option>
                  <option value="kylla">Kyllä</option>
                  <option value="ei">Ei</option>
                </select>
              </td>
              <td>
              <AutoResizeTextArea name="tyoajanMittaaminenLisatiedot" value={socialData.tyoajanMittaaminenLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
              <AutoResizeTextArea name="tyoajanMittaaminenTavoitteet" value={socialData.tyoajanMittaaminenTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            </tr>

            {/* Väliotsikko: Työntekijöihin liittyvää */}
            <tr>
              <td colSpan="4" style={{ fontWeight: 'bold', backgroundColor: '#f7f7f7' }}>
                Työntekijöihin liittyvää
              </td>
            </tr>
            <tr>
              <td>Kuvaus työntekijöiden palkkauksesta (esim. TES, lisät, bonukset)</td>
              <td>
                <input type="text" name="palkkaus" value={socialData.palkkaus} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
              <AutoResizeTextArea name="palkkausLisatiedot" value={socialData.palkkausLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
              <AutoResizeTextArea name="palkkausTavoitteet" value={socialData.palkkausTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            </tr>
            <tr>
              <td>Työterveyshuolto, kyllä/ei</td>
              <td>
                <select name="tyoterveyshuolto2" value={socialData.tyoterveyshuolto2} onChange={handleChange} style={{ width: '100%' }}>
                  <option value="">Valitse</option>
                  <option value="kylla">Kyllä</option>
                  <option value="ei">Ei</option>
                </select>
              </td>
              <td>
              <AutoResizeTextArea name="tyoterveyshuolto2Lisatiedot" value={socialData.tyoterveyshuolto2Lisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
              <AutoResizeTextArea name="tyoterveyshuolto2Tavoitteet" value={socialData.tyoterveyshuolto2Tavoitteet} onChange={handleChange} style={{ width: '100%' }} />
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
              <td>
              <AutoResizeTextArea name="sairauspoissaolotTavoitteet" value={socialData.sairauspoissaolotTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
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
              <td>
              <AutoResizeTextArea name="hoitotaVaativiaTapaturmiaTavoitteet" value={socialData.hoitotaVaativiaTapaturmiaTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            </tr>
            {/* Uudet rivit lisätään tässä HOITOTA VAATIVIA TAPATURMIA jälkeen ennen MUUT ERITYISET TOIMENPITEET */}
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
              <td>
              <AutoResizeTextArea
                  name="osaamisenKehittaminenJaLisakouluttautuminenTavoitteet"
                  value={socialData.osaamisenKehittaminenJaLisakouluttautuminenTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            <tr>
              <td>Kuvaus tyhy -toiminnasta</td>
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
              <td>
              <AutoResizeTextArea
                  name="tyhyTavoitteet"
                  value={socialData.tyhyTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            <tr>
              <td>Säännölliset kehityskeskuskustelut, kyllä/ei</td>
              <td>
                <select name="kehityskeskustelut" value={socialData.kehityskeskustelut} onChange={handleChange} style={{ width: '100%' }}>
                  <option value="">Valitse</option>
                  <option value="kylla">Kyllä</option>
                  <option value="ei">Ei</option>
                </select>
              </td>
              <td>
              <AutoResizeTextArea
                  name="kehityskeskustelutLisatiedot"
                  value={socialData.kehityskeskustelutLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
              <AutoResizeTextArea
                  name="kehityskeskustelutTavoitteet"
                  value={socialData.kehityskeskustelutTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            <tr>
              <td>Säännölliset palaverikäytännöt, kyllä/ei</td>
              <td>
                <select name="palaverit" value={socialData.palaverit} onChange={handleChange} style={{ width: '100%' }}>
                  <option value="">Valitse</option>
                  <option value="kylla">Kyllä</option>
                  <option value="ei">Ei</option>
                </select>
              </td>
              <td>
              <AutoResizeTextArea
                  name="palaveritLisatiedot"
                  value={socialData.palaveritLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
              <AutoResizeTextArea
                  name="palaveritTavoitteet"
                  value={socialData.palaveritTavoitteet}
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
              <td>
              <AutoResizeTextArea
                  name="tyosuhteidenKestoTavoitteet"
                  value={socialData.tyosuhteidenKestoTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            <tr>
              <td>Työtyytyväisyyden mittaaminen käytössä, kyllä/ei</td>
              <td>
                <select name="tyotyotyot" value={socialData.tyotyotyot} onChange={handleChange} style={{ width: '100%' }}>
                  <option value="">Valitse</option>
                  <option value="kylla">Kyllä</option>
                  <option value="ei">Ei</option>
                </select>
              </td>
              <td>
              <AutoResizeTextArea
                  name="tyotyotyotLisatiedot"
                  value={socialData.tyotyotyotLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
              <AutoResizeTextArea
                  name="tyotyotyotTavoitteet"
                  value={socialData.tyotyotyotTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            <tr>
              <td>Muut erityiset toimenpiteet</td>
              <td>
                <textarea
                  name="muutErityiset"
                  value={socialData.muutErityiset}
                  onChange={handleChange}
                  rows={2}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
              <AutoResizeTextArea
                  name="muutErityisetLisatiedot"
                  value={socialData.muutErityisetLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
              <AutoResizeTextArea
                  name="muutErityisetTavoitteet"
                  value={socialData.muutErityisetTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* Erillinen taulukko: 3.2 Yhteistyö ja avoimuus */}
     
        <table className="common-table">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th>Yhteistyö ja avoimuus</th>
              <th>Uusin tulos</th>
              <th>Lisätiedot</th>
              <th>Tavoitteet ja aikataulut</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Kuvaa yhteistyötä muiden yrittäjien kanssa<br />
                (esim. yhteiset työntekijät, hiehojen kasvatus, yhteistyöhakuisuus)
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
                />
              </td>
              <td>
              <AutoResizeTextArea
                  name="yhteistyoMuidenYrittajienTavoitteet"
                  value={socialData.yhteistyoMuidenYrittajienTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            <tr>
              <td>Kuvaa yhteistyötä kyläyhteisön kanssa</td>
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
              <td>
              <AutoResizeTextArea
                  name="yhteistyoKylayhteisyoTavoitteet"
                  value={socialData.yhteistyoKylayhteisyoTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            <tr>
              <td>Kuvaa merkittävimmät yhteistyökumppanit</td>
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
              <td>
              <AutoResizeTextArea
                  name="yhteistyoMerkittavatTavoitteet"
                  value={socialData.yhteistyoMerkittavatTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            <tr>
              <td>Kuvaa yrittäjien luottamustoimet</td>
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
              <td>
              <AutoResizeTextArea
                  name="yhteistyoLuottamustoimetTavoitteet"
                  value={socialData.yhteistyoLuottamustoimetTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            <tr>
              <td>
                Yrityksen avoimuus ja imagon kehittäminen<br />
                (sosiaalinen media, verkkosivut, avoimet ovet, vierailuryhmät)
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
                />
              </td>
              <td>
              <AutoResizeTextArea
                  name="avoimuusImagoTavoitteet"
                  value={socialData.avoimuusImagoTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
            <tr>
              <td>Erityiset toimenpiteet</td>
              <td>
                <input
                  type="text"
                  name="yhteistyoErityiset"
                  value={socialData.yhteistyoErityiset}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
              <AutoResizeTextArea
                  name="yhteistyoErityisetLisatiedot"
                  value={socialData.yhteistyoErityisetLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
              <AutoResizeTextArea
                  name="yhteistyoErityisetTavoitteet"
                  value={socialData.yhteistyoErityisetTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
          </tbody>
        </table>

         {/* Uusi taulukko: 3.2 Yhteistyö ja avoimuus on jo yllä, ja sen jälkeen uusi taulukko 3.3 Eläinten hyvinvointi */}
    
        <table className="common-table">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th>Eläinten hyvinvointi</th>
              <th>Uusin tulos</th>
              <th>Lisätiedot</th>
              <th>Tavoitteet ja aikataulut</th>  
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Nautojen terveydenhuoltorekisteri Naseva käytössä, kyllä/ei</td>
              <td>
                <select name="nautojenTerveydenhuoltorekisteri" value={socialData.nautojenTerveydenhuoltorekisteri} onChange={handleChange} style={{ width: '100%' }}>
                  <option value="">Valitse</option>
                  <option value="kylla">Kyllä</option>
                  <option value="ei">Ei</option>
                </select>
              </td>
              <td>
              <AutoResizeTextArea name="nautojenTerveydenhuoltorekisteriLisatiedot" value={socialData.nautojenTerveydenhuoltorekisteriLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
              <AutoResizeTextArea name="nautojenTerveydenhuoltorekisteriTavoitteet" value={socialData.nautojenTerveydenhuoltorekisteriTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            
            </tr>
            <tr>
              <td>Sorkkaterveyden seuranta ja hoito säännöllisesti, kyllä/ei</td>
              <td>
                <select name="sorkkaterveys" value={socialData.sorkkaterveys} onChange={handleChange} style={{ width: '100%' }}>
                  <option value="">Valitse</option>
                  <option value="kylla">Kyllä</option>
                  <option value="ei">Ei</option>
                </select>
              </td>
              <td>
              <AutoResizeTextArea name="sorkkaterveysLisatiedot" value={socialData.sorkkaterveysLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
              <AutoResizeTextArea name="sorkkaterveysTavoitteet" value={socialData.sorkkaterveysTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
              </td>
             
            </tr>
            <tr>
              <td>Vasikkakuolleisuus %  <span
      style={{  marginLeft: '5px',
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
                <input type="text" name="vasikkakuolleisuus" value={socialData.vasikkakuolleisuus} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
              <AutoResizeTextArea name="vasikkakuolleisuusLisatiedot" value={socialData.vasikkakuolleisuusLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
              <AutoResizeTextArea name="vasikkakuolleisuusTavoitteet" value={socialData.vasikkakuolleisuusTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
              </td>
             
            </tr>
            <tr>
              <td>Lehmien keskipoikimakerta  <span
      style={{  marginLeft: '5px',
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
                <input type="text" name="lehmienKeskipoikimakerta" value={socialData.lehmienKeskipoikimakerta} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
              <AutoResizeTextArea name="lehmienKeskipoikimakertaLisatiedot" value={socialData.lehmienKeskipoikimakertaLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
              <AutoResizeTextArea name="lehmienKeskipoikimakertaTavoitteet" value={socialData.lehmienKeskipoikimakertaTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              
            </tr>
            <tr>
              <td>Poistettujen lehmien elinikäistuotos, kg  <span
      style={{  marginLeft: '5px',
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
                <input type="text" name="poistettujenLehmienElinikaiTuotos" value={socialData.poistettujenLehmienElinikaiTuotos} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
              <AutoResizeTextArea name="poistettujenLehmienElinikaiTuotosLisatiedot" value={socialData.poistettujenLehmienElinikaiTuotosLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
              <AutoResizeTextArea name="poistettujenLehmienElinikaiTuotosTavoitteet" value={socialData.poistettujenLehmienElinikaiTuotosTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
              </td>
             
            </tr>
            <tr>
              <td>EKM kg/elinpäivä (vuosiraportti)  <span
      style={{  marginLeft: '5px',
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
                <input type="text" name="ekmPerElinpiva" value={socialData.ekmPerElinpiva} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
              <AutoResizeTextArea name="ekmPerElinpivaLisatiedot" value={socialData.ekmPerElinpivaLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
              <AutoResizeTextArea name="ekmPerElinpivaTavoitteet" value={socialData.ekmPerElinpivaTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
              </td>
             
            </tr>
            <tr>
              <td>Laiduntaminen käytössä, kyllä/ei<br />(kuvaa mitkä eläinryhmät laiduntavat)</td>
              <td>
                <select name="laiduntaminen" value={socialData.laiduntaminen} onChange={handleChange} style={{ width: '100%' }}>
                  <option value="">Valitse</option>
                  <option value="kylla">Kyllä</option>
                  <option value="ei">Ei</option>
                </select>
              </td>
              <td>
              <AutoResizeTextArea name="laiduntaminenLisatiedot" value={socialData.laiduntaminenLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
              <AutoResizeTextArea name="laiduntaminenTavoitteet" value={socialData.laiduntaminenTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
              </td>
             
            </tr>
            <tr>
              <td>Jaloittelu käytössä (kuvaa mitkä eläinryhmät jaloittelevat)</td>
              <td>
                <input type="text" name="jaloittelu" value={socialData.jaloittelu} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
              <AutoResizeTextArea name="jaloitteluLisatiedot" value={socialData.jaloitteluLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
              <AutoResizeTextArea name="jaloitteluTavoitteet" value={socialData.jaloitteluTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
              </td>
             
            </tr>
            <tr>
              <td>Ympärivuotinen jaloittelu käytössä (kuvaa mitkä eläinryhmät jaloittelevat ympärivuotisesti)</td>
              <td>
                <input type="text" name="ymparivuotinenJaloittelu" value={socialData.ymparivuotinenJaloittelu} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
              <AutoResizeTextArea name="ymparivuotinenJaloitteluLisatiedot" value={socialData.ymparivuotinenJaloitteluLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
              <AutoResizeTextArea name="ymparivuotinenJaloitteluTavoitteet" value={socialData.ymparivuotinenJaloitteluTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              
            </tr>
            <tr>
              <td>
                Kuvaus lehmien makuupaikasta<br />
                (esim. parsipeti, syväkuivikeparsi, syväkuivitettu makuualue)
              </td>
              <td>
                <input type="text" name="lehmienMakuupaikka" value={socialData.lehmienMakuupaikka} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
              <AutoResizeTextArea name="lehmienMakuupaikkaLisatiedot" value={socialData.lehmienMakuupaikkaLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
              <AutoResizeTextArea name="lehmienMakuupaikkaTavoitteet" value={socialData.lehmienMakuupaikkaTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              
            </tr>
            <tr>
              <td>Viilennys lypsynavetassa, kyllä/ei</td>
              <td>
                <select name="viilennys" value={socialData.viilennys} onChange={handleChange} style={{ width: '100%' }}>
                  <option value="">Valitse</option>
                  <option value="kylla">Kyllä</option>
                  <option value="ei">Ei</option>
                </select>
              </td>
              <td>
              <AutoResizeTextArea name="viilennysLisatiedot" value={socialData.viilennysLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
              <AutoResizeTextArea name="viilennysTavoitteet" value={socialData.viilennysTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
              </td>
             
            </tr>
            <tr>
              <td>Lehmillä käytävämatot, kyllä/ei</td>
              <td>
                <select name="lehmillaKaytavat" value={socialData.lehmillaKaytavat} onChange={handleChange} style={{ width: '100%' }}>
                  <option value="">Valitse</option>
                  <option value="kylla">Kyllä</option>
                  <option value="ei">Ei</option>
                </select>
              </td>
              <td>
              <AutoResizeTextArea name="lehmillaKaytavatLisatiedot" value={socialData.lehmillaKaytavatLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
              <AutoResizeTextArea name="lehmillaKaytavatTavoitteet" value={socialData.lehmillaKaytavatTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
              </td>
             
            </tr>
            <tr>
              <td>Pidennetty vierihoito tai imettäjälehmät käytäntönä, kyllä/ei</td>
              <td>
                <select name="vierihoito" value={socialData.vierihoito} onChange={handleChange} style={{ width: '100%' }}>
                  <option value="">Valitse</option>
                  <option value="kylla">Kyllä</option>
                  <option value="ei">Ei</option>
                </select>
              </td>
              <td>
              <AutoResizeTextArea name="vierihoitoLisatiedot" value={socialData.vierihoitoLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
              <AutoResizeTextArea name="vierihoitoTavoitteet" value={socialData.vierihoitoTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
              </td>
             
            </tr>
            <tr>
              <td>WellFare Quality -koulutus ja sertifiointi suoritettu, kyllä/ei</td>
              <td>
                <select name="wellfareQuality" value={socialData.wellfareQuality} onChange={handleChange} style={{ width: '100%' }}>
                  <option value="">Valitse</option>
                  <option value="kylla">Kyllä</option>
                  <option value="ei">Ei</option>
                </select>
              </td>
              <td>
              <AutoResizeTextArea name="wellfareQualityLisatiedot" value={socialData.wellfareQualityLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
              <AutoResizeTextArea name="wellfareQualityTavoitteet" value={socialData.wellfareQualityTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              
            </tr>
            <tr>
              <td>ELVI -merkki -status voimassa, kyllä/ei</td>
              <td>
                <select name="elviStatus" value={socialData.elviStatus} onChange={handleChange} style={{ width: '100%' }}>
                  <option value="">Valitse</option>
                  <option value="kylla">Kyllä</option>
                  <option value="ei">Ei</option>
                </select>
              </td>
              <td>
              <AutoResizeTextArea name="elviStatusLisatiedot" value={socialData.elviStatusLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
              <AutoResizeTextArea name="elviStatusTavoitteet" value={socialData.elviStatusTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              
            </tr>
            <tr>
              <td>Erityiset toimenpiteet</td>
              <td>
                <input type="text" name="erityisetToimenpiteet" value={socialData.erityisetToimenpiteet} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
              <AutoResizeTextArea name="erityisetToimenpiteetLisatiedot" value={socialData.erityisetToimenpiteetLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
              <AutoResizeTextArea name="erityisetToimenpiteetTavoitteet" value={socialData.erityisetToimenpiteetTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
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
      <th>Maidon laatu</th>
      <th>Uusin tulos</th>
      <th>Lisätiedot</th>
      <th>Tavoitteet ja aikataulut</th>
    </tr>
  </thead>
  <tbody>
    {/* 1. Sähköinen lääkekirjanpito */}
    <tr>
      <td>
        Sähköinen lääkekirjanpito käytössä, kyllä/ei <br />
        (esim. Naseva)
      </td>
      <td>
        <select
          name="laakekirjanpito"
          value={socialData.laakekirjanpito}
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
          name="laakekirjanpitoLisatiedot"
          value={socialData.laakekirjanpitoLisatiedot}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
      <AutoResizeTextArea
          name="laakekirjanpitoTavoitteet"
          value={socialData.laakekirjanpitoTavoitteet}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
    </tr>

    {/* 2. Tankkimaidon testaaminen */}
    <tr>
      <td>
        Tankkimaidon testaaminen antibioottihoitojen yhteydessä, kyllä/ei
      </td>
      <td>
        <select
          name="tankkimaidonTestaus"
          value={socialData.tankkimaidonTestaus}
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
          name="tankkimaidonTestausLisatiedot"
          value={socialData.tankkimaidonTestausLisatiedot}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
      <AutoResizeTextArea
          name="tankkimaidonTestausTavoitteet"
          value={socialData.tankkimaidonTestausTavoitteet}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
    </tr>

    {/* 3. E-luokan maidon osuus */}
    <tr>
      <td>E-luokan maidon osuus, %</td>
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
        />
      </td>
      <td>
      <AutoResizeTextArea
          name="eLuokanOsuusTavoitteet"
          value={socialData.eLuokanOsuusTavoitteet}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
    </tr>

    {/* 4. Maidon solupitoisuus */}
    <tr>
      <td>
        Maidon solupitoisuus, tuotosseurannasta
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
        />
      </td>
      <td>
      <AutoResizeTextArea
          name="maidonSolupitoisuusTavoitteet"
          value={socialData.maidonSolupitoisuusTavoitteet}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
    </tr>

    {/* 5. Erityiset toimenpiteet */}
    <tr>
      <td>Erityiset toimenpiteet</td>
      <td>
        <input
          type="text"
          name="maitoErityisetToimenpiteet"
          value={socialData.maitoErityisetToimenpiteet}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
      <AutoResizeTextArea
          name="maitoErityisetToimenpiteetLisatiedot"
          value={socialData.maitoErityisetToimenpiteetLisatiedot}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
      <AutoResizeTextArea
          name="maitoErityisetToimenpiteetTavoitteet"
          value={socialData.maitoErityisetToimenpiteetTavoitteet}
          onChange={handleChange}
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
          <button type="submit" onClick={handleSubmit} style={{ marginRight: '1rem' }}>
            Seuraava
          </button>
        </div>
      </form>
    </div>
  );
};

export default SosiaalinenVastuuPage;
