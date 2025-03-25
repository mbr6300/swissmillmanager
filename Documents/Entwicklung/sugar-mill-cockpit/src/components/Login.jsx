import React, { useState } from 'react';

function Login({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if password is correct
    if (password === 'terensis2025') {
      // Store authentication in session storage
      sessionStorage.setItem('sugarMillAuthenticated', 'true');
      onLogin(true);
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };
  
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: '30px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{
          textAlign: 'center',
          color: '#3a7e4f',
          marginBottom: '30px',
          fontSize: '24px'
        }}>
          Sugar Mill Manager
        </h1>
        
        <div style={{
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          <img 
            src={`${process.env.PUBLIC_URL}/sugar-mill-logo.png`} 
            alt="Sugar Mill Logo" 
            style={{
              width: '120px',
              height: 'auto',
              marginBottom: '20px'
            }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <p style={{
            color: '#666',
            fontSize: '16px'
          }}>
            Please enter your password to access the dashboard
          </p>
        </div>
        
        {error && (
          <div style={{
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '10px',
            borderRadius: '4px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label 
              htmlFor="password" 
              style={{
                display: 'block',
                marginBottom: '8px',
                color: '#555',
                fontSize: '14px'
              }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '16px'
              }}
              autoFocus
              required
            />
          </div>
          
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#3a7e4f',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#2d6a3e'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#3a7e4f'}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login; 