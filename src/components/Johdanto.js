// components/Johdanto.js
import React from 'react';
import LogoHeader from './LogoHeader';

const Johdanto = ({ onNext }) => {
    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <LogoHeader />
          {/* ISO otsikko */}
          <h1 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
            Maitotilan ESG-vastuullisuusraportti
          </h1>
          {/* Pienempi otsikko */}
          <h3 style={{ textAlign: 'center', marginBottom: '2rem', fontWeight: 'normal' }}>
        
          </h3>
    
          <div
        style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '2rem',
          display: 'flex',
          flexWrap: 'wrap'
        }}
      >
        {/* Vasen sarake: ESG teksti */}
        <div style={{ flex: '1 1 50%', padding: '1rem' }}>
          <h3>ESG:</h3>
          <p>
          ESG on lyhenne englannin kielen sanoista Environmental, Social ja Governance. ESG raportointi termillä tarkoitetaan yrityksen ympäristö-, sosiaaliseen- ja hallinnolliseen vastuuseen liittyvien tekijöiden tunnistamista, vastuullisia toimintatapoja ja niiden raportointia. Tulevaisuudessa vastuullisuusajattelu ja raportointivaade koskee välillisesti myös maitotilayrityksiä, kun yhteiskunta, asiakkaat, rahoituslaitokset ja kuluttajat haluavat tietää koko toimitusketjun vastuullisuudesta. Vastuullisuusraportointi tulee nousemaan talousraportoinnin rinnalle osaksi lainoitus- ja rahoitusprosesseja. Tämä työkalu auttaa maitotilayritystä kuvaamaan miettimään omalle yritykselle tärkeitä vastuullisuusasioita ja tuottaa niistä yrityksen ESG vastuullisuusraportin
          </p>
          <p>
          Työkalu ja raporttipohja on tuotettu osana Tulevaisuuden maatila -hanketta (1.1.2024-31.12.2025). Toteutuksesta vastasivat yhteistyössä YsAo, Savonia-amk ja Maitoyrittäjät ry. Hankkeen rahoittajana oli Pohjois-Savon Liitto ja rahoituslähteenä JTF -rahasto.
          </p>
        </div>
        
        {/* Oikea sarake: ESG kuva */}
        <div style={{ flex: '1 1 50%', padding: '1rem', textAlign: 'center' }}>
          <img
            src="/esg.png"  // Muokkaa polku vastaamaan oman projektisi tiedostorakennetta
            alt="ESG"
            style={{ maxWidth: '100%', borderRadius: '8px' }}
          />
        </div>
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={onNext}
          style={{
            fontSize: '16px',
            padding: '10px 20px',
            backgroundColor: '#989D39',
            borderRadius: '8px',
            color: 'white',
            border: 'none'
          }}
        >
          Seuraava
        </button>
      </div>
    </div>
  );
};


export default Johdanto;
