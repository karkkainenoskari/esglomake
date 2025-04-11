import React, { useState, useEffect } from 'react';
import InitialPage from './components/InitialPage';
import EnvironmentPage from './components/EnvironmentPage';
import SosiaalinenVastuuPage from './components/SosiaalinenVastuuPage';
import TalousJaHallintoPage from './components/TalousJaHallintoPage';
import ProgressBar from './components/ProgressBar';
import generatePdfReport from './components/generatePdfReport';
import Johdanto from './components/Johdanto';

function App() {
  // Tilamuuttujat eri sivujen datalle sekä navigoinnille
  const [step, setStep] = useState(0);
  const [initialData, setInitialData] = useState({});
  const [environmentData, setEnvironmentData] = useState({});
  const [socialData, setSocialData] = useState({});
  const [financeData, setFinanceData] = useState({});
  // resetKey pakottaa lapsikomponentit remountaamaan, jolloin ne alustavat tilansa uudestaan
  const [resetKey, setResetKey] = useState(0);

  // Sivujen nimet progress baria varten
  const pageTitles = [
    "Johdanto",
    "Yrityksen perustiedot / ohjeet",
    "Ympäristö",
    "Sosiaalinen vastuu",
    "Talous ja hallinto",
  ];

  // Vierittää sivun yläreunaan aina kun step muuttuu
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  // Johdannon seuraava-nappi siirtää tilan vaiheeseen 1 (InitialPage)
  const handleJohdantoNext = () => {
    setStep(1);
  };

  // InitialPage:n data tallennetaan ja siirrytään vaiheeseen 2
  const handleInitialNext = (data) => {
    setInitialData(data);
    setStep(2);
  };

  // EnvironmentPage:llä tallennettu data tallennetaan ja siirrytään vaiheeseen 3
  const handleEnvironmentNext = (data) => {
    setEnvironmentData(data);
    setStep(3);
  };

  // SosiaalinenVastuuPage:llä tallennettu data tallennetaan ja siirrytään vaiheeseen 4
  const handleSocialNext = (data) => {
    setSocialData(data);
    setStep(4);
  };

  // TalousJaHallintoPage:llä tallennettu data tallennetaan ja lopetetaan prosessi
  const handleFinanceNext = (data) => {
    setFinanceData(data);
    alert("PDF tallennus onnistui ja data tallennettu.");
  };

  // PDF-generointi kerätyistä tiedoista
  const handleSaveAndFinish = () => {
    generatePdfReport(initialData, environmentData, socialData, financeData);
  };

  // Mahdollisuus navigoida suoraan eri sivuille progress barin kautta
  const handleNavigate = (targetStep) => {
    setStep(targetStep);
  };

  // "Tyhjennä kaikki" -napin toimintalogiikka: kysytään käyttäjältä varmistus ja sitten tyhjennetään tiedot
  const handleClearAll = () => {
    const confirmClear = window.confirm("Haluatko varmasti tyhjentää kaikki lomakkeen tiedot?");
    if (confirmClear) {
      // Tyhjennetään tilat
      setInitialData({});
      setEnvironmentData({});
      setSocialData({});
      setFinanceData({});
      // Poistetaan localStoragesta tallennetut tiedot
      localStorage.removeItem("initialFormData");
      localStorage.removeItem("environmentData");
      localStorage.removeItem("socialData");
      localStorage.removeItem("financeData");
      // Pakotetaan lapsikomponentit remountaamaan
      setResetKey(prev => prev + 1);
      alert("Kaikki tiedot on tyhjennetty!");
    }
  };

  return (
    <div style={{ paddingTop: "60px", paddingBottom: "80px" }}>
      {step === 0 && <Johdanto onNext={handleJohdantoNext} />}
      
      {step === 1 && (
        <InitialPage
          key={resetKey}
          onNext={handleInitialNext}
          initialData={initialData}
          onDataUpdate={setInitialData}
        />
      )}
      
      {step === 2 && (
        <EnvironmentPage
          key={resetKey}
          onNext={handleEnvironmentNext}
          onPrevious={() => setStep(1)}
          companyData={initialData}
          initialEnvData={environmentData}
          onDataUpdate={setEnvironmentData}
        />
      )}
      
      {step === 3 && (
        <SosiaalinenVastuuPage
          key={resetKey}
          onNext={handleSocialNext}
          onPrevious={() => setStep(2)}
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
          initialFinanceData={financeData}
          onDataUpdate={setFinanceData}
        />
      )}

      {/* Kiinteä alalaite, jossa on progress bar ja napit "Tallenna ja lopeta" sekä "Tyhjennä kaikki" */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "60px",
          zIndex: 9999,
          backgroundColor: "#eee",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10rem",
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
            fontSize: "16px",
            padding: "6px 8px",
            borderRadius: "8px",
            backgroundColor: "#007acc",
            color: "white",
            border: "none",
            zIndex: 10000,
          }}
        >
          Tallenna ja lopeta
        </button>
        <button
          onClick={handleClearAll}
          style={{
            fontSize: "16px",
            padding: "6px 8px",
            borderRadius: "8px",
            backgroundColor: "#e53935",
            color: "white",
            border: "none",
            zIndex: 10000,
          }}
        >
          Tyhjennä kaikki
        </button>
      </div>

      {/* Näytetään progress bar myös sivun alareunassa */}
      <ProgressBar
        currentPage={step + 1}
        pageTitles={pageTitles}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

export default App;
