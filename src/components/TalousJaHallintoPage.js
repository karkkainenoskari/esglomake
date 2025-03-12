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
              <th>Kenttä</th>
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
