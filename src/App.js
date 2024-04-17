import React from 'react'
import Header from './components/header/Header';
import Routes from './components/routes/Router';
import Footer from './components/footer/Footer';
import './App.css';


function App() {
  return (
    <div className="grid-container">
      <main><Routes /></main>
    </div>
  )
}

export default App
