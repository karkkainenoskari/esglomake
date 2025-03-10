import React, { useState } from 'react';
import InitialPage from './components/InitialPage';
import EnvironmentPage from './components/EnvironmentPage';
import DiversityPage from './components/DiversityPage';
import ProgressBar from './components/ProgressBar';

function App() {
  const [step, setStep] = useState(0);
  const [initialData, setInitialData] = useState(null);
  const [environmentData, setEnvironmentData] = useState(null);

  // Määritellään sivujen otsikot
  const pageTitles = [
    "Yrityksen perustiedot",
    "Ympäristö",
    "Sosiaaalinen vastuu",
    "Talous ja hallinto",
  ];

  // Alkuperäiseltä sivulta saadaan perustiedot
  const handleInitialNext = (data) => {
    setInitialData(data);
    setStep(1); // Siirrytään ympäristö-sivulle
  };

  // Ympäristösivulta saadaan data ja siirrytään Monimuotoisuus-sivulle
  const handleEnvironmentNext = (envData) => {
    setEnvironmentData(envData);
    setStep(2); // Siirrytään Monimuotoisuus-sivulle
  };

  const handleEnvironmentBack = () => {
    setStep(0);
  };

  const handleDiversityBack = () => {
    setStep(1);
  };

  return (
    <div style={{ paddingBottom: '80px' }}>
      {step === 0 && (
        <InitialPage onNext={handleInitialNext} />
      )}
      {step === 1 && (
        <EnvironmentPage
          onNext={handleEnvironmentNext}
          onPrevious={handleEnvironmentBack}
          companyData={initialData}
        />
      )}
      {step === 2 && (
        <DiversityPage
          onNext={() => alert('Monimuotoisuus-sivu valmis')}
          onPrevious={handleDiversityBack}
        />
      )}
      <ProgressBar currentPage={step + 1} pageTitles={pageTitles} />
    </div>
  );
}

export default App;
