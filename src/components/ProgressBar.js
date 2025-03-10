import React from 'react';

const ProgressBar = ({ currentPage, pageTitles }) => {
  return (
    <div style={styles.container}>
      {pageTitles.map((title, index) => {
        const pageNumber = index + 1;
        const isActive = pageNumber === currentPage;
        return (
          <div key={index} style={{ ...styles.item, ...(isActive ? styles.activeItem : {}) }}>
            <div style={styles.number}>{pageNumber}</div>
            <div style={styles.title}>{title}</div>
          </div>
        );
      })}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#eee',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    boxShadow: '0 -2px 5px rgba(0,0,0,0.2)',
    zIndex: 1000
  },
  item: {
    flex: 1,
    textAlign: 'center',
    padding: '5px'
  },
  activeItem: {
    fontWeight: 'bold',
    color: '#007acc'
  },
  number: {
    fontSize: '16px'
  },
  title: {
    fontSize: '12px',
    marginTop: '2px'
  }
};

export default ProgressBar;
