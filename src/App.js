import React, { useState } from 'react';
import InitialPage from './components/InitialPage';
import EnvironmentPage from './components/EnvironmentPage';
import SosiaalinenVastuuPage from './components/SosiaalinenVastuuPage';  // <-- UUSI
import ProgressBar from './components/ProgressBar';

function App() {
  const [step, setStep] = useState(0);
  const [initialData, setInitialData] = useState(null);
  const [environmentData, setEnvironmentData] = useState(null);
  // Jos haluat, voit tallentaa myös sosiaalisen vastuun datan:
  // const [socialData, setSocialData] = useState(null);

  // Määritellään sivujen otsikot
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

  // Paluu Ympäristö-sivulta taaksepäin step=0 (InitialPage)
  const handleEnvironmentBack = () => {
    setStep(0);
  };

  // 3) Sosiaalinen vastuu -sivu: tallennetaan data, siirrytään step=3 (Talous ja hallinto)
  const handleSocialNext = (data) => {
    // setSocialData(data); // jos haluat tallentaa
    setStep(3);
  };

  // Paluu Sosiaalinen vastuu -sivulta taaksepäin step=1 (EnvironmentPage)
  const handleSocialBack = () => {
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
        <SosiaalinenVastuuPage
          // Tallenna data ja siirry eteenpäin
          onNext={handleSocialNext}
          // Palaa taaksepäin Ympäristö-sivulle
          onPrevious={handleSocialBack}
        />
      )}
      {step === 3 && (
        <div style={{ padding: '1rem' }}>
          <h2>Talous ja hallinto</h2>
          <p>Tähän voit lisätä lomakkeen kentät talous- ja hallinto-osioon.</p>
          {/* Toteuta vastaava rakenne kuin muillakin sivuilla */}
        </div>
      )}

      {/* Edistymispalkki (ProgressBar) */}
      <ProgressBar currentPage={step + 1} pageTitles={pageTitles} />
    </div>
  );
}

export default App;
