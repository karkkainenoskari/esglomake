// components/InitialPage.js
import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import * as pdfjsLib from 'pdfjs-dist';
import LogoHeader from './LogoHeader'; // logo

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

// Kenttien konfiguraatiot
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
    // Hyväksytään sekä "Lypsylehmien määrä:" että "Lypsylehmienmäärä:"
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
  console.log('PDF-sisältö:\n', allText);
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
    const re = new RegExp(`${cfg.label}\\s*(.+?)(?=\\s*(?:${lookahead})|$)`, 'i');
    const match = allText.match(re);
    if (match) {
      extracted[cfg.key] = match[1].trim();
    }
  });

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

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const typedarray = new Uint8Array(e.target.result);
          const pdf = await pdfjsLib.getDocument(typedarray).promise;
          let allText = '';
          for (let pageIndex = 1; pageIndex <= pdf.numPages; pageIndex++) {
            const page = await pdf.getPage(pageIndex);
            const textContent = await page.getTextContent();
            const strings = textContent.items.map(item => item.str);
            allText += strings.join(' ') + '\n';
          }
          const parsedData = parsePdfText(allText);
          setFormData(prev => ({ ...prev, ...parsedData }));
        } catch (error) {
          console.error('PDF:n lukeminen epäonnistui:', error);
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert('Ole hyvä ja pudota PDF-tiedosto.');
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
            <button type="submit">Seuraava</button>
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
                <li>Täytä kentät huolellisesti ja mahdollisimman kattavasti.</li>
                <li>Jos jokin kenttä jää tyhjäksi, sitä ei näytetä PDF-raportissa.</li>
                <li>Useimmilla sivuilla on myös tekstikenttiä (“Kuvaus”), joihin voit kirjoittaa tarkentavia tietoja tai selityksiä.</li>
              </ul>
            </li>

            <li>
              <strong>Tallentaminen ja jatkaminen</strong>
              <ul style={{ listStyleType: 'disc', marginLeft: '1.2rem' }}>
                <li>Painamalla <em>Tallenna ja lopeta</em> -painiketta tallennat kaikki tähän mennessä täyttämäsi tiedot PDF-raporttiin.</li>
                <li>Lomake tallentaa automaattisesti edistymisesi selaimen muistiin myös kesken täyttämisen, joten jos poistut sivulta ja palaat myöhemmin, työhösi pitäisi päästä jatkamaan samasta kohdasta.</li>
                <li>Huomaa, että jos tyhjennät tiedot (ks. seuraava kohta), aiemmin syöttämäsi tiedot poistuvat.</li>
              </ul>
            </li>

            <li>
              <strong>Tietojen tyhjentäminen</strong>
              <ul style={{ listStyleType: 'disc', marginLeft: '1.2rem' }}>
                <li>Jos haluat aloittaa alusta, voit käyttää <em>Tyhjennä kaikki</em> -painiketta. Tämä avaa ensin varmistusikkunan, jossa voit vielä perua, jos painoit painiketta vahingossa.</li>
                <li>Hyväksyessäsi tyhjennyksen kaikki antamasi lomaketiedot tyhjennetään.</li>
              </ul>
            </li>

            <li>
              <strong>PDF-raportti</strong>
              <ul style={{ listStyleType: 'disc', marginLeft: '1.2rem' }}>
                <li>Kun painat <em>Tallenna ja lopeta</em> -painiketta, järjestelmä koostaa täytetyistä tiedoista PDF-tiedoston.</li>
                <li>Voit tallentaa PDF-raportin omalle koneellesi tai tulostaa sen tarvittaessa.</li>
                <li>Raportti sisältää vain ne tiedot, jotka olet lomakkeelle syöttänyt.</li>
              </ul>
            </li>
          </ol>
        </div>
      </main>

      {/* PDF-tiedoston pudotusalue, jossa lisää tilaa PDF-drop zone:n ja muun sisällön väliin (marginTop: '2rem') */}
      <div
        {...getRootProps()}
        style={{
          border: '2px dashed #007acc',
          padding: '20px',
          textAlign: 'center',
          borderRadius: '8px',
          marginTop: '2rem'
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Pudota PDF-tiedosto tähän, niin täytämme lomakkeen tiedot automaattisesti.</p>
        ) : (
          <p>Raahaa PDF-tiedosto tähän tai klikkaa valitaksesi tiedoston, jossa aiemmat lomaketiedot ovat.</p>
        )}
      </div>
    </div>
  );
};

export default InitialPage;
