import React, { useState, useEffect } from 'react';
import './modalReserva.css';

function ModalReserva(props) {
  var [nombre, setNombre] = useState('');
  var [fecha, setFecha] = useState('');
  var [hora, setHora] = useState('');
  var [personas, setPersonas] = useState('');

  useEffect(function() {
    if (props.editando === true && props.reserva !== null) {
      setNombre(props.reservaEditar.nombre);
      setFecha(props.reservaEditar.fecha);
      setHora(props.reservaEditar.hora);
      setPersonas(props.reservaEditar.personas);
    } else {
      setNombre('');
      setFecha('');
      setHora('');
      setPersonas('');
    }
  }, [props.editando, props.reservaEditar]);

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
  function handleGuardar(evento) {
    evento.preventDefault();

    if (nombre === '' || fecha === '' || hora === '' || personas === '') {
      return;
    }

    let reservaData = {
      nombre: nombre,
      fecha: fecha,
      hora: hora,
      personas: parseInt(personas)
    };

    props.onGuardar(reservaData);
  }

  if (props.mostrar === false) {
    return null;
  }

  return (
    <div className="modal-fondo">
      <div className="modal-contenido">
        <h3 className="modal-titulo">
          {props.editando === true ? 'Editar Reserva' : 'Nueva Reserva'}
        </h3>

        <form onSubmit={handleGuardar}>
          <div className="modal-campo">
            <label>Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={handleNombre}
              placeholder="Nombre del cliente"
            />
          </div>
          <div className="modal-campo">
            <label>Fecha:</label>
            <input
              type="date"
              value={fecha}
              onChange={handleFecha}
            />
          </div>
          <div className="modal-campo">
            <label>Hora:</label>
            <input
              type="time"
              value={hora}
              onChange={handleHora}
            />
          </div>
          <div className="modal-campo">
            <label>Número de personas:</label>
            <input
              type="number"
              value={personas}
              onChange={handlePersonas}
              placeholder="Cantidad de personas"
            />
          </div>

          <div className="modal-botones">
            <button
              type="button"
              className="modal-boton-cancelar"
              onClick={props.onCerrar}
            >
              Cancelar
            </button>
            <button type="submit" className="modal-boton-guardar">
              {props.editando === true ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalReserva;