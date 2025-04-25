import React, { useState, useEffect, useRef } from 'react';
import InitialPage from './components/InitialPage';
import EnvironmentPage from './components/EnvironmentPage';
import SosiaalinenVastuuPage from './components/SosiaalinenVastuuPage';
import TalousJaHallintoPage from './components/TalousJaHallintoPage';
import ProgressBar from './components/ProgressBar';
import generatePdfReport from './components/generatePdfReport';
import Johdanto from './components/Johdanto';



function App() {
  const [step, setStep] = useState(0);
  const [initialData, setInitialData] = useState({});
  const [environmentData, setEnvironmentData] = useState({});
  const [socialData, setSocialData] = useState({});
  const [financeData, setFinanceData] = useState({});
  const [resetKey, setResetKey] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);


  const fileInputRef = useRef(null);

  useEffect(() => {
    setInitialData(JSON.parse(localStorage.getItem('initialFormData') || '{}'));
    setEnvironmentData(JSON.parse(localStorage.getItem('environmentData') || '{}'));
    setSocialData(JSON.parse(localStorage.getItem('socialData') || '{}'));
    setFinanceData(JSON.parse(localStorage.getItem('financeData') || '{}'));
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  useEffect(() => { window.scrollTo(0, 0); }, [step]);

  const handleSaveDraft = () => {
    const data = {
      initialData,
      environmentData,
      socialData,
      financeData
    };

    const blob = new Blob(
      [JSON.stringify(data, null, 2)],
      { type: 'application/json' }
    );
    const url = URL.createObjectURL(blob);

    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const filename = `esg_lomake_luonnos_${dd}-${mm}-${yyyy}.json`;

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
  };


  const handleLoadDraft = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        const {
          initialData: init = {},
          environmentData: env = {},
          socialData: soc = {},
          financeData: fin = {}
        } = parsed;

        setInitialData(init);
        setEnvironmentData(env);
        setSocialData(soc);
        setFinanceData(fin);

        localStorage.setItem('initialFormData', JSON.stringify(init));
        localStorage.setItem('environmentData', JSON.stringify(env));
        localStorage.setItem('socialData', JSON.stringify(soc));
        localStorage.setItem('financeData', JSON.stringify(fin));

        setResetKey(k => k + 1);
        alert('Luonnos ladattu onnistuneesti!');
      } catch {
        alert('Virhe: tiedosto ei ole kelvollinen luonnos‑JSON.');
      } finally {
        if (fileInputRef.current) fileInputRef.current.value = null;
      }
    };
    reader.readAsText(file);
  };

  const handleJohdantoNext = () => setStep(1);
  const handleInitialNext = (d) => { setInitialData(d); setStep(2); };
  const handleEnvironmentNext = (d) => { setEnvironmentData(d); setStep(3); };
  const handleSocialNext = (d) => { setSocialData(d); setStep(4); };
  const handleFinanceNext = (d) => { setFinanceData(d); alert('PDF tallennus onnistui ja data tallennettu.'); };

  const handleSaveAndFinish = () => {
    const init = JSON.parse(localStorage.getItem('initialFormData') || '{}');
    const env = JSON.parse(localStorage.getItem('environmentData') || '{}');
    const social = JSON.parse(localStorage.getItem('socialData') || '{}');
    const fin = JSON.parse(localStorage.getItem('financeData') || '{}');
    generatePdfReport(init, env, social, fin);
  };

  const handleNavigate = (targetStep) => setStep(targetStep);

  const handleClearAll = () => {
    if (!window.confirm('Haluatko varmasti tyhjentää kaikki lomakkeen tiedot?')) return;

    setInitialData({});
    setEnvironmentData({});
    setSocialData({});
    setFinanceData({});

    ['initialFormData', 'environmentData', 'socialData', 'financeData']
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

  const pageTitles = [
    'Johdanto',
    'Yrityksen perustiedot / ohjeet',
    'Ympäristö',
    'Sosiaalinen vastuu',
    'Talous ja hallinto'
  ];

  return (
    <div style={{ paddingTop: 60, paddingBottom: 80 }}>

      <div
        ref={menuRef}
        style={{
          position: 'fixed',
          top: 18,
          left: 1435,
          zIndex: 10000
        }}
      >
        <button
          aria-label="Valikko"
          onClick={() => setMenuOpen(o => !o)}
          style={{
            width: 120,                // riittävästi tilaa tekstille ja ikoneille
            height: 50,
            display: 'flex',
            flexDirection: 'row',      // rivisuuntaan
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 12px',         // vasen ja oikea sisennys
            background: '#007acc',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer'
          }}
        >
          {/* Teksti vasemmalla */}
          <span style={{
            fontSize: '0.85rem',
            color: '#fff',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap'
          }}>
            Valikko
          </span>

          {/* Burger-ikonit oikealla */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '35%'           // kolmen viivan väliin tilaa
          }}>
            <span style={{ width: 20, height: 3, background: '#fff', borderRadius: 2 }} />
            <span style={{ width: 20, height: 3, background: '#fff', borderRadius: 2 }} />
            <span style={{ width: 20, height: 3, background: '#fff', borderRadius: 2 }} />
          </div>
        </button>

        {menuOpen && (
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
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
              Tallenna raportin sisältö
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
              Hae edellisen raportin sisältö
            </button>

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
              Tulosta valmis ESG-raportti
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

            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              style={{ display: 'none' }}
              onClick={e => { e.target.value = null; }}
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

      {step === 0 && <Johdanto onNext={handleJohdantoNext} />}

      {step === 1 && (
        <InitialPage
          key={resetKey}
          onPrevious={() => setStep(0)}
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
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          padding: '0 12px',
          boxSizing: 'border-box',
          height: 60,
          zIndex: 9999,
          backgroundColor: '#eee',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflowX: 'auto'
        }}
      >
        <ProgressBar
          currentPage={step + 1}
          pageTitles={pageTitles}
          onNavigate={handleNavigate}
        />
      </div>
    </div>
  );
}

export default App;
