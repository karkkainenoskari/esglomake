import React, { useState, useEffect } from 'react';
import InitialPage from './components/InitialPage';
import EnvironmentPage from './components/EnvironmentPage';
import SosiaalinenVastuuPage from './components/SosiaalinenVastuuPage';
import TalousJaHallintoPage from './components/TalousJaHallintoPage';
import ProgressBar from './components/ProgressBar';

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

  return (
    <div style={{ paddingBottom: '80px' }}>
      {step === 0 && (
        <InitialPage onNext={handleInitialNext} initialData={initialData} onDataUpdate={setInitialData} />
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
    <div
  style={{
    position: 'fixed',
    bottom: '20px',
    left: '0',
    right: '0',
    textAlign: 'center',
    zIndex: 9999, // nostettu z-index
    
  }}
>
  <button
    onClick={() => { /* tallenna ja lopeta toiminnallisuus */ }}
    style={{
      fontSize: '20px',
      padding: '12px 24px',
      borderRadius: '8px',
      backgroundColor: '#007acc',
      color: 'white',
      border: 'none'
    }}
  >
    Tallenna ja lopeta
  </button>
</div>

      <ProgressBar currentPage={step + 1} pageTitles={pageTitles} />
    </div>
  );
}

export default App;
