import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import * as pdfjsLib from 'pdfjs-dist';
import LogoHeader from './LogoHeader'; // logo

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

// Kenttien konfiguraatiot (Initial data)
const fieldConfigs = [
  { key: 'yrityksenNimi', label: 'Yrityksen nimi(?: \\([^)]*\\))?:', nextLabels: [
      'Yrittäjien nimet(?: \\([^)]*\\))?:', 'Yhtiömuoto(?: \\([^)]*\\))?:', 'Tilan kokonaistyövoima(?: \\([^)]*\\))?:',
      'Lypsylehmien\\s?määrä(?: \\([^)]*\\))?:', 'Peltoala(?: \\([^)]*\\))?:', 'Luomu vai tavanomainen(?: \\([^)]*\\))?:',
      'Navettatyyppi(?: \\([^)]*\\))?:', 'Lypsyjärjestelmä(?: \\([^)]*\\))?:' ] },
  { key: 'yrittajienNimet', label: 'Yrittäjien nimet(?: \\([^)]*\\))?:', nextLabels: [
      'Yhtiömuoto(?: \\([^)]*\\))?:', 'Tilan kokonaistyövoima(?: \\([^)]*\\))?:', 'Lypsylehmien\\s?määrä(?: \\([^)]*\\))?:',
      'Peltoala(?: \\([^)]*\\))?:', 'Luomu vai tavanomainen(?: \\([^)]*\\))?:', 'Navettatyyppi(?: \\([^)]*\\))?:',
      'Lypsyjärjestelmä(?: \\([^)]*\\))?:' ] },
  { key: 'yhtiomuoto', label: 'Yhtiömuoto(?: \\([^)]*\\))?:', nextLabels: [
      'Tilan kokonaistyövoima(?: \\([^)]*\\))?:', 'Lypsylehmien\\s?määrä(?: \\([^)]*\\))?:', 'Peltoala(?: \\([^)]*\\))?:',
      'Luomu vai tavanomainen(?: \\([^)]*\\))?:', 'Navettatyyppi(?: \\([^)]*\\))?:', 'Lypsyjärjestelmä(?: \\([^)]*\\))?:' ] },
  { key: 'tilanKokonaistyovoima', label: 'Tilan kokonaistyövoima(?: \\([^)]*\\))?:', nextLabels: [
      'Lypsylehmien\\s?määrä(?: \\([^)]*\\))?:', 'Peltoala(?: \\([^)]*\\))?:', 'Luomu vai tavanomainen(?: \\([^)]*\\))?:',
      'Navettatyyppi(?: \\([^)]*\\))?:', 'Lypsyjärjestelmä(?: \\([^)]*\\))?:' ] },
  { key: 'lypsylehmienMaara', label: 'Lypsylehmien\\s?määrä(?: \\([^)]*\\))?:', nextLabels: [
      'Peltoala(?: \\([^)]*\\))?:', 'Luomu vai tavanomainen(?: \\([^)]*\\))?:', 'Navettatyyppi(?: \\([^)]*\\))?:',
      'Lypsyjärjestelmä(?: \\([^)]*\\))?:' ] },
  { key: 'peltoala', label: 'Peltoala(?: \\([^)]*\\))?:', nextLabels: [
      'Luomu vai tavanomainen(?: \\([^)]*\\))?:', 'Navettatyyppi(?: \\([^)]*\\))?:', 'Lypsyjärjestelmä(?: \\([^)]*\\))?:' ] },
  { key: 'tuotomanTavanomainen', label: 'Luomu vai tavanomainen(?: \\([^)]*\\))?:', nextLabels: [
      'Navettatyyppi(?: \\([^)]*\\))?:', 'Lypsyjärjestelmä(?: \\([^)]*\\))?:' ] },
  { key: 'navettatyyppi', label: 'Navettatyyppi(?: \\([^)]*\\))?:', nextLabels: [
      'Lypsyjärjestelmä(?: \\([^)]*\\))?:' ] },
  { key: 'lypsyjarjestelma', label: 'Lypsyjärjestelmä(?: \\([^)]*\\))?:', nextLabels: [] }
];

