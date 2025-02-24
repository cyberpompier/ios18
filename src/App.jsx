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
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-button" onClick={onClose}>×</button>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </div>
  );
}

function Home() {
  return (
    <div className="content">
      <h2>Home</h2>
      <p>Welcome to the Home page!</p>
    </div>
  );
}

function About() {
  return (
    <div className="content">
      <h2>About</h2>
      <p>This is the About page.</p>
    </div>
  );
}

function Contact() {
  return (
    <div className="content">
      <h2>Contact</h2>
      <p>Contact us here.</p>
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
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
