import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import * as pdfjsLib from 'pdfjs-dist';
import LogoHeader from './LogoHeader'; // logo

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

const InitialPage = ({ onNext, initialData, onDataUpdate, onImportPdf, onPrevious}) => {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('initialFormData');
    return saved ? JSON.parse(saved) : {/* oletukset */ };
  });

  useEffect(() => {
    localStorage.setItem('initialFormData', JSON.stringify(formData));
    onDataUpdate && onDataUpdate(formData);
  }, [formData]);


  const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = e => { e.preventDefault(); onNext && onNext(formData); };


      
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <LogoHeader />
      <h1 style={{ textAlign: 'center' }}>Maitotilan ESG-vastuullisuusraportti</h1>

      {/* Flex-kontti, jossa "Yrityksen perustiedot" ja "Ohjeet lomakkeen täyttöön" laatikot näkyvät vierekkäin. */}
      <main style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem' }}>
        {/* Yrityksen perustiedot -lomake */}
        <div className="initial-page">
          <h2>Yrityksen perustiedot</h2>
          <form onSubmit={handleSubmit}>
            {/* Yrityksen nimi */}
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
                <option value="Yhtymä">Yhtymä</option>
                <option value="Yhtiö">Yhtiö</option>
                <option value="Toiminimi">Toiminimi</option>
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
                <option value="Luomu">Luomu</option>
                <option value="Tavanomainen">Tavanomainen</option>
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
                <option value="Pihatto">Pihatto</option>
                <option value="Parsinavetta">Parsinavetta</option>
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
                <option value="Automaattilypsy">Automaattilypsy</option>
                <option value="Lypsyasema">Lypsyasema</option>
                <option value="Parsilypsy">Parsilypsy</option>
              </select>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1.5rem' }}>
  <button
    type="button"
    onClick={onPrevious}
    style={{
      fontSize: '16px',
      padding: '10px 20px',
      borderRadius: '8px',
      backgroundColor: '#007acc',
      color: 'white',
      border: 'none',
      cursor: 'pointer'
    }}
  >
    Edellinen
  </button>
  <button
    onClick={onNext}
    style={{
      fontSize: '16px',
      padding: '10px 20px',
      borderRadius: '8px',
      backgroundColor: '#007acc',  // your custom green
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

        {/* Ohjeiden laatikko – pysyy samana ennallaan, sisältäen uudet ohjetiedot. 
             Lisätty overflowY: 'auto' jotta laatikossa näkyy scrollauspalkki. */}
        <div
          style={{
            flexShrink: 0,
            marginTop: '4rem',
            height: '360px',
            marginLeft: '2rem',
            maxWidth: '720px',
            border: '1px solid #ccc',
            padding: '1rem',
            borderRadius: '8px',
            overflowY: 'auto'
          }}
        >
          <h3>Ohjeet lomakkeen täyttöön:</h3>

          <ol style={{ paddingLeft: '1.2rem' }}>
            <li>
              <strong>Lomakkeen täyttäminen</strong>
              <ul style={{ listStyleType: 'disc', marginLeft: '1.2rem' }}>
                <li>Täytä kentät huolellisesti. Tyhjät kentät eivät näy lopullisessa raportissa.</li>
                <li>Vasemmassa yläkulmassa oleva <em>kolmen viivan</em> painike avaa valikon, josta löydät kaikki päätoiminnot.</li>
              </ul>
            </li>
            <br></br>
            <li>
              <strong>Tallennus, luonnokset ja jatkaminen</strong>
              <ul style={{ listStyleType: 'disc', marginLeft: '1.2rem' }}>
                <li><em>Tallenna PDF‑raportti</em> luo lopullisen raportin tällä hetkellä syötetyistä tiedoista.</li>
                <li><em>Tallenna luonnos</em> lataa selaimeesi JSON‑tiedoston, jossa on kaikki tähänastiset täytetyt kentät.</li>
                <li><em>Jatka edellistä raporttia</em> lataa aiemmin tallennetun JSON‑luonnoksen ja palauttaa kentät.</li>
                <li>Sovellus tallentaa syötteesi myös automaattisesti selaimen muistiin. Voit sulkea ikkunan ja jatkaa myöhemmin ilman erillistä luonnosta.</li>
              </ul>
            </li>
            <br></br>

            <li>
              <strong>Tietojen tyhjentäminen</strong>
              <ul style={{ listStyleType: 'disc', marginLeft: '1.2rem' }}>
                <li><em>Tyhjennä kaikki</em> (valikossa) poistaa kaikki syötetyt tiedot selaimen muistista. Toiminto kysyy vahvistuksen ennen tyhjennystä.</li>
              </ul>
            </li>
            <br></br>
            <li>
              <strong>Raportin viimeistely</strong>
              <ul style={{ listStyleType: 'disc', marginLeft: '1.2rem' }}>
                <li>Kun olet täyttänyt kaikki sivut, valitse valikosta <em>Tallenna PDF‑raportti</em>.</li>
                <li>PDF avautuu uuteen välilehteen tai latautuu tiedostona. Voit tallentaa tai tulostaa sen tarpeen mukaan.</li>
              </ul>
            </li>
          </ol>
        </div>
      </main>

      {/* PDF-tiedoston pudotusalue, jossa lisää tilaa PDF-drop zone:n ja muun sisällön väliin (marginTop: '2rem') */}

    </div>
  );
};

export default InitialPage;
