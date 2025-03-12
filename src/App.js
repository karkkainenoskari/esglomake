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
  // Voit tarvittaessa lisätä myös sosiaalisen vastuun datan

  // Sivujen otsikot ProgressBar-komponenttia varten
  const pageTitles = [
    "Yrityksen perustiedot",
    "Ympäristö",
    "Sosiaalinen vastuu",
    "Talous ja hallinto"
  ];

  // 1) Alkusivu: tallennetaan perustiedot, siirrytään step=1
  const handleInitialNext = (data) => {
    setInitialData(data);
    setStep(1); // Ympäristö-sivulle
  };

  // 2) Ympäristö-sivu: tallennetaan data, siirrytään step=2 (Sosiaalinen vastuu)
  const handleEnvironmentNext = (data) => {
    setEnvironmentData(data);
    setStep(2); // Sosiaalinen vastuu -sivulle
  };

  // Paluu Ympäristö-sivulta takaisin (step=0)
  const handleEnvironmentBack = () => {
    setStep(0);
  };

  // 3) Sosiaalinen vastuu -sivu: tallennetaan data, siirrytään step=3 (Talous ja hallinto)
  const handleSocialNext = (data) => {
    // Jos haluat tallentaa sosiaalisen vastuun datan, tee se tässä
    setStep(3);
  };

  // Paluu Sosiaalinen vastuu -sivulta takaisin (step=1)
  const handleSocialBack = () => {
    setStep(1);
  };

  // 4) Talous ja hallinto -sivu
  const handleFinanceBack = () => {
    setStep(2);
  };

  // Voit lisätä handleFinanceNext, jos on jatkovaiheita
  const handleFinanceNext = (data) => {
    // Esimerkiksi: tallenna talous ja hallinto -data ja siirry seuraavaan vaiheeseen
    setStep(4);
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
        <SosiaalinenVastuuPage
          onNext={handleSocialNext}
          onPrevious={handleSocialBack}
        />
      )}
      {step === 3 && (
        <TalousJaHallintoPage
          onNext={handleFinanceNext}
          onPrevious={handleFinanceBack}
        />
      )}

      <ProgressBar currentPage={step + 1} pageTitles={pageTitles} />
    </div>
  );
}

export default App;
