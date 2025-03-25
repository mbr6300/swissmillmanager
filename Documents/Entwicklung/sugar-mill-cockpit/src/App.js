import React, { useState, useEffect } from 'react';
import SugarMillDashboard from './components/SugarMillDashboard';
import Login from './components/Login';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check if user is already authenticated
    const authenticated = sessionStorage.getItem('sugarMillAuthenticated');
    if (authenticated === 'true') {
      setIsAuthenticated(true);
    }
  }, []);
  
  const handleLogin = (status) => {
    setIsAuthenticated(status);
  };
  
  return (
    <div className="App">
      {isAuthenticated ? (
        <SugarMillDashboard />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
