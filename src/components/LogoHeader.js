// src/components/LogoHeader.js
import React from 'react';

const LogoHeader = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '2rem',
      marginBottom: '1rem'
    }}
  >
    <img src="/savonia.png" alt="Savonia" style={{ height: '60px' }} />
    <img src="/maitoyrittajat.png" alt="Maitoyrittäjät" style={{ height: '60px' }} />
    <img src="/valio.png" alt="Valio" style={{ height: '60px' }} />
    <img src="/ysao.png" alt="Ysao" style={{ height: '60px' }} />
    <img src="/euroopanunioni.png" alt="Euroopan unioni" style={{ height: '60px' }} />
  </div>
);

export default LogoHeader;
