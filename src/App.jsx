import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchUsers = async () => {
    if (!searchQuery.trim()) {
      alert('Please enter a name to search.');
      return;
    }

    setLoading(true);

    try {
      // const response = await axios.post(
        //     'https://apis.akshit.net/eciapi/17/district-court/case',
        //     { "cnr": searchQuery },
        //     {
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': 'ziaB8ExvjMEHTIK9twWxOCOIMnnhk7Z4',
        //         }
        //     }
        // );
      const response = await fetch('http://localhost:3001/api/case', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "cnr": searchQuery }),
      });
     
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();

      if (!responseData?.data) {
        alert('No data found!');
        return;
      }

      setData(responseData.data);
      console.log('Fetched Data:', responseData.data);

      setSearchQuery('');
    } catch (err) {
      console.error('Error:', err);
      alert('Error fetching data. Please try again.');
    } finally {
      setLoading(false);
    }
  };




  return (
    <div style={styles.container}>

      <header style={styles.header}>
        <div style={styles.navbar}>
          <div style={styles.logo}>MyApp</div>
          <nav style={styles.menu}>
            <a href="#" style={styles.menuLink}>Home</a>
            <a href="#" style={styles.menuLink}>About</a>
            <a href="#" style={styles.menuLink}>Contact</a>
          </nav>
        </div>
      </header>


      <div style={styles.buttonGroup}>
        <input
          type="text"
          placeholder="Search user by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.input}
        />
        <button style={styles.button} onClick={fetchUsers}>Search</button>
      </div>


      {loading && <p style={styles.loading}>Loading...</p>}

      {!loading && data.length === 0 && (
        <p style={{ textAlign: 'center', color: '#888', fontSize: '1.1rem' }}>
          No users found. Try a different name.
        </p>
      )}


      <div style={styles.contentArea}>
        {data.slice(0, 10).map((item, i) => (
          <div key={i} style={styles.card}>
            <div style={styles.cardTitle}>{item.name}</div>
            <p style={styles.infoText}><span style={styles.infoLabel}>Email:</span> {item.email}</p>
            <p style={styles.infoText}><span style={styles.infoLabel}>Username:</span> {item.username}</p>
            <p style={styles.infoText}><span style={styles.infoLabel}>Phone:</span> {item.phone}</p>
            <p style={styles.infoText}><span style={styles.infoLabel}>Website:</span> {item.website}</p>
            <p style={styles.infoText}><span style={styles.infoLabel}>City:</span> {item.address?.city}</p>
            <p style={styles.infoText}><span style={styles.infoLabel}>Company:</span> {item.company?.name}</p>
          </div>
        ))}
      </div>


      <footer style={styles.footer}>
        <p>© 2025 MyApp. All rights reserved.</p>
      </footer>
    </div>
  );

};

const styles = {

  input: {
    padding: '0.7rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    width: '250px',
  },

  container: {
    fontFamily: 'Segoe UI, sans-serif',
    background: '#f7f9fc',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
  },
  header: {
    backgroundColor: '#4f46e5',
    color: '#fff',
    padding: '1rem 2rem',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  menu: {
    display: 'flex',
    gap: '2rem',
  },
  menuLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 500,
    transition: 'color 0.3s',
    cursor: 'pointer',
  },
  menuLinkHover: {
    color: '#d1d5db',
  },
  footer: {
    marginTop: 'auto',
    padding: '1rem',
    textAlign: 'center',
    backgroundColor: '#eef2f7',
    borderTop: '1px solid #ddd',
    color: '#555',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    margin: '2rem 0',
    flexWrap: 'wrap',
  },
  button: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#4f46e5',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  contentArea: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    padding: '0 2rem 2rem',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    border: '1px solid #e5e7eb',
    transition: 'transform 0.3s ease',
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '0.5rem',
    borderBottom: '1px solid #eee',
    paddingBottom: '0.25rem',
  },
  infoText: {
    fontSize: '0.95rem',
    color: '#374151',
    lineHeight: '1.4',
  },
  infoLabel: {
    fontWeight: 500,
    color: '#6b7280',
  },

  loading: {
    textAlign: 'center',
    fontSize: '1.2rem',
  },
};

export default App;
