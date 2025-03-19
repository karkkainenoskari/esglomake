import React, { useState, useEffect } from 'react';

const InitialPage = ({ onNext, initialData, onDataUpdate }) => {
    const [formData, setFormData] = useState(initialData || {
    yrityksenNimi: '',
    yrittajienNimet: '',
    yhtiomuoto: '',
    tilanKokonaistyovoima: '',
    lypsylehmienMaara: '',
    peltoala: '',
    tuotomanTavanomainen: '',
    navettatyyppi: '',
    lypsyjarjestelma: ''
  });

  useEffect(() => {
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
      {/* Yläosa: Logot, otsikko ja infoteksti */}
      <header style={{ marginBottom: '2rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2rem',
            marginBottom: '1rem'
          }}
        >
          <img src="/savonia.png" alt="Savonia" style={{ height: '60px' }} />
          <img src="/maitoyrittajat.png" alt="Maitoyrittäjät" style={{ height: '60px' }} />
          <img src="/valio.png" alt="Valio" style={{ height: '60px' }} />
          <img src="/ysao.png" alt="Ysao" style={{ height: '60px' }} />
          <img src="/euroopanunioni.png" alt="Euroopan unioni" style={{ height: '60px' }} />
        </div>
        <h1 style={{ textAlign: 'center' }}>Maitotilan ESG-vastuullisuusraportti</h1>
        <p style={{ textAlign: 'center' }}>
        ESG on lyhenne englannin kielen sanoista Environmental, Social ja Governance. Termillä tarkoitetaan ympäristöön, yhteiskuntavastuuseen ja hallintotapaan liittyvien tekijöiden tunnistamista, toimintatapoja ja niistä raportointia. Tulevaisuudessa maidontuotannon vastuullisuuskäsite laajenee ja sen osoittaminen ja raportointi korostuvat yhteiskunnan, asiakkaiden, rahoituslaitosten ja kuluttajien vaatimuksista. Vastuullisuusraportointi tulee nousemaan talousraportoinnin rinnalle osaksi lainoitus- ja rahoitusprosesseja.  
        </p>
      </header>

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
