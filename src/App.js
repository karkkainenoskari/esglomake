// src/App.js
import React, { useState, useEffect, useRef } from 'react';
import InitialPage from './components/InitialPage';
import EnvironmentPage from './components/EnvironmentPage';
import SosiaalinenVastuuPage from './components/SosiaalinenVastuuPage';
import TalousJaHallintoPage from './components/TalousJaHallintoPage';
import ProgressBar from './components/ProgressBar';
import generatePdfReport from './components/generatePdfReport';
import Johdanto from './components/Johdanto';

function App() {
  /* --------------------------------------------------
     1. Tilat
  -------------------------------------------------- */
  const [step, setStep]                 = useState(0);
  const [initialData, setInitialData]   = useState({});
  const [environmentData, setEnvironmentData] = useState({});
  const [socialData, setSocialData]     = useState({});
  const [financeData, setFinanceData]   = useState({});
  const [resetKey, setResetKey]         = useState(0);
  const [menuOpen, setMenuOpen]         = useState(false);

  /* --------------------------------------------------
     2. File input ref (voidaan klikata ohjelmallisesti
        ja nollata, jotta sama tiedosto voidaan valita
        useamman kerran peräkkäin ilman refreshiä)
  -------------------------------------------------- */
  const fileInputRef = useRef(null);

  /* --------------------------------------------------
     3. Haetaan localStoragesta mahdolliset vanhat datat
  -------------------------------------------------- */
  useEffect(() => {
    setInitialData(     JSON.parse(localStorage.getItem('initialFormData') || '{}'));
    setEnvironmentData( JSON.parse(localStorage.getItem('environmentData') || '{}'));
    setSocialData(      JSON.parse(localStorage.getItem('socialData')      || '{}'));
    setFinanceData(     JSON.parse(localStorage.getItem('financeData')     || '{}'));
  }, []);

  /* --------------------------------------------------
     4. Sivun vaihto -> rullaa ylös
  -------------------------------------------------- */
  useEffect(() => { window.scrollTo(0, 0); }, [step]);

  /* --------------------------------------------------
     5. Luonnos –  tallenna / lataa
  -------------------------------------------------- */
  const handleSaveDraft = () => {
    const blob = new Blob(
      [JSON.stringify({ initialData, environmentData, socialData, financeData }, null, 2)],
      { type: 'application/json' }
    );
    const url  = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'esg‑luonnos.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleLoadDraft = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        const {
          initialData:    init = {},
          environmentData: env = {},
          socialData:      soc = {},
          financeData:     fin = {}
        } = parsed;

        setInitialData(init);
        setEnvironmentData(env);
        setSocialData(soc);
        setFinanceData(fin);

        localStorage.setItem('initialFormData', JSON.stringify(init));
        localStorage.setItem('environmentData', JSON.stringify(env));
        localStorage.setItem('socialData',      JSON.stringify(soc));
        localStorage.setItem('financeData',     JSON.stringify(fin));

        setResetKey(k => k + 1);
        alert('Luonnos ladattu onnistuneesti!');
      } catch {
        alert('Virhe: tiedosto ei ole kelvollinen luonnos‑JSON.');
      } finally {
        // Nollataan valitsin, jotta sama tiedosto voidaan valita uudelleen
        if (fileInputRef.current) fileInputRef.current.value = null;
      }
    };
    reader.readAsText(file);
  };

  /* --------------------------------------------------
     6. Navigointi‑ ja tallennusfunktiot
  -------------------------------------------------- */
  const handleJohdantoNext    = () => setStep(1);
  const handleInitialNext     = (d) => { setInitialData(d);       setStep(2); };
  const handleEnvironmentNext = (d) => { setEnvironmentData(d);   setStep(3); };
  const handleSocialNext      = (d) => { setSocialData(d);        setStep(4); };
  const handleFinanceNext     = (d) => { setFinanceData(d);       alert('PDF tallennus onnistui ja data tallennettu.'); };

  const handleSaveAndFinish = () => {
    generatePdfReport(initialData, environmentData, socialData, financeData);
  };

  const handleNavigate = (targetStep) => setStep(targetStep);

  const handleClearAll = () => {
    if (!window.confirm('Haluatko varmasti tyhjentää kaikki lomakkeen tiedot?')) return;

    setInitialData({});
    setEnvironmentData({});
    setSocialData({});
    setFinanceData({});

    ['initialFormData','environmentData','socialData','financeData']
      .forEach(key => localStorage.removeItem(key));

    setResetKey(k => k + 1);
    alert('Kaikki tiedot on tyhjennetty!');
  };

  const handleImportPdf = ({ initialData, environmentData, socialData, financeData }) => {
    setInitialData(initialData);
    setEnvironmentData(environmentData);
    setSocialData(socialData);
    setFinanceData(financeData);
  };

  /* --------------------------------------------------
     7. ProgressBar‑otsikot
  -------------------------------------------------- */
  const pageTitles = [
    'Johdanto',
    'Yrityksen perustiedot / ohjeet',
    'Ympäristö',
    'Sosiaalinen vastuu',
    'Talous ja hallinto'
  ];

  /* --------------------------------------------------
     8. JSX
  -------------------------------------------------- */
  return (
    <div style={{ paddingTop: 60, paddingBottom: 80 }}>

      {/* --- Hampurilainen + valikko vasempaan yläkulmaan --- */}
      <div style={{ position: 'fixed', top: 18, left: 40, zIndex: 10000 }}>
        {/* Hampurilaispainike */}
        <button
          aria-label="Valikko"
          onClick={() => setMenuOpen(o => !o)}
          style={{
            width: 45,
            height: 40,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: 6,
            background: '#007acc',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer'
          }}
        >
          <span style={{ width: '100%', height: 3, background: '#fff', borderRadius: 2 }} />
          <span style={{ width: '100%', height: 3, background: '#fff', borderRadius: 2 }} />
          <span style={{ width: '100%', height: 3, background: '#fff', borderRadius: 2 }} />
        </button>

        {/* Dropdown‑valikko */}
        {menuOpen && (
          <div
            style={{
              marginTop: 8,
              padding: '0.75rem',
              background: '#ffffff',
              border: '1px solid #ccc',
              borderRadius: 6,
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              minWidth: 220
            }}
          >
            <button
              onClick={() => { handleSaveAndFinish(); setMenuOpen(false); }}
              style={{
                padding: '6px 8px',
                border: 'none',
                borderRadius: 6,
                background: '#007acc',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              Tallenna PDF‑raportti
            </button>

            <button
              onClick={() => { handleSaveDraft(); setMenuOpen(false); }}
              style={{
                padding: '6px 8px',
                border: 'none',
                borderRadius: 6,
                background: '#5c6bc0',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              Tallenna luonnos
            </button>

            <button
              onClick={() => {
                if (fileInputRef.current) fileInputRef.current.click();
              }}
              style={{
                padding: '6px 8px',
                border: 'none',
                borderRadius: 6,
                background: '#4caf50',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              Jatka edellistä raporttia
            </button>

            <button
              onClick={() => { handleClearAll(); setMenuOpen(false); }}
              style={{
                padding: '6px 8px',
                border: 'none',
                borderRadius: 6,
                background: '#e53935',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              Tyhjennä kaikki
            </button>

            {/* Piilotettu file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              style={{ display: 'none' }}
              onClick={e => { e.target.value = null; }}            /* nollaa ennen valintaa */
              onChange={e => {
                if (e.target.files[0]) {
                  handleLoadDraft(e.target.files[0]);
                  setMenuOpen(false);
                }
              }}
            />
          </div>
        )}
      </div>

      {/* --- Sivukohtainen sisältö --- */}
      {step === 0 && <Johdanto onNext={handleJohdantoNext} />}

      {step === 1 && (
        <InitialPage
          key={resetKey}
          onNext={handleInitialNext}
          initialData={initialData}
          onImportPdf={handleImportPdf}
          onDataUpdate={setInitialData}
        />
      )}

      {step === 2 && (
        <EnvironmentPage
          key={resetKey}
          onNext={handleEnvironmentNext}
          onPrevious={() => setStep(1)}
          companyData={initialData}
          onImportPdf={handleImportPdf}
          initialEnvData={environmentData}
          onDataUpdate={setEnvironmentData}
        />
      )}

      {step === 3 && (
        <SosiaalinenVastuuPage
          key={resetKey}
          onNext={handleSocialNext}
          onPrevious={() => setStep(2)}
          onImportPdf={handleImportPdf}
          initialSocialData={socialData}
          onDataUpdate={setSocialData}
        />
      )}

      {step === 4 && (
        <TalousJaHallintoPage
          key={resetKey}
          onNext={handleFinanceNext}
          onPrevious={() => setStep(3)}
          initialData={initialData}
          environmentData={environmentData}
          socialData={socialData}
          onImportPdf={handleImportPdf}
          initialFinanceData={financeData}
          onDataUpdate={setFinanceData}
        />
      )}

      {/* --- Kiinteä alapalkki: pelkkä ProgressBar --- */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          zIndex: 9999,
          backgroundColor: '#eee',
          display: 'flex',
          alignItems: 'center',
          padding: '0 1rem'
        }}
      >
        <ProgressBar
          currentPage={step + 1}
          pageTitles={pageTitles}
          onNavigate={handleNavigate}
        />
      </div>

      {/* (Valinnainen) staattinen ProgressBar keskellä sivua */}
      <ProgressBar
        currentPage={step + 1}
        pageTitles={pageTitles}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

export default App;
