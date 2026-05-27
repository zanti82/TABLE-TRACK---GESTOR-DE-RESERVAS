import React from 'react';
import './header.css';
import { getLocalStorage, removeLocalStorage } from '../helpers/local-storage';

function Header() {
  let usuario = getLocalStorage('usuario');
  let turno = getLocalStorage('turno');
  let usuarioId = getLocalStorage('usuarioId')

  function handleLogout() {
    removeLocalStorage('usuario');
    removeLocalStorage('turno');
    removeLocalStorage('usuarioId')
    window.location.href = '/login';
  }

  return (
    <div className="header">
      <div className="header-logo">
        🍽️ Restaurante
      </div>
      <div className="header-info">
        <span className="header-usuario">
          {usuario !== null && usuario + ' - ' + turno}
          {usuario === null && 'Hola Host'}
        </span>
        <button className="header-boton" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default Header;