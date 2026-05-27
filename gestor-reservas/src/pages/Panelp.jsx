import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { generalAlert } from '../helpers/alerts.js';
import './panel.css';
import { end_points } from '../services/api.js';

function Panelp() {
  const [reservas, setReservas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [personas, setPersonas] = useState('');


  function getReservas() {
      fetch(end_points.reservas)
        .then((response) => response.json())
        .then((data) => setReservas(data))
        
    }

  useEffect(function() {
    getReservas();
  }, []);

  console.log(reservas)

  

  function handleNombre(e) {
    setNombre(e.target.value);
  }

  function handleFecha(e) {
    setFecha(e.target.value);
  }

  function handleHora(e) {
    setHora(e.target.value);
  }

  function handlePersonas(e) {
    setPersonas(e.target.value);
  }

  function handleCrearReserva(e) {
    e.preventDefault();

    if (nombre === '' || fecha === '' || hora === '' || personas === '') {
      generalAlert('Error', 'Completá todos los campos', 'error');
      return;
    }

    let nuevaReserva = {
      nombre: nombre,
      fecha: fecha,
      hora: hora,
      personas: parseInt(personas)
    };

    //console.log(nuevaReserva)
    fetch(end_points.reservas, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevaReserva)
    })
      .then((respuesta) => respuesta.json())
      .then(function() {
        generalAlert('Éxito', 'Reserva creada correctamente', 'success');
        setNombre('');
        setFecha('');
        setHora('');
        setPersonas('');
        getReservas();
      })
      .catch(
        generalAlert('Error', 'No se pudo crear la reserva', 'error')
      );
  }

  function handleEliminar(id) {
    fetch(end_points.reservas + id, {
      method: 'DELETE'
    })
      .then(() => {
        generalAlert('Éxito', 'Reserva eliminada', 'success');
        getReservas();
      })
      .catch(()=>
        generalAlert('Error', 'No se pudo eliminar la reserva', 'error')
      );
  }

  return (
    <div>
      <Header />
      <div className="panel-container">
        <h2 className="panel-titulo">Gestión de Reservas</h2>

        <div className="panel-formulario">
          <h3>Nueva Reserva</h3>
          <form onSubmit={handleCrearReserva}>
            <div className="panel-campo">
              <label>Nombre:</label>
              <input
                type="text"
                value={nombre}
                onChange={handleNombre}
                placeholder="Nombre del cliente"
              />
            </div>
            <div className="panel-campo">
              <label>Fecha:</label>
              <input
                type="date"
                value={fecha}
                onChange={handleFecha}
              />
            </div>
            <div className="panel-campo">
              <label>Hora:</label>
              <input
                type="time"
                value={hora}
                onChange={handleHora}
              />
            </div>
            <div className="panel-campo">
              <label>Número de personas:</label>
              <input
                type="number"
                value={personas}
                onChange={handlePersonas}
                placeholder="Cantidad de personas"
              />
            </div>
            <button type="submit" className="panel-boton">
              Crear Reserva
            </button>
          </form>
        </div>

        <div className="panel-lista">
          <h3>Reservas Actuales</h3>
          <table className="panel-tabla">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Personas</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map(function(reserva) {
                return (
                  <tr key={reserva.id}>
                    <td>{reserva.nombre}</td>
                    <td>{reserva.fecha}</td>
                    <td>{reserva.hora}</td>
                    <td>{reserva.personas}</td>
                    <td>
                      <button
                        className="panel-boton-eliminar"
                        onClick={function() { handleEliminar(reserva.id); }}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Panelp;