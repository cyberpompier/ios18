import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

function Header({ onMenuToggle }) {
  return (
    <header className="header">
      <button className="menu-button" onClick={onMenuToggle}>☰</button>
      <h1>iOS 18 PWA</h1>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2024 My PWA</p>
    </footer>
  );
}

function Sidebar({ isOpen, onClose }) {
  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-button" onClick={onClose}>×</button>
      <ul>
        <li><Link to="/" onClick={handleLinkClick}>Accueil</Link></li>
        <li><Link to="/about" onClick={handleLinkClick}>À Propos</Link></li>
        <li><Link to="/contact" onClick={handleLinkClick}>Contact</Link></li>
        <li><Link to="/personnel" onClick={handleLinkClick}>Personnel</Link></li>
      </ul>
    </div>
  );
}

function Home() {
  return (
    <div className="content">
      <h2>Accueil</h2>
      <p>Bienvenue sur la page d'accueil !</p>
    </div>
  );
}

function About() {
  const [data, setData] = useState([]);
  const spreadsheetId = 'YOUR_SPREADSHEET_ID'; // Replace with your spreadsheet ID
  const range = 'Sheet1!A1:B10'; // Replace with your desired range

  const handleReadData = async () => {
    try {
      const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: range,
      });
      const result = response.result;
      const newData = result.values || [];
      setData(newData);
      console.log('Data read from Google Sheets:', newData);
    } catch (error) {
      console.error('Error reading data from Google Sheets:', error);
    }
  };

  return (
    <div className="content">
      <h2>À Propos</h2>
      <p>Ceci est la page "À propos".</p>
      <div>
        <button onClick={handleReadData}>
          Lire les données Google Sheets
        </button>
        {/* Display Data */}
        <ul>
          {data.map((row, index) => (
            <li key={index}>{row.join(', ')}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="content">
      <h2>Contact</h2>
      <p>Contactez-nous ici.</p>
    </div>
  );
}

function Personnel() {
  return (
    <div className="content">
      <h2>Personnel</h2>
      <div className="green-container">
        <h3>Notre Équipe</h3>
        <ul>
          <li><span className="red-vignette">John Doe</span></li>
          <li><span className="red-vignette">Jane Smith</span></li>
          <li><span className="red-vignette">Peter Jones</span></li>
        </ul>
      </div>
    </div>
  );
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <Router>
      <div className="app">
        <Header onMenuToggle={toggleMenu} />
        <Sidebar isOpen={isMenuOpen} onClose={closeMenu} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/personnel" element={<Personnel />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
