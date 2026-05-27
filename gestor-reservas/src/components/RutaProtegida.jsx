import React from 'react';
import { Navigate } from 'react-router-dom';
import { getLocalStorage } from '../helpers/local-storage';

function RutaProtegida(props) {
  let sesion = getLocalStorage('usuario');

  if (sesion) {
    return props.children;
  }

  return <Navigate to="/login" />;
}

export default RutaProtegida;