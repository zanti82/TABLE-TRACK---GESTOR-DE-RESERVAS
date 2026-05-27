//CREACION DEL ARRAY QUE CONTIENE LAS RUTAS

import React from 'react';
import Login from '../pages/Login';
import Panelp from '../pages/Panelp';



export let routerApp = [
    {
      path: "/",
      element: <Login />,
    },
    {
        path: "/login",
        element: <Login />,
      },

    {
      path: "/panel",
      element: <Panelp />,
    }
  ];