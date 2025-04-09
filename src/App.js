// App.js
import React, { useState, useEffect } from 'react';
import InitialPage from './components/InitialPage';
import EnvironmentPage from './components/EnvironmentPage';
import SosiaalinenVastuuPage from './components/SosiaalinenVastuuPage';
import TalousJaHallintoPage from './components/TalousJaHallintoPage';
import ProgressBar from './components/ProgressBar';
import generatePdfReport from './components/generatePdfReport';

function App() {
  const [step, setStep] = useState(0);
  const [initialData, setInitialData] = useState({});
  const [environmentData, setEnvironmentData] = useState({});
  const [socialData, setSocialData] = useState({});
  const [financeData, setFinanceData] = useState({});

  // resetKey -tila pakottaa lapsikomponentit remountaamaan, jolloin ne alustavat tilansa uudestaan.
  const [resetKey, setResetKey] = useState(0);

  const pageTitles = [
    "Yrityksen perustiedot",
    "Ympäristö",
    "Sosiaalinen vastuu",
    "Talous ja hallinto"
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleInitialNext = (data) => {
    setInitialData(data);
    setStep(1);
  };

  const handleEnvironmentNext = (data) => {
    setEnvironmentData(data);
    setStep(2);
  };

  const handleSocialNext = (data) => {
    setSocialData(data);
    setStep(3);
  };

  const handleFinanceNext = (data) => {
    setFinanceData(data);
    alert('PDF tallennus onnistui ja data tallennettu.');
  };

  // PDF generointifunktio
  const handleSaveAndFinish = () => {
    generatePdfReport(initialData, environmentData, socialData, financeData);
  };

  const handleNavigate = (targetStep) => {
    setStep(targetStep);
  };

  // Päivitetty handleClearAll: tyhjennetään kaikki tilat, localStorage ja päivitetään resetKey
  const handleClearAll = () => {
    setInitialData({});
    setEnvironmentData({});
    setSocialData({});
    setFinanceData({});

    localStorage.removeItem('initialFormData');
    localStorage.removeItem('environmentData');
    localStorage.removeItem('socialData');
    localStorage.removeItem('financeData');

    // Kasvatetaan resetKey:tä, jolloin kaikki lapsikomponentit remountautuvat
    setResetKey(prev => prev + 1);
    alert("Kaikki tiedot on tyhjennetty!");
  };

  return (
    <div style={{ paddingTop: '60px', paddingBottom: '80px' }}>
      {step === 0 && (
        <InitialPage
          key={resetKey}
          onNext={handleInitialNext}
          initialData={initialData}
          onDataUpdate={setInitialData}
        />
      )}
      {step === 1 && (
        <EnvironmentPage
          key={resetKey}
          onNext={handleEnvironmentNext}
          onPrevious={() => setStep(0)}
          companyData={initialData}
          initialEnvData={environmentData}
          onDataUpdate={setEnvironmentData}
        />
      )}
      {step === 2 && (
        <SosiaalinenVastuuPage
          key={resetKey}
          onNext={handleSocialNext}
          onPrevious={() => setStep(1)}
          initialSocialData={socialData}
          onDataUpdate={setSocialData}
        />
      )}
      {step === 3 && (
        <TalousJaHallintoPage
          key={resetKey}
          onNext={handleFinanceNext}
          onPrevious={() => setStep(2)}
          initialData={initialData}
          environmentData={environmentData}
          socialData={socialData}
          initialFinanceData={financeData}
          onDataUpdate={setFinanceData}
        />
      )}

      {/* Kiinteä kontti, jossa progress bar, Tallenna ja lopeta - sekä Tyhjennä kaikki -napit */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '60px',
          zIndex: 9999,
          backgroundColor: '#eee',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem'  // Asettaa pienen tilan nappien väliin
        }}
      >
        <ProgressBar
          currentPage={step + 1}
          pageTitles={pageTitles}
          onNavigate={handleNavigate}
        />
        <button
          onClick={handleSaveAndFinish}
          style={{
            fontSize: '16px',
            padding: '6px 8px',
            borderRadius: '8px',
            backgroundColor: '#007acc',
            color: 'white',
            border: 'none',
            zIndex: 10000
          }}
        >
          Tallenna ja lopeta
        </button>
        <button
          onClick={handleClearAll}
          style={{
            fontSize: '16px',
            padding: '6px 8px',
            borderRadius: '8px',
            backgroundColor: '#e53935',
            color: 'white',
            border: 'none',
            zIndex: 10000
          }}
        >
          Tyhjennä kaikki
        </button>
      </div>
      <ProgressBar
        currentPage={step + 1}
        pageTitles={pageTitles}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

export default App;
