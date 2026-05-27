import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import {router} from  './routes/AppRouter'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {createBrowserRouter(router)}/>
  </StrictMode>,
)
