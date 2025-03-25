import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import * as pdfjsLib from 'pdfjs-dist';
import LogoHeader from './LogoHeader'; // logo

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

// 1. Määritellään kenttien otsikot, avaimet ja "seuraavat otsikot" lookaheadia varten
const fieldConfigs = [
  {
    key: 'yrityksenNimi',
    label: 'Yrityksen nimi:',
    nextLabels: [
      'Yrittäjien nimet:',
      'Yhtiömuoto:',
      'Tilan kokonaistyövoima:',
      'Lypsylehmien määrä:',
      'Peltoala:',
      'Luomu vai tavanomainen:',
      'Navettatyyppi:',
      'Lypsyjärjestelmä:'
    ]
  },
  {
    key: 'yrittajienNimet',
    label: 'Yrittäjien nimet:',
    nextLabels: [
      'Yhtiömuoto:',
      'Tilan kokonaistyövoima:',
      'Lypsylehmien määrä:',
      'Peltoala:',
      'Luomu vai tavanomainen:',
      'Navettatyyppi:',
      'Lypsyjärjestelmä:'
    ]
  },
  {
    key: 'yhtiomuoto',
    label: 'Yhtiömuoto:',
    nextLabels: [
      'Tilan kokonaistyövoima:',
      'Lypsylehmien määrä:',
      'Peltoala:',
      'Luomu vai tavanomainen:',
      'Navettatyyppi:',
      'Lypsyjärjestelmä:'
    ]
  },
  {
    key: 'tilanKokonaistyovoima',
    label: 'Tilan kokonaistyövoima:',
    nextLabels: [
      'Lypsylehmien määrä:',
      'Peltoala:',
      'Luomu vai tavanomainen:',
      'Navettatyyppi:',
      'Lypsyjärjestelmä:'
    ]
  },
  {
    key: 'lypsylehmienMaara',
    // Muutetaan label niin, että se hyväksyy joko "Lypsylehmien määrä:" tai "Lypsylehmienmäärä:"
    label: 'Lypsylehmien\\s?määrä:',
    nextLabels: [
      'Peltoala:',
      'Luomu vai tavanomainen:',
      'Navettatyyppi:',
      'Lypsyjärjestelmä:'
    ]
  },
  {
    key: 'peltoala',
    label: 'Peltoala:',
    nextLabels: [
      'Luomu vai tavanomainen:',
      'Navettatyyppi:',
      'Lypsyjärjestelmä:'
    ]
  },
  {
    key: 'tuotomanTavanomainen',
    label: 'Luomu vai tavanomainen:',
    nextLabels: [
      'Navettatyyppi:',
      'Lypsyjärjestelmä:'
    ]
  },
  {
    key: 'navettatyyppi',
    label: 'Navettatyyppi:',
    nextLabels: [
      'Lypsyjärjestelmä:'
    ]
  },
  {
    key: 'lypsyjarjestelma',
    label: 'Lypsyjärjestelmä:',
    nextLabels: []
  },
];

