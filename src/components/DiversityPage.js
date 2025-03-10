import React, { useState } from 'react';

const DiversityPage = ({ onNext, onPrevious }) => {
  const [divData, setDivData] = useState({
    // 1. Maatalousluonnon ja maiseman -hoitosopimus
    hoitosopimus: '',
    hoitosopimusLisatiedot: '',
    hoitosopimusTavoitteet: '',

    // 2. Monimuotoisuutta edistävä pinta-ala yhteensä, ha
    pintaAla: '',
    pintaAlaLisatiedot: '',
    pintaAlaTavoitteet: '',

    // 3. Kosteikot, ha
    kosteikot: '',
    kosteikotLisatiedot: '',
    kosteikotTavoitteet: '',

    // 4. Biodiversiteettikartoitus tehty, kyllä/ei
    biodiversiteetti: '',
    biodiversiteettiLisatiedot: '',
    biodiversiteettiTavoitteet: '',

    // 5. Suomenkarjan eläinten kasvattaminen, kyllä/ei
    suomenkarja: '',
    suomenkarjaLisatiedot: '',
    suomenkarjaTavoitteet: '',

    // 6. Risteytyseläinten osuus lypsylehmistä, %
    risteytys: '',
    risteytysLisatiedot: '',
    risteytysTavoitteet: '',

    // 7. Soija ja GM -vapaus ruokinnassa, kyllä/ei
    soijaGM: '',
    soijaGMLisatiedot: '',
    soijaGMTavoitteet: '',

    // 8. Palmuöljyttömyys ruokinnassa, kyllä/ei
    palmu: '',
    palmuLisatiedot: '',
    palmuTavoitteet: '',

    // 9. Erityiset toimenpiteet
    erityisetToimenpiteet: '',
    erityisetToimenpiteetLisatiedot: '',
    erityisetToimenpiteetTavoitteet: '',

    // 10. Keskimääräinen lohkokoko, ha
    lohkokoko: '',
    lohkokokoLisatiedot: '',
    lohkokokoTavoitteet: '',

    // 11. Keskimääräinen lohkoetäisyys, km
    lohkoetaisyys: '',
    lohkoetaisyysLisatiedot: '',
    lohkoetaisyysTavoitteet: '',

    // 12. Peltoviljelyssä on käytössä toimenpiteitä, jotka parantavat ympäristön tilaa, kyllä/ei
    peltoviljely: '',
    peltoviljelyLisatiedot: '',
    peltoviljelyTavoitteet: '',

    // 13. Peltojen vesitaloutta ylläpidetään ja kehitetään, kyllä/ei
    vesitalous: '',
    vesitalousLisatiedot: '',
    vesitalousTavoitteet: '',

    // 14. Erityiset toimenpiteet 2
    erityisetToimenpiteet2: '',
    erityisetToimenpiteet2Lisatiedot: '',
    erityisetToimenpiteet2Tavoitteet: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDivData({ ...divData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onNext) {
      onNext(divData);
    }
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>Monimuotoisuus</h2>

      <form onSubmit={handleSubmit}>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={styles.th}>Monimuotoisuus</th>
              <th style={styles.th}>Uusin tulos</th>
              <th style={styles.th}>Lisätiedot</th>
              <th style={styles.th}>Tavoitteet ja aikataulut</th>
            </tr>
          </thead>
          <tbody>
            {/* 1. Maatalousluonnon ja maiseman -hoitosopimus */}
            <tr>
              <td style={styles.td}>Maatalousluonnon ja maiseman -hoitosopimus, kyllä/ei</td>
              <td style={styles.td}>
                <select
                  name="hoitosopimus"
                  value={divData.hoitosopimus}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                >
                  <option value="">Valitse</option>
                  <option value="kylla">Kyllä</option>
                  <option value="ei">Ei</option>
                </select>
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="hoitosopimusLisatiedot"
                  value={divData.hoitosopimusLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="hoitosopimusTavoitteet"
                  value={divData.hoitosopimusTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>

            {/* 2. Monimuotoisuutta edistävä pinta-ala */}
            <tr>
              <td style={styles.td}>
                Monimuotoisuutta edistävä pinta-ala yhteensä, ha
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="pintaAla"
                  value={divData.pintaAla}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="pintaAlaLisatiedot"
                  value={divData.pintaAlaLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="pintaAlaTavoitteet"
                  value={divData.pintaAlaTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>

            {/* 3. Kosteikot */}
            <tr>
              <td style={styles.td}>Kosteikot, ha</td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="kosteikot"
                  value={divData.kosteikot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="kosteikotLisatiedot"
                  value={divData.kosteikotLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="kosteikotTavoitteet"
                  value={divData.kosteikotTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>

            {/* 4. Biodiversiteettikartoitus tehty */}
            <tr>
              <td style={styles.td}>Biodiversiteettikartoitus tehty, kyllä/ei</td>
              <td style={styles.td}>
                <select
                  name="biodiversiteetti"
                  value={divData.biodiversiteetti}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                >
                  <option value="">Valitse</option>
                  <option value="kylla">Kyllä</option>
                  <option value="ei">Ei</option>
                </select>
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="biodiversiteettiLisatiedot"
                  value={divData.biodiversiteettiLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="biodiversiteettiTavoitteet"
                  value={divData.biodiversiteettiTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>

            {/* 5. Suomenkarjan eläinten kasvattaminen */}
            <tr>
              <td style={styles.td}>Suomenkarjan eläinten kasvattaminen, kyllä/ei</td>
              <td style={styles.td}>
                <select
                  name="suomenkarja"
                  value={divData.suomenkarja}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                >
                  <option value="">Valitse</option>
                  <option value="kylla">Kyllä</option>
                  <option value="ei">Ei</option>
                </select>
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="suomenkarjaLisatiedot"
                  value={divData.suomenkarjaLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="suomenkarjaTavoitteet"
                  value={divData.suomenkarjaTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>

            {/* 6. Risteytyseläinten osuus lypsylehmistä, % */}
            <tr>
              <td style={styles.td}>Risteytyseläinten osuus lypsylehmistä, %</td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="risteytys"
                  value={divData.risteytys}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="risteytysLisatiedot"
                  value={divData.risteytysLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="risteytysTavoitteet"
                  value={divData.risteytysTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>

            {/* 7. Soija ja GM -vapaus */}
            <tr>
              <td style={styles.td}>Soija ja GM -vapaus ruokinnassa, kyllä/ei</td>
              <td style={styles.td}>
                <select
                  name="soijaGM"
                  value={divData.soijaGM}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                >
                  <option value="">Valitse</option>
                  <option value="kylla">Kyllä</option>
                  <option value="ei">Ei</option>
                </select>
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="soijaGMLisatiedot"
                  value={divData.soijaGMLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="soijaGMTavoitteet"
                  value={divData.soijaGMTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>

            {/* 8. Palmuöljyttömyys */}
            <tr>
              <td style={styles.td}>Palmuöljyttömyys ruokinnassa, kyllä/ei</td>
              <td style={styles.td}>
                <select
                  name="palmu"
                  value={divData.palmu}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                >
                  <option value="">Valitse</option>
                  <option value="kylla">Kyllä</option>
                  <option value="ei">Ei</option>
                </select>
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="palmuLisatiedot"
                  value={divData.palmuLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="palmuTavoitteet"
                  value={divData.palmuTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>

            {/* 9. Erityiset toimenpiteet */}
            <tr>
              <td style={styles.td}>Erityiset toimenpiteet</td>
              <td style={styles.td}>
                <textarea
                  name="erityisetToimenpiteet"
                  value={divData.erityisetToimenpiteet}
                  onChange={handleChange}
                  rows={2}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="erityisetToimenpiteetLisatiedot"
                  value={divData.erityisetToimenpiteetLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="erityisetToimenpiteetTavoitteet"
                  value={divData.erityisetToimenpiteetTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>

            {/* 10. Keskimääräinen lohkokoko */}
            <tr>
              <td style={styles.td}>Keskimääräinen lohkokoko, ha</td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="lohkokoko"
                  value={divData.lohkokoko}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="lohkokokoLisatiedot"
                  value={divData.lohkokokoLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="lohkokokoTavoitteet"
                  value={divData.lohkokokoTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>

            {/* 11. Keskimääräinen lohkoetäisyys */}
            <tr>
              <td style={styles.td}>Keskimääräinen lohkoetäisyys, km</td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="lohkoetaisyys"
                  value={divData.lohkoetaisyys}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="lohkoetaisyysLisatiedot"
                  value={divData.lohkoetaisyysLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="lohkoetaisyysTavoitteet"
                  value={divData.lohkoetaisyysTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>

            {/* 12. Peltoviljelyssä on käytössä toimenpiteitä */}
            <tr>
              <td style={styles.td}>
                Peltoviljelyssä on käytössä toimenpiteitä, jotka parantavat ympäristön tilaa, kyllä/ei
              </td>
              <td style={styles.td}>
                <select
                  name="peltoviljely"
                  value={divData.peltoviljely}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                >
                  <option value="">Valitse</option>
                  <option value="kylla">Kyllä</option>
                  <option value="ei">Ei</option>
                </select>
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="peltoviljelyLisatiedot"
                  value={divData.peltoviljelyLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="peltoviljelyTavoitteet"
                  value={divData.peltoviljelyTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>

            {/* 13. Peltojen vesitalous */}
            <tr>
              <td style={styles.td}>
                Peltojen vesitaloutta ylläpidetään ja kehitetään, kyllä/ei
              </td>
              <td style={styles.td}>
                <select
                  name="vesitalous"
                  value={divData.vesitalous}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                >
                  <option value="">Valitse</option>
                  <option value="kylla">Kyllä</option>
                  <option value="ei">Ei</option>
                </select>
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="vesitalousLisatiedot"
                  value={divData.vesitalousLisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="vesitalousTavoitteet"
                  value={divData.vesitalousTavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>

            {/* 14. Erityiset toimenpiteet 2 */}
            <tr>
              <td style={styles.td}>Erityiset toimenpiteet (lisäkenttä)</td>
              <td style={styles.td}>
                <textarea
                  name="erityisetToimenpiteet2"
                  value={divData.erityisetToimenpiteet2}
                  onChange={handleChange}
                  rows={2}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="erityisetToimenpiteet2Lisatiedot"
                  value={divData.erityisetToimenpiteet2Lisatiedot}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
              <td style={styles.td}>
                <input
                  type="text"
                  name="erityisetToimenpiteet2Tavoitteet"
                  value={divData.erityisetToimenpiteet2Tavoitteet}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* Painikkeet alareunassa */}
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

const styles = {
  th: {
    border: '1px solid #ccc',
    padding: '8px',
    backgroundColor: '#f0f0f0',
    textAlign: 'left'
  },
  td: {
    border: '1px solid #ccc',
    padding: '8px'
  }
};

export default DiversityPage;
