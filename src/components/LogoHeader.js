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
      <img src="/savonia.png" alt="Savonia" style={{ height: '62px' }} />
      <img src="/maitoyrittajat.png" alt="Maitoyrittäjät" style={{ height: '77px' }} />
      <img src="/ysao.png" alt="Ysao" style={{ height: '52px' }} />
      <img src="/euroopanunioni.png" alt="Euroopan unioni" style={{ height: '77px' }} />
    </div>
  </header>
);

export default LogoHeader;
