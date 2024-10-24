import React, { useState, useEffect } from 'react';
import './styles/Reclamar.css';

const Reclamar = ({ logs, onReclamo }) => {
  const [codigo, setCodigo] = useState('');
  const [mensajeRespuesta, setMensajeRespuesta] = useState(''); // Estado para el mensaje de respuesta

  useEffect(() => {
    document.title = "Reclama tu premio"; // Cambia el título de la pestaña
  }, []);

  const manejarReclamo = async () => {
    // Comprobamos si el campo de código está vacío
    if (!codigo) {
      setMensajeRespuesta("Por favor, ingresa un código.");
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/v1/margarita/reclamar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: "ID_DEL_USUARIO", codigo }), // Asegúrate de obtener el ID del usuario adecuadamente
      });

      const data = await response.json();
      
      if (response.ok) {
        const fecha = new Date().toLocaleDateString();
        const nuevoLog = { fecha, mensaje: data.mensaje }; // Cambia el mensaje aquí
        onReclamo(nuevoLog); // Actualiza los logs en App.jsx
        setMensajeRespuesta(data.mensaje); // Muestra el mensaje de respuesta
      } else {
        setMensajeRespuesta(data.message); // Cambia para mostrar el mensaje de error
      }

    } catch (error) {
      console.error("Error al reclamar el código:", error);
      setMensajeRespuesta("Error en la reclamación, intenta de nuevo.");
    }

    setCodigo(''); // Limpiar el campo de código
  };

  const regresarAlInicio = () => {
    // Redirigimos utilizando window.location.href para recargar toda la página
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

      {/* Mensaje de respuesta */}
      {mensajeRespuesta && <p>{mensajeRespuesta}</p>}

      <h3>Historial de Reclamos</h3>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Mensaje</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{log.fecha}</td>
              <td>{log.mensaje}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botón para regresar al componente App */}
      <button className="regresar-btn" onClick={regresarAlInicio}>Regresar al inicio</button>
    </div>
  );
};

export default Reclamar;
