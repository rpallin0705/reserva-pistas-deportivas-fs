// App.jsx o donde definas el enrutador
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./components/RootLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import InstalacionesPage from "./pages/InstalacionesPage";
import InstalacionDeletePage from "./pages/InstalacionDeletePage";
import InstalacionFormPage from "./pages/InstalacionFormPage";
import ReservasPage from "./pages/ReservasPage";
import UsuariosPage from "./pages/UsuariosPage";
import UsuarioFormPage from "./pages/UsuarioFormPage";
import UsuarioDeletePage from "./pages/UsuarioDeletePage";


import 'bootstrap/dist/css/bootstrap.min.css';
import MisReservasFormPage from "./pages/MisReservasFormPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true, // Esto indica que es la ruta por defecto para "/"
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "instalaciones",
        element: <InstalacionesPage />,
      },
      {
        path: "instalacion/add",
        element: <InstalacionFormPage />,
      },
      {
        path: "instalacion/edit/:id",
        element: <InstalacionFormPage />,
      },
      {
        path: "instalacion/del/:id",
        element: <InstalacionDeletePage />,
      },
      {
        path: "mis-reservas",
        element: <ReservasPage />,
      },
      {
        path: "mis-reservas/edit/:id",
        element: <MisReservasFormPage />,
      },
      {
        path: "mis-reservas/add/:id",
        element: <MisReservasFormPage />,
      },
      {
        path: "mis-reservas/del/:id",
        element: <MisReservasFormPage />,
      },
      {
        path: "mis-reservas/add",
        element: <MisReservasFormPage />,
      },
      {
       path: "usuarios",
       element: <UsuariosPage /> 
      },

      { 
        path:"usuarios/add", 
        element: <UsuarioFormPage /> 
      },

      {
        path: "usuarios/edit/:id", 
        element: <UsuarioFormPage /> 
      },

      { 
        path: "usuarios/del/:id", 
        element: <UsuarioDeletePage /> 
      }
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
