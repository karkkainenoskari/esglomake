import React from 'react';

const ProgressBar = ({ currentPage, pageTitles, onNavigate, onSaveAndFinish }) => {
  return (
    <div style={styles.container}>
      {/* Renderöidään ensin sivut 1 ja 2 */}
      {pageTitles.slice(0, 2).map((title, index) => {
        const actualIndex = index; // 0 tai 1
        const pageNumber = actualIndex + 1;
        const isActive = pageNumber === currentPage;

        return (
          <div
            key={actualIndex}
            style={{ ...styles.item, ...(isActive ? styles.activeItem : {}) }}
            onClick={() => onNavigate(actualIndex)}
          >
            <div style={styles.number}>{pageNumber}</div>
            <div style={styles.title}>{title}</div>
          </div>
        );
      })}

  

      {/* Renderöidään sivut 3 ja 4 */}
      {pageTitles.slice(2).map((title, index) => {
        const actualIndex = index + 2; // 2 tai 3
        const pageNumber = actualIndex + 1;
        const isActive = pageNumber === currentPage;

        return (
          <div
            key={actualIndex}
            style={{ ...styles.item, ...(isActive ? styles.activeItem : {}) }}
            onClick={() => onNavigate(actualIndex)}
          >
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
    width: '110%',
    boxShadow: '0 -2px 5px rgba(0,0,0,0.2)',
    zIndex: 1000
  },
  item: {
    flex: 1,
    textAlign: 'center',
    padding: '5px',
    cursor: 'pointer'
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
  },
  button: {
    padding: '8px 12px',
    borderRadius: '4px',
    backgroundColor: '#007acc',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    margin: '0 10px'
  }
};

export default ProgressBar;