function parsePdfText(allText) {
  console.log('PDF-sisältö:\n', allText); // Debug: näytä PDF:n sisältö

  const extracted = {
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

  fieldConfigs.forEach(cfg => {
    const lookahead = cfg.nextLabels.join('|');
    // Käytetään tarkkaa labelia, jossa on kaksoispiste, ja pysähtytään ennen seuraavaa otsikkoa tai tekstin loppua
    const re = new RegExp(
      `${cfg.label}\\s*(.+?)(?=\\s*(?:${lookahead})|$)`,
      'i'
    );
    const match = allText.match(re);
    if (match) {
      extracted[cfg.key] = match[1].trim();
    }
  });

  // Muutetaan "Luomu vai tavanomainen" -kentän arvo alasvetovalikon mukaiseen muotoon
  const val = extracted.tuotomanTavanomainen.toLowerCase();
  if (val.includes('luomu')) {
    extracted.tuotomanTavanomainen = 'luomu';
  } else if (val.includes('tav')) {
    extracted.tuotomanTavanomainen = 'tavanomainen';
  } else {
    extracted.tuotomanTavanomainen = '';
  }

  return extracted;
}

const InitialPage = ({ onNext, initialData, onDataUpdate }) => {
  // Lomaketila
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

  // Tallenna localStorageen aina kun formData muuttuu
  useEffect(() => {
    localStorage.setItem('initialFormData', JSON.stringify(formData));
    if (onDataUpdate) {
      onDataUpdate(formData);
    }
  }, [formData, onDataUpdate]);

  // Kentän vaihto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Seuraava-nappi
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onNext) {
      onNext(formData);
    }
  };

  const handleClearAll = () => {
    // Poista kaikki lomaketietoja localStoragesta
    localStorage.removeItem('initialFormData');
    localStorage.removeItem('environmentData');
    localStorage.removeItem('socialData');
    localStorage.removeItem('financeData');

    setFormData({
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
    
    // Voit lisätä myös ilmoituksen, että kentät on tyhjennetty.
  };

  // 4. Dropzone-funktio: luetaan PDF
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const typedarray = new Uint8Array(e.target.result);
          const pdf = await pdfjsLib.getDocument(typedarray).promise;

          // Lue jokainen sivu
          let allText = '';
          for (let pageIndex = 1; pageIndex <= pdf.numPages; pageIndex++) {
            const page = await pdf.getPage(pageIndex);
            const textContent = await page.getTextContent();
            const strings = textContent.items.map(item => item.str);
            // Erotellaan rivinvaihdolla
            allText += strings.join(' ') + '\n';
          }

          // Parsitaan
          const parsedData = parsePdfText(allText);

          // Päivitetään lomake
          setFormData(prev => ({
            ...prev,
            ...parsedData
          }));

        } catch (error) {
          console.error('PDF:n lukeminen epäonnistui:', error);
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert('Ole hyvä ja pudota PDF-tiedosto.');
    }
  };

  // react-dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Lisätään LogoHeader-komponentti */}
      <LogoHeader />
      
      <h1 style={{ textAlign: 'center' }}>Maitotilan ESG-vastuullisuusraportti</h1>
      
      {/* Kaksi tekstilaatikkoa vierekkäin */}
      <div
        style={{
          display: 'flex',
          gap: '2rem',         // Välit laatikoiden välille
          flexWrap: 'wrap',    // Teksti siirtyy uudelle riville kapeilla näytöillä
          marginBottom: '2rem'
        }}
      >
        <div
          style={{
            flex: '1 1 0',
            minWidth: '300px',
            border: '1px solid #ccc',
            padding: '1rem'
          }}
        >
          <p>
            ESG on lyhenne englannin kielen sanoista Environmental, Social ja Governance. 
            ESG raportointi termillä tarkoitetaan yrityksen ympäristö-, sosiaaliseen- 
            ja hallinnolliseen vastuuseen liittyvien tekijöiden tunnistamista, 
            vastuullisia toimintatapoja ja niiden raportointia. Tulevaisuudessa 
            vastuullisuusajattelu ja raportointivaade koskee välillisesti myös 
            maitotilayrityksiä, kun yhteiskunta, asiakkaat, rahoituslaitokset ja 
            kuluttajat haluavat tietää koko toimitusketjun vastuullisuudesta. 
            Vastuullisuusraportointi tulee nousemaan talousraportoinnin rinnalle 
            osaksi lainoitus- ja rahoitusprosesseja.
            <br></br>
            <br></br>
            Tämä työkalu auttaa maitotilayritystä kuvaamaan ja miettimään 
            omalle yritykselle tärkeitä vastuullisuusasioita ja tuottaa 
            niistä yrityksen ESG-vastuullisuusraportin. Työkalu ja raporttipohja 
            on tuotettu osana Tulevaisuuden maatila -hanketta (1.1.2024-31.12.2025). 
            Toteutuksesta vastasivat yhteistyössä YsAo, Savonia-amk ja 
            Maitoyrittäjät ry. Hankkeen rahoittajana oli Pohjois-Savon Liitto 
            ja rahoituslähteenä JTF-rahasto.
          </p>
        </div>
        
        <div
          style={{
            flex: '1 1 0',
            minWidth: '300px',
            border: '1px solid #ccc',
            padding: '1rem'
          }}
        >
           <h3>Ohjeet lomakkeen täyttöön</h3>
        <ul>
          <li>Täytä kaikki kentät mahdollisimman tarkasti.</li>
          <li>Lisää lisätietoja tarvittaessa - erityisesti tavoitteet ja aikataulut.</li>
          <li>Voit tallentaa keskeneräisen raportin painamalla “Tallenna ja lopeta” -painiketta.</li>
          <li>Mikäli olet täyttänyt raporttia aiemmin, voit ladata PDF-raportin “Raahaa PDF-tiedosto” -alueelle.</li>
          <li>Muista lopuksi tallentaa muutokset, jotta tiedot eivät katoa.</li>
        </ul>
      </div>
    </div>
  
   

    {/* Drop zone PDF-tiedostolle */}
    <div
      {...getRootProps()}
      style={{
        border: '2px dashed #007acc',
        padding: '20px',
        textAlign: 'center',
        marginTop: '20px'
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Pudota PDF-tiedosto tähän, niin täytämme lomakkeen tiedot automaattisesti.</p>
      ) : (
        <p>
          Raahaa PDF-tiedosto tähän tai klikkaa valitaksesi tiedoston, jossa aiemmat lomaketiedot ovat.
        </p>
      )}
    </div>
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
            <button type="button" onClick={handleClearAll}>Tyhjennä</button>

          </form>
        </div>



     {/* --- ESG-kuva oikealla --- */}
<div style={{ marginTop: '6rem' }}>
  <img
    src="/esg.png"
    alt="ESG"
    style={{
      maxWidth: '800px',
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
