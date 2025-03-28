import React, { useState, useEffect } from 'react';
import InitialPage from './components/InitialPage';
import EnvironmentPage from './components/EnvironmentPage';
import SosiaalinenVastuuPage from './components/SosiaalinenVastuuPage';
import TalousJaHallintoPage from './components/TalousJaHallintoPage';
import ProgressBar from './components/ProgressBar';
import generatePdfReport from './components/generatePdfReport'; // varmista, että tämä tiedosto on olemassa

function App() {
  const [step, setStep] = useState(0);
  const [initialData, setInitialData] = useState({});
  const [environmentData, setEnvironmentData] = useState({});
  const [socialData, setSocialData] = useState({});
  const [financeData, setFinanceData] = useState({});

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

  // Tämä funktio kutsuu PDF-generointifunktiota ja välittää App-komponentin tallentamat tiedot
  const handleSaveAndFinish = () => {
    generatePdfReport(initialData, environmentData, socialData, financeData);
  };

  const handleNavigate = (targetStep) => {
    setStep(targetStep);
  };

  return (
    <div style={{ paddingTop: '50px', paddingBottom: '50px' }}>

      {step === 0 && (
        <InitialPage 
          onNext={handleInitialNext} 
          initialData={initialData} 
          onDataUpdate={setInitialData} 
        />
      )}
      {step === 1 && (
        <EnvironmentPage
          onNext={handleEnvironmentNext}
          onPrevious={() => setStep(0)}
          companyData={initialData}
          initialEnvData={environmentData}
          onDataUpdate={setEnvironmentData}
        />
      )}
      {step === 2 && (
        <SosiaalinenVastuuPage
          onNext={handleSocialNext}
          onPrevious={() => setStep(1)}
          initialSocialData={socialData}
          onDataUpdate={setSocialData}
        />
      )}
      {step === 3 && (
        <TalousJaHallintoPage
          onNext={handleFinanceNext}
          onPrevious={() => setStep(2)}
          initialData={initialData}
          environmentData={environmentData}
          socialData={socialData}
          initialFinanceData={financeData}
          onDataUpdate={setFinanceData}
        />
      )}
  
      {/* Yhdistetty progress bar ja nappi samassa kiinteässä kontissa */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '80px', // säädä tarvittaessa
          zIndex: 9999,
          backgroundColor: '#eee',
          boxShadow: '0 -2px 5px rgba(0,0,0,0.2)',
        }}
      >
        {/* ProgressBar:lle välitetään myös onNavigate-prop */}
        <ProgressBar
          currentPage={step + 1}
          pageTitles={pageTitles}
          onNavigate={handleNavigate}
        />
        {/* Tallenna ja lopeta -nappi sijoitetaan absoluuttisesti keskelle */}
        <button
          onClick={handleSaveAndFinish}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '20px',
            padding: '12px 24px',
            borderRadius: '8px',
            backgroundColor: '#007acc',
            color: 'white',
            border: 'none',
            zIndex: 10000, // varmistetaan, että nappi on päällimmäisenä
          }}
        >
          Tallenna ja lopeta
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
