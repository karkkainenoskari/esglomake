// src/components/TalousJaHallintoPage.js
import React, { useState } from 'react';
import './tables.css';

const TalousJaHallintoPage = ({ onNext, onPrevious }) => {
  const [financeData, setFinanceData] = useState({
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

     // ... 4.1 Johtaminen -kentät
  // Uudet riskien hallinnan kentät:
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

  talousErityisetToimenpiteet: '',
  talousErityisetToimenpiteetLisatiedot: '',
  talousErityisetToimenpiteetTavoitteet: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFinanceData({ ...financeData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onNext) {
      onNext(financeData);
    }
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Info-boksi yläreunassa */}
      <div
        style={{
          border: '1px solid #ccc',
          backgroundColor: '#f9f9f9',
          padding: '1rem',
          marginBottom: '1rem'
        }}
      >
        <p style={{ margin: 0 }}>
          <strong>HUOM! Värikoodit tarkoittavat seuraavaa:</strong>
        </p>
        <ul style={{ marginTop: '0.5rem' }}>
          <li style={{ color: 'green' }}>Tieto löytyy tuotosseurannasta tai meijerin tiedoista</li>
          <li style={{ color: 'blue' }}>Tieto löytyy hiilijalanjälkilaskurista</li>
        </ul>
      </div>

      {/* Pääotsikko */}
      <h2>Talous ja hallinto</h2>

      {/* 4.1 Johtaminen */}
      <h3>4.1 Johtaminen</h3>
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
              <th>Lisätiedot</th>
              <th>Tavoitteet ja aikataulut</th>
            </tr>
          </thead>
          <tbody>
            {/* 1. Yrityksen arvot */}
            <tr>
              <td>Yrityksen arvot määritetty, kyllä/ei</td>
              <td>
                <select
                  name="yrityksenArvot"
                  value={financeData.yrityksenArvot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                >
                  <option value="">Valitse</option>
                  <option value="kylla">Kyllä</option>
                  <option value="ei">Ei</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  name="yrityksenArvotLisatiedot"
                  value={financeData.yrityksenArvotLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="yrityksenArvotTavoitteet"
                  value={financeData.yrityksenArvotTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>

            {/* 2. Visio */}
            <tr>
              <td>Visio määritetty, kyllä/ei</td>
              <td>
                <select
                  name="visioMaare"
                  value={financeData.visioMaare}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                >
                  <option value="">Valitse</option>
                  <option value="kylla">Kyllä</option>
                  <option value="ei">Ei</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  name="visioMaareLisatiedot"
                  value={financeData.visioMaareLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="visioMaareTavoitteet"
                  value={financeData.visioMaareTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>

            {/* 3. Strategia on laadittu */}
            <tr>
              <td>Strategia on laadittu ja sitä päivitetään, kyllä/ei</td>
              <td>
                <select
                  name="strategiaLaadittu"
                  value={financeData.strategiaLaadittu}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                >
                  <option value="">Valitse</option>
                  <option value="kylla">Kyllä</option>
                  <option value="ei">Ei</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  name="strategiaLaadittuLisatiedot"
                  value={financeData.strategiaLaadittuLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="strategiaLaadittuTavoitteet"
                  value={financeData.strategiaLaadittuTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>

            {/* 4. Organisaatio kuvattu */}
            <tr>
              <td>Organisaatio, omistajat ja vastuualueet on kuvattu, kyllä/ei</td>
              <td>
                <select
                  name="organisaatioKuvattu"
                  value={financeData.organisaatioKuvattu}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                >
                  <option value="">Valitse</option>
                  <option value="kylla">Kyllä</option>
                  <option value="ei">Ei</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  name="organisaatioKuvattuLisatiedot"
                  value={financeData.organisaatioKuvattuLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="organisaatioKuvattuTavoitteet"
                  value={financeData.organisaatioKuvattuTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>

            {/* 5. Kuvaus erityisistä johtamiskäytännöistä */}
            <tr>
              <td>
                Kuvaus erityisistä johtamiskäytännöistä<br />
                (esim. hallituspalaverit, asiantuntijatiimit, discussion group, monikantayhteistyö)
              </td>
              <td>
                <input
                  type="text"
                  name="johtamisKaytannot"
                  value={financeData.johtamisKaytannot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="johtamisKaytannotLisatiedot"
                  value={financeData.johtamisKaytannotLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="johtamisKaytannotTavoitteet"
                  value={financeData.johtamisKaytannotTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>

            {/* 6. Liiketoimintasuunnitelma */}
            <tr>
              <td>
                Liiketoimintasuunnitelma ja/tai investointisuunnitelma, kyllä/ei
              </td>
              <td>
                <select
                  name="liiketoimintasuunnitelma"
                  value={financeData.liiketoimintasuunnitelma}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                >
                  <option value="">Valitse</option>
                  <option value="kylla">Kyllä</option>
                  <option value="ei">Ei</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  name="liiketoimintasuunnitelmaLisatiedot"
                  value={financeData.liiketoimintasuunnitelmaLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="liiketoimintasuunnitelmaTavoitteet"
                  value={financeData.liiketoimintasuunnitelmaTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>

            {/* 7. Erityiset toimenpiteet */}
            <tr>
              <td>Erityiset toimenpiteet</td>
              <td>
                <input
                  type="text"
                  name="talousErityisetToimenpiteet"
                  value={financeData.talousErityisetToimenpiteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="talousErityisetToimenpiteetLisatiedot"
                  value={financeData.talousErityisetToimenpiteetLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="talousErityisetToimenpiteetTavoitteet"
                  value={financeData.talousErityisetToimenpiteetTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* 4.2 Riskien hallinta */}
<h3>4.2 Riskien hallinta</h3>
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
      <th>Lisätiedot</th>
      <th>Tavoitteet ja aikataulut</th>
    </tr>
  </thead>
  <tbody>
    {/* Varautumissuunnitelma poikkeustilanteisiin */}
    <tr>
      <td>Varautumissuunnitelma poikkeustilanteisiin, kyllä/ei</td>
      <td>
        <select
          name="riskVarautumissuunnitelma"
          value={financeData.riskVarautumissuunnitelma}
          onChange={handleChange}
          style={{ width: '100%' }}
        >
          <option value="">Valitse</option>
          <option value="kylla">Kyllä</option>
          <option value="ei">Ei</option>
        </select>
      </td>
      <td>
        <input
          type="text"
          name="riskVarautumissuunnitelmaLisatiedot"
          value={financeData.riskVarautumissuunnitelmaLisatiedot}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="riskVarautumissuunnitelmaTavoitteet"
          value={financeData.riskVarautumissuunnitelmaTavoitteet}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
    </tr>
    {/* Pelastautumissuunnitelma */}
    <tr>
      <td>Pelastautumissuunnitelma, kyllä/ei</td>
      <td>
        <select
          name="riskPelastautumissuunnitelma"
          value={financeData.riskPelastautumissuunnitelma}
          onChange={handleChange}
          style={{ width: '100%' }}
        >
          <option value="">Valitse</option>
          <option value="kylla">Kyllä</option>
          <option value="ei">Ei</option>
        </select>
      </td>
      <td>
        <input
          type="text"
          name="riskPelastautumissuunnitelmaLisatiedot"
          value={financeData.riskPelastautumissuunnitelmaLisatiedot}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="riskPelastautumissuunnitelmaTavoitteet"
          value={financeData.riskPelastautumissuunnitelmaTavoitteet}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
    </tr>
    {/* Riskikartoitukset */}
    <tr>
      <td>
        Riskikartoitukset (k/e)
        <br />(tapaturmat, eläintaudit, sähkö- ja paloturvallisuus)
      </td>
      <td>
        <input
          type="text"
          name="riskRiskikartoitukset"
          value={financeData.riskRiskikartoitukset}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="riskRiskikartoituksetLisatiedot"
          value={financeData.riskRiskikartoituksetLisatiedot}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="riskRiskikartoituksetTavoitteet"
          value={financeData.riskRiskikartoituksetTavoitteet}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
    </tr>
    {/* Vakuutusturva */}
    <tr>
      <td>Vakuutusturvan kuvaus (omaisuus, toiminta, eläimet, henkilöt, metsä)</td>
      <td>
        <input
          type="text"
          name="riskVakuutus"
          value={financeData.riskVakuutus}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="riskVakuutusLisatiedot"
          value={financeData.riskVakuutusLisatiedot}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="riskVakuutusTavoitteet"
          value={financeData.riskVakuutusTavoitteet}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
    </tr>
    {/* Henkilöriskien hallinta */}
    <tr>
      <td>
        Henkilöriskien hallinta (edunvalvontavaltuutukset, testamentit, avioehto, varahenkilösuunnitelma)
      </td>
      <td>
        <input
          type="text"
          name="riskHenkiloriskit"
          value={financeData.riskHenkiloriskit}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="riskHenkiloriskitLisatiedot"
          value={financeData.riskHenkiloriskitLisatiedot}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="riskHenkiloriskitTavoitteet"
          value={financeData.riskHenkiloriskitTavoitteet}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
    </tr>
    {/* Rahoitusriskien hallinta */}
    <tr>
      <td>Rahoitusriskien hallinta (esim. korkosuojaus)</td>
      <td>
        <input
          type="text"
          name="riskRahoitus"
          value={financeData.riskRahoitus}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="riskRahoitusLisatiedot"
          value={financeData.riskRahoitusLisatiedot}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="riskRahoitusTavoitteet"
          value={financeData.riskRahoitusTavoitteet}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
    </tr>
    {/* Hintariskien hallinta */}
    <tr>
      <td>Hintariskien hallinta</td>
      <td>
        <input
          type="text"
          name="riskHintariski"
          value={financeData.riskHintariski}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="riskHintariskiLisatiedot"
          value={financeData.riskHintariskiLisatiedot}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="riskHintariskiTavoitteet"
          value={financeData.riskHintariskiTavoitteet}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
    </tr>
    {/* Varautuminen sähkökatkoksiin */}
    <tr>
      <td>Varautuminen sähkökatkoksiin (tilalla on varavoimalähde)</td>
      <td>
        <input
          type="text"
          name="riskVarautuminenSahko"
          value={financeData.riskVarautuminenSahko}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="riskVarautuminenSahkoLisatiedot"
          value={financeData.riskVarautuminenSahkoLisatiedot}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="riskVarautuminenSahkoTavoitteet"
          value={financeData.riskVarautuminenSahkoTavoitteet}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
    </tr>
    {/* Vesihuollon varajärjestelmä */}
    <tr>
      <td>Vesihuollon varajärjestelmä</td>
      <td>
        <input
          type="text"
          name="riskVesihuolto"
          value={financeData.riskVesihuolto}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="riskVesihuoltoLisatiedot"
          value={financeData.riskVesihuoltoLisatiedot}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="riskVesihuoltoTavoitteet"
          value={financeData.riskVesihuoltoTavoitteet}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
    </tr>
    {/* Eläinriskien hallinta */}
    <tr>
      <td>Eläinriskien hallinta (esim. salmonella, Biocheck, tautiluokitukset)</td>
      <td>
        <input
          type="text"
          name="riskElainriskit"
          value={financeData.riskElainriskit}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="riskElainriskitLisatiedot"
          value={financeData.riskElainriskitLisatiedot}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="riskElainriskitTavoitteet"
          value={financeData.riskElainriskitTavoitteet}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
    </tr>
    {/* Peltoriskien hallinta */}
    <tr>
      <td>Peltoriskien hallinta (vuokrasopimukset, oman pellon osuus, pellon riittävyys ja laatu)</td>
      <td>
        <input
          type="text"
          name="riskPeltoriski"
          value={financeData.riskPeltoriski}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="riskPeltoriskiLisatiedot"
          value={financeData.riskPeltoriskiLisatiedot}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="riskPeltoriskiTavoitteet"
          value={financeData.riskPeltoriskiTavoitteet}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
    </tr>
    {/* Tietoturvariskien hallinta */}
    <tr>
      <td>Tietoturvariskien hallinta (etävalvonta, maatalouden ja yksityistalouden eriyttämininen)</td>
      <td>
        <input
          type="text"
          name="riskTietoturva"
          value={financeData.riskTietoturva}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="riskTietoturvaLisatiedot"
          value={financeData.riskTietoturvaLisatiedot}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="riskTietoturvaTavoitteet"
          value={financeData.riskTietoturvaTavoitteet}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
    </tr>
    {/* Erityiset toimenpiteet */}
    <tr>
      <td>Erityiset toimenpiteet</td>
      <td>
        <input
          type="text"
          name="riskErityisetToimenpiteet"
          value={financeData.riskErityisetToimenpiteet}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="riskErityisetToimenpiteetLisatiedot"
          value={financeData.riskErityisetToimenpiteetLisatiedot}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="riskErityisetToimenpiteetTavoitteet"
          value={financeData.riskErityisetToimenpiteetTavoitteet}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
    </tr>
  </tbody>
</table>

<h3>4.3 Kilpailukyky ja kannattavuus</h3>
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
      <th>Lisätiedot</th>
      <th>Tavoitteet ja aikataulut</th>
    </tr>
  </thead>
  <tbody>
    {/* 1. Kuvaus talouden suunnittelusta ja seurannasta */}
    <tr>
      <td>Kuvaus talouden suunnittelusta ja seurannasta</td>
      <td>
        <input
          type="text"
          name="talousSuunnittelu"
          value={financeData.talousSuunnittelu}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="talousSuunnitteluLisatiedot"
          value={financeData.talousSuunnitteluLisatiedot}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="talousSuunnitteluTavoitteet"
          value={financeData.talousSuunnitteluTavoitteet}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
    </tr>
    {/* 2. Toiminnan mittarit määritetty (k/e) */}
    <tr>
      <td>Toiminnan mittarit määritetty (k/e)</td>
      <td>
        <input
          type="text"
          name="toiminnanMittarit"
          value={financeData.toiminnanMittarit}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="toiminnanMittaritLisatiedot"
          value={financeData.toiminnanMittaritLisatiedot}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="toiminnanMittaritTavoitteet"
          value={financeData.toiminnanMittaritTavoitteet}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
    </tr>
    {/* 3. Kuvaus maksuvalmiuden ylläpidosta */}
    <tr>
      <td>Kuvaus maksuvalmiuden ylläpidosta</td>
      <td>
        <input
          type="text"
          name="maksuvalmius"
          value={financeData.maksuvalmius}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="maksuvalmiusLisatiedot"
          value={financeData.maksuvalmiusLisatiedot}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="maksuvalmiusTavoitteet"
          value={financeData.maksuvalmiusTavoitteet}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
    </tr>
    {/* 4. Budjetointikäytännöt */}
    <tr>
      <td>Budjetointikäytännöt</td>
      <td>
        <input
          type="text"
          name="budjetointi"
          value={financeData.budjetointi}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="budjetointiLisatiedot"
          value={financeData.budjetointiLisatiedot}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="budjetointiTavoitteet"
          value={financeData.budjetointiTavoitteet}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
    </tr>
    {/* 5. Kuukausi alv käytössä (k/e) */}
    <tr>
      <td>Kuukausi alv käytössä (k/e)</td>
      <td>
        <input
          type="text"
          name="kuukausiAlv"
          value={financeData.kuukausiAlv}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="kuukausiAlvLisatiedot"
          value={financeData.kuukausiAlvLisatiedot}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="kuukausiAlvTavoitteet"
          value={financeData.kuukausiAlvTavoitteet}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
    </tr>
    {/* 6. Välintilinpäätös (k/e) */}
    <tr>
      <td>Välintilinpäätös (k/e)</td>
      <td>
        <input
          type="text"
          name="valintilinpaate"
          value={financeData.valintilinpaate}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="valintilinpaateLisatiedot"
          value={financeData.valintilinpaateLisatiedot}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="valintilinpaateTavoitteet"
          value={financeData.valintilinpaateTavoitteet}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
    </tr>
    {/* 7. Koko tilan kannattavuuslaskenta (k/e) */}
    <tr>
      <td>Koko tilan kannattavuuslaskenta (k/e)</td>
      <td>
        <input
          type="text"
          name="kannattavuusLaskenta"
          value={financeData.kannattavuusLaskenta}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="kannattavuusLaskentaLisatiedot"
          value={financeData.kannattavuusLaskentaLisatiedot}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="kannattavuusLaskentaTavoitteet"
          value={financeData.kannattavuusLaskentaTavoitteet}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
    </tr>
    {/* 8. Tuotantokustannuslaskelma (k/e, mm. rehu, maito) */}
    <tr>
      <td>Tuotantokustannuslaskelma (k/e, ja mm. rehu, maito)</td>
      <td>
        <input
          type="text"
          name="tuotantokustannus"
          value={financeData.tuotantokustannus}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="tuotantokustannusLisatiedot"
          value={financeData.tuotantokustannusLisatiedot}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="tuotantokustannusTavoitteet"
          value={financeData.tuotantokustannusTavoitteet}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
    </tr>
    {/* 9. Velan määrä suhteessa liikevaihtoon (%) */}
    <tr>
      <td>Velan määrä suhteessa liikevaihtoon (%)</td>
      <td>
        <input
          type="text"
          name="velkaSuhde"
          value={financeData.velkaSuhde}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="velkaSuhdeLisatiedot"
          value={financeData.velkaSuhdeLisatiedot}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="velkaSuhdeTavoitteet"
          value={financeData.velkaSuhdeTavoitteet}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
    </tr>
    {/* 10. Yritykset keskeiset verkostot */}
    <tr>
      <td>Yritykset keskeiset verkostot</td>
      <td>
        <input
          type="text"
          name="keskeisetVerkostot"
          value={financeData.keskeisetVerkostot}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="keskeisetVerkostotLisatiedot"
          value={financeData.keskeisetVerkostotLisatiedot}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="keskeisetVerkostotTavoitteet"
          value={financeData.keskeisetVerkostotTavoitteet}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
    </tr>
    {/* 11. Vertailutiedon hyödyntäminen */}
    <tr>
      <td>Vertailutiedon hyödyntäminen (esim. erilaiset pienryhmät)</td>
      <td>
        <input
          type="text"
          name="vertailuTiedot"
          value={financeData.vertailuTiedot}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="vertailuTiedotLisatiedot"
          value={financeData.vertailuTiedotLisatiedot}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="vertailuTiedotTavoitteet"
          value={financeData.vertailuTiedotTavoitteet}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
    </tr>
    {/* 12. Asiantuntijoiden käyttö */}
    <tr>
      <td>Asiantuntijoiden käyttö</td>
      <td>
        <input
          type="text"
          name="asiantuntijat"
          value={financeData.asiantuntijat}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="asiantuntijatLisatiedot"
          value={financeData.asiantuntijatLisatiedot}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="asiantuntijatTavoitteet"
          value={financeData.asiantuntijatTavoitteet}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
    </tr>
    {/* 13. Kuvaus ulkoistetuista palveluista */}
    <tr>
      <td>Kuvaus ulkoistetuista palveluista</td>
      <td>
        <input
          type="text"
          name="ulkoistetutPalvelut"
          value={financeData.ulkoistetutPalvelut}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="ulkoistetutPalvelutLisatiedot"
          value={financeData.ulkoistetutPalvelutLisatiedot}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="ulkoistetutPalvelutTavoitteet"
          value={financeData.ulkoistetutPalvelutTavoitteet}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
    </tr>
    {/* 14. Erityiset toimenpiteet */}
    <tr>
      <td>Erityiset toimenpiteet</td>
      <td>
        <input
          type="text"
          name="talousErityisetToimenpiteet"
          value={financeData.talousErityisetToimenpiteet}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="talousErityisetToimenpiteetLisatiedot"
          value={financeData.talousErityisetToimenpiteetLisatiedot}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
      <td>
        <input
          type="text"
          name="talousErityisetToimenpiteetTavoitteet"
          value={financeData.talousErityisetToimenpiteetTavoitteet}
          onChange={handleChange}
          style={{ width: '100%' }}
        />
      </td>
    </tr>
  </tbody>
</table>



        {/* Navigointi-napit */}
        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center' }}>
          <button type="button" onClick={onPrevious} style={{ marginRight: '1rem' }}>
            Edellinen
          </button>
          <button type="submit" onClick={handleSubmit}>
            Seuraava
          </button>
        </div>
      </form>
    </div>
  );
};

export default TalousJaHallintoPage;
