// components/Johdanto.js
import React from 'react';
import LogoHeader from './LogoHeader';

const Johdanto = ({ onNext }) => {
    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <LogoHeader />
            <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Johdanto</h1>
            <div
                style={{
                    border: '1px solid #ccc',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '2rem'
                }}
            >
                <h3>ESG:</h3>
                <p>
                    ESG on lyhenne englannin kielen sanoista Environmental, Social ja Governance. ESG-raportointi tarkoittaa yrityksen
                    ympäristö-, sosiaaliseen ja hallinnolliseen vastuuseen liittyvien tekijöiden tunnistamista, vastuullisia toimintatapoja
                    ja niiden raportointia. Tulevaisuudessa vastuullisuusajattelu ja raportointivaade koskevat myös maitotilayrityksiä, kun
                    yhteiskunta, asiakkaat, rahoituslaitokset ja kuluttajat haluavat tietää koko toimitusketjun vastuullisuudesta. Vastuullisuusraportointi
                    nousee talousraportoinnin rinnalle osana lainoitus- ja rahoitusprosesseja.
                </p>
                Tämä työkalu auttaa maitotilayritystä kuvaamaan ja miettimään omalle yritykselle tärkeitä vastuullisuusasioita ja
                tuottaa niistä yrityksen ESG-vastuullisuusraportin. Työkalu ja raporttipohja on tuotettu osana Tulevaisuuden maatila -hanketta
                (1.1.2024–31.12.2025). Toteutuksesta vastasivat yhteistyössä YsAo, Savonia-amk ja Maitoyrittäjät ry. Hankkeen rahoittajana oli
                Pohjois-Savon Liitto ja rahoituslähteenä JTF-rahasto.
                <p>

                </p>
                {/* Lisää kuva – muokkaa src vastaamaan oman projektisi tiedostorakennetta */}
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <img
                        src="/esg.png"
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
                        borderRadius: '8px',
                        backgroundColor: '#007acc',
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
