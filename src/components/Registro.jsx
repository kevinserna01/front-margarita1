import React, { useState } from 'react';
import './styles/registro.css'; 

function Registro() {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [cedula, setCedula] = useState('');
  const [correo, setCorreo] = useState('');
  const [celular, setCelular] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState(''); // Estado para diferenciar éxito/error

  const handleRegresar = () => {
    window.location.href = '/'; 
  };

  const handleRegister = async (event) => {
    event.preventDefault(); // Evitar que el formulario se recargue

    const datos = {
      nombre,
      fecha,
      cedula,
      correo,
      celular,
      ciudad,
      contraseña,
    };

    try {
      const response = await fetch('http://localhost:4000/v1/margarita/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message); 
      }

      const data = await response.json();
      setMensaje("🎉 ¡Registro exitoso! 🎉"); // Mensaje de éxito
      setTipoMensaje('exito'); // Tipo de mensaje para estilos
      // Aquí puedes limpiar el formulario si es necesario

    } catch (error) {
      console.error("Error:", error);
      setMensaje("❌ Error en el registro, intenta de nuevo ❌"); // Mensaje de error
      setTipoMensaje('error'); // Tipo de mensaje para estilos
    }
  };

  return (
    <div className="registro-container">
      <h2>😉 REGISTRATE Y GANA 😉</h2>

      {/* Mostrar mensaje al usuario */}
      {mensaje && (
        <div className={`mensaje-registro ${tipoMensaje}`}>
          <p>{mensaje}</p>
        </div>
      )}

      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" placeholder="Nombre" required
            value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="fecha">Fecha Nac:</label>
          <input type="date" id="fecha" name="fecha" required
            value={fecha} onChange={(e) => setFecha(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="cedula">Cédula:</label>
          <input type="text" id="cedula" name="cedula" placeholder="Cédula" required
            value={cedula} onChange={(e) => setCedula(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="correo">Correo:</label>
          <input type="email" id="correo" name="correo" placeholder="Correo" required
            value={correo} onChange={(e) => setCorreo(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="celular">Celular:</label>
          <input type="tel" id="celular" name="celular" placeholder="Celular" required
            value={celular} onChange={(e) => setCelular(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="ciudad">Ciudad:</label>
          <input type="text" id="ciudad" name="ciudad" placeholder="Ciudad" required
            value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="contraseña">Contraseña:</label>
          <input type="password" id="contraseña" name="contraseña" placeholder="Contraseña" required
            value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
        </div>

        <button type="submit">Registrarse</button>
        <button type="button" className="regresar-button" onClick={handleRegresar}>
          Regresar al Inicio
        </button>
      </form>
    </div>
  );
}

export default Registro;
