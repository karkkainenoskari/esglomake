import React, { useState } from 'react';

const InitialPage = ({ onNext }) => {
  const [formData, setFormData] = useState({
    yrityksenNimi: '',
    yrittajienNimet: '',
    yhtiomuoto: '',
    tilanKokonaistyovoima: '',
    karjakoko: '',
    peltoala: '',
    tuotomanTavanomainen: '',
    navettatyyppi: '',
    lypsyjarjestelma: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Lomaketiedot:', formData);
    // Voit jatkaa seuraavaan vaiheeseen kutsumalla onNext()
    if (onNext) {
      onNext(formData);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      {/* Yläosa: logot ja infoteksti */}
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div>
          <img src="/logo1.png" alt="Logo 1" style={{ marginRight: '1rem', height: '80px' }} />
          <img src="/logo2.png" alt="Logo 2" style={{ marginRight: '1rem', height: '80px' }} />
          {/* Lisää logokuvia tarpeen mukaan */}
        </div>
        <h1>Maitotilan ESG -vastuullisuusraportti -malli</h1>
        <p>
          ESG on lyhenne englannin kielen sanoista Environmental, Social ja Governance.
          Tulevaisuudessa maidontuotannon vastuullisuuskäsite laajenee ja sen osoittaminen ja
          raportointi korostuvat yhteiskunnan, asiakkaiden, rahoituslaitosten ja kuluttajien
          vaatimuksista.
        </p>
      </header>

      {/* Lomake: Yrityksen perustiedot */}
      <main>
        <h2>Yrityksen perustiedot</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>
              Yrityksen nimi:
              <input
                type="text"
                name="yrityksenNimi"
                value={formData.yrityksenNimi}
                onChange={handleChange}
                style={{ marginLeft: '1rem' }}
              />
            </label>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>
              Yrittäjien nimet:
              <input
                type="text"
                name="yrittajienNimet"
                value={formData.yrittajienNimet}
                onChange={handleChange}
                style={{ marginLeft: '1rem' }}
              />
            </label>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>
              Yhtiömuoto:
              <input
                type="text"
                name="yhtiomuoto"
                value={formData.yhtiomuoto}
                onChange={handleChange}
                style={{ marginLeft: '1rem' }}
              />
            </label>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>
              Tilan kokonaistyövoima:
              <input
                type="text"
                name="tilanKokonaistyovoima"
                value={formData.tilanKokonaistyovoima}
                onChange={handleChange}
                style={{ marginLeft: '1rem' }}
              />
            </label>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>
              Karjakoko:
              <input
                type="text"
                name="karjakoko"
                value={formData.karjakoko}
                onChange={handleChange}
                style={{ marginLeft: '1rem' }}
              />
            </label>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>
              Peltoala:
              <input
                type="text"
                name="peltoala"
                value={formData.peltoala}
                onChange={handleChange}
                style={{ marginLeft: '1rem' }}
              />
            </label>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>
              Luomu vai tavanomainen:
              <select
                name="tuotomanTavanomainen"
                value={formData.tuotomanTavanomainen}
                onChange={handleChange}
                style={{ marginLeft: '1rem' }}
              >
                <option value="">Valitse</option>
                <option value="luomu">Luomu</option>
                <option value="tavanomainen">Tavanomainen</option>
              </select>
            </label>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>
              Navettatyyppi:
              <input
                type="text"
                name="navettatyyppi"
                value={formData.navettatyyppi}
                onChange={handleChange}
                style={{ marginLeft: '1rem' }}
              />
            </label>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>
              Lypsyjärjestelmä:
              <input
                type="text"
                name="lypsyjarjestelma"
                value={formData.lypsyjarjestelma}
                onChange={handleChange}
                style={{ marginLeft: '1rem' }}
              />
            </label>
          </div>
          <button type="submit">Seuraava</button>
        </form>
      </main>
    </div>
  );
};

export default InitialPage;
