import './App.css';
import Registro from './components/Registro';
import Reclamar from './components/Reclamar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logs, setLogs] = useState([]); // Guardar el historial de reclamos

  const handleReclamo = (nuevoLog) => {
    setLogs([...logs, nuevoLog]);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:4000/v1/margarita/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Error en el login');
      }

      const data = await response.json();
      console.log("Respuesta del servidor:", data);
      if (data.status === "Bienvenido") {
        setIsLoggedIn(true);
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRegister = () => {
    setShowRegister(true);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={
            !showRegister ? (
              <div className="login-container">
                <h2>😉 BIENVENIDOS 😉</h2>
                <div className="input-group">
                  <label>Usuario</label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ingresa tu usuario"
                  />
                </div>
                <div className="input-group">
                  <label>Contraseña</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresa tu contraseña"
                  />
                </div>
                <div className="buttons">
                  <button className="login-btn" onClick={handleLogin}>Entrar</button>
                  <button className="register-btn" onClick={handleRegister}>Registrarse</button>
                </div>
              </div>
            ) : (
              <Registro />
            )
          } />
          <Route 
            path="/reclamar" 
            element={isLoggedIn ? (
              <Reclamar logs={logs} onReclamo={handleReclamo} />
            ) : (
              <Navigate to="/" />
            )} 
          />
        </Routes>
        {/* Redirigir tras login */}
        {isLoggedIn && <Navigate to="/reclamar" />}
      </div>
    </BrowserRouter>
  );
};

export default App;
