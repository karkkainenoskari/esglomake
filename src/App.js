// App.js
import React, { useState } from 'react';
import InitialPage from './components/InitialPage';
import EnvironmentPage from './components/EnvironmentPage';
import SosiaalinenVastuuPage from './components/SosiaalinenVastuuPage';
import TalousJaHallintoPage from './components/TalousJaHallintoPage';
import ProgressBar from './components/ProgressBar';

function App() {
  const [step, setStep] = useState(0);
  const [initialData, setInitialData] = useState(null);
  const [environmentData, setEnvironmentData] = useState(null);
  const [socialData, setSocialData] = useState(null);

  const pageTitles = [
    "Yrityksen perustiedot",
    "Ympäristö",
    "Sosiaalinen vastuu",
    "Talous ja hallinto"
  ];

  const handleInitialNext = (data) => {
    setInitialData(data);
    setStep(1);
  };

  const handleEnvironmentNext = (data) => {
    setEnvironmentData(data);
    setStep(2);
  };

  const handleEnvironmentBack = () => {
    setStep(0);
  };

  const handleSocialNext = (data) => {
    setSocialData(data);
    setStep(3);
  };

  const handleSocialBack = () => {
    setStep(1);
  };

  const handleFinanceBack = () => {
    setStep(2);
  };

  const handleFinanceNext = (data) => {
    // Toimenpiteet ja lopullinen tallennus
    alert('PDF tallennus onnistui ja data tallennettu.');
  };

  return (
    <div style={{ paddingBottom: '80px' }}>
      {step === 0 && <InitialPage onNext={handleInitialNext} />}
      {step === 1 && (
        <EnvironmentPage
          onNext={handleEnvironmentNext}
          onPrevious={handleEnvironmentBack}
          companyData={initialData}
          initialEnvData={environmentData}  // välitetään tallennettu data
        />
      )}
      {step === 2 && (
        <SosiaalinenVastuuPage
          onNext={handleSocialNext}
          onPrevious={handleEnvironmentBack}
          initialSocialData={socialData} // vastaava, jos haluat
        />
      )}
      {step === 3 && (
        <TalousJaHallintoPage
          onNext={handleFinanceNext}
          onPrevious={handleFinanceBack}
          initialData={initialData}
          environmentData={environmentData}
          socialData={socialData}
        />
      )}
      <ProgressBar currentPage={step + 1} pageTitles={pageTitles} />
    </div>
  );
}

export default App;
