import React, { useState, useEffect } from 'react';
import { generalAlert, redirectAlert } from '../helpers/alerts.js';
import './Login.css';
import { saveLocalStorage } from '../helpers/local-storage';
import { end_points } from '../services/api';

function Login() {
  const [nombre, setNombre] = useState('');
  const [turno, setTurno] = useState('');
  const [users, setUsers] = useState([])

  function getUsers() {
    fetch(end_points.usuarios)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch(generalAlert('Error', 'No se pudieron cargar los usuarios', 'error'))
  }

  useEffect(() => {
    getUsers()
  }, [])

  console.log(users)

  //funciones handler para los inputs

  function handleNombre(e) {
    setNombre(e.target.value);
  }

  function handleTurno(e) {
    setTurno(e.target.value);
  }

  function findHost() {
    let usuario = users.find((item) => nombre == item.nombre && turno == item.turno)
    return usuario
  }

  //funcion del formulario

  function handleSubmit(e) {
    e.preventDefault();

    if (nombre === '' || turno === '') {
      generalAlert('Error', 'Completá todos los campos', 'error');
      return;
    }

    let host= findHost()
    if (host) {
        saveLocalStorage("usuario", host)
        redirectAlert("Bienvenido al sistema " + host.nombre, "Será redireccionado al panel pricipal en", "success", "/dashboard")
      } else {
        redirectAlert("Error de credenciales", "Esta ventana se cerrará en ", "error", "/")
      }

    

    
  }

  return (
    <div className="login-container">
      <div className="login-caja">
        <h2 className="login-titulo">Iniciar sesión</h2>

        <form onSubmit={handleSubmit}>
          <div className="login-campo">
            <label>Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={handleNombre}
              placeholder="Ingresá tu nombre"
            />
          </div>

          <div className="login-campo">
            <label>Turno:</label>
            <select value={turno} onChange={handleTurno}>
              <option value="">Selecciona un turno</option>
              <option value="manana">Mañana</option>
              <option value="tarde">Tarde</option>
              <option value="noche">Noche</option>
            </select>
          </div>

          <button type="submit" className="login-boton">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;