// Ympäristö-datan kenttien konfiguraatiot (käytetään parseEnvironmentData:ssa)
const envFieldConfigs = [
  { key: 'envMaidonHiilijalanjalki', label: 'Maidon hiilijalanjälki, Co2/kg maitoa' },
  { key: 'envScope1', label: 'Scope 1 päästö, tCO2e, %' },
  { key: 'envScope2', label: 'Scope 2 päästö, tCO2e, %' },
  { key: 'envScope3', label: 'Scope 3 päästö, tCO2e, %' },
  { key: 'envHiiliviljelykoulutus', label: 'Hiiliviljelykoulutus suoritettu' },
  { key: 'envHiiliviljelytoimenpiteet', label: 'Hiiliviljelytoimenpiteet rehuntuotannossa, ha' },
  { key: 'envKeskilehmaluku', label: 'Keskilehmäluku, kpl' },
  { key: 'envPoikimavali', label: 'Poikimaväli, vrk' },
  { key: 'envHiehopoikimaika', label: 'Hiehojen poikimaikä, kk' },
  { key: 'envKeskituotos', label: 'Keskituotos, EKM kg/lehmä' },
  { key: 'envTuotosRasva', label: 'Tuotosseurannan rasva-%, vuoden keskiarvo' },
  { key: 'envTuotosValkuainen', label: 'Tuotosseurannan valkuais-%, vuoden keskiarvo' },
  { key: 'envMaidonUrea', label: 'Maidon ureapitoisuus, mg/100 ml' },
  { key: 'envMeijerimaidonOsuus', label: 'Meijerimaidon osuus, %' },
  { key: 'envKaytossaVahapaastoinenKylmainetilasaililossa', label: 'Käytössä vähäpäästöinen kylmäaine tilasäililössä' },
  { key: 'envKarkearehunOsuus', label: 'Karkearehun osuus lypsylehmien ruokinnassa, %' },
  { key: 'envPaastojaVahentavatLisaravinteet', label: 'Päästöjä vähentävät lisäravinteet lypsylehmillä käytössä' },
  { key: 'envRuokinnanSeurantalaskelmaTehty', label: 'Ruokinnan seurantalaskelma tehty' },
  { key: 'envKuivaAinekiloa', label: 'Kuiva-ainekiloa rehua/EKM kg' },
  { key: 'envTypenHyvaksykaytto', label: 'Typen hyväksikäyttö % ruokinnassa' },
  { key: 'envRehunSaastoindeksi', label: 'Rehun säästöindeksin huomioiminen jalostuksessa' },
  { key: 'envRuokinnanOmavaraisuusaste', label: 'Ruokinnan omavaraisuusaste %' },
  { key: 'envMuutToimenpiteet', label: 'Kuvaus muista mahdollisista toimenpiteistä' }
];

// Parsii yrityksen perustiedot
function parsePdfText(allText) {
  const extracted = {
    yrityksenNimi: '', yrittajienNimet: '', yhtiomuoto: '', tilanKokonaistyovoima: '',
    lypsylehmienMaara: '', peltoala: '', tuotomanTavanomainen: '', navettatyyppi: '', lypsyjarjestelma: ''
  };
  fieldConfigs.forEach(cfg => {
    let re;
    if (!cfg.nextLabels.length) {
      re = new RegExp(`${cfg.label}\\s*([\\s\\S]+)$`, 'i');
    } else {
      const lookahead = cfg.nextLabels.join('|');
      re = new RegExp(`${cfg.label}\\s*([\\s\\S]*?)(?=\\s*(?:${lookahead}))`, 'i');
    }
    const match = allText.match(re);
    if (match) extracted[cfg.key] = match[1].trim();
  });
  const val = extracted.tuotomanTavanomainen.toLowerCase();
  extracted.tuotomanTavanomainen = val.includes('luomu') ? 'Luomu' : val.includes('tav') ? 'Tavanomainen' : '';
  return extracted;
}

function parseEnvironmentData(allText) {
  const extracted = {};
  envFieldConfigs.forEach((cfg, idx) => {
    // valmistele lookahead seuraaville labeleille
    const nextLabels = envFieldConfigs.slice(idx + 1)
      .map(f => f.label.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
    const lookahead = nextLabels.length
      ? `(?=\\s*(?:${nextLabels.join('|')}))`
      : '';

    const escapedLabel = cfg.label.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    // nappaa kaiken labelin jälkeen seuraavaan labeliin saakka
    const re = new RegExp(
      `${escapedLabel}\\s*([\\s\\S]*?)${lookahead}`,
      'i'
    );

    const m = allText.match(re);
    if (m) {
      // m[1] voi olla esim. "dd dd Kilpailu ja talous"
      const parts = m[1].trim().split(/\s{2,}/);
      extracted[cfg.key]               = parts[0] || '';
      extracted[cfg.key + 'Lisatiedot'] = parts[1] || '';
    } else {
      extracted[cfg.key]               = '';
      extracted[cfg.key + 'Lisatiedot'] = '';
    }
  });
  return extracted;
}

const InitialPage = ({ onNext, initialData, onDataUpdate, onImportPdf }) => {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('initialFormData');
    return saved ? JSON.parse(saved) : {/* oletukset */};
  });

  useEffect(() => {
    localStorage.setItem('initialFormData', JSON.stringify(formData));
    onDataUpdate && onDataUpdate(formData);
  }, [formData]);
  

  const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = e => { e.preventDefault(); onNext && onNext(formData); };

  const onDrop = async acceptedFiles => {
    const file = acceptedFiles[0];
    if (!file || file.type !== 'application/pdf') {
      alert('Ole hyvä ja pudota PDF-tiedosto.');
      return;
    }
    const reader = new FileReader();
    reader.onload = async e => {
      try {
        const typedarray = new Uint8Array(e.target.result);
        const pdf = await pdfjsLib.getDocument(typedarray).promise;
        let allText = '';
        const allItems = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          allText += content.items.map(item => item.str).join(' ') + '\n';
          allItems.push(...content.items);
        }
        // Parsitaan initial-data
        const parsedInitial = parsePdfText(allText);
        setFormData(prev => ({ ...prev, ...parsedInitial }));
        // Parsitaan environment-data item-listauksesta
                // Parsitaan environment-data PDF:n tekstistä (string)
        const parsedEnv = parseEnvironmentData(allText);
        // Tallennetaan sekä localStorageen että App.js:lle
        localStorage.setItem('environmentData', JSON.stringify(parsedEnv));
        onImportPdf && onImportPdf({
          initialData:     parsedInitial,
          environmentData: parsedEnv,
          socialData:      {},
          financeData:     {}
        });
      } catch (err) {
        console.error('PDF:n lukeminen epäonnistui:', err);
      }
    };
    reader.readAsArrayBuffer(file);
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
