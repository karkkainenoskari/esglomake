import React, { useState } from 'react';
import InitialPage from './components/InitialPage';

function App() {
  const [step, setStep] = useState(0);
  const [initialData, setInitialData] = useState(null);

  const handleNext = (data) => {
    setInitialData(data);
    // Siirrytään seuraavaan vaiheeseen (esim. lisävaiheisiin)
    setStep(step + 1);
  };

  return (
    <div>
      {step === 0 ? (
        <InitialPage onNext={handleNext} />
      ) : (
        <div>
          <h2>Jatko-osa tulee tähän...</h2>
          <pre>{JSON.stringify(initialData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;

