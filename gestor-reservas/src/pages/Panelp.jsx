import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { generalAlert, redirectAlert } from '../helpers/alerts.js';
import './panel.css';
import ModalReserva from '../components/ModalReserva';
import { end_points } from '../services/api.js';
import Swal from 'sweetalert2';

function Panelp() {
  const [reservas, setReservas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  //para editar
  const [editando, setEditando] = useState(false);
  const [reservaEditar, setReservaEditar] = useState(null);


  function getReservas() {
      fetch(end_points.reservas)
        .then((response) => response.json())
        .then((data) => setReservas(data))
        
    }

  useEffect(()=> {
    getReservas();
  }, []);

  console.log(reservas)

  function handleAbrirModalCrear() {
    setEditando(false);
    setReservaEditar(null);
    setMostrarModal(true);
  }

  
  /* ya no va porque el modal se cierra
  function  limpiarFormulario(){
    setNombre('');
    setFecha('');
    setHora('');
    setPersonas('');
    setEditando(false);
    setIdEditando(null);
  }*/

  function handleGuardar(reservaData) {
   
    //editar
    if(editando === true){
      fetch(end_points.reservas + reservaEditar.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservaData)
      })
      .then((respuesta) => respuesta.json())
      .then(function() {
        generalAlert('Éxito', 'Reserva editada correctamente', 'success');
        handleCerrarModal();
        getReservas();
      })
      .catch(()=>
        generalAlert('Error', 'No se pudo crear la reserva', 'error')
      );


    }else{
      fetch(end_points.reservas, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservaData)
      })
        .then((respuesta) => respuesta.json())
        .then(function() {
          generalAlert('Éxito', 'Reserva creada correctamente', 'success');
         handleCerrarModal();
          getReservas();
        })
        .catch(()=>
          generalAlert('Error', 'No se pudo crear la reserva', 'error')
        );
    }
  }  

  //PARA BOTON EDITAR

  function handleEditar(reserva) {
    setEditando(true);
    setReservaEditar(reserva);
    setMostrarModal(true);
  }

  function handleCerrarModal() {
    setMostrarModal(false);
    setEditando(false);
    setReservaEditar(null);
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

  var handleConfirmarEliminar = function(id, nombre) {

     Swal.fire({
      title: '¿Estás seguro?',
      text: 'Vas a eliminar la reserva de ' + nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((resultado)=> {
      if (resultado.isConfirmed) {
        handleEliminar(id);
      }
    });
  };

  return (
    <div>
      <Header />
      <div className="panel-container">
        <h2 className="panel-titulo">Gestión de Reservas</h2>
        <button
            onClick={handleAbrirModalCrear}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Nueva Reserva
          </button>
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
                <th>Acciones</th>
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
                        onClick={() => { handleConfirmarEliminar(reserva.id, reserva.nombre); }}
                      >
                        Eliminar
                      </button>
                      <button
                          className="panel-boton-editar"
                          onClick={() => { handleEditar(reserva); }}
                          style={{ marginLeft: '5px', padding: '5px 10px', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                          Editar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <ModalReserva
          mostrar={mostrarModal}
          editando={editando}
          reservaEditar={reservaEditar}
          onCerrar={handleCerrarModal}
          onGuardar={handleGuardar}
        />
      </div>
    
  );
}

export default Panelp;