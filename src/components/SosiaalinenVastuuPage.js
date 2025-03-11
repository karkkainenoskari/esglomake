// src/components/SosiaalinenVastuuPage.js
import React, { useState } from 'react';
import './tables.css';

const SosiaalinenVastuuPage = ({ onNext, onPrevious }) => {
  const [socialData, setSocialData] = useState({
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
    muutErityisetTavoitteet: ''
  });

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
      {/* Yläreunan infoboksi */}
      <div
        style={{
          border: '1px solid #ccc',
          backgroundColor: '#f9f9f9',
          padding: '1rem',
          marginBottom: '1rem'
        }}
      >
        <p style={{ margin: 0 }}><strong>HUOM! Värikoodit tarkoittavat seuraavaa:</strong></p>
        <ul style={{ marginTop: '0.5rem' }}>
          <li style={{ color: 'green' }}>
          Tieto löytyy tuotosseurannasta tai meijerin tiedoista
          </li>
          <li style={{ color: 'blue' }}>
          Tieto löytyy hiilijalanjälkilaskurista
          </li>
        </ul>
      </div>

      <h2>Sosiaalinen vastuu</h2>
      
      {/* Otsikko, joka näkyy ulkopuolella taulukkoa */}
      <h3>3.1 Henkilöstö ja työolosuhteet</h3>
      
      {/* Yhtenäinen taulukko, joka sisältää kaikki kentät */}
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
              <th>Uusin tulos</th>
              <th>Lisätiedot</th>
              <th>Tavoitteet ja aikataulut</th>
            </tr>
          </thead>
          <tbody>
            {/* 1. Henkilöstö ja työolosuhteet -osio (ei sisällytetä taulukkoon väliotsikkoa, sillä se on ulkopuolella) */}
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
                <input type="text" name="henkilostoStrategiaLisatiedot" value={socialData.henkilostoStrategiaLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <input type="text" name="henkilostoStrategiaTavoitteet" value={socialData.henkilostoStrategiaTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            </tr>
            <tr>
              <td>Työn tuottavuus, maitokg/navettatyöt h</td>
              <td>
                <input type="text" name="tyotuottavuus" value={socialData.tyotuottavuus} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <input type="text" name="tyotuottavuusLisatiedot" value={socialData.tyotuottavuusLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <input type="text" name="tyotuottavuusTavoitteet" value={socialData.tyotuottavuusTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            </tr>
            <tr>
              <td>Tasa-arvon huomiointi</td>
              <td>
                <input type="text" name="tasaArvo" value={socialData.tasaArvo} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <input type="text" name="tasaArvoLisatiedot" value={socialData.tasaArvoLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <input type="text" name="tasaArvoTavoitteet" value={socialData.tasaArvoTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            </tr>
            <tr>
              <td>Kuvaus töitä helpottavista ja keventävistä ratkaisuista</td>
              <td>
                <input type="text" name="tyotaHelpottavatRatkaisut" value={socialData.tyotaHelpottavatRatkaisut} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <input type="text" name="tyotaHelpottavatRatkaisutLisatiedot" value={socialData.tyotaHelpottavatRatkaisutLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <input type="text" name="tyotaHelpottavatRatkaisutTavoitteet" value={socialData.tyotaHelpottavatRatkaisutTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
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
                <input type="text" name="osaamisenKehittaminenLisatiedot" value={socialData.osaamisenKehittaminenLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <input type="text" name="osaamisenKehittaminenTavoitteet" value={socialData.osaamisenKehittaminenTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
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
                <input type="text" name="tyoterveyshuoltoLisatiedot" value={socialData.tyoterveyshuoltoLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <input type="text" name="tyoterveyshuoltoTavoitteet" value={socialData.tyoterveyshuoltoTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            </tr>
            <tr>
              <td>Jaksamisen ylläpito (kuvaa lisätietokenttään)</td>
              <td>
                <input type="text" name="jaksaminen" value={socialData.jaksaminen} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <input type="text" name="jaksaminenLisatiedot" value={socialData.jaksaminenLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <input type="text" name="jaksaminenTavoitteet" value={socialData.jaksaminenTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
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
                <input type="text" name="vapaapäivatLisatiedot" value={socialData.vapaapäivatLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <input type="text" name="vapaapäivatTavoitteet" value={socialData.vapaapäivatTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
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
                <input type="text" name="vuosilomatLisatiedot" value={socialData.vuosilomatLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <input type="text" name="vuosilomatTavoitteet" value={socialData.vuosilomatTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
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
                <input type="text" name="tyoajanMittaaminenLisatiedot" value={socialData.tyoajanMittaaminenLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <input type="text" name="tyoajanMittaaminenTavoitteet" value={socialData.tyoajanMittaaminenTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            </tr>

            {/* 3. Työntekijöihin liittyvää -osio */}
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
                <input type="text" name="palkkausLisatiedot" value={socialData.palkkausLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <input type="text" name="palkkausTavoitteet" value={socialData.palkkausTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
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
                <input type="text" name="tyoterveyshuolto2Lisatiedot" value={socialData.tyoterveyshuolto2Lisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <input type="text" name="tyoterveyshuolto2Tavoitteet" value={socialData.tyoterveyshuolto2Tavoitteet} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            </tr>
            <tr>
              <td>Sairauspoissaolot, pv/v</td>
              <td>
                <input type="text" name="sairauspoissaolot" value={socialData.sairauspoissaolot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <input type="text" name="sairauspoissaolotLisatiedot" value={socialData.sairauspoissaolotLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <input type="text" name="sairauspoissaolotTavoitteet" value={socialData.sairauspoissaolotTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            </tr>
            <tr>
              <td>Hoitota vaativia tapaturmia keskimäärin, kpl/v</td>
              <td>
                <input type="text" name="hoitotaVaativiaTapaturmia" value={socialData.hoitotaVaativiaTapaturmia} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <input type="text" name="hoitotaVaativiaTapaturmiaLisatiedot" value={socialData.hoitotaVaativiaTapaturmiaLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <input type="text" name="hoitotaVaativiaTapaturmiaTavoitteet" value={socialData.hoitotaVaativiaTapaturmiaTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            </tr>
            <tr>
              <td>Osaamisen kehittäminen ja lisäkouluttautuminen, pv/v</td>
              <td>
                <input type="text" name="osaamisenKehittaminenJaLisakouluttautuminen" value={socialData.osaamisenKehittaminenJaLisakouluttautuminen} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <input type="text" name="osaamisenKehittaminenJaLisakouluttautuminenLisatiedot" value={socialData.osaamisenKehittaminenJaLisakouluttautuminenLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <input type="text" name="osaamisenKehittaminenJaLisakouluttautuminenTavoitteet" value={socialData.osaamisenKehittaminenJaLisakouluttautuminenTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            </tr>
            <tr>
              <td>Kuvaus tyhy -toiminnasta</td>
              <td>
                <input type="text" name="tyhy" value={socialData.tyhy} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <input type="text" name="tyhyLisatiedot" value={socialData.tyhyLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <input type="text" name="tyhyTavoitteet" value={socialData.tyhyTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
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
                <input type="text" name="kehityskeskustelutLisatiedot" value={socialData.kehityskeskustelutLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <input type="text" name="kehityskeskustelutTavoitteet" value={socialData.kehityskeskustelutTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
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
                <input type="text" name="palaveritLisatiedot" value={socialData.palaveritLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <input type="text" name="palaveritTavoitteet" value={socialData.palaveritTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            </tr>
            <tr>
              <td>Työsuhteiden kesto keskimäärin, työvuosia/hlö</td>
              <td>
                <input type="text" name="tyosuhteidenKesto" value={socialData.tyosuhteidenKesto} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <input type="text" name="tyosuhteidenKestoLisatiedot" value={socialData.tyosuhteidenKestoLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <input type="text" name="tyosuhteidenKestoTavoitteet" value={socialData.tyosuhteidenKestoTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
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
                <input type="text" name="tyotyotyotLisatiedot" value={socialData.tyotyotyotLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <input type="text" name="tyotyotyotTavoitteet" value={socialData.tyotyotyotTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
              </td>
            </tr>
            <tr>
              <td>Muut erityiset toimenpiteet</td>
              <td>
                <textarea name="muutErityiset" value={socialData.muutErityiset} onChange={handleChange} rows={2} style={{ width: '100%' }} />
              </td>
              <td>
                <input type="text" name="muutErityisetLisatiedot" value={socialData.muutErityisetLisatiedot} onChange={handleChange} style={{ width: '100%' }} />
              </td>
              <td>
                <input type="text" name="muutErityisetTavoitteet" value={socialData.muutErityisetTavoitteet} onChange={handleChange} style={{ width: '100%' }} />
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
