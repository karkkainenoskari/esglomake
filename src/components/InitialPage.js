// src/components/InitialPage.js
import React, { useState, useEffect } from 'react';
import LogoHeader from './LogoHeader'; // tuodaan logoheader

const InitialPage = ({ onNext, initialData, onDataUpdate }) => {
  // Alustetaan tila localStoragesta, jos dataa löytyy
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('initialFormData');
    return savedData
      ? JSON.parse(savedData)
      : {
          yrityksenNimi: '',
          yrittajienNimet: '',
          yhtiomuoto: '',
          tilanKokonaistyovoima: '',
          lypsylehmienMaara: '',
          peltoala: '',
          tuotomanTavanomainen: '',
          navettatyyppi: '',
          lypsyjarjestelma: ''
        };
  });

  useEffect(() => {
    localStorage.setItem('initialFormData', JSON.stringify(formData));
    if (onDataUpdate) {
      onDataUpdate(formData);
    }
  }, [formData, onDataUpdate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onNext) {
      onNext(formData);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Lisätään LogoHeader-komponentti */}
      <LogoHeader />
      
      <h1 style={{ textAlign: 'center' }}>Maitotilan ESG-vastuullisuusraportti</h1>
      <p style={{ textAlign: 'center' }}>
      ESG on lyhenne englannin kielen sanoista Environmental, Social ja Governance. ESG raportointi termillä tarkoitetaan yrityksen ympäristö-, sosiaaliseen- ja hallinnolliseen vastuuseen liittyvien tekijöiden tunnistamista, vastuullisia toimintatapoja ja niiden raportointia. Tulevaisuudessa vastuullisuusajattelu ja raportointivaade koskee välillisesti myös maitotilayrityksiä, kun yhteiskunta, asiakkaat, rahoituslaitokset ja kuluttajat haluavat tietää koko toimitusketjun vastuullisuudesta. Vastuullisuusraportointi tulee nousemaan talousraportoinnin rinnalle osaksi lainoitus- ja rahoitusprosesseja.  
      </p>

      {/* Pääosa: Lomake ja ESG-kuva vierekkäin */}
      <main
        style={{
          display: 'flex',
          alignItems: 'flex-start'
        }}
      >
        {/* Lomake vasemmalla */}
        <div style={{ width: '600px', marginRight: '2rem' }}>
          <h2>Yrityksen perustiedot</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
              <label style={{ width: '180px' }}>Yrityksen nimi:</label>
              <input
                type="text"
                name="yrityksenNimi"
                value={formData.yrityksenNimi}
                onChange={handleChange}
                style={{ flex: 1 }}
              />
            </div>
            <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
              <label style={{ width: '180px' }}>Yrittäjien nimet:</label>
              <input
                type="text"
                name="yrittajienNimet"
                value={formData.yrittajienNimet}
                onChange={handleChange}
                style={{ flex: 1 }}
              />
            </div>
            <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
              <label style={{ width: '180px' }}>Yhtiömuoto:</label>
              <select
                name="yhtiomuoto"
                value={formData.yhtiomuoto}
                onChange={handleChange}
                style={{ flex: 1 }}
              >
                <option value="">Valitse</option>
                <option value="yhtymä">Yhtymä</option>
                <option value="yhtiö">Yhtiö</option>
                <option value="toiminimi">Toiminimi</option>
              </select>
            </div>
            <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
              <label style={{ width: '180px' }}>Tilan kokonaistyövoima (hlö):</label>
              <input
                type="text"
                name="tilanKokonaistyovoima"
                value={formData.tilanKokonaistyovoima}
                onChange={handleChange}
                style={{ flex: 1 }}
              />
            </div>
            <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
              <label style={{ width: '180px' }}>Lypsylehmien määrä (kpl):</label>
              <input
                type="text"
                name="lypsylehmienMaara"
                value={formData.lypsylehmienMaara}
                onChange={handleChange}
                style={{ flex: 1 }}
              />
            </div>
            <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
              <label style={{ width: '180px' }}>Peltoala (ha):</label>
              <input
                type="text"
                name="peltoala"
                value={formData.peltoala}
                onChange={handleChange}
                style={{ flex: 1 }}
              />
            </div>
            <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
              <label style={{ width: '180px' }}>Luomu vai tavanomainen:</label>
              <select
                name="tuotomanTavanomainen"
                value={formData.tuotomanTavanomainen}
                onChange={handleChange}
                style={{ flex: 1 }}
              >
                <option value="">Valitse</option>
                <option value="luomu">Luomu</option>
                <option value="tavanomainen">Tavanomainen</option>
              </select>
            </div>
            <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
              <label style={{ width: '180px' }}>Navettatyyppi:</label>
              <select
                name="navettatyyppi"
                value={formData.navettatyyppi}
                onChange={handleChange}
                style={{ flex: 1 }}
              >
                <option value="">Valitse</option>
                <option value="pihatto">Pihatto</option>
                <option value="parsinavetta">Parsinavetta</option>
              </select>
            </div>
            <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
              <label style={{ width: '180px' }}>Lypsyjärjestelmä:</label>
              <select
                name="lypsyjarjestelma"
                value={formData.lypsyjarjestelma}
                onChange={handleChange}
                style={{ flex: 1 }}
              >
                <option value="">Valitse</option>
                <option value="automaattilypsy">Automaattilypsy</option>
                <option value="lypsyasema">Lypsyasema</option>
                <option value="parsilypsy">Parsilypsy</option>
              </select>
            </div>

         
            <button type="submit">Seuraava</button>
          </form>
        </div>

     {/* --- ESG-kuva oikealla --- */}
<div style={{ marginTop: '6rem' }}>
  <img
    src="/esg.png"
    alt="ESG"
    style={{
      maxWidth: '400px',
      height: 'auto',
      display: 'block'
    }}
  />
</div>
      </main>
    </div>
  );
};

export default InitialPage;
