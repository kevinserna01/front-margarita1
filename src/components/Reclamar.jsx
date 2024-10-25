import React, { useState, useEffect } from 'react';
import './styles/Reclamar.css';

const Reclamar = ({ correo }) => {
  const [codigo, setCodigo] = useState('');
  const [mensajeRespuesta, setMensajeRespuesta] = useState('');
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    document.title = "Reclama tu premio";
    fetchHistorialReclamos();
  }, [correo]); // Agregar correo como dependencia

  const fetchHistorialReclamos = async () => {
    try {
      const response = await fetch('http://localhost:4000/v1/margarita/historial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo }), // Usar correo para obtener el historial
      });

      const data = await response.json();

      if (response.ok) {
        // Ajustar la estructura de datos si es necesario
        setHistorial(data.historial.map(log => ({
          fechaReclamo: log.fechaHora, // Suponiendo que este es el campo de fecha
          resultado: log.montoGanado ? "Ganó" : "No ganó", // Determinar el resultado
          montoGanado: log.montoGanado || 0, // El monto ganado
        })));
      } else {
        console.error("Error al obtener el historial:", data.message);
      }
    } catch (error) {
      console.error("Error al obtener el historial de reclamos:", error);
    }
  };

  const manejarReclamo = async () => {
    if (!codigo) {
      setMensajeRespuesta("Por favor, ingresa un código.");
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/v1/margarita/reclamar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, codigo }), // Usar correo para el reclamo
      });

      const data = await response.json();

      if (response.ok) {
        setMensajeRespuesta(`¡Felicidades! Ganaste $${data.montoGanado}.`); // Mensaje personalizado
        fetchHistorialReclamos(); // Actualizar el historial después del reclamo
      } else {
        setMensajeRespuesta(data.message);
      }
    } catch (error) {
      console.error("Error al reclamar el código:", error);
      setMensajeRespuesta("Error en la reclamación, intenta de nuevo.");
    }

    setCodigo(''); // Limpiar el campo de código
  };

  const regresarAlInicio = () => {
    window.location.href = '/';
  };

  return (
    <div className="reclamar-container">
      <h2>Reclama tu premio</h2>
      <div className="input-group">
        <label>Código</label>
        <input
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          placeholder="Ingresa el código"
        />
      </div>
      <button className="reclamar-btn" onClick={manejarReclamo}>🤑🤑GANA YAAAAA🤑🤑</button>

      {mensajeRespuesta && <p>{mensajeRespuesta}</p>}

      <h3>Historial de Reclamos</h3>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Resultado</th>
            <th>Monto Ganado</th>
          </tr>
        </thead>
        <tbody>
          {historial.map((log, index) => (
            <tr key={index}>
              <td>{log.fechaReclamo}</td>
              <td>{log.resultado}</td>
              <td>{log.montoGanado ? `$${log.montoGanado}` : 'N/A'}</td> {/* Corrección aquí */}
            </tr>
          ))}
        </tbody>
      </table>

      <button className="regresar-btn" onClick={regresarAlInicio}>Regresar al inicio</button>
    </div>
  );
};

export default Reclamar;
