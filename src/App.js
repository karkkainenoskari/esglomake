import React, { useState } from 'react';
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

  const handleSocialNext = (data) => {
    setSocialData(data);
    setStep(3);
  };

  const handleFinanceNext = (data) => {
    setFinanceData(data);
    // Kun käyttäjä valitsee "Tallenna ja lopeta" niin generoidaan PDF
    generatePdfReport(initialData, environmentData, socialData, data);
  };

  // Voit lisätä myös napin, jolla käyttäjä voi "tallentaa ja lopetta" suoraan missä tahansa vaiheessa.
  // Esimerkiksi:
  const handleSaveAndFinish = () => {
    generatePdfReport(initialData, environmentData, socialData, financeData);
  };

  return (
    <div style={{ paddingBottom: '80px' }}>
      {step === 0 && (
        <InitialPage onNext={handleInitialNext} initialData={initialData} />
      )}
      {step === 1 && (
        <EnvironmentPage
          onNext={handleEnvironmentNext}
          onPrevious={() => setStep(0)}
          companyData={initialData}
          initialEnvData={environmentData}
        />
      )}
      {step === 2 && (
        <SosiaalinenVastuuPage
          onNext={handleSocialNext}
          onPrevious={() => setStep(1)}
          initialSocialData={socialData}
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
        />
      )}
      {/* Esimerkiksi voit lisätä yhteisen "Tallenna ja lopeta" -napin näytön alaosaan */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
  <button
    onClick={handleSaveAndFinish}
    style={{
      fontSize: '20px',
      padding: '12px 24px',
      borderRadius: '8px',
      backgroundColor: '#007acc',
      color: 'white',
      border: 'none'
    }}>Tallenna ja lopeta</button>
      </div>
      <ProgressBar currentPage={step + 1} pageTitles={pageTitles} />
    </div>
  );
}

export default App;
