import React from 'react';
import LogoHeader from './LogoHeader';

const Johdanto = ({ onNext }) => {
    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <LogoHeader />
          <h1 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
            Maitotilan ESG-vastuullisuusraportti
          </h1>
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
        <div style={{ flex: '1 1 50%', padding: '1rem' }}>
          <h3>ESG -vastuullisuuraportin tausta ja tarkoitus </h3>
          <p>
          ESG -lyhenne tulee englannin kielen sanoista environmental, social ja governance. ESG raportoinnilla tarkoitetaan yrityksen ympäristö-, sosiaaliseen- ja hallinnolliseen vastuuseen liittyvien tekijöiden tunnistamista, toimintatapoja ja niiden raportointia. ESG -raportointi on maitoyrityksille täysin vapaaehtoista, mutta raportointivaade tulee välillisenä omien asiakkaiden (esim. meijerin tai teurastamon) kautta. <br></br><br></br>
          Vastuullisuusraportointi tulee nousemaan talousraportoinnin rinnalle osaksi lainoitus- ja rahoitusprosesseja. Vastuullisuusraportin avulla maitoyritys voi todentaa vastuullisuuden eteen tekemänsä toimet ulospäin ja sitä kautta vaikuttaa oman yrityksen- ja koko toimialan imagoon. Vastuullisuudesta kertominen vaikuttaa myös yrityksen työnantajamielikuvaan. <br></br><br></br>
          Tämä työkalu auttaa miettimään ja kuvaamaan juuri omalle yritykselle tärkeitä vastuullisuusasioita ja tuottamaan niistä esimerkiksi vuosittain tilinpäätöksen liitteeksi lisättävän ESG vastuullisuusraportin. Työkalua voi myös käyttää tsekkilistana oman yritysesittelyn tekemisessä.
          </p> 
        </div>
        

        
        <div style={{ flex: '1 1 50%', padding: '1rem', textAlign: 'center' }}>
          <img
            src="/esg.PNG"  
            alt="esg"
            style={{ maxWidth: '100%', borderRadius: '8px' }}
          />
        </div>

        <div
         style={{
           flex: '1 1 100%',
           padding: '1rem',
           fontSize: '0.8rem',
           lineHeight: 1.5,
           borderTop: '1px solid #ddd'  // erotusviiva kuvan ja tekstin välillä
         }}
       >
         Työkalu ja raporttipohja on tuotettu osana Tulevaisuuden maatila -hanketta
         (1.1.2024–31.12.2025). <br></br> Toteutuksesta vastasivat yhteistyössä YsAo,
         Savonia-amk ja Maitoyrittäjät ry. Hankkeen rahoittajana oli Pohjois-Savon
         Liitto ja rahoituslähteenä JTF-rahasto.
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
