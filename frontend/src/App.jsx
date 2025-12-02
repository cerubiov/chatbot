import React from "react";
import { Routes, Route,  Navigate } from "react-router-dom";
import Inicio from "./componentes/Inicio";
import FormularioAdmin from "./componentes/FormularioAdmin";
import Login from "./componentes/Login";
import Registro from "./componentes/Registro";
import NavBar from "./componentes/NavBar";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./estilos/principal.css";

function RutaPrivada ({children}){
  const {isAutenticated} = useAuth()
  if(!isAutenticated){
    return <Navigate to="/login" replace />
  }
  return children
}

export default function App() {
  return (
    <AuthProvider>
      
          <NavBar />
          <main className="contenido">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
              <Route
                path="/alimentar"
                element={
                  <RutaPrivada>
                    <FormularioAdmin />
                  </RutaPrivada>
                }
              />
            </Routes>
          </main>
        
    </AuthProvider>
  );
}
