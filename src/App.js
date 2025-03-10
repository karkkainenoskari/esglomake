import React, { useState } from 'react';
import InitialPage from './components/InitialPage';
import EnvironmentPage from './components/EnvironmentPage';

function App() {
  const [step, setStep] = useState(0);
  const [initialData, setInitialData] = useState(null);

  // Kutsutaan, kun InitialPage-lomake on lähetetty
  const handleInitialNext = (data) => {
    setInitialData(data);
    setStep(1); // Siirrytään ympäristö-sivulle
  };

  // Kutsutaan, kun Ympäristö-sivulta halutaan mennä eteenpäin
  const handleEnvironmentNext = (envData) => {
    // envData = Ympäristö-sivun syötteet, voit tallentaa ne stateen
    console.log('Ympäristö-sivun tiedot:', envData);
    // Seuraavaan vaiheeseen (step=2) – jos lisävaiheita on
    // setStep(2);
    alert('Voit jatkaa muihin vaiheisiin tai tallentaa PDF:n');
  };

  // Kutsutaan, kun Ympäristö-sivulta halutaan palata taaksepäin
  const handleEnvironmentBack = () => {
    setStep(0);
  };

  return (
    <div>
      {step === 0 && (
        <InitialPage onNext={handleInitialNext} />
      )}
      {step === 1 && (
        <EnvironmentPage
          onNext={handleEnvironmentNext}
          onPrevious={handleEnvironmentBack}
        />
      )}
      {/* step === 2, 3... jos haluat lisävaiheita */}
    </div>
  );
}

export default App;

