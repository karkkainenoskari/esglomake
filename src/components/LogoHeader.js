import React from 'react';

const LogoHeader = () => (
  <header
  style={{
    width: '100%',
    backgroundColor: '#fff', 
    padding: '10px 0',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
    borderBottom: '1px solid #ccc' 
  }}
>
<div
      style={{
        display: 'flex',
        justifyContent: 'space-evenly', 
        alignItems: 'center',
        width: '100%'
      }}
    >
      <img src="/savonia.png" alt="Savonia" style={{ height: '60px' }} />
      <img src="/maitoyrittajat.png" alt="Maitoyrittäjät" style={{ height: '60px' }} />
      <img src="/valio.png" alt="Valio" style={{ height: '60px' }} />
      <img src="/ysao.png" alt="Ysao" style={{ height: '60px' }} />
      <img src="/euroopanunioni.png" alt="Euroopan unioni" style={{ height: '60px' }} />
    </div>
  </header>
);

export default LogoHeader;
