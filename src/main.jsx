import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Home.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Log from './LogIn.jsx'
import Create from './CreateAcc.jsx'
import Izracun from './Izracun.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <div>404 Not Found</div>
    },
    {
        path: '/LogIn',
        element: <Log />,
        errorElement: <div>404 Not Found</div>
    },
    {
        path: '/CreateAcc',
        element: <Create />,
        errorElement: <div>404 Not Found</div>
    },
    {
        path: '/Izracun',
        element: <Izracun />,
        errorElement: <div>404 Not Found</div>
    },


]);



ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>  
  </React.StrictMode>,
)

