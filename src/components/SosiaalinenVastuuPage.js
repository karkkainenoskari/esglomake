// src/components/SosiaalinenVastuuPage.js
import React from 'react';

const SosiaalinenVastuuPage = ({ onNext, onPrevious }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Kun tämä sivu on täytetty, voit kutsua onNext()
    if (onNext) onNext();
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Sosiaalinen vastuu</h2>
      <p>Tähän voit lisätä lomakkeen kentät, jotka liittyvät sosiaaliseen vastuuseen.</p>
      <form onSubmit={handleSubmit}>
        {/* Lomakkeen kenttiä, esim. henkilöstö, työolosuhteet, eläinten hyvinvointi... */}

        {/* Navigointi */}
        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center' }}>
          <button type="button" onClick={onPrevious} style={{ marginRight: '1rem' }}>
            Edellinen
          </button>
          <button type="submit" style={{ marginRight: '1rem' }}>
            Seuraava
          </button>
        </div>
      </form>
    </div>
  );
};

export default SosiaalinenVastuuPage;
