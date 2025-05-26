import React from 'react';
import './App.css';
import RecipeContainer from './components/RecipeContainer';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">🍲</span> RecipeVault
            </div>
            <div>
              <a href="https://github.com/kavia-ai/RecipeVault" target="_blank" rel="noopener noreferrer" className="navbar-link">
                About
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <RecipeContainer />
      </main>
      
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} RecipeVault - Your Personal Recipe Collection</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